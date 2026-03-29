"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  FileSpreadsheet,
  ClipboardCheck,
  AlertTriangle,
  Building2,
  BarChart3,
  Shield,
  Check,
  ArrowRight,
  Layers,
  Target,
  Lock,
  Send,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

// ─── Animations ─────────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

function stagger(delay: number): Variants {
  return {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay } },
  };
}

// ─── Data ───────────────────────────────────────────────────────────────────

const PAIN_POINTS = [
  {
    title: "Scattered documentation",
    body: "Your Statement of Applicability lives in one spreadsheet, the risk register in another, and vendor assessments in a shared folder somewhere. When an auditor asks for the current version, nobody's entirely sure where it is.",
  },
  {
    title: "Evidence collection bottleneck",
    body: "Every audit cycle, your team spends days tracking down screenshots, policy documents, and configuration exports across email threads and shared drives. The evidence exists — finding it is the problem.",
  },
  {
    title: "Multi-framework overhead",
    body: "You've certified ISO 27001. Now the business needs UAE-IA compliance, SOC 2, or DPDP Act readiness. Each framework adds another layer of mapping, tracking, and reporting — for the same controls you already manage.",
  },
] as const;

const FEATURES = [
  {
    icon: FileSpreadsheet,
    title: "Excel Import & Export",
    body: "Bring your current SoA and risk registers exactly as they are. ArborGRC reads the columns, maps them to the right fields, and preserves every row. When you need an Excel file for the auditor, export it in one click.",
  },
  {
    icon: ClipboardCheck,
    title: "Statement of Applicability",
    body: "View controls organized by domain and sub-domain. Edit applicability, implementation status, and justification inline. Switch between ISO 27001, UAE-IA, or any loaded framework in a single dropdown.",
  },
  {
    icon: AlertTriangle,
    title: "Risk Register & Heat Map",
    body: "Assess risks on a standard likelihood-impact matrix. Assign owners, define treatment plans, and link risks directly to the controls that mitigate them. The heat map shows your exposure at a glance.",
  },
  {
    icon: Building2,
    title: "Third-Party Risk Management",
    body: "Maintain a vendor register with contract and SLA tracking. Run structured onboarding and annual assessments using 30-question questionnaires based on real-world TPRM practices.",
  },
  {
    icon: BarChart3,
    title: "Gap Analysis",
    body: "Pick any framework and instantly see which requirements have controls mapped, which are partially implemented, and which have no coverage at all. Prioritize remediation work with clarity.",
  },
  {
    icon: Shield,
    title: "Unified Control Framework",
    body: "Define a control once. Map it to ISO 27001 Annex A, UAE-IA, SOC 2, and any other framework simultaneously. When you update implementation status, it reflects everywhere.",
  },
];

const FRAMEWORKS = [
  { name: "ISO 27001:2022", badge: "ISO 27001", stat: "93 Annex A controls", desc: "The global benchmark for information security management. Required by most enterprise procurement processes." },
  { name: "UAE-IA (TDRA/NESA)", badge: "UAE-IA", stat: "195+ controls", desc: "Mandatory for UAE government entities and critical infrastructure. Deep coverage of national security requirements." },
  { name: "ISO 31000:2018", badge: "ISO 31000", stat: "Risk framework", desc: "International guidelines for enterprise risk management. Provides structure for identifying, analysing, and treating risks." },
  { name: "ITIL 4", badge: "ITIL 4", stat: "34 practices", desc: "IT service management framework for teams that deliver and support technology services alongside compliance programs." },
] as const;

const FREE_FEATURES = [
  "1 framework (ISO 27001 or UAE-IA)",
  "Up to 100 controls",
  "Excel import & export",
  "Risk register with heat map",
  "Statement of Applicability",
  "3 team members",
] as const;

const ENTERPRISE_FEATURES = [
  "All supported frameworks",
  "Unlimited controls & risks",
  "TPRM with assessments",
  "Gap analysis & maturity",
  "Unified Control Framework",
  "Custom framework support",
  "SSO / SAML integration",
  "API access",
  "Dedicated account manager",
  "Data residency options",
] as const;

// ─── Trial Form Component ───────────────────────────────────────────────────

