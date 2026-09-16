'use client';

export default function ExpertiseSection({ expertise = [] }) {
  return (
    <section id="services" className="py-24 bg-[#121620]/40 border-y border-[#d4af37]/20 backdrop-blur-sm relative">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37] mb-4 flex items-center gap-2">
          <span className="w-6 h-px bg-[#d4af37]" />
          Expertise
        </p>

        <h2 className="text-4xl md:text-5xl font-bold mb-12 max-w-2xl text-white">
          What I do best
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertise.map((item) => (
            <div
              key={item.id}
              className="group p-8 rounded-2xl bg-[#121620] border border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              style={{ boxShadow: 'var(--shadow-elegant)' }}
            >
              {/* Subtle top glow highlight */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="text-3xl text-gradient-gold mb-4 font-mono font-bold">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-[#d4af37] transition-colors">
                {item.title}
              </h3>

              <p className="text-slate-400 leading-relaxed text-sm font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
