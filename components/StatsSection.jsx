'use client';

export default function StatsSection({ stats = [] }) {
  return (
    <section className="border-y border-[#d4af37]/20 bg-[#121620]/40 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="relative group">
            <p className="text-4xl md:text-5xl font-display font-bold text-gradient-gold tracking-tight group-hover:scale-105 transition-transform duration-300 origin-left">
              {stat.value}
            </p>
            <p className="text-xs text-slate-400 mt-2 uppercase tracking-wider font-semibold">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
