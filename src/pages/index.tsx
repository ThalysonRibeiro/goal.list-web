import Image from "next/image";
import logoImg from "@/assets/logo-goallist.png";
import { Geist, Geist_Mono } from "next/font/google";
import { CheckCircle, List, ArrowRight, Star, Shield } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/featureCard";
import { useContext } from "react";
import { AuthContex } from "@/context/AuthContext";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const { user, logoutUser } = useContext(AuthContex);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-950">
      {/* Header/Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              alt='logo do site goal list'
              src={logoImg}
              width={30}
              height={30}
            />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Goal.List
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <Link href="/dashboard">
                  {user ? user.name : 'Carregando...'}
                </Link>
                <a className="cursor-pointer text-red-500" onClick={logoutUser}>
                  Sair
                </a>
              </>
            ) : (
              <>
                <Link href="#features" className="text-gray-500 hover:text-cyan-500 transition-colors">Recursos</Link>
                <Link href="/login" className="text-gray-500 hover:text-cyan-500 transition-colors">login</Link>
                <Link href="/register" className="text-gray-500 hover:text-cyan-500 transition-colors">register</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Transforme seus objetivos em
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                {" "}conquistas reais
              </span>
            </h1>
            <p className="text-gray-500 text-lg mb-8">
              Organize, acompanhe e alcance suas metas com uma plataforma intuitiva que mantém você focado no que realmente importa.
            </p>
            <div className="flex space-x-4">
              <Button>
                Comece Agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80"
              alt="Planejamento e Organização"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-zinc-900 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">
            Recursos que impulsionam seu sucesso
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<List className="w-8 h-8 text-cyan-500" />}
              title="Organização Intuitiva"
              description="Crie e organize suas metas de forma simples e eficiente com nossa interface amigável."
            />
            <FeatureCard
              icon={<CheckCircle className="w-8 h-8 text-cyan-500" />}
              title="Acompanhamento em Tempo Real"
              description="Monitore seu progresso com atualizações instantâneas e métricas claras."
            />
            <FeatureCard
              icon={<Star className="w-8 h-8 text-cyan-500" />}
              title="Conquistas e Recompensas"
              description="Celebre suas vitórias com um sistema de recompensas motivador."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para transformar seus sonhos em realidade?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já estão alcançando suas metas com nossa plataforma.
          </p>
          <button className="bg-white text-blue-500 hover:bg-blue-50 px-8 py-3 rounded-md transition-colors font-semibold">
            Criar Conta
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 py-12 border-t border-zinc-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="w-6 h-6 text-violet-500" />
              <span className="text-gray-600">© 2024 MetasFlow. Todos os direitos reservados.</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-cyan-500 transition-colors">Privacidade</a>
              <a href="#" className="text-gray-600 hover:text-cyan-500 transition-colors">Termos</a>
              <a href="#" className="text-gray-600 hover:text-cyan-500 transition-colors">Contato</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
