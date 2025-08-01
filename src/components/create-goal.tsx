import { X } from "lucide-react";
import { DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupIndicator, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Bounce, toast } from "react-toastify";
import { setupApiClient } from "@/services/api";

const createGoalForm = z.object({
  title: z.string().min(1, "Informe  a atividade qeu deseja realizar"),
  desired_weekly_frequency: z.coerce.number().min(1).max(7),
});

type CreateGoalForm = z.infer<typeof createGoalForm>

export function CreateGoal() {
  const { user } = useContext(AuthContext);


  const { register, control, handleSubmit, formState, reset } = useForm<CreateGoalForm>({
    resolver: zodResolver(createGoalForm),
  })

  async function handleCreateGoal(data: CreateGoalForm) {
    const apiClient = setupApiClient()
    await apiClient.post('/goals', {
      user_id: user.id,
      title: data.title,
      desired_weekly_frequency: data.desired_weekly_frequency,
    });

    reset();
    toast.success("Nova metas cadastrada com sucesso!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

  }

  return (
    <>
      <DialogContent>
        <div className="flex flex-col gap-6 h-full">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <DialogTitle>Cadastrar meta</DialogTitle>
              <DialogClose>
                <X size={20} className="text-zinc-600" />
              </DialogClose>
            </div>
            <DialogDescription>
              Adicione atividades que te fazem bem e que você quer continuar praticando toda semana.
            </DialogDescription>
          </div>

          <form onSubmit={handleSubmit(handleCreateGoal)} className="flex-1 flex flex-col justify-between ">
            <div className="felx flex-col gap-6">
              <div className="flex flex-col gap-2 mb-2">
                <Label htmlFor="title">Qual a atividade</Label>
                <Input
                  id="title"
                  autoFocus placeholder="Praticar exercicios, meditar, etc..."
                  {...register('title')}
                />

                {formState.errors.title && (
                  <p className="text-red-400 text-sm">{formState.errors.title.message}</p>
                )}

              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">Quantas vezes na semana</Label>
                <Controller
                  control={control}
                  name="desired_weekly_frequency"
                  defaultValue={3}
                  render={({ field }) => {
                    return (
                      <RadioGroup onValueChange={field.onChange} value={String(field.value)}>
                        <RadioGroupItem value="1">
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-sm font-medium leading-none">1x na semana</span>
                          <span className="text-lg leading-none">🥱</span>
                        </RadioGroupItem>

                        <RadioGroupItem value="2">
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-sm font-medium leading-none">2x na semana</span>
                          <span className="text-lg leading-none">🙂</span>
                        </RadioGroupItem>
                        <RadioGroupItem value="3">
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-sm font-medium leading-none">3x na semana</span>
                          <span className="text-lg leading-none">😎</span>
                        </RadioGroupItem>
                        <RadioGroupItem value="4">
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-sm font-medium leading-none">4x na semana</span>
                          <span className="text-lg leading-none">😜</span>
                        </RadioGroupItem>
                        <RadioGroupItem value="5">
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-sm font-medium leading-none">5x na semana</span>
                          <span className="text-lg leading-none">🤨</span>
                        </RadioGroupItem>
                        <RadioGroupItem value="6">
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-sm font-medium leading-none">6x na semana</span>
                          <span className="text-lg leading-none">🤯</span>
                        </RadioGroupItem>
                        <RadioGroupItem value="7">
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-sm font-medium leading-none">Todos os dias da semana</span>
                          <span className="text-lg leading-none">🔥</span>
                        </RadioGroupItem>

                      </RadioGroup>
                    )
                  }}
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pb-3">
              <DialogTrigger asChild>
                <Button variant="secondary" type="button" className="flex-1" onClick={() => window.location.reload()}>
                  Fechar
                </Button>
              </DialogTrigger>
              <Button className="flex-1">
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </>
  )
}