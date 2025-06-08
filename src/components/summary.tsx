import { CheckCircle2, Plus, RefreshCw, Calendar, Target, TrendingUp } from "lucide-react";
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
    const confirmDelete = confirm("Desfazer todas as metas?");

    if (confirmDelete) {
      await api.delete('/delete-all-goal-completion');
      window.location.reload();
    }
  }

  return (
    <div className="py-12 max-w-4xl w-full px-6 mx-auto flex flex-col gap-8">
      {/* Header Section */}
      <div className="glass rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20">
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-xl font-semibold text-white capitalize">
              {firstDayOfWeek} - {lastDayOfWeek}
            </span>
          </div>
          <div className="flex gap-3">
            <ReloadButton />
            <DialogTrigger asChild>
              <Button size="sm" className="shadow-lg">
                <Plus size={16} />
                Nova Meta
              </Button>
            </DialogTrigger>
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-5 h-5 text-purple-400" />
            <span className="text-lg font-medium text-white">Progresso Semanal</span>
          </div>
          
          <Progress max={data.total} value={data.completed} className="h-3">
            <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
          </Progress>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">
              Você completou <span className="text-blue-400 font-semibold">{data?.completed}</span> de{' '}
              <span className="text-purple-400 font-semibold">{data?.total}</span> metas nessa semana
            </span>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400 font-semibold">{completedPercentage}%</span>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-white/10" />

      {/* Pending Goals */}
      <div className="glass rounded-2xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-cyan-400" />
          Metas Pendentes
        </h3>
        <PendingGoals />
      </div>

      {/* Weekly Summary */}
      <div className="glass rounded-2xl p-6 border border-white/10">
        <div className="flex gap-3 justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-green-400" />
            Sua Semana
          </h2>
          <Button
            variant="secondary"
            onClick={handleUndoAllGoals}
            className="text-red-400 hover:text-red-300 border-red-500/20 hover:border-red-400/30"
          >
            Desfazer Todas
          </Button>
        </div>

        <div className="space-y-6">
          {Object.entries(data.goalsPerDay).map(([date, goals]) => {
            const weekDay = format(new Date(date + 'T03:00:00Z'), 'eeee', { locale: ptBR });
            const formattedDate = format(new Date(date + 'T03:00:00Z'), "d 'de' MMMM", { locale: ptBR });

            return (
              <div key={date} className="space-y-3">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
                  <span className="capitalize">{weekDay}</span>
                  <span className="text-slate-400 text-sm font-normal">({formattedDate})</span>
                </h3>
                
                <div className="space-y-2 pl-4">
                  {goals.map(goal => {
                    const time = format(new Date(goal.completedAt), 'HH:mm');
                    return (
                      <div key={goal.completedAt} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-slate-300 text-sm">
                            Você completou "
                            <span className="text-white font-medium">{goal.title}</span>
                            " às <span className="text-blue-400 font-medium">{time}</span>
                          </span>
                        </div>
                        <button
                          className="text-slate-400 hover:text-red-400 text-sm font-medium transition-colors px-2 py-1 rounded hover:bg-red-500/10"
                          onClick={() => handleUndo(goal.id)}
                        >
                          Desfazer
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ReloadButton() {
  const router = useRouter();
  
  function handleReload() {
    router.reload();
  }

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={handleReload}
      className="shadow-lg"
    >
      <RefreshCw className="w-4 h-4" />
    </Button>
  );
}