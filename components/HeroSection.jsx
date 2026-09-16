'use client';

import { ArrowRight, Sparkles, Building2, CheckCircle2 } from 'lucide-react';

export default function HeroSection({ profile }) {
  const {
    name = "Md. Ashikur Rahman",
    title = "Digital Marketing · E-Commerce",
    heroHeadingMain = "Md. Ashikur",
    heroHeadingHighlight = "Rahman",
    heroSubtitle = "Team Lead of Digital Marketing & E-Commerce Operations with 6+ years driving revenue growth, brand reach and customer experience for leading retail brands across Bangladesh.",
    currentPosition = "Team Lead @ iNFINITY Mega Mall",
    avatarUrl = "/uploads/profile-1789547923994.jpg",
    imagePosition = "center 65%",
  } = profile || {};

  return (
    <section id="top" className="relative pt-32 pb-24 overflow-hidden bg-[#0a0c10]" style={{ background: 'var(--gradient-hero)' }}>
      {/* Subtle Golden Ambient Light Rays Beam Overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] pointer-events-none opacity-25 overflow-hidden">
        <div 
          className="w-full h-full animate-pulse"
          style={{
            background: 'conic-gradient(from 180deg at 50% 0deg, transparent 38%, rgba(212, 175, 55, 0.3) 47%, transparent 51%, rgba(254, 240, 138, 0.25) 57%, transparent 63%)',
            filter: 'blur(25px)',
            animationDuration: '5s',
          }}
        />
      </div>

      {/* Crisp background radial gold dots pattern */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#d4af37 1.2px, transparent 1.2px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Elegant ambient gold glow spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#d4af37]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-[1.25fr_1fr] gap-12 items-center">
        {/* Left Column: Text & CTAs */}
        <div>
          {/* Live Availability Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#121620] border border-[#d4af37]/30 text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37] mb-6 shadow-sm backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
            <span>Available for Leadership & Consulting</span>
          </div>

          {/* Role Category Tagline */}
          <p className="text-xs uppercase tracking-[0.3em] font-medium text-slate-400 mb-3 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="text-[#d4af37] font-semibold">{title}</span>
          </p>

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
              className="px-7 py-3.5 rounded-full btn-shimmer text-[#0a0c10] font-bold text-sm hover:opacity-95 transition-all shadow-gold flex items-center gap-2 group"
            >
              <span>View Experience</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#contact"
              className="px-7 py-3.5 rounded-full border border-[#d4af37]/40 bg-[#121620]/80 text-white font-semibold text-sm hover:bg-[#181d2a] hover:border-[#d4af37] transition-all backdrop-blur"
            >
              Let's Collaborate
            </a>
          </div>
        </div>

        {/* Right Column: Hero Image & Floating Tag */}
        <div className="relative">
          {/* Subtle Ambient Glow behind Frame */}
          <div className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl bg-gradient-to-tr from-[#d4af37] via-[#fce09b] to-[#ca8a04]" />

          {/* Portrait Image Container */}
          <div className="relative rounded-3xl overflow-hidden border border-[#d4af37]/35 bg-[#121620] group" style={{ boxShadow: 'var(--shadow-elegant)' }}>
            <img
              src={avatarUrl}
              alt={name}
              className="w-full h-[520px] object-cover group-hover:scale-105 transition-all duration-700"
              style={{ objectPosition: imagePosition || 'center 65%' }}
            />

            {/* Floating Sleek Verified Badge Overlay */}
            <div className="absolute top-4 right-4 bg-[#0a0c10]/85 border border-[#d4af37]/40 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-semibold text-[#d4af37] shadow-xl">
              <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
              <span>Verified Team Lead</span>
            </div>
          </div>

          {/* Floating Status Card */}
          <div
            className="absolute -bottom-6 -left-4 md:-left-6 bg-[#121620]/95 border border-[#d4af37]/35 rounded-2xl p-4 backdrop-blur-xl flex items-center gap-3"
            style={{ boxShadow: 'var(--shadow-elegant)' }}
          >
            <div className="p-2.5 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#d4af37]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Currently</p>
              <p className="text-sm font-bold text-white">{currentPosition}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
