'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FlagIcon from '@/components/public/FlagIcon';
import { VisaCountryData, COMMON_DOCUMENTS } from '@/data/visasData';
import {
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  FileText,
  Building2,
  Briefcase,
  Home,
  CreditCard,
  Calendar,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Send,
  Check,
  MessageCircle,
  Compass,
  Info,
  Coins,
  Plane,
  FileCheck,
  MapPin,
  UserCheck,
  Globe2,
  Zap,
  ScanLine,
  CheckCheck,
  Fingerprint,
  Wallet,
  Users,
  Shield,
  Award,
  Laptop,
  CalendarDays,
  Receipt,
} from 'lucide-react';

interface VisaDossierViewProps {
  country: VisaCountryData;
  adminProfile?: {
    name: string;
    phone: string;
    avatarUrl: string;
    description: string;
  };
}

// Icon mapper for dynamic insights
const iconMap: Record<string, React.ReactNode> = {
  Fingerprint: <Fingerprint className="w-6 h-6 text-brand-emerald" />,
  Wallet: <Wallet className="w-6 h-6 text-brand-emerald" />,
  Users: <Users className="w-6 h-6 text-brand-emerald" />,
  Globe2: <Globe2 className="w-6 h-6 text-brand-emerald" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-brand-emerald" />,
  Calendar: <Calendar className="w-6 h-6 text-brand-emerald" />,
  FileText: <FileText className="w-6 h-6 text-brand-emerald" />,
  UserCheck: <UserCheck className="w-6 h-6 text-brand-emerald" />,
  MapPin: <MapPin className="w-6 h-6 text-brand-emerald" />,
  CheckCircle: <CheckCircle2 className="w-6 h-6 text-brand-emerald" />,
  Building: <Building2 className="w-6 h-6 text-brand-emerald" />,
  FileCheck: <FileCheck className="w-6 h-6 text-brand-emerald" />,
  Coins: <Coins className="w-6 h-6 text-brand-emerald" />,
  Plane: <Plane className="w-6 h-6 text-brand-emerald" />,
  Compass: <Compass className="w-6 h-6 text-brand-emerald" />,
  Shield: <Shield className="w-6 h-6 text-brand-emerald" />,
  FileSpreadsheet: <FileText className="w-6 h-6 text-brand-emerald" />,
  CalendarDays: <CalendarDays className="w-6 h-6 text-brand-emerald" />,
  Receipt: <Receipt className="w-6 h-6 text-brand-emerald" />,
  Sparkles: <Sparkles className="w-6 h-6 text-brand-emerald" />,
  Laptop: <Laptop className="w-6 h-6 text-brand-emerald" />,
  Award: <Award className="w-6 h-6 text-brand-emerald" />,
  Zap: <Zap className="w-6 h-6 text-brand-emerald" />,
  ScanLine: <ScanLine className="w-6 h-6 text-brand-emerald" />,
  CheckCheck: <CheckCheck className="w-6 h-6 text-brand-emerald" />,
};

