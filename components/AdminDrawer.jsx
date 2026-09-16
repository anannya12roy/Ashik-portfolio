'use client';

import { useState, useEffect } from 'react';
import { X, Save, RefreshCw, MessageSquare, User, BarChart, FileText, Check, AlertCircle } from 'lucide-react';

export default function AdminDrawer({ isOpen, onClose, portfolioData, onSaveSuccess }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState(portfolioData || {});
  const [messages, setMessages] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    if (portfolioData) {
      setFormData(portfolioData);
    }
  }, [portfolioData]);

  useEffect(() => {
    if (isOpen && activeTab === 'messages') {
      fetchMessages();
    }
  }, [isOpen, activeTab]);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (data.success) {
        setMessages(data.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  };

  if (!isOpen) return null;

  const handleProfileChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value,
      },
    }));
  };

  const handleAboutChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        [field]: value,
      },
    }));
  };

  const handleStatChange = (index, field, value) => {
    const updatedStats = [...(formData.stats || [])];
    updatedStats[index] = { ...updatedStats[index], [field]: value };
    setFormData((prev) => ({ ...prev, stats: updatedStats }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveSuccess(false);
    setSaveError(null);

    try {
      const res = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setSaveSuccess(true);
        onSaveSuccess(data.data);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setSaveError(data.error || 'Failed to save');
      }
    } catch (err) {
      setSaveError('Network error while saving');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#0a0c10] border-l border-[#d4af37]/30 h-full flex flex-col shadow-2xl">
        {/* Top Bar */}
        <div className="p-6 border-b border-[#d4af37]/20 flex items-center justify-between bg-[#121620]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">CMS Manager</span>
            <h2 className="text-xl font-bold text-white">Dynamic Portfolio Admin</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full border border-white/10 hover:border-[#d4af37] text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-[#0a0c10] px-6 pt-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-3 text-xs uppercase tracking-wider font-semibold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'profile'
                ? 'border-[#d4af37] text-[#d4af37]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Hero</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-3 text-xs uppercase tracking-wider font-semibold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'stats'
                ? 'border-[#d4af37] text-[#d4af37]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart className="w-4 h-4" />
            <span>Stats</span>
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`px-4 py-3 text-xs uppercase tracking-wider font-semibold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'about'
                ? 'border-[#d4af37] text-[#d4af37]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>About</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-3 text-xs uppercase tracking-wider font-semibold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'messages'
                ? 'border-[#d4af37] text-[#d4af37]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Inquiries</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {saveSuccess && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-medium">Portfolio changes saved dynamically!</span>
            </div>
          )}

          {saveError && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-400" />
              <span className="text-sm font-medium">{saveError}</span>
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.profile?.name || ''}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121620] border border-[#d4af37]/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Tagline Title</label>
                <input
                  type="text"
                  value={formData.profile?.title || ''}
                  onChange={(e) => handleProfileChange('title', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121620] border border-[#d4af37]/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Hero Main Name</label>
                  <input
                    type="text"
                    value={formData.profile?.heroHeadingMain || ''}
                    onChange={(e) => handleProfileChange('heroHeadingMain', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#121620] border border-[#d4af37]/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Hero Highlight Name</label>
                  <input
                    type="text"
                    value={formData.profile?.heroHeadingHighlight || ''}
                    onChange={(e) => handleProfileChange('heroHeadingHighlight', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#121620] border border-[#d4af37]/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Hero Subtitle Narrative</label>
                <textarea
                  rows={3}
                  value={formData.profile?.heroSubtitle || ''}
                  onChange={(e) => handleProfileChange('heroSubtitle', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121620] border border-[#d4af37]/20 text-white text-sm focus:border-[#d4af37] focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Current Position Tag</label>
                <input
                  type="text"
                  value={formData.profile?.currentPosition || ''}
                  onChange={(e) => handleProfileChange('currentPosition', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121620] border border-[#d4af37]/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Profile Image URL</label>
                <input
                  type="text"
                  value={formData.profile?.avatarUrl || ''}
                  onChange={(e) => handleProfileChange('avatarUrl', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121620] border border-[#d4af37]/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* STATS TAB */}
          {activeTab === 'stats' && (
            <div className="space-y-4">
              {(formData.stats || []).map((stat, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#121620] border border-white/5 space-y-3">
                  <p className="text-xs font-semibold text-[#d4af37]">Stat #{idx + 1}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 mb-1">Value</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#0a0c10] border border-white/10 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 mb-1">Label</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#0a0c10] border border-white/10 text-white text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ABOUT TAB */}
          {activeTab === 'about' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">About Heading</label>
                <input
                  type="text"
                  value={formData.about?.heading || ''}
                  onChange={(e) => handleAboutChange('heading', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121620] border border-[#d4af37]/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">About Heading Highlight</label>
                <input
                  type="text"
                  value={formData.about?.headingHighlight || ''}
                  onChange={(e) => handleAboutChange('headingHighlight', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121620] border border-[#d4af37]/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Bio Paragraph 1</label>
                <textarea
                  rows={4}
                  value={formData.about?.bioParagraph1 || ''}
                  onChange={(e) => handleAboutChange('bioParagraph1', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121620] border border-[#d4af37]/20 text-white text-sm focus:border-[#d4af37] focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Bio Paragraph 2</label>
                <textarea
                  rows={4}
                  value={formData.about?.bioParagraph2 || ''}
                  onChange={(e) => handleAboutChange('bioParagraph2', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121620] border border-[#d4af37]/20 text-white text-sm focus:border-[#d4af37] focus:outline-none resize-none"
                />
              </div>
            </div>
          )}

          {/* INQUIRIES TAB */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">Received contact form submissions:</p>
                <button
                  onClick={fetchMessages}
                  className="text-xs text-[#d4af37] hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Refresh
                </button>
              </div>

              {messages.length === 0 ? (
                <div className="p-8 text-center border border-white/5 rounded-2xl bg-[#121620] text-slate-400 text-sm">
                  No message submissions received yet.
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className="p-5 rounded-xl bg-[#121620] border border-[#d4af37]/20 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-semibold text-white">{msg.name} ({msg.email})</span>
                      <span>{new Date(msg.createdAt).toLocaleString()}</span>
                    </div>
                    {msg.subject && <p className="text-xs font-semibold text-[#d4af37]">Subject: {msg.subject}</p>}
                    <p className="text-sm text-slate-300 leading-relaxed bg-[#0a0c10] p-3 rounded-lg border border-white/5">
                      {msg.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer Save Button */}
        {activeTab !== 'messages' && (
          <div className="p-6 border-t border-[#d4af37]/20 bg-[#121620]">
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#eab308] via-[#d4af37] to-[#ca8a04] text-[#0a0c10] font-bold text-sm hover:opacity-95 shadow-gold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {saving ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>Save & Publish Changes</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
