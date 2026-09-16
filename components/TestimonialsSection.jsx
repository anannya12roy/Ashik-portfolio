'use client';

import { Quote } from 'lucide-react';

export default function TestimonialsSection({ testimonials = [] }) {
  return (
    <section id="testimonials" className="py-24 max-w-6xl mx-auto px-6 relative">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37] mb-4 flex items-center gap-2">
        <span className="w-6 h-px bg-[#d4af37]" />
        Recommendations
      </p>

      <h2 className="text-4xl md:text-5xl font-bold mb-12 max-w-2xl text-white">
        Words from{' '}
        <span className="text-gradient-gold font-display italic">
          colleagues & leaders
        </span>
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((item) => (
          <figure
            key={item.id}
            className="p-8 rounded-2xl bg-[#121620] border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all duration-300 flex flex-col justify-between group"
            style={{ boxShadow: 'var(--shadow-elegant)' }}
          >
            <div>
              <div className="text-4xl text-gradient-gold font-display leading-none mb-4 font-bold select-none">
                “
              </div>
              <blockquote className="text-slate-300 leading-relaxed text-sm md:text-base font-light mb-6 italic">
                {item.quote}
              </blockquote>
            </div>

            <figcaption className="pt-4 border-t border-white/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37] to-[#805ad5] text-[#0a0c10] font-bold flex items-center justify-center text-sm uppercase">
                {item.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-white group-hover:text-[#d4af37] transition-colors">
                  {item.name}
                </p>
                <p className="text-xs text-slate-400 font-light">{item.role}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