export default function VisaDossierView({
  country,
  adminProfile,
}: VisaDossierViewProps) {
  const profileName = adminProfile?.name || 'Bilawal Abdullah';
  const profilePhone = adminProfile?.phone || '+92 300 8453303';
  const profileAvatar = adminProfile?.avatarUrl || '/images/default-avatar.png';
  const initials = profileName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'BA';
  // Checklist State for Readiness Gauge
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Form Submission State
  const [formData, setFormData] = useState({
    senderName: '',
    email: '',
    phone: '',
    applicants: '1 Person (Solo Traveler)',
    employmentStatus: 'Salaried Professional',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Toggle checklist item
  const handleToggleCheck = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Readiness Gauge Calculation
  const readiness = useMemo(() => {
    let earned = 0;
    let total = 0;

    COMMON_DOCUMENTS.forEach((doc) => {
      total += doc.weight;
      if (checkedItems[doc.id]) {
        earned += doc.weight;
      }
    });

    const pct = Math.min(100, Math.round((earned / total) * 100));

    let verdict = 'Select documents above to verify complete consular compliance.';
    let verdictColor = 'text-brand-slate';

    if (pct === 0) {
      verdict = 'Select documents above to verify complete consular compliance.';
      verdictColor = 'text-brand-slate';
    } else if (pct < 40) {
      verdict = 'Preliminary dossier initiated. Key financial or passport credentials missing.';
      verdictColor = 'text-amber-700';
    } else if (pct < 75) {
      verdict = 'Promising progress. Ensure bank branch stamps and tax active status are verified.';
      verdictColor = 'text-blue-700';
    } else if (pct < 100) {
      verdict = 'High dossier readiness. Ready for consular pre-submission audit.';
      verdictColor = 'text-brand-emerald font-medium';
    } else {
      verdict = '100% Consular Compliant! Your dossier satisfies all mandatory IRCC/Embassy standards.';
      verdictColor = 'text-brand-emerald font-bold';
    }

    return { pct, verdict, verdictColor };
  }, [checkedItems]);

  // Handle Form Submit
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.senderName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setFormError('Please provide your name, email, and WhatsApp number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderName: formData.senderName,
          email: formData.email,
          phone: formData.phone,
          targetPackage: `${country.name} Visa Dossier Intake`,
          message: `Applicants: ${formData.applicants} | Employment Status: ${formData.employmentStatus} | Notes: ${formData.notes || 'None provided'}`,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit dossier inquiry.');
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setFormError(err.message || 'Something went wrong. Please try again or message via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // WhatsApp formatted URL
  const cleanPhone = profilePhone.replace(/[^0-9]/g, '');
  const waMessage = encodeURIComponent(
    `Hello ${profileName} Travels! I am inquiring about the ${country.name} Visa Document Requirements and would like to initiate my dossier review.`
  );
  const waUrl = `https://wa.me/${cleanPhone || '923008453303'}?text=${waMessage}`;

  return (
    <div className="flex flex-col w-full relative overflow-hidden bg-brand-alabaster">
      {/* Subtle Editorial Ambient Glow */}
      <div className="absolute -top-40 right-10 w-96 h-96 bg-brand-emerald/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-96 -left-20 w-80 h-80 bg-brand-sage/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 w-full">
        {/* Breadcrumbs & Monograph Dossier Label */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 text-xs tracking-wider uppercase text-brand-slate font-medium">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link href="/" className="hover:text-brand-emerald transition-colors">
              Home
            </Link>
            <span className="text-brand-stone">/</span>
            <Link href="/visas" className="hover:text-brand-emerald transition-colors">
              Visa Services &amp; Consular Guides
            </Link>
            <span className="text-brand-stone">/</span>
            <span className="text-brand-emerald font-semibold">{country.name}</span>
          </nav>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
            <span className="font-mono text-xs text-brand-emerald font-semibold">
              {country.advisoryCode}
            </span>
          </div>
        </div>

        {/* Header Section: Architectural Hierarchy */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-brand-stone/80 shadow-subtle mb-8 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-emerald/10 text-brand-emerald text-xs uppercase tracking-widest font-semibold mb-4">
                <FlagIcon countryCode={country.countryCode} size="sm" alt={country.name} />
                <span>Consular Dossier &amp; Expedition Permits</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-charcoal leading-tight tracking-tight mb-3">
                {country.headline}
              </h1>
              <p className="font-sans text-brand-slate text-base sm:text-lg leading-relaxed">
                {country.subheadline}
              </p>
            </div>

            {/* Verification Badges Box */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 bg-brand-alabaster p-4 rounded-xl border border-brand-stone/60">
              <div className="flex items-center gap-2.5 text-xs text-brand-slate">
                <ShieldCheck className="w-4 h-4 text-brand-emerald shrink-0" />
                <span>Curated by {profileName}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-brand-slate">
                <Building2 className="w-4 h-4 text-brand-emerald shrink-0" />
                <span>Consular Desk • Updated 2024</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-brand-emerald font-semibold">
                <Sparkles className="w-4 h-4 text-brand-emerald shrink-0" />
                <span>100% Pre-Submission Audit Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Quick-Glance Summary Cards (3-Column Metrics) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {/* Card 1: Fee */}
          <div className="bg-white rounded-2xl p-6 border border-brand-stone/80 shadow-subtle flex flex-col justify-between transition-all duration-300 hover:shadow-elevated group">
            <div>
              <div className="w-10 h-10 rounded-full bg-brand-alabaster border border-brand-stone/80 flex items-center justify-center text-brand-emerald mb-4 group-hover:bg-brand-emerald group-hover:text-white transition-colors">
                <Coins className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase tracking-widest text-brand-slate font-semibold block">
                Application &amp; Dossier Fee
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-serif text-2xl sm:text-3xl font-semibold text-brand-charcoal">
                  {country.applicationFee}
                </span>
                <span className="text-xs text-brand-slate">{country.feeSubtext}</span>
              </div>
            </div>
            <div className="text-xs text-brand-slate mt-5 pt-3 bg-brand-alabaster -mx-6 -mb-6 px-6 py-3 rounded-b-2xl border-t border-brand-stone/50 space-y-1">
              {country.feeNotes.map((note, idx) => (
                <p key={idx} className="leading-snug">
                  • {note}
                </p>
              ))}
            </div>
          </div>

          {/* Card 2: Standards */}
          <div className="bg-white rounded-2xl p-6 border border-brand-stone/80 shadow-subtle flex flex-col justify-between transition-all duration-300 hover:shadow-elevated group">
            <div>
              <div className="w-10 h-10 rounded-full bg-brand-alabaster border border-brand-stone/80 flex items-center justify-center text-brand-emerald mb-4 group-hover:bg-brand-emerald group-hover:text-white transition-colors">
                <FileCheck className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase tracking-widest text-brand-slate font-semibold block">
                Submission Standard
              </span>
              <div className="mt-1">
                <span className="font-serif text-xl sm:text-2xl font-semibold text-brand-charcoal block">
                  {country.submissionStandard}
                </span>
                <span className="font-mono text-xs text-brand-emerald font-semibold">
                  {country.submissionStandardSubtext}
                </span>
              </div>
            </div>
            <div className="text-xs text-brand-slate mt-5 pt-3 bg-brand-alabaster -mx-6 -mb-6 px-6 py-3 rounded-b-2xl border-t border-brand-stone/50">
              <p className="leading-snug">
                Clear flatbed scans with visible four-edge margins. No phone angle camera shots.
              </p>
            </div>
          </div>

          {/* Card 3: Processing */}
          <div className="bg-white rounded-2xl p-6 border border-brand-stone/80 shadow-subtle flex flex-col justify-between transition-all duration-300 hover:shadow-elevated group">
            <div>
              <div className="w-10 h-10 rounded-full bg-brand-alabaster border border-brand-stone/80 flex items-center justify-center text-brand-emerald mb-4 group-hover:bg-brand-emerald group-hover:text-white transition-colors">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase tracking-widest text-brand-slate font-semibold block">
                Processing Window
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-serif text-2xl sm:text-3xl font-semibold text-brand-charcoal">
                  {country.processingWindow}
                </span>
                <span className="text-xs text-brand-slate">{country.processingWindowSubtext}</span>
              </div>
            </div>
            <div className="text-xs text-brand-slate mt-5 pt-3 bg-brand-alabaster -mx-6 -mb-6 px-6 py-3 rounded-b-2xl border-t border-brand-stone/50">
              <p className="leading-snug">
                {country.appointmentNotice || 'Subject to biometrics appointment and embassy processing load.'}
              </p>
            </div>
          </div>
        </div>

        {/* Mandatory Scan Quality Alert Banner */}
        <div className="bg-brand-emerald text-white rounded-2xl p-6 sm:p-7 mb-10 shadow-elevated relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/10 rounded-xl text-white shrink-0">
              <ScanLine className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-semibold text-brand-stone">
                  Critical Consular Protocol
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs font-mono">
                  Mandatory Scan Notice
                </span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold mt-1">
                All Documents Required in High-Fidelity Scan Form
              </h3>
              <p className="text-xs sm:text-sm text-white/80 max-w-2xl mt-1 leading-relaxed">
                CamScanner or smartphone camera angles are strictly declined by consular review desks. All pages must be scanned using an optical flatbed scanner at 300 DPI, full color, with four edge margins fully visible and free of shadows.
              </p>
            </div>
          </div>
          <a
            href="#dossier-builder"
            className="shrink-0 px-6 py-2.5 rounded-full bg-white text-brand-emerald hover:bg-brand-alabaster font-semibold text-xs tracking-wider uppercase transition-colors shadow-sm"
          >
            Run Digital Audit
          </a>
        </div>

        {/* Main Layout: 2 Columns (Content Dossier + Sticky Interactive Navigator) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 8 Columns: Comprehensive Document Specifications */}
          <div className="lg:col-span-8 space-y-8">
            {/* Section 1 Header */}
            <div className="flex items-center justify-between pb-2 border-b border-brand-stone/80">
              <div>
                <span className="text-xs uppercase tracking-widest text-brand-emerald font-semibold">
                  Section I • Consular Requirements
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-brand-charcoal mt-0.5">
                  The 9 Essential Dossier Documents
                </h2>
              </div>
              <span className="font-mono text-xs text-brand-slate hidden sm:inline-block">
                9 VERBATIM ITEMS SPECIFIED
              </span>
            </div>

            {/* Core Documents (Items 1 - 5) */}
            <div className="space-y-5">
              {COMMON_DOCUMENTS.filter((d) => d.category === 'core').map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl p-6 border border-brand-stone/80 shadow-subtle hover:shadow-elevated transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-brand-alabaster border border-brand-stone text-brand-emerald font-mono text-xs flex items-center justify-center font-bold">
                        {doc.itemNumber}
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl font-semibold text-brand-charcoal">
                        {doc.title}
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-brand-emerald/10 text-brand-emerald text-xs uppercase tracking-wider font-semibold">
                      {doc.badge}
                    </span>
                  </div>

                  <p className="font-sans font-semibold text-brand-charcoal text-sm sm:text-base mb-2">
                    {doc.verbatimText}
                  </p>

                  <div className="bg-brand-alabaster p-3.5 rounded-xl mb-3 border border-brand-stone/50">
                    <div className="flex items-start gap-2.5">
                      <Info className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-brand-slate leading-relaxed">
                        <strong className="text-brand-charcoal">Consular Clarification: </strong>
                        {doc.consularClarification}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-brand-slate text-xs">
                    {doc.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full bg-brand-alabaster border border-brand-stone/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Section 2: Professional Ties & Means (Item 6, 8, 9) */}
            <div className="pt-4">
              <div className="mb-5 pb-2 border-b border-brand-stone/80">
                <span className="text-xs uppercase tracking-widest text-brand-emerald font-semibold">
                  Section II • Professional Ties &amp; Means
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-brand-charcoal mt-0.5">
                  Employment &amp; Business Documentation
                </h2>
                <p className="text-xs sm:text-sm text-brand-slate mt-1">
                  Submit the designated dossier bundle based on your primary professional structure.
                </p>
              </div>

              {/* Profiles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                {/* Profile A: Business Owner */}
                <div className="bg-white rounded-2xl p-6 border border-brand-stone/80 shadow-subtle flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded-full bg-brand-emerald text-white text-xs font-semibold uppercase tracking-wider">
                        Profile A
                      </span>
                      <Building2 className="w-5 h-5 text-brand-emerald" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-brand-charcoal mb-1">
                      Business Owners &amp; Self-Employed
                    </h3>
                    <p className="text-xs text-brand-slate mb-4">
                      Requirements for enterprise proprietors, directors &amp; independent consultants.
                    </p>

                    <div className="p-3.5 bg-brand-alabaster rounded-xl border border-brand-stone/60">
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-brand-emerald text-white font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                          06
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-brand-charcoal">
                            Business Letterhead / Business Documents — If self-employed/business owner
                          </p>
                          <p className="text-xs text-brand-slate mt-1 leading-relaxed">
                            Official company letterhead showing registration details, SECP incorporation deeds, partnership deeds (Form C), Chamber of Commerce membership certificate, and commercial banking instruments.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 bg-brand-alabaster -mx-6 -mb-6 px-6 py-2.5 rounded-b-2xl border-t border-brand-stone/50">
                    <span className="font-mono text-xs text-brand-emerald font-semibold">
                      SECP / Chamber Verification Mandatory
                    </span>
                  </div>
                </div>

                {/* Profile B: Salaried Professionals */}
                <div className="bg-white rounded-2xl p-6 border border-brand-stone/80 shadow-subtle flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded-full bg-brand-charcoal text-white text-xs font-semibold uppercase tracking-wider">
                        Profile B
                      </span>
                      <Briefcase className="w-5 h-5 text-brand-emerald" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-brand-charcoal mb-1">
                      Salaried Professionals
                    </h3>
                    <p className="text-xs text-brand-slate mb-4">
                      Requirements for corporate executives, government officers &amp; private employees.
                    </p>

                    <div className="space-y-3">
                      {/* Item 8 */}
                      <div className="p-3 bg-brand-alabaster rounded-xl border border-brand-stone/60">
                        <div className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-brand-charcoal text-white font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                            08
                          </span>
                          <div>
                            <p className="text-xs font-semibold text-brand-charcoal">
                              Salary Slips — Last 03 months, if employed
                            </p>
                            <p className="text-xs text-brand-slate mt-1 leading-relaxed">
                              Signed and stamped by corporate HR or Finance division. Bank credits must precisely match payslip net pay amounts.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Item 9 */}
                      <div className="p-3 bg-brand-alabaster rounded-xl border border-brand-stone/60">
                        <div className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-brand-charcoal text-white font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                            09
                          </span>
                          <div>
                            <p className="text-xs font-semibold text-brand-charcoal">
                              Employment Letter — If employed
                            </p>
                            <p className="text-xs text-brand-slate mt-1 leading-relaxed">
                              Official No Objection Certificate (NOC) / Job Confirmation on corporate letterhead confirming exact designation, tenure, approved leave dates &amp; remuneration.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 bg-brand-alabaster -mx-6 -mb-6 px-6 py-2.5 rounded-b-2xl border-t border-brand-stone/50">
                    <span className="font-mono text-xs text-brand-emerald font-semibold">
                      HR Stamp &amp; Direct Sign-off Required
                    </span>
                  </div>
                </div>
              </div>

              {/* Item 7: Property Documents */}
              <div className="bg-white rounded-2xl p-6 border border-brand-stone/80 shadow-subtle hover:shadow-elevated transition-shadow">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-brand-alabaster border border-brand-stone text-brand-emerald font-mono text-xs flex items-center justify-center font-bold">
                      07
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-brand-charcoal">
                      Substantive Home Ties &amp; Capital Assets
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-brand-emerald/10 text-brand-emerald text-xs uppercase tracking-wider font-semibold">
                    Recommended Tie
                  </span>
                </div>

                <p className="font-sans font-semibold text-brand-charcoal text-sm sm:text-base mb-2">
                  Property Documents — If available.
                </p>

                <div className="bg-brand-alabaster p-3.5 rounded-xl mb-3 border border-brand-stone/50">
                  <div className="flex items-start gap-2.5">
                    <Home className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-brand-slate leading-relaxed">
                      <strong className="text-brand-charcoal">Consular Clarification: </strong>
                      Ownership title deeds, land registry allotment letters, residential / commercial title files, or certified CA valuation assessments. While optional under base statute, property documentation provides compelling evidentiary proof establishing undeniable economic ties to your home country.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-brand-slate text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-brand-alabaster border border-brand-stone/70">
                    Allotment Letters
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-brand-alabaster border border-brand-stone/70">
                    Property Valuation Report
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-brand-alabaster border border-brand-stone/70">
                    English Translation If Applicable
                  </span>
                </div>
              </div>
            </div>

            {/* Atelier Visual Break: Editorial Quote Dossier Banner */}
            <div className="rounded-2xl p-6 sm:p-8 bg-brand-alabaster border border-brand-stone/80">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-full shrink-0 overflow-hidden bg-brand-stone/50 border-2 border-brand-emerald/20 relative flex items-center justify-center">
                  {profileAvatar ? (
                    <img
                      src={profileAvatar}
                      alt={profileName}
                      className="w-full h-full object-cover"
                      onError={(e: any) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-brand-emerald/10 flex items-center justify-center font-serif text-xl font-bold text-brand-emerald -z-10">
                    {initials}
                  </div>
                </div>
                <div>
                  <p className="font-serif italic text-base sm:text-lg text-brand-charcoal mb-2 leading-relaxed">
                    &ldquo;The {country.name} visa process is not a matter of luck; it is a discipline of evidentiary coherence. Every financial transaction and stamped passport leaf must tell the singular, unyielding truth of your intent to return.&rdquo;
                  </p>
                  <span className="text-xs tracking-widest uppercase text-brand-emerald font-semibold block">
                    {profileName} — Principal, Consular Atelier
                  </span>
                </div>
              </div>
            </div>

            {/* Section 3: Atelier Knowledge Base (Insights) */}
            <div className="pt-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-2 border-b border-brand-stone/80">
                <div>
                  <span className="text-xs uppercase tracking-widest text-brand-emerald font-semibold">
                    Atelier Knowledge Base
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-brand-charcoal mt-0.5">
                    Curated Insights for {country.name} Visas
                  </h2>
                </div>
                <p className="text-xs text-brand-slate max-w-sm mt-2 md:mt-0">
                  Insights drawn from over 1,200 audited applications across high-scrutiny consular desks.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {country.insights.map((insight, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-5 border border-brand-stone/80 shadow-subtle"
                  >
                    <div className="mb-3">{iconMap[insight.icon] || <Sparkles className="w-6 h-6 text-brand-emerald" />}</div>
                    <h4 className="font-serif text-base font-semibold text-brand-charcoal mb-1.5">
                      {insight.title}
                    </h4>
                    <p className="text-xs text-brand-slate leading-relaxed">
                      {insight.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Consular Intake & Ingestion Form */}
            <div className="bg-white rounded-2xl p-6 sm:p-10 border border-brand-stone/80 shadow-elevated" id="intake-form">
              <div className="max-w-2xl mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald/10 text-brand-emerald text-xs uppercase tracking-widest font-semibold mb-2">
                  <span>Direct Consular Ingestion</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-brand-charcoal">
                  Initiate Your {country.name} Visa Dossier
                </h2>
                <p className="text-xs sm:text-sm text-brand-slate mt-1">
                  Dispatch your scanned profile for preliminary compliance verification. Our consular officers audit your documents against official {country.name} benchmarks within 24 hours.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-6 bg-brand-emerald/10 rounded-2xl border border-brand-emerald/30 text-center">
                  <CheckCircle2 className="w-12 h-12 text-brand-emerald mx-auto mb-3" />
                  <h3 className="font-serif text-xl font-semibold text-brand-charcoal mb-1">
                    Dossier Inquiry Dispatched
                  </h3>
                  <p className="text-sm text-brand-slate max-w-md mx-auto mb-5">
                    Thank you, {formData.senderName}. Your {country.name} visa intake details have been securely logged. Our consular audit desk will review your credentials and contact you within 24 hours.
                  </p>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-brand-emerald hover:bg-brand-pine text-white text-xs uppercase tracking-wider font-semibold px-6 py-3 rounded-full transition shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Connect via WhatsApp Desk
                  </a>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-slate font-semibold mb-2">
                      Full Legal Name (as per Passport) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.senderName}
                      onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                      placeholder="e.g. Bilawal Abdullah"
                      className="w-full h-11 px-4 rounded-xl bg-brand-alabaster border border-brand-stone/80 text-sm text-brand-charcoal placeholder:text-brand-slate/50 focus:outline-none focus:bg-white focus:border-brand-emerald transition"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-slate font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@domain.com"
                      className="w-full h-11 px-4 rounded-xl bg-brand-alabaster border border-brand-stone/80 text-sm text-brand-charcoal placeholder:text-brand-slate/50 focus:outline-none focus:bg-white focus:border-brand-emerald transition"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-slate font-semibold mb-2">
                      WhatsApp / Mobile Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 300 0000000"
                      className="w-full h-11 px-4 rounded-xl bg-brand-alabaster border border-brand-stone/80 text-sm text-brand-charcoal placeholder:text-brand-slate/50 focus:outline-none focus:bg-white focus:border-brand-emerald transition"
                    />
                  </div>

                  {/* Applicant Count */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-slate font-semibold mb-2">
                      Number of Applicants
                    </label>
                    <select
                      value={formData.applicants}
                      onChange={(e) => setFormData({ ...formData, applicants: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl bg-brand-alabaster border border-brand-stone/80 text-sm text-brand-charcoal focus:outline-none focus:bg-white focus:border-brand-emerald transition"
                    >
                      <option value="1 Person (Solo Traveler)">1 Person (Solo Traveler)</option>
                      <option value="2 Persons (Couple / Travel Partner)">2 Persons (Couple / Travel Partner)</option>
                      <option value="3–4 Persons (Family Unit)">3–4 Persons (Family Unit)</option>
                      <option value="5+ Persons (Group / Expedition Delegation)">5+ Persons (Group / Expedition Delegation)</option>
                    </select>
                  </div>

                  {/* Professional Status */}
                  <div className="md:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-brand-slate font-semibold mb-2">
                      Employment / Professional Structure
                    </label>
                    <select
                      value={formData.employmentStatus}
                      onChange={(e) => setFormData({ ...formData, employmentStatus: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl bg-brand-alabaster border border-brand-stone/80 text-sm text-brand-charcoal focus:outline-none focus:bg-white focus:border-brand-emerald transition"
                    >
                      <option value="Salaried Professional">Profile B: Salaried Professional (Corporate / Govt / Private)</option>
                      <option value="Business Owner / Self-Employed">Profile A: Business Owner / Sole Proprietor / Director</option>
                      <option value="Independent Consultant / Remote">Independent Consultant / Remote Professional</option>
                      <option value="Sponsored Dependent / Family">Sponsored Dependent / Student / Retired</option>
                    </select>
                  </div>

                  {/* Additional Notes */}
                  <div className="md:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-brand-slate font-semibold mb-2">
                      Intended Travel Dates &amp; Notes
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Planning a 14-day holiday in autumn. Previous travel to UAE and Turkey."
                      className="w-full p-4 rounded-xl bg-brand-alabaster border border-brand-stone/80 text-sm text-brand-charcoal placeholder:text-brand-slate/50 focus:outline-none focus:bg-white focus:border-brand-emerald transition"
                    />
                  </div>

                  {formError && (
                    <div className="md:col-span-2 p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2 border border-red-200">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <span className="text-xs text-brand-slate">
                      Strictly encrypted intake. Zero shared credentials.
                    </span>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-brand-emerald hover:bg-brand-pine text-white text-xs uppercase tracking-wider font-semibold transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Dispatching...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Initiate Dossier Review</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Section 5: Frequently Asked Questions (Accordion) */}
            <div className="pt-4">
              <div className="mb-6 pb-2 border-b border-brand-stone/80">
                <span className="text-xs uppercase tracking-widest text-brand-emerald font-semibold">
                  Consular Advisory Q&amp;A
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-brand-charcoal mt-0.5">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-3">
                {country.faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-brand-stone/80 overflow-hidden shadow-subtle transition"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-brand-alabaster/60 transition"
                      >
                        <span className="font-serif text-base sm:text-lg font-semibold text-brand-charcoal">
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-brand-emerald shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-brand-slate shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-brand-slate leading-relaxed border-t border-brand-stone/50">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right 4 Columns: Interactive Checklist Tool, Fee Manifest & Fast Action */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-6 sticky top-24">
              {/* Interactive Document Readiness Tracker */}
              <div
                className="bg-white rounded-2xl p-6 border border-brand-stone/80 shadow-subtle"
                id="dossier-builder"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-lg font-semibold text-brand-charcoal">
                    Dossier Readiness Gauge
                  </h3>
                  <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-brand-emerald text-white font-bold">
                    {readiness.pct}% READY
                  </span>
                </div>
                <p className="text-xs text-brand-slate mb-4">
                  Check off your compiled digital scans to assess submission preparedness before dispatching to our auditing desk.
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-brand-stone/60 h-2 rounded-full overflow-hidden mb-4">
                  <div
                    className="bg-brand-emerald h-full transition-all duration-500 ease-out"
                    style={{ width: `${readiness.pct}%` }}
                  />
                </div>

                {/* Interactive Checklist List */}
                <div className="space-y-2 text-xs text-brand-charcoal">
                  {COMMON_DOCUMENTS.map((doc) => {
                    const isChecked = !!checkedItems[doc.id];
                    return (
                      <label
                        key={doc.id}
                        className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-brand-emerald/5 border-brand-emerald/40 text-brand-charcoal'
                            : 'bg-brand-alabaster/60 border-brand-stone/60 hover:bg-brand-alabaster'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleCheck(doc.id)}
                          className="mt-0.5 rounded text-brand-emerald focus:ring-0 w-4 h-4"
                        />
                        <div className="flex-1">
                          <span className={`block font-semibold ${isChecked ? 'text-brand-emerald' : 'text-brand-charcoal'}`}>
                            {doc.itemNumber}. {doc.title}
                          </span>
                          <span className="text-brand-slate text-[11px] block mt-0.5 line-clamp-1">
                            {doc.verbatimText}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>

                {/* Verdict text */}
                <div className="mt-4 p-3 rounded-xl bg-brand-alabaster text-center text-xs border border-brand-stone/60">
                  <span className={readiness.verdictColor}>{readiness.verdict}</span>
                </div>
              </div>

              {/* Pricing & Concierge Dossier Highlight Card */}
              <div className="bg-white rounded-2xl p-6 border border-brand-stone/80 shadow-subtle">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase tracking-widest text-brand-emerald font-semibold">
                    Atelier Package
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-emerald/10 text-brand-emerald font-mono text-[11px] font-semibold">
                    Verified Curation
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-serif text-3xl font-bold text-brand-charcoal">
                    {country.applicationFee}
                  </span>
                  <span className="text-xs text-brand-slate font-medium">/ person</span>
                </div>

                <p className="text-xs text-brand-slate mb-5">
                  {country.feeSubtext}
                </p>

                {/* Inclusions list */}
                <div className="space-y-2.5 text-xs text-brand-charcoal mb-6">
                  {country.packageInclusions.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {country.appointmentNotice && (
                  <div className="mb-4 p-2.5 rounded-xl bg-brand-alabaster text-brand-slate text-[11px] border border-brand-stone/60 italic">
                    {country.appointmentNotice}
                  </div>
                )}

                <a
                  href="#intake-form"
                  className="block w-full py-3 px-6 rounded-full bg-brand-emerald hover:bg-brand-pine text-white text-xs font-semibold uppercase tracking-wider text-center transition-all shadow-md"
                >
                  Initiate Application Process
                </a>
              </div>

              {/* WhatsApp Direct Dispatch Card */}
              <div className="bg-brand-alabaster rounded-2xl p-4 border border-brand-stone/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-emerald flex items-center justify-center text-white shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-brand-charcoal leading-tight">
                      Direct WhatsApp Desk
                    </h4>
                    <span className="text-[11px] text-brand-slate">
                      Instant scan review &amp; inquiries
                    </span>
                  </div>
                </div>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-white text-brand-emerald hover:bg-brand-emerald hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm shrink-0 border border-brand-stone/70"
                >
                  Chat
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
