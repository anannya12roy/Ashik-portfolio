'use client';

import { Award, GraduationCap, Wrench } from 'lucide-react';

export default function ToolkitSection({ skills = [], credentials = [] }) {
  return (
    <section className="py-24 bg-[#121620]/40 border-y border-[#d4af37]/20 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
        {/* Left Column: Skills */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37] mb-4 flex items-center gap-2">
            <Wrench className="w-3.5 h-3.5" />
            Toolkit
          </p>

          <h2 className="text-4xl font-bold mb-8 text-white">Skills</h2>

          <div className="flex flex-wrap gap-2.5">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-lg bg-[#121620] text-slate-200 text-sm border border-[#d4af37]/20 hover:border-[#d4af37]/60 hover:text-[#d4af37] transition-all cursor-default font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Credentials */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37] mb-4 flex items-center gap-2">
            <Award className="w-3.5 h-3.5" />
            Credentials
          </p>

          <h2 className="text-4xl font-bold mb-8 text-white">Certifications & Education</h2>

          <div className="space-y-4">
            {credentials.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-xl bg-[#121620] border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all flex items-start gap-4"
              >
                <div className="p-3 rounded-lg bg-[#d4af37]/10 text-[#d4af37] mt-1 shrink-0">
                  {item.title.includes('Bachelor') ? (
                    <GraduationCap className="w-5 h-5" />
                  ) : (
                    <Award className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <p className="text-xs text-[#d4af37] font-semibold">{item.date}</p>
                  <h3 className="font-semibold text-lg text-white mt-1">{item.title}</h3>
                  <p className="text-sm text-slate-400 mt-0.5">{item.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
