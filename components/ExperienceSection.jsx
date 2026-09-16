'use client';

import { Briefcase } from 'lucide-react';

export default function ExperienceSection({ experiences = [] }) {
  return (
    <section id="experience" className="py-24 max-w-6xl mx-auto px-6 relative">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37] mb-4 flex items-center gap-2">
        <span className="w-6 h-px bg-[#d4af37]" />
        Career
      </p>

      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white">
        Experience Timeline
      </h2>

      <div className="space-y-6">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="grid md:grid-cols-[1fr_2fr] gap-6 p-8 rounded-2xl border border-[#d4af37]/20 bg-[#121620]/90 hover:border-[#d4af37]/50 transition-all duration-300 relative group"
            style={{ boxShadow: 'var(--shadow-elegant)' }}
          >
            <div>
              <p className="text-xs text-[#d4af37] font-semibold tracking-wide uppercase flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                <span>{exp.period}</span>
              </p>
              <p className="text-xl font-bold text-white mt-2 group-hover:text-[#d4af37] transition-colors">
                {exp.company}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-slate-100">
                {exp.role}
              </h3>

              <ul className="space-y-2.5 text-slate-300 text-sm font-light">
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <span className="text-[#d4af37] font-bold text-base leading-none select-none">›</span>
                    <span className="leading-normal">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
