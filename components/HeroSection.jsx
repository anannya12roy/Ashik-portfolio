'use client';

import { ArrowRight, Sparkles, Building2 } from 'lucide-react';

export default function HeroSection({ profile }) {
  const {
    name = "Md. Ashikur Rahman",
    title = "Digital Marketing · E-Commerce",
    heroHeadingMain = "Md. Ashikur",
    heroHeadingHighlight = "Rahman",
    heroSubtitle = "Team Lead of Digital Marketing & E-Commerce Operations with 6+ years driving revenue growth, brand reach and customer experience for leading retail brands across Bangladesh.",
    currentPosition = "Team Lead @ iNFINITY Mega Mall",
    avatarUrl = "/uploads/profile-1789547742882.jpg",
    imagePosition = "center 65%",
  } = profile || {};

  return (
    <section id="top" className="relative pt-32 pb-24 overflow-hidden bg-[#0a0c10]" style={{ background: 'var(--gradient-hero)' }}>
      {/* Background radial gold dots pattern */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#d4af37 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-[1.2fr_1fr] gap-12 items-center">
        {/* Left Column: Text & CTAs */}
        <div>
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#121620] border border-[#d4af37]/30 text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37] mb-6">
            <span className="w-5 h-px bg-[#d4af37]" />
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{title}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6 text-white font-display">
            {heroHeadingMain}{' '}
            <span className="text-gradient-gold block md:inline font-display font-bold">
              {heroHeadingHighlight}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed mb-8 font-light">
            {heroSubtitle}
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <a
              href="#experience"
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#eab308] via-[#d4af37] to-[#ca8a04] text-[#0a0c10] font-bold hover:opacity-95 transition-all shadow-gold flex items-center gap-2"
            >
              <span>View Experience</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            
            <a
              href="#contact"
              className="px-7 py-3.5 rounded-full border border-[#d4af37]/40 bg-[#121620]/60 text-white font-medium hover:bg-[#181d2a] hover:border-[#d4af37] transition-all backdrop-blur"
            >
              Let's Collaborate
            </a>
          </div>
        </div>

        {/* Right Column: Hero Image & Floating Tag */}
        <div className="relative">
          {/* Gold Glow Behind Frame */}
          <div className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl bg-gradient-to-tr from-[#d4af37] to-[#fce09b]" />

          {/* Portrait Image Container */}
          <div className="relative rounded-3xl overflow-hidden border border-[#d4af37]/30 bg-[#121620]" style={{ boxShadow: 'var(--shadow-elegant)' }}>
            <img
              src={avatarUrl}
              alt={name}
              className="w-full h-[520px] object-cover hover:scale-105 transition-all duration-700"
              style={{ objectPosition: imagePosition || 'center 65%' }}
            />
          </div>

          {/* Floating Status Card */}
          <div
            className="absolute -bottom-6 -left-4 md:-left-6 bg-[#121620]/90 border border-[#d4af37]/30 rounded-2xl p-4 backdrop-blur-xl flex items-center gap-3"
            style={{ boxShadow: 'var(--shadow-elegant)' }}
          >
            <div className="p-2.5 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#d4af37]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Currently</p>
              <p className="text-sm font-semibold text-white">{currentPosition}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
