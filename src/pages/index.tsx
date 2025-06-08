import Image from "next/image";
import logoImg from "@/assets/logo-goallist.png";
import { CheckCircle, List, ArrowRight, Star, Shield, User, Target, TrendingUp, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/featureCard";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";

export default function Home() {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      {/* Header/Navigation */}
      <nav className="container mx-auto px-6 py-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image
                alt='logo do site goal list'
                src={logoImg}
                width={40}
                height={40}
                className="drop-shadow-lg"
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 blur-sm"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Goal.List
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <div className="flex items-center space-x-6">
                <Link href="/dashboard\" className="flex items-center gap-3 px-4 py-2 rounded-full glass hover:bg-white/10 transition-all duration-300">
                  <span className="text-white font-medium">{user.name}</span>
                  <User className="w-5 h-5 text-blue-400" />
                </Link>
                <button 
                  onClick={logoutUser}
                  className="text-red-400 hover:text-red-300 transition-colors font-medium"
                >
                  Sair
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-6">
                <Link href="#features" className="text-slate-300 hover:text-blue-400 transition-colors font-medium">
                  Recursos
                </Link>
                <Link href="/login" className="text-slate-300 hover:text-blue-400 transition-colors font-medium">
                  Login
                </Link>
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                    Registrar
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-slate-300">Transforme seus objetivos em conquistas</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8 text-balance">
            Alcance suas
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-gradient">
              {" "}metas
            </span>
            <br />
            com facilidade
          </h1>
          
          <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Uma plataforma intuitiva e poderosa para organizar, acompanhar e conquistar seus objetivos. 
            Transforme sonhos em realidade com ferramentas que realmente funcionam.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/register">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-lg pulse-glow">
                Comece Gratuitamente
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="secondary" className="glass border-white/20 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full text-lg">
                Ver Recursos
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">10k+</div>
              <div className="text-slate-400">Metas Alcançadas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">95%</div>
              <div className="text-slate-400">Taxa de Sucesso</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">5k+</div>
              <div className="text-slate-400">Usuários Ativos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Recursos que impulsionam
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {" "}seu sucesso
              </span>
            </h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              Ferramentas poderosas e intuitivas para transformar a forma como você alcança seus objetivos
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              icon={<Target className="w-8 h-8 text-blue-400" />}
              title="Organização Inteligente"
              description="Crie e organize suas metas com nossa interface intuitiva. Sistema de categorização automática e priorização inteligente."
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8 text-purple-400" />}
              title="Progresso em Tempo Real"
              description="Acompanhe seu avanço com métricas detalhadas, gráficos interativos e relatórios de desempenho personalizados."
            />
            <FeatureCard
              icon={<Star className="w-8 h-8 text-cyan-400" />}
              title="Sistema de Conquistas"
              description="Celebre cada vitória com nosso sistema gamificado de recompensas e marcos de progresso motivadores."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-24 relative z-10">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
          <div className="relative glass rounded-3xl p-12 text-center border border-white/10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Pronto para transformar
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {" "}sua vida?
              </span>
            </h2>
            <p className="text-slate-400 text-xl mb-10 max-w-2xl mx-auto">
              Junte-se a milhares de pessoas que já estão conquistando seus sonhos. 
              Comece sua jornada de transformação hoje mesmo.
            </p>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-lg">
                Criar Conta Gratuita
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <Image
                alt='logo do site goal list'
                src={logoImg}
                width={32}
                height={32}
              />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Goal.List
              </span>
            </div>
            <div className="flex items-center space-x-8">
              <span className="text-slate-500 text-sm">© 2024 Goal.List. Todos os direitos reservados.</span>
              <div className="flex space-x-6">
                <a href="#" className="text-slate-500 hover:text-blue-400 transition-colors text-sm">Privacidade</a>
                <a href="#" className="text-slate-500 hover:text-blue-400 transition-colors text-sm">Termos</a>
                <a href="#" className="text-slate-500 hover:text-blue-400 transition-colors text-sm">Contato</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}