import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Mail, Phone, MapPin, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ContactSectionProps {
  initialProjectType?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialProjectType }) => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    projectType: initialProjectType || 'Software Development',
    estimatedBudget: '$25,000 - $50,000',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ referenceCode: string; message: string } | null>(null);

  // Update projectType if passed from service selection
  React.useEffect(() => {
    if (initialProjectType) {
      setFormData((prev) => ({ ...prev, projectType: initialProjectType }));
    }
  }, [initialProjectType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      setError(language === 'ar' ? 'يرجى إدخال اسمك بالكامل.' : 'Please provide your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setError(
        language === 'ar'
          ? 'يرجى تقديم بريد إلكتروني صالح للعمل أو التواصل.'
          : 'Please provide a valid corporate or personal email address.'
      );
      return;
    }

    if (!formData.description.trim() || formData.description.trim().length < 15) {
      setError(
        language === 'ar'
          ? 'يرجى وصف متطلبات مشروعك بـ 15 حرفاً على الأقل.'
          : 'Please provide a project description of at least 15 characters.'
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.error || (language === 'ar' ? 'فشل في إرسال طلب المشروع.' : 'Failed to submit inquiry.')
        );
      }

      setSuccessData({
        referenceCode: data.referenceCode,
        message:
          language === 'ar'
            ? 'تم استلام طلبك وتشفيره بنجاح. سيقوم مهندسو المعمارية بمراجعة المواصفات والرد عليك خلال 24 ساعة.'
            : data.message,
      });

      // Clear form
      setFormData({
        fullName: '',
        email: '',
        company: '',
        projectType: 'Software Development',
        estimatedBudget: '$25,000 - $50,000',
        description: '',
      });
    } catch (err: any) {
      setError(
        err.message ||
          (language === 'ar'
            ? 'تعذر الإرسال. يرجى التحقق من اتصال الشبكة.'
            : 'Transmission failed. Please check network connection.')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 bg-[#050505] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-[#8B0000]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF1E2D]">
            <span className="w-1.5 h-1.5 bg-[#FF1E2D]" />
            {t.contact.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight">
            {t.contact.titleMain} <br />
            <span className="text-[#FF1E2D]">{t.contact.titleHighlight}</span>
          </h2>
          <p className="text-sm sm:text-base font-mono text-[#858585] max-w-xl mx-auto">
            {t.contact.intro}
          </p>
        </div>

        {/* Content Grid: Form on Left, Contact Metadata on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Functional Inquiry Form */}
          <div className="lg:col-span-7 rounded-2xl bg-[#0A0A0A] border-2 border-[#221214] p-8 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative">
            {successData ? (
              <div className="py-12 px-6 text-center space-y-6 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-[#110507] border-2 border-[#FF1E2D] flex items-center justify-center mx-auto text-[#FF1E2D] shadow-[0_0_30px_rgba(255,30,45,0.4)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#858585] uppercase tracking-wider block font-bold">
                    {t.contact.successEyebrow}
                  </span>
                  <h3 className="text-2xl font-display font-black uppercase text-white">
                    {t.contact.successTitle}
                  </h3>
                  <div className="inline-block px-4 py-2 rounded-lg bg-[#050505] border border-[#FF1E2D]/50 font-mono text-sm text-[#FF1E2D] font-bold mt-2">
                    {t.contact.referenceLabel} {successData.referenceCode}
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-sans text-[#B5B5B5] max-w-md mx-auto leading-relaxed">
                  {successData.message}
                </p>

                <button
                  onClick={() => setSuccessData(null)}
                  className="px-6 py-3 rounded-lg bg-[#050505] border border-[#450000] text-xs font-mono font-bold uppercase tracking-wider text-white hover:border-[#FF1E2D] transition-colors cursor-pointer"
                >
                  {t.contact.anotherInquiry}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-left rtl:text-right">
                {/* Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#B5B5B5] mb-2 font-semibold">
                      {t.contact.fullName} <span className="text-[#FF1E2D]">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder={language === 'ar' ? 'مثال: محمد العمري' : 'e.g. Elena Rostova'}
                      className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-[#221214] text-white text-xs font-mono focus:outline-none focus:border-[#FF1E2D] transition-colors placeholder:text-[#555555] text-left rtl:text-right"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#B5B5B5] mb-2 font-semibold">
                      {t.contact.email} <span className="text-[#FF1E2D]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="elena@enterprise.io"
                      className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-[#221214] text-white text-xs font-mono focus:outline-none focus:border-[#FF1E2D] transition-colors placeholder:text-[#555555] text-left rtl:text-right"
                      required
                    />
                  </div>
                </div>

                {/* Company & Project Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#B5B5B5] mb-2 font-semibold">
                      {t.contact.company} <span className="text-[#858585] text-[10px] font-normal">{t.contact.optional}</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={language === 'ar' ? 'مثال: شركة الحلول المتقدمة' : 'e.g. Apex Systems Ltd'}
                      className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-[#221214] text-white text-xs font-mono focus:outline-none focus:border-[#FF1E2D] transition-colors placeholder:text-[#555555] text-left rtl:text-right"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#B5B5B5] mb-2 font-semibold">
                      {t.contact.projectCategory} <span className="text-[#FF1E2D]">*</span>
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-[#221214] text-[#F5F5F5] text-xs font-mono focus:outline-none focus:border-[#FF1E2D] transition-colors text-left rtl:text-right"
                    >
                      <option value="Software Development">01 — Software Development</option>
                      <option value="AI & Machine Learning">02 — AI & Machine Learning</option>
                      <option value="Web Design & Development">03 — Web Design & Development</option>
                      <option value="Mobile App Development">04 — Mobile App Development</option>
                      <option value="UI/UX Design">05 — UI/UX Design</option>
                      <option value="Cloud & Digital Solutions">06 — Cloud & Digital Solutions</option>
                      <option value="Complete Custom Platform">07 — Complete Custom Platform</option>
                    </select>
                  </div>
                </div>

                {/* Estimated Budget */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#B5B5B5] mb-2 font-semibold">
                    {t.contact.estimatedBudget} <span className="text-[#858585] text-[10px] font-normal">{t.contact.optional}</span>
                  </label>
                  <select
                    name="estimatedBudget"
                    value={formData.estimatedBudget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-[#221214] text-[#F5F5F5] text-xs font-mono focus:outline-none focus:border-[#FF1E2D] transition-colors text-left rtl:text-right"
                  >
                    {t.contact.budgetOptions.map((opt, idx) => (
                      <option key={idx} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Project Description */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#B5B5B5] mb-2 font-semibold">
                    {t.contact.description} <span className="text-[#FF1E2D]">*</span>
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder={
                      language === 'ar'
                        ? 'صف أهداف مشروعك، وجمهورك، والتكاملات المطلوبة أو معايير الأداء...'
                        : 'Describe your product objectives, target users, desired integrations, or performance constraints...'
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-[#221214] text-white text-xs font-mono focus:outline-none focus:border-[#FF1E2D] transition-colors placeholder:text-[#555555] resize-none text-left rtl:text-right"
                    required
                  />
                  <div className="text-[10px] font-mono text-[#858585] mt-1">
                    {t.contact.descriptionHint}
                  </div>
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="p-3.5 rounded-lg bg-[#450000]/40 border border-[#FF1E2D] flex items-center gap-2.5 text-xs font-mono text-[#FF1E2D]">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-[#FF1E2D] hover:bg-[#8B0000] text-white font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_0_25px_rgba(255,30,45,0.4)] flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t.contact.submitting}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{t.contact.submit}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right: Official Channels & Confidentiality Guarantee */}
          <div className="lg:col-span-5 space-y-6 text-left rtl:text-right">
            {/* Communication Channels */}
            <div className="rounded-2xl bg-[#0A0A0A] border border-[#221214] p-8 space-y-6">
              <h3 className="text-base font-display font-bold uppercase tracking-wider text-white">
                {t.contact.channelsTitle}
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#050505] border border-[#450000] flex items-center justify-center text-[#FF1E2D] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#858585] uppercase">
                      {t.contact.channelInquiries}
                    </div>
                    <div className="text-xs font-mono text-white font-bold">
                      contact@noirtechnologies.ai
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#050505] border border-[#450000] flex items-center justify-center text-[#FF1E2D] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#858585] uppercase">
                      {t.contact.channelPhone}
                    </div>
                    <div className="text-xs font-mono text-white font-bold ltr:text-left rtl:text-right" dir="ltr">
                      +1 (800) 555-NOIR
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#050505] border border-[#450000] flex items-center justify-center text-[#FF1E2D] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#858585] uppercase">
                      {t.contact.channelHq}
                    </div>
                    <div className="text-xs font-mono text-white font-bold">
                      {language === 'ar' ? 'برج الابتكار، قطاع السايبر 07' : 'Innovation Tower, Cyber District Sector 07'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Confidentiality & Security Card */}
            <div className="rounded-2xl bg-[#110507] border border-[#450000] p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF1E2D] font-bold">
                <Lock className="w-4 h-4 shrink-0" />
                <span>{t.contact.ndaTitle}</span>
              </div>
              <p className="text-xs text-[#B5B5B5] leading-relaxed">
                {t.contact.ndaDesc}
              </p>
            </div>

            {/* SLA Response Guarantee */}
            <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#221214] flex items-center justify-between text-xs font-mono">
              <span className="text-[#858585]">{t.contact.slaLabel}</span>
              <span className="text-[#FF1E2D] font-bold">{t.contact.slaValue}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
