'use client';

export default function AboutSection({ about = {} }) {
  const {
    tagline = "About",
    heading = "Turning data, creativity & operations into",
    headingHighlight = "measurable growth.",
    bioParagraph1,
    bioParagraph2,
    brands = [],
  } = about;

  return (
    <section id="about" className="py-24 max-w-6xl mx-auto px-6 relative">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37] mb-4 flex items-center gap-2">
        <span className="w-6 h-px bg-[#d4af37]" />
        {tagline}
      </p>

      <h2 className="text-4xl md:text-5xl font-bold mb-8 max-w-3xl text-white font-sans leading-tight">
        {heading}{' '}
        <span className="text-gradient-gold font-display italic">
          {headingHighlight}
        </span>
      </h2>

      <div className="grid md:grid-cols-2 gap-10 text-slate-300 text-base md:text-lg leading-relaxed font-light">
        <p>{bioParagraph1}</p>
        <p>{bioParagraph2}</p>
      </div>

      {/* Brand Pills */}
      {brands && brands.length > 0 && (
        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-4 font-medium">Brands & Companies Collaborated With:</p>
          <div className="flex flex-wrap gap-3">
            {brands.map((brand, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-full border border-[#d4af37]/25 bg-[#121620] text-xs md:text-sm font-medium text-slate-300 hover:border-[#d4af37] hover:text-[#d4af37] hover:bg-[#181d2a] transition-all cursor-default"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
