import Image from "next/image";
import { DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Plus, Target, Sparkles } from "lucide-react";
import letStart from "@/assets/illustration_lets-start.png";

export function EmptyGoal() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        {/* Decorative background */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-3xl"></div>
          <div className="relative glass rounded-3xl p-8 border border-white/10">
            <div className="relative inline-block">
              <Image
                alt="imagem de fundo dashboard"
                src={letStart}
                className="drop-shadow-2xl animate-float"
              />
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-white">
              Comece sua jornada de
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {" "}conquistas
              </span>
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Você ainda não cadastrou nenhuma meta. Que tal criar sua primeira meta e dar o primeiro passo 
              em direção aos seus objetivos?
            </p>
          </div>

          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 pulse-glow">
              <Target className="w-5 h-5" />
              Criar Primeira Meta
            </Button>
          </DialogTrigger>

          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              Fácil de usar
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
              Resultados rápidos
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
              100% gratuito
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}