function TrialForm({ id }: { id?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    teamSize: "",
    frameworks: "",
  });
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.company.trim()) {
      setError("Please fill in your name, work email, and company name.");
      return;
    }
    // Validate work email (no gmail, yahoo, hotmail, outlook personal)
    const personal = /(gmail|yahoo|hotmail|outlook|aol|icloud|mail)\./i;
    if (personal.test(form.email)) {
      setError("Please use your work email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  const inputCls = "w-full text-[14px] border border-stone-200 rounded-md px-4 py-3 text-stone-800 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600/20 placeholder:text-stone-400 bg-white";
  const labelCls = "text-[11px] uppercase tracking-[0.12em] text-stone-500 font-semibold block mb-1.5";

  if (submitted) {
    return (
      <div id={id} className="text-center py-10">
        <div className="w-14 h-14 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={28} className="text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-stone-900 mb-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          We&apos;ll be in touch shortly.
        </h3>
        <p className="text-[15px] text-stone-600 max-w-md mx-auto leading-relaxed">
          Our team will review your request and reach out within one business day to set up your ArborGRC workspace.
        </p>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="text-[13px] text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3">{error}</div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Full Name *</label>
          <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Amit Verma" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Work Email *</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="amit@yourcompany.com" className={inputCls} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Company Name *</label>
          <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="A9 Advisory" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Your Role</label>
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={inputCls}>
            <option value="">Select role</option>
            <option value="ciso">CISO / IS Manager</option>
            <option value="compliance">Compliance Analyst / Officer</option>
            <option value="auditor">Internal Auditor</option>
            <option value="consultant">GRC Consultant</option>
            <option value="dpo">Data Protection Officer</option>
            <option value="it-risk">IT Risk Manager</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Team Size</label>
          <select value={form.teamSize} onChange={(e) => setForm({ ...form, teamSize: e.target.value })} className={inputCls}>
            <option value="">Select size</option>
            <option value="1-5">1–5 people</option>
            <option value="6-20">6–20 people</option>
            <option value="21-100">21–100 people</option>
            <option value="100+">100+ people</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Frameworks of Interest</label>
          <input type="text" value={form.frameworks} onChange={(e) => setForm({ ...form, frameworks: e.target.value })} placeholder="ISO 27001, UAE-IA, SOC 2..." className={inputCls} />
        </div>
      </div>
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 h-12 text-[15px] font-semibold text-white transition-colors duration-150"
        style={{ backgroundColor: "#15803d", borderRadius: "4px" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#166534")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#15803d")}
      >
        <Send size={16} />
        Request Early Access
      </button>
      <p className="text-[12px] text-stone-400 text-center">
        No credit card required. Our team will set up your workspace within 24 hours.
      </p>
    </form>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-[1200px] px-6 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="flex flex-col md:flex-row md:items-center gap-12 md:gap-10">
            {/* Copy — 55% */}
            <motion.div className="md:w-[55%]" initial="hidden" animate="visible" variants={fadeUp}>
              <p className="text-[11px] font-semibold tracking-[0.15em] mb-5" style={{ color: "#15803d", textTransform: "uppercase" }}>
                Governance · Risk · Compliance
              </p>
              <h1
                className="text-4xl md:text-[3.4rem] font-bold text-stone-900 mb-6"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif", letterSpacing: "-0.03em", lineHeight: 1.08 }}
              >
                Compliance shouldn&apos;t live in spreadsheets.
              </h1>
              <p className="text-lg text-stone-600 mb-8 max-w-xl leading-relaxed">
                ArborGRC gives compliance teams a single workspace for SoA management, risk registers, vendor assessments, and gap analysis — with full Excel compatibility so you can start from where you are today.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="#get-started"
                  className="inline-flex items-center justify-center gap-2 h-12 px-8 text-[15px] font-semibold text-white transition-colors duration-150"
                  style={{ backgroundColor: "#15803d", borderRadius: "4px" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#166534")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#15803d")}
                >
                  Get Early Access <ArrowRight size={16} />
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center justify-center h-12 px-8 text-[15px] font-medium text-green-700 border border-green-700 transition-colors duration-150 hover:bg-green-50"
                  style={{ borderRadius: "4px" }}
                >
                  Explore Features
                </Link>
              </div>
            </motion.div>

            {/* Visual — 45% — Interactive animated dashboard */}
            <motion.div
              className="md:w-[45%]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
            >
              <div className="relative">
                {/* Glow behind the card */}
                <div className="absolute -inset-4 rounded-xl bg-green-100/40 blur-2xl" />

                <div className="relative bg-white border border-stone-200 overflow-hidden" style={{ borderRadius: "6px" }}>
                  {/* Top bar — mimics app chrome */}
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-stone-50 border-b border-stone-200">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-stone-200" />
                      <span className="w-2.5 h-2.5 rounded-full bg-stone-200" />
                      <span className="w-2.5 h-2.5 rounded-full bg-stone-200" />
                    </div>
                    <div className="flex-1 mx-8 h-5 bg-stone-100 rounded" />
                  </div>

                  <div className="p-5">
                    {/* Dashboard metrics */}
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      {[
                        { label: "Compliance", value: "72%", color: "#15803d", sub: "+4% this quarter" },
                        { label: "Controls", value: "186", color: "#1c1917", sub: "142 implemented" },
                        { label: "Risks", value: "23", color: "#dc2626", sub: "4 critical" },
                      ].map(({ label, value, color, sub }) => (
                        <div key={label} className="border border-stone-200 rounded p-3">
                          <p className="text-[9px] font-semibold uppercase tracking-wider text-stone-400 mb-1">{label}</p>
                          <p className="text-xl font-bold" style={{ color, fontFamily: "var(--font-playfair), Georgia, serif" }}>{value}</p>
                          <p className="text-[9px] text-stone-400 mt-1">{sub}</p>
                        </div>
                      ))}
                    </div>

                    {/* Framework bars */}
                    <div className="space-y-2.5 mb-4">
                      {[
                        { name: "ISO 27001", pct: 85 },
                        { name: "UAE-IA", pct: 62 },
                        { name: "SOC 2", pct: 41 },
                      ].map(({ name, pct }) => (
                        <div key={name}>
                          <div className="flex justify-between mb-1">
                            <span className="text-[10px] font-semibold text-stone-600">{name}</span>
                            <span className="text-[10px] font-bold text-stone-800">{pct}%</span>
                          </div>
                          <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: "#15803d" }}
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Mini heat map */}
                    <div className="grid grid-cols-5 gap-0.5">
                      {[
                        "bg-green-50", "bg-green-50", "bg-amber-50", "bg-amber-100", "bg-red-100",
                        "bg-green-50", "bg-green-100", "bg-amber-50", "bg-red-100", "bg-red-200",
                        "bg-stone-50", "bg-green-50", "bg-amber-100", "bg-red-100", "bg-red-200",
                        "bg-stone-50", "bg-stone-50", "bg-green-100", "bg-amber-100", "bg-red-100",
                        "bg-stone-50", "bg-stone-50", "bg-green-50", "bg-green-100", "bg-amber-50",
                      ].map((cls, i) => (
                        <div key={i} className={`h-4 rounded-sm ${cls}`} />
                      ))}
                    </div>
                    <p className="text-[8px] text-stone-300 mt-1 text-center uppercase tracking-widest">Risk Heat Map — Likelihood vs Impact</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Trust line */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger(0.4)}
            className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3"
          >
            <span className="text-[12px] text-stone-400 font-medium">Designed for:</span>
            {["ISO 27001", "UAE-IA / NESA", "ISO 31000", "ITIL 4", "SOC 2", "DPDP Act"].map((fw) => (
              <span key={fw} className="text-[12px] font-semibold text-stone-500 uppercase tracking-wider">{fw}</span>
            ))}
          </motion.div>
        </section>

        {/* ── PAIN POINTS ───────────────────────────────────────────────────── */}
        <section className="border-t border-stone-200 bg-stone-50">
          <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-24">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
              <p className="text-[11px] font-semibold tracking-[0.15em] mb-4" style={{ color: "#15803d", textTransform: "uppercase" }}>
                The Challenge
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-12 max-w-2xl" style={{ fontFamily: "var(--font-playfair), Georgia, serif", letterSpacing: "-0.03em" }}>
                Sound familiar?
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PAIN_POINTS.map(({ title, body }, i) => (
                <motion.div
                  key={title}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
                  variants={stagger(i * 0.1)}
                  className="bg-white border border-stone-200 p-6" style={{ borderLeft: "3px solid #bbf7d0", borderRadius: "4px" }}
                >
                  <h3 className="text-[15px] font-bold text-stone-900 mb-3" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{title}</h3>
                  <p className="text-[14px] text-stone-600 leading-relaxed">{body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ──────────────────────────────────────────────────────── */}
        <section id="features" className="border-t border-stone-200">
          <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-24">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mb-12">
              <p className="text-[11px] font-semibold tracking-[0.15em] mb-4" style={{ color: "#15803d", textTransform: "uppercase" }}>Capabilities</p>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 max-w-2xl" style={{ fontFamily: "var(--font-playfair), Georgia, serif", letterSpacing: "-0.03em" }}>
                Everything your compliance team needs, in one place.
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {FEATURES.map(({ icon: Icon, title, body }, i) => (
                <motion.div key={title} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger((i % 2) * 0.08)}
                  className="bg-white border border-stone-200 p-6 flex gap-5" style={{ borderRadius: "4px" }}
                >
                  <div className="shrink-0 flex items-center justify-center w-12 h-12" style={{ backgroundColor: "#f0fdf4", borderRadius: "50%" }}>
                    <Icon size={20} className="text-green-700" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-stone-900 mb-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{title}</h3>
                    <p className="text-[14px] text-stone-600 leading-relaxed">{body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FRAMEWORKS ────────────────────────────────────────────────────── */}
        <section id="frameworks" className="border-t border-stone-200 bg-stone-50">
          <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-24">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mb-12">
              <p className="text-[11px] font-semibold tracking-[0.15em] mb-4" style={{ color: "#15803d", textTransform: "uppercase" }}>Frameworks</p>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 max-w-2xl" style={{ fontFamily: "var(--font-playfair), Georgia, serif", letterSpacing: "-0.03em" }}>
                Start with the standards that matter to your organisation.
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {FRAMEWORKS.map(({ name, badge, stat, desc }, i) => (
                <motion.div key={name} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger(i * 0.08)}
                  className="bg-white border border-stone-200 p-6 flex flex-col gap-3" style={{ borderTop: "3px solid #15803d", borderRadius: "4px" }}
                >
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 w-fit" style={{ backgroundColor: "#f0fdf4", color: "#15803d", borderRadius: "3px" }}>{badge}</span>
                  <div>
                    <p className="text-[12px] font-medium text-stone-400 mb-1">{stat}</p>
                    <h3 className="text-[15px] font-bold text-stone-900 mb-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{name}</h3>
                    <p className="text-[14px] text-stone-600 leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHO IT'S FOR ──────────────────────────────────────────────────── */}
        <section className="border-t border-stone-200">
          <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-24">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-12 max-w-2xl" style={{ fontFamily: "var(--font-playfair), Georgia, serif", letterSpacing: "-0.03em" }}>
                Built for compliance professionals, wherever you operate.
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {[
                { role: "CISOs & IS Managers", body: "You need a consolidated view of compliance posture across frameworks, board-ready dashboards, and confidence that nothing falls through the cracks between audit cycles." },
                { role: "Compliance Analysts & Officers", body: "You need to stop maintaining parallel spreadsheets for every framework. ArborGRC gives you structured workflows, inline editing, and the ability to export back to Excel when a stakeholder demands it." },
              ].map(({ role, body }, i) => (
                <motion.div key={role} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger(i * 0.1)}
                  className="bg-white border border-stone-200 p-7" style={{ borderRadius: "4px" }}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#15803d" }}>{role}</p>
                  <p className="text-[14px] text-stone-600 leading-relaxed">{body}</p>
                </motion.div>
              ))}
            </div>
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-[14px] text-stone-500">
              <span className="font-semibold text-stone-600">Also used by:</span>{" "}
              Internal Auditors · GRC Consultants · Data Protection Officers · IT Risk Managers · Security Architects
            </motion.p>
          </div>
        </section>

        {/* ── PRICING ───────────────────────────────────────────────────────── */}
        <section id="pricing" className="border-t border-stone-200 bg-stone-50">
          <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-24">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mb-12">
              <p className="text-[11px] font-semibold tracking-[0.15em] mb-4" style={{ color: "#15803d", textTransform: "uppercase" }}>Pricing</p>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900" style={{ fontFamily: "var(--font-playfair), Georgia, serif", letterSpacing: "-0.03em" }}>
                Two plans. No hidden fees.
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px]">
              {/* Free */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger(0)}
                className="bg-white border border-stone-200 p-7 flex flex-col" style={{ borderRadius: "4px" }}
              >
                <h3 className="text-lg font-bold text-stone-900 mb-1" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Free</h3>
                <p className="text-[14px] text-stone-500 mb-5">For teams starting their GRC journey</p>
                <p className="text-3xl font-bold text-stone-900 mb-1" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>$0</p>
                <p className="text-[13px] text-stone-400 mb-7">No credit card needed</p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {FREE_FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[14px] text-stone-600">
                      <Check size={15} className="text-green-600 shrink-0 mt-0.5" />{f}
                    </li>
                  ))}
                </ul>
                <Link href="#get-started"
                  className="inline-flex items-center justify-center h-11 px-6 text-[14px] font-semibold border border-stone-200 text-stone-700 hover:border-green-700 hover:text-green-700 transition-colors"
                  style={{ borderRadius: "4px" }}
                >Get started free</Link>
              </motion.div>

              {/* Enterprise */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger(0.08)}
                className="bg-white p-7 flex flex-col relative" style={{ border: "2px solid #15803d", borderRadius: "4px" }}
              >
                <span className="absolute -top-3 left-6 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 text-white" style={{ backgroundColor: "#15803d", borderRadius: "3px" }}>
                  Recommended
                </span>
                <h3 className="text-lg font-bold text-stone-900 mb-1" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Enterprise</h3>
                <p className="text-[14px] text-stone-500 mb-5">For organisations with compliance programs at scale</p>
                <p className="text-3xl font-bold text-stone-900 mb-1" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Custom</p>
                <p className="text-[13px] text-stone-400 mb-7">Pricing based on team size and scope</p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {ENTERPRISE_FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[14px] text-stone-600">
                      <Check size={15} className="text-green-600 shrink-0 mt-0.5" />{f}
                    </li>
                  ))}
                </ul>
                <Link href="#get-started"
                  className="inline-flex items-center justify-center h-11 px-6 text-[14px] font-semibold text-white transition-colors"
                  style={{ backgroundColor: "#15803d", borderRadius: "4px" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#166534")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#15803d")}
                >Talk to us</Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── GET STARTED / TRIAL FORM ──────────────────────────────────────── */}
        <section id="get-started" className="border-t border-stone-200">
          <div className="mx-auto max-w-[600px] px-6 py-20 md:py-24">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-3 text-center" style={{ fontFamily: "var(--font-playfair), Georgia, serif", letterSpacing: "-0.03em" }}>
                Get early access to ArborGRC.
              </h2>
              <p className="text-[15px] text-stone-500 mb-10 text-center max-w-md mx-auto leading-relaxed">
                Tell us about your team and we&apos;ll set up your workspace. No credit card, no commitment.
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger(0.1)}>
              <TrialForm />
            </motion.div>
          </div>
        </section>

        {/* ── CTA BANNER ────────────────────────────────────────────────────── */}
        <section style={{ backgroundColor: "#15803d" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}
            className="mx-auto max-w-[1200px] px-6 py-16 md:py-20 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-playfair), Georgia, serif", letterSpacing: "-0.03em" }}>
              Your compliance program deserves structure.
            </h2>
            <p className="text-[15px] text-green-100 mb-6 max-w-lg mx-auto">
              Start free with one framework, or talk to us about your enterprise needs.
            </p>
            <Link href="#get-started"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 text-[15px] font-semibold text-green-700 bg-white transition-colors hover:bg-green-50"
              style={{ borderRadius: "4px" }}
            >
              Get Early Access <ArrowRight size={16} />
            </Link>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
