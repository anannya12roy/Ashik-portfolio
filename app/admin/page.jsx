'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Lock,
  Mail,
  Shield,
  LogOut,
  Save,
  Check,
  AlertCircle,
  User,
  BarChart,
  FileText,
  Briefcase,
  Wrench,
  Quote,
  MessageSquare,
  Plus,
  Trash2,
  ArrowLeft,
  Loader2,
  RefreshCw,
  Upload,
} from 'lucide-react';
import { initialPortfolioData } from '@/lib/portfolioData';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState(null);
  const [loggingIn, setLoggingIn] = useState(false);

  // Portfolio CMS Data
  const [formData, setFormData] = useState(initialPortfolioData);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Fetch portfolio data on load
  useEffect(() => {
    fetch('/api/portfolio')
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setFormData(res.data);
        }
      })
      .catch((err) => console.error('Failed to load portfolio data:', err));
  }, []);

  // Fetch messages when authenticated or switching to messages tab
  useEffect(() => {
    if (isAuthenticated && activeTab === 'messages') {
      fetchMessages();
    }
  }, [isAuthenticated, activeTab]);

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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });

      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
      } else {
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setLoginError('Network error. Please try again.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleSaveAll = async () => {
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
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        setSaveError(data.error || 'Failed to save changes');
      }
    } catch (err) {
      setSaveError('Network error while publishing changes');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });
      const result = await res.json();
      if (result.success && result.url) {
        updateProfile('avatarUrl', result.url);
      } else {
        alert(result.error || 'Failed to upload image');
      }
    } catch (err) {
      alert('Upload error: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  // Helper change handlers
  const updateProfile = (field, val) => {
    setFormData((prev) => ({
      ...prev,
      profile: { ...prev.profile, [field]: val },
    }));
  };

  const updateAbout = (field, val) => {
    setFormData((prev) => ({
      ...prev,
      about: { ...prev.about, [field]: val },
    }));
  };

  const updateStat = (index, field, val) => {
    const updated = [...(formData.stats || [])];
    updated[index] = { ...updated[index], [field]: val };
    setFormData((prev) => ({ ...prev, stats: updated }));
  };

  // Expertise Card Handlers
  const addExpertiseItem = () => {
    const newItem = {
      id: 'exp-' + Date.now(),
      icon: '◈',
      title: 'New Skill Category',
      description: 'Describe the expertise category details...',
    };
    setFormData((prev) => ({
      ...prev,
      expertise: [...(prev.expertise || []), newItem],
    }));
  };

  const updateExpertiseItem = (idx, field, val) => {
    const updated = [...(formData.expertise || [])];
    updated[idx] = { ...updated[idx], [field]: val };
    setFormData((prev) => ({ ...prev, expertise: updated }));
  };

  const deleteExpertiseItem = (idx) => {
    const updated = formData.expertise.filter((_, i) => i !== idx);
    setFormData((prev) => ({ ...prev, expertise: updated }));
  };

  // Experience Card Handlers
  const addExperienceItem = () => {
    const newItem = {
      id: 'job-' + Date.now(),
      period: '2024 – Present · Dhaka',
      company: 'Company Name',
      role: 'Role Title',
      bullets: ['Key responsibility or accomplishment description.'],
    };
    setFormData((prev) => ({
      ...prev,
      experiences: [...(prev.experiences || []), newItem],
    }));
  };

  const updateExperienceItem = (idx, field, val) => {
    const updated = [...(formData.experiences || [])];
    updated[idx] = { ...updated[idx], [field]: val };
    setFormData((prev) => ({ ...prev, experiences: updated }));
  };

  const updateExperienceBullet = (expIdx, bulletIdx, val) => {
    const updated = [...(formData.experiences || [])];
    const newBullets = [...updated[expIdx].bullets];
    newBullets[bulletIdx] = val;
    updated[expIdx] = { ...updated[expIdx], bullets: newBullets };
    setFormData((prev) => ({ ...prev, experiences: updated }));
  };

  const addExperienceBullet = (expIdx) => {
    const updated = [...(formData.experiences || [])];
    updated[expIdx] = {
      ...updated[expIdx],
      bullets: [...updated[expIdx].bullets, 'New bullet accomplishment'],
    };
    setFormData((prev) => ({ ...prev, experiences: updated }));
  };

  const deleteExperienceItem = (idx) => {
    const updated = formData.experiences.filter((_, i) => i !== idx);
    setFormData((prev) => ({ ...prev, experiences: updated }));
  };

  // Testimonials Handlers
  const addTestimonialItem = () => {
    const newItem = {
      id: 'test-' + Date.now(),
      quote: 'Add recommendation quote text...',
      name: 'Person Name',
      role: 'Role & Designation',
    };
    setFormData((prev) => ({
      ...prev,
      testimonials: [...(prev.testimonials || []), newItem],
    }));
  };

  const updateTestimonialItem = (idx, field, val) => {
    const updated = [...(formData.testimonials || [])];
    updated[idx] = { ...updated[idx], [field]: val };
    setFormData((prev) => ({ ...prev, testimonials: updated }));
  };

  const deleteTestimonialItem = (idx) => {
    const updated = formData.testimonials.filter((_, i) => i !== idx);
    setFormData((prev) => ({ ...prev, testimonials: updated }));
  };

  // -------------------------------------------------------------
  // RENDER: LOGIN FORM VIEW
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0c10] text-white flex flex-col items-center justify-center p-6 relative">
        <Link
          href="/"
          className="absolute top-8 left-8 text-xs font-semibold text-slate-400 hover:text-[#d4af37] flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="w-full max-w-md bg-[#121620] border border-[#d4af37]/30 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] mx-auto flex items-center justify-center">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin CMS Login</h1>
            <p className="text-xs text-slate-400">
              Sign in with your administrator credentials to dynamically manage your portfolio.
            </p>
          </div>

          {loginError && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
                <input
                  type="email"
                  required
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  placeholder="admin@gmail.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0a0c10] border border-[#d4af37]/20 text-white placeholder-slate-500 focus:outline-none focus:border-[#d4af37] text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
                <input
                  type="password"
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0a0c10] border border-[#d4af37]/20 text-white placeholder-slate-500 focus:outline-none focus:border-[#d4af37] text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#eab308] via-[#d4af37] to-[#ca8a04] text-[#0a0c10] font-bold text-sm hover:opacity-95 shadow-gold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <span>Log In to Dashboard</span>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: LOGGED IN ADMIN DASHBOARD VIEW
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#0a0c10] text-[#f0f2f5] flex flex-col">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#121620]/95 backdrop-blur border-b border-[#d4af37]/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#d4af37]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-none">Portfolio Admin CMS</h1>
            <p className="text-xs text-slate-400 mt-0.5">Logged in as admin@gmail.com</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xs font-semibold text-slate-300 hover:text-[#d4af37] transition-colors"
          >
            View Live Site
          </Link>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 rounded-full border border-rose-500/30 text-rose-300 text-xs font-semibold hover:bg-rose-500/10 transition-all flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Action Notification Banner */}
      {saveSuccess && (
        <div className="bg-emerald-500/15 border-b border-emerald-500/30 px-6 py-3 text-emerald-300 text-sm flex items-center justify-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>All portfolio updates have been saved and published dynamically!</span>
        </div>
      )}

      {saveError && (
        <div className="bg-rose-500/15 border-b border-rose-500/30 px-6 py-3 text-rose-300 text-sm flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400" />
          <span>{saveError}</span>
        </div>
      )}

      {/* Main Dashboard Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 grid lg:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar Nav Tabs */}
        <aside className="space-y-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-3 transition-all ${
              activeTab === 'profile'
                ? 'bg-[#d4af37] text-[#0a0c10] font-bold shadow-gold'
                : 'bg-[#121620] text-slate-300 hover:text-white border border-white/5'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Links</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-3 transition-all ${
              activeTab === 'stats'
                ? 'bg-[#d4af37] text-[#0a0c10] font-bold shadow-gold'
                : 'bg-[#121620] text-slate-300 hover:text-white border border-white/5'
            }`}
          >
            <BarChart className="w-4 h-4" />
            <span>Stats Counters</span>
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-3 transition-all ${
              activeTab === 'about'
                ? 'bg-[#d4af37] text-[#0a0c10] font-bold shadow-gold'
                : 'bg-[#121620] text-slate-300 hover:text-white border border-white/5'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>About Bio</span>
          </button>

          <button
            onClick={() => setActiveTab('expertise')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-3 transition-all ${
              activeTab === 'expertise'
                ? 'bg-[#d4af37] text-[#0a0c10] font-bold shadow-gold'
                : 'bg-[#121620] text-slate-300 hover:text-white border border-white/5'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Expertise Cards</span>
          </button>

          <button
            onClick={() => setActiveTab('experience')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-3 transition-all ${
              activeTab === 'experience'
                ? 'bg-[#d4af37] text-[#0a0c10] font-bold shadow-gold'
                : 'bg-[#121620] text-slate-300 hover:text-white border border-white/5'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Career Timeline</span>
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-3 transition-all ${
              activeTab === 'testimonials'
                ? 'bg-[#d4af37] text-[#0a0c10] font-bold shadow-gold'
                : 'bg-[#121620] text-slate-300 hover:text-white border border-white/5'
            }`}
          >
            <Quote className="w-4 h-4" />
            <span>Recommendations</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-3 transition-all ${
              activeTab === 'messages'
                ? 'bg-[#d4af37] text-[#0a0c10] font-bold shadow-gold'
                : 'bg-[#121620] text-slate-300 hover:text-white border border-white/5'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Visitor Messages</span>
          </button>

          {/* Quick Publish Save Button */}
          <div className="pt-6">
            <button
              onClick={handleSaveAll}
              disabled={saving}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#eab308] via-[#d4af37] to-[#ca8a04] text-[#0a0c10] font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-gold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Publish Changes</span>
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="bg-[#121620] border border-[#d4af37]/20 rounded-3xl p-8 shadow-xl">
          {/* TAB 1: PROFILE & HERO */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3">Profile & Contact Links</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.profile?.name || ''}
                    onChange={(e) => updateProfile('name', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0c10] border border-[#d4af37]/20 text-[#d4af37] font-bold text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">Role Tagline</label>
                  <input
                    type="text"
                    value={formData.profile?.title || ''}
                    onChange={(e) => updateProfile('title', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0c10] border border-[#d4af37]/20 text-white text-sm"
                  />
                </div>
              </div>

              {/* Email & LinkedIn URLs */}
              <div className="grid md:grid-cols-2 gap-6 p-4 rounded-2xl bg-[#0a0c10] border border-[#d4af37]/30">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">Email Address (Email me button)</label>
                  <input
                    type="email"
                    value={formData.profile?.email || ''}
                    onChange={(e) => updateProfile('email', e.target.value)}
                    placeholder="ashikur.rahman@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#121620] border border-white/10 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">LinkedIn Profile URL (Connect on LinkedIn button)</label>
                  <input
                    type="text"
                    value={formData.profile?.linkedin || ''}
                    onChange={(e) => updateProfile('linkedin', e.target.value)}
                    placeholder="https://www.linkedin.com/in/ashikur-rahman"
                    className="w-full px-4 py-3 rounded-xl bg-[#121620] border border-white/10 text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">Hero Main Name</label>
                  <input
                    type="text"
                    value={formData.profile?.heroHeadingMain || ''}
                    onChange={(e) => updateProfile('heroHeadingMain', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0c10] border border-[#d4af37]/20 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">Hero Highlight Name</label>
                  <input
                    type="text"
                    value={formData.profile?.heroHeadingHighlight || ''}
                    onChange={(e) => updateProfile('heroHeadingHighlight', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0c10] border border-[#d4af37]/20 text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">Hero Subtitle Narrative</label>
                <textarea
                  rows={3}
                  value={formData.profile?.heroSubtitle || ''}
                  onChange={(e) => updateProfile('heroSubtitle', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0c10] border border-[#d4af37]/20 text-white text-sm resize-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">Current Position Tag</label>
                  <input
                    type="text"
                    value={formData.profile?.currentPosition || ''}
                    onChange={(e) => updateProfile('currentPosition', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0c10] border border-[#d4af37]/20 text-white text-sm"
                  />
                </div>

                {/* Profile Image Upload & Preview */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">Profile Image</label>
                  <div className="bg-[#0a0c10] p-4 rounded-xl border border-[#d4af37]/20 space-y-3">
                    <div className="flex items-center gap-4">
                      {formData.profile?.avatarUrl && (
                        <img
                          src={formData.profile.avatarUrl}
                          alt="Profile Preview"
                          className="w-16 h-16 rounded-xl object-cover border border-[#d4af37]/40 shrink-0"
                        />
                      )}
                      <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#d4af37] text-[#0a0c10] text-xs font-bold hover:opacity-95 transition-all shadow-gold">
                        {uploadingImage ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Uploading...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" />
                            <span>Upload Image File</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploadingImage}
                        />
                      </label>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block mb-1">Image URL Path</span>
                      <input
                        type="text"
                        value={formData.profile?.avatarUrl || ''}
                        onChange={(e) => updateProfile('avatarUrl', e.target.value)}
                        placeholder="https://... or /uploads/..."
                        className="w-full px-3 py-2 rounded-lg bg-[#121620] border border-white/10 text-white text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STATS */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3">Statistics Counters</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {(formData.stats || []).map((stat, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-[#0a0c10] border border-white/10 space-y-3">
                    <p className="text-xs font-semibold text-[#d4af37]">Metric Counter #{idx + 1}</p>
                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 mb-1">Value (e.g. 6+)</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => updateStat(idx, 'value', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#121620] border border-white/10 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 mb-1">Label Text</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => updateStat(idx, 'label', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#121620] border border-white/10 text-white text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ABOUT */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3">About Narrative</h2>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">Heading Main Text</label>
                <input
                  type="text"
                  value={formData.about?.heading || ''}
                  onChange={(e) => updateAbout('heading', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0c10] border border-[#d4af37]/20 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">Heading Highlighted Text</label>
                <input
                  type="text"
                  value={formData.about?.headingHighlight || ''}
                  onChange={(e) => updateAbout('headingHighlight', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0c10] border border-[#d4af37]/20 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">Bio Paragraph 1</label>
                <textarea
                  rows={4}
                  value={formData.about?.bioParagraph1 || ''}
                  onChange={(e) => updateAbout('bioParagraph1', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0c10] border border-[#d4af37]/20 text-white text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">Bio Paragraph 2</label>
                <textarea
                  rows={4}
                  value={formData.about?.bioParagraph2 || ''}
                  onChange={(e) => updateAbout('bioParagraph2', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0c10] border border-[#d4af37]/20 text-white text-sm resize-none"
                />
              </div>
            </div>
          )}

          {/* TAB 4: EXPERTISE CARDS */}
          {activeTab === 'expertise' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h2 className="text-xl font-bold text-white">Expertise Categories</h2>
                <button
                  onClick={addExpertiseItem}
                  className="px-4 py-2 rounded-xl bg-[#d4af37] text-[#0a0c10] text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Category
                </button>
              </div>

              <div className="space-y-4">
                {(formData.expertise || []).map((item, idx) => (
                  <div key={item.id || idx} className="p-5 rounded-2xl bg-[#0a0c10] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#d4af37]">Category #{idx + 1}</span>
                      <button
                        onClick={() => deleteExpertiseItem(idx)}
                        className="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-[80px_1fr] gap-4">
                      <div>
                        <label className="block text-[10px] uppercase text-slate-400 mb-1">Symbol</label>
                        <input
                          type="text"
                          value={item.icon}
                          onChange={(e) => updateExpertiseItem(idx, 'icon', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#121620] border border-white/10 text-white text-center text-sm font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase text-slate-400 mb-1">Title</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => updateExpertiseItem(idx, 'title', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#121620] border border-white/10 text-white text-sm font-semibold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) => updateExpertiseItem(idx, 'description', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#121620] border border-white/10 text-white text-sm resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CAREER TIMELINE */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h2 className="text-xl font-bold text-white">Career Timeline Roles</h2>
                <button
                  onClick={addExperienceItem}
                  className="px-4 py-2 rounded-xl bg-[#d4af37] text-[#0a0c10] text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Role
                </button>
              </div>

              <div className="space-y-6">
                {(formData.experiences || []).map((exp, expIdx) => (
                  <div key={exp.id || expIdx} className="p-5 rounded-2xl bg-[#0a0c10] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#d4af37]">Position #{expIdx + 1}</span>
                      <button
                        onClick={() => deleteExperienceItem(expIdx)}
                        className="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase text-slate-400 mb-1">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperienceItem(expIdx, 'company', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#121620] border border-white/10 text-white text-sm font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase text-slate-400 mb-1">Role Title</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => updateExperienceItem(expIdx, 'role', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#121620] border border-white/10 text-white text-sm font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase text-slate-400 mb-1">Period & Location</label>
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) => updateExperienceItem(expIdx, 'period', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#121620] border border-white/10 text-white text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-[10px] uppercase text-slate-400">Bullets / Accomplishments</label>
                        <button
                          onClick={() => addExperienceBullet(expIdx)}
                          className="text-[10px] text-[#d4af37] hover:underline"
                        >
                          + Add Bullet
                        </button>
                      </div>

                      <div className="space-y-2">
                        {exp.bullets.map((b, bIdx) => (
                          <input
                            key={bIdx}
                            type="text"
                            value={b}
                            onChange={(e) => updateExperienceBullet(expIdx, bIdx, e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-[#121620] border border-white/10 text-white text-xs"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: RECOMMENDATIONS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h2 className="text-xl font-bold text-white">Recommendations</h2>
                <button
                  onClick={addTestimonialItem}
                  className="px-4 py-2 rounded-xl bg-[#d4af37] text-[#0a0c10] text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Recommendation
                </button>
              </div>

              <div className="space-y-4">
                {(formData.testimonials || []).map((test, idx) => (
                  <div key={test.id || idx} className="p-5 rounded-2xl bg-[#0a0c10] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#d4af37]">Recommendation #{idx + 1}</span>
                      <button
                        onClick={() => deleteTestimonialItem(idx)}
                        className="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase text-slate-400 mb-1">Author Name</label>
                        <input
                          type="text"
                          value={test.name}
                          onChange={(e) => updateTestimonialItem(idx, 'name', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#121620] border border-white/10 text-white text-sm font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase text-slate-400 mb-1">Role / Designation</label>
                        <input
                          type="text"
                          value={test.role}
                          onChange={(e) => updateTestimonialItem(idx, 'role', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#121620] border border-white/10 text-white text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 mb-1">Quote</label>
                      <textarea
                        rows={3}
                        value={test.quote}
                        onChange={(e) => updateTestimonialItem(idx, 'quote', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#121620] border border-white/10 text-white text-sm resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: VISITOR MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h2 className="text-xl font-bold text-white">Received Visitor Messages</h2>
                <button
                  onClick={fetchMessages}
                  className="text-xs text-[#d4af37] hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Refresh List
                </button>
              </div>

              {messages.length === 0 ? (
                <div className="p-12 text-center border border-white/5 rounded-2xl bg-[#0a0c10] text-slate-400 text-sm">
                  No message submissions received yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className="p-5 rounded-2xl bg-[#0a0c10] border border-[#d4af37]/20 space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="font-bold text-white">{msg.name} ({msg.email})</span>
                        <span>{new Date(msg.createdAt).toLocaleString()}</span>
                      </div>
                      {msg.subject && <p className="text-xs font-semibold text-[#d4af37]">Subject: {msg.subject}</p>}
                      <p className="text-sm text-slate-300 leading-relaxed bg-[#121620] p-4 rounded-xl border border-white/5">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
