import { CheckCircle2, Plus, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { startOfWeek, format, endOfWeek } from 'date-fns';
import { ptBR } from "date-fns/locale";
import { PendingGoals } from "./peding-Goals";
import { useRouter } from "next/router";
import { api } from "@/services/apiClient";


interface SummaryProps {
  data: {
    completed: number;
    total: number;
    goalsPerDay: Record<
      string,
      Array<{
        id: string;
        title: string;
        completedAt: string;
      }>
    >;
  };
}

export function Summary({ data }: SummaryProps) {

  if (!data) {
    return null;
  }

  const firstDayOfWeek = format(startOfWeek(new Date()), 'd MMM', { locale: ptBR });
  const lastDayOfWeek = format(endOfWeek(new Date()), 'd MMM', { locale: ptBR });
  const completedPercentage = Math.round((data.completed * 100) / data.total);

  async function handleUndo(id: string) {
    const confirmDelete = confirm("Desfazer essa meta?");

    if (confirmDelete) {
      await api.delete('/undo', {
        data: { id: id }
      });
      window.location.reload();
    }
  }

  async function handleUndoAllGoals() {
    const confirmDelete = confirm("Desfazer todas as  metas?");

    if (confirmDelete) {
      await api.delete('/delete-all-goal-completion');
      window.location.reload();
    }
  }

  return (
    <>
      <div className="py-10 max-w-[480px] w-full px-5 mx-auto flex flex-col gap-6 md:max-w-[780px]">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold capitalize">{firstDayOfWeek} - {lastDayOfWeek}</span>
          <div className="flex gap-3">
            <ReloadButton />
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus size={16} />
                Cadastrar meta
              </Button>
            </DialogTrigger>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Progress max={data.total} value={data.completed}>
            <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
          </Progress>

          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Você completou <span className="text-zinc-100">{data?.completed}</span> de <span className="text-zinc-100">{data?.total}</span> metas nessa semana.</span>
            <span>{completedPercentage}%</span>
          </div>

          <Separator />

          <PendingGoals />

          <div className="flex flex-col gap-6">
            <div className="flex gap-3 justify-between items-center">
              <h2 className="text-xl font-medium">Sua semana</h2>
              <Button
                onClick={handleUndoAllGoals}
              >Desfazer todas as metas
              </Button>
            </div>
            {Object.entries(data.goalsPerDay).map(([date, goals]) => {

              const weekDay = format(new Date(date + 'T03:00:00Z'), 'eeee', { locale: ptBR });
              const formattedDate = format(new Date(date + 'T03:00:00Z'), "d 'de' MMMM", { locale: ptBR });

              return (
                <div key={date} className="flex flex-col gap-4">
                  <h3 className="font-medium">
                    <span className="capitalize">{weekDay}</span>{' '} <span className="text-zinc-400 text-xs">({formattedDate})</span>
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {goals.map(goal => {
                      const time = format(new Date(goal.completedAt), 'HH:mm')
                      return (
                        <li key={goal.completedAt} className="flex items-center gap-2 justify-between">
                          <div className="flex gap-2">
                            <CheckCircle2 className="size-4 text-cyan-500" />
                            <span className="text-zinc-400 text-sm inline-flex">
                              Você completou "<span className="text-zinc-100 truncate inline-block max-w-[120px] md:text-clip md:max-w-[470px]">{goal.title}</span>" às
                              <span className="text-zinc-100 ml-1">{time}</span>
                            </span>
                          </div>
                          <button
                            className="text-zinc-400 text-sm border-b border-b-zinc-400"
                            onClick={() => handleUndo(goal.id)}
                          >Desfazer
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}

          </div>
        </div>
      </div>
    </>
  )
}


function ReloadButton() {
  const router = useRouter();
  function handleReload() {
    router.reload();
  }


  return (
    <Button
      onClick={handleReload}
    >
      <RefreshCw className="size-4" />
    </Button>
  );
}