export function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 hover:scale-105 transition-transform duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}