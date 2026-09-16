'use client';

import { useState } from 'react';
import { Menu, X, Send } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[#0a0c10]/80 border-b border-[#d4af37]/20 transition-all duration-300">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#top" className="font-display text-2xl font-bold tracking-tight text-white flex items-center gap-1 group">
          <span>Ashikur</span>
          <span className="text-gradient-gold font-extrabold group-hover:scale-125 transition-transform duration-300">.</span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#about" className="hover:text-[#d4af37] transition-colors">
            About
          </a>
          <a href="#services" className="hover:text-[#d4af37] transition-colors">
            Expertise
          </a>
          <a href="#experience" className="hover:text-[#d4af37] transition-colors">
            Experience
          </a>
          <a href="#testimonials" className="hover:text-[#d4af37] transition-colors">
            Praise
          </a>
          <a href="#contact" className="hover:text-[#d4af37] transition-colors">
            Contact
          </a>
        </div>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#eab308] via-[#d4af37] to-[#ca8a04] text-[#0a0c10] text-sm font-semibold hover:opacity-95 shadow-gold transition-all duration-200 flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Get in touch</span>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#d4af37]/20 bg-[#0a0c10]/95 backdrop-blur-xl px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-200 hover:text-[#d4af37] py-2 font-medium border-b border-white/5"
          >
            About
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-200 hover:text-[#d4af37] py-2 font-medium border-b border-white/5"
          >
            Expertise
          </a>
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-200 hover:text-[#d4af37] py-2 font-medium border-b border-white/5"
          >
            Experience
          </a>
          <a
            href="#testimonials"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-200 hover:text-[#d4af37] py-2 font-medium border-b border-white/5"
          >
            Praise
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-200 hover:text-[#d4af37] py-2 font-medium border-b border-white/5"
          >
            Contact
          </a>

          <div className="pt-2 flex flex-col gap-3">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 text-center rounded-full bg-[#d4af37] text-[#0a0c10] font-bold text-sm"
            >
              Get in touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
