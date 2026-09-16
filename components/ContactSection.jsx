'use client';

import { useState } from 'react';
import { Mail, Linkedin, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactSection({ contact = {}, profile = {} }) {
  const {
    tagline = "Contact",
    heading = "Let's build the next",
    headingHighlight = "growth chapter.",
    subtitle = "Open to leadership roles, consulting and collaborations in digital marketing, e-commerce operations and customer experience.",
    locationText = "Gulshan, Dhaka, Bangladesh",
    copyrightYear = 2026,
  } = contact;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        setStatus({ loading: false, success: true, error: null });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ loading: false, success: false, error: data.error || 'Failed to send message' });
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'Network error. Please try again.' });
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#121620]/60 border-t border-[#d4af37]/20 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37] mb-4">
            {tagline}
          </p>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
            {heading}{' '}
            <span className="text-gradient-gold font-display italic">
              {headingHighlight}
            </span>
          </h2>

          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-light">
            {subtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a
              href={`mailto:${profile.email || 'ashikur.rahman@example.com'}`}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#eab308] via-[#d4af37] to-[#ca8a04] text-[#0a0c10] font-bold hover:opacity-95 shadow-gold transition-all flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Email me</span>
            </a>

            <a
              href={profile.linkedin || 'https://www.linkedin.com'}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3.5 rounded-full border border-[#d4af37]/40 text-slate-200 hover:bg-[#181d2a] hover:border-[#d4af37] transition-all font-semibold flex items-center gap-2"
            >
              <Linkedin className="w-4 h-4 text-[#0077b5]" />
              <span>Connect on LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Interactive Contact Form */}
        <div className="bg-[#121620] border border-[#d4af37]/25 rounded-3xl p-8 md:p-10 shadow-2xl relative">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Send className="w-5 h-5 text-[#d4af37]" />
            <span>Send a Direct Message</span>
          </h3>

          {status.success && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
              <p className="text-sm font-medium">Thank you! Your message has been sent successfully. Ashikur will get back to you shortly.</p>
            </div>
          )}

          {status.error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
              <p className="text-sm font-medium">{status.error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Tanvir Ahmed"
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0c10] border border-[#d4af37]/20 text-white placeholder-slate-500 focus:outline-none focus:border-[#d4af37] transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0c10] border border-[#d4af37]/20 text-white placeholder-slate-500 focus:outline-none focus:border-[#d4af37] transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Project inquiry, consulting, or opportunity"
                className="w-full px-4 py-3 rounded-xl bg-[#0a0c10] border border-[#d4af37]/20 text-white placeholder-slate-500 focus:outline-none focus:border-[#d4af37] transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
                Message *
              </label>
              <textarea
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className="w-full px-4 py-3 rounded-xl bg-[#0a0c10] border border-[#d4af37]/20 text-white placeholder-slate-500 focus:outline-none focus:border-[#d4af37] transition-all text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status.loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#eab308] via-[#d4af37] to-[#ca8a04] text-[#0a0c10] font-bold text-base hover:opacity-95 shadow-gold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {status.loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-12 text-center text-sm text-slate-400 flex items-center justify-center gap-2">
          <MapPin className="w-4 h-4 text-[#d4af37]" />
          <span>{locationText}</span>
        </div>

        <footer className="mt-12 border-t border-white/5 pt-8 text-center text-xs text-slate-500 font-light">
          © {copyrightYear} {profile.name || 'Md. Ashikur Rahman'} · Crafted with care.
        </footer>
      </div>
    </section>
  );
}
