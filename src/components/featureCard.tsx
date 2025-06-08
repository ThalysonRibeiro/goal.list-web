interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative">
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"></div>
      
      {/* Card content */}
      <div className="relative p-8 rounded-2xl glass border border-white/10 hover:border-white/20 transition-all duration-500 group-hover:transform group-hover:scale-105 h-full">
        <div className="mb-6 p-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 w-fit">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-300 transition-colors">
          {title}
        </h3>
        <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
          {description}
        </p>
      </div>
    </div>
  );
}