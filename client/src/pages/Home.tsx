/**
 * Signal Atelier Midnight: editorial clarity, PEXEK navy/cyan signal route, human handoff, premium B2B.
 * V3.1 homepage only: no invented proof, pricing, data handling or product claims.
 */
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Check,
  ChevronDown,
  Globe2,
  Menu,
  MessageCircleMore,
  Phone,
  RefreshCw,
  ShieldCheck,
  UsersRound,
  Workflow,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const industryCards = [
  { title: "Kitchens & Interior", detail: "From project enquiry to the next commercial action", number: "01" },
  { title: "Automotive", detail: "From first interest to a test drive or service request", number: "02" },
  { title: "Home Services", detail: "From an incoming enquiry to a clearer booked-job path", number: "03" },
  { title: "Real Estate", detail: "From buyer enquiry to a structured viewing request", number: "04" },
  { title: "Dental & Aesthetic", detail: "Administrative enquiries and appointment coordination", number: "05" },
  { title: "Healthcare Administration", detail: "Information collection, coordination and human routing", number: "06" },
];

const capabilities = [
  { icon: Phone, label: "AI Voice Agents", body: "Handle configured inbound calls, answer approved questions and hand complex conversations to your team.", detail: "Inbound · approved questions · human transfer" },
  { icon: MessageCircleMore, label: "WhatsApp AI", body: "Respond to configured enquiries, collect approved information and move the conversation toward its next action.", detail: "First response · approved FAQs · escalation" },
  { icon: Workflow, label: "Lead Qualification", body: "Ask the questions your team needs before a human takes over, then structure the request for review.", detail: "Questions · context · routing" },
  { icon: CalendarCheck, label: "Appointment Booking", body: "Request or arrange appointments through supported calendar workflows where the scope allows it.", detail: "Requests · confirmations · reminders" },
  { icon: RefreshCw, label: "Follow-up & Support", body: "Keep approved conversations moving with reminders, FAQ handling and clearly defined human escalation.", detail: "Follow-up · support routing · next actions" },
  { icon: Globe2, label: "Integrations & Control", body: "Connect selected calendars, CRM, webhooks and business tools while keeping access and handoff controlled.", detail: "Scoped tools · workflow status · managed access" },
];

const workflowSteps = [
  ["01", "Review", "Map the current customer conversation and where it loses momentum."],
  ["02", "Define", "Choose one workflow and agree the knowledge, questions and boundaries."],
  ["03", "Configure", "Connect the selected channel, next action and human handoff."],
  ["04", "Test", "Review real scenarios and edge cases before the workflow is exposed."],
  ["05", "Learn", "Launch in a controlled way, review the outcome and decide the next step."],
];

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xkodykaj";
const WHATSAPP_URL = "https://wa.me/212633323828?text=Hello%20PEXEK%2C%20I%20would%20like%20to%20understand%20how%20a%20customer-conversation%20workflow%20could%20work%20for%20my%20business.";
const FOUNDER_LINKEDIN_URL = "https://www.linkedin.com/in/salah-eddine-el-qaous-2b131b140/";
const PEXEK_LINKEDIN_URL = "https://www.linkedin.com/company/pexek-agency/";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ArrowDownIcon() {
  return <ChevronDown className="size-4" />;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (window.location.pathname !== "/" || window.location.hash !== "#assessment") return;

    const scrollToAssessment = () => {
      const assessment = document.getElementById("assessment");
      if (!assessment) return;
      const headerOffset = 90;
      const targetTop = assessment.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: "auto" });
    };

    const timers = [0, 150, 350, 700, 1200, 1800].map((delay) => window.setTimeout(scrollToAssessment, delay));
    window.addEventListener("load", scrollToAssessment, { once: true });

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("load", scrollToAssessment);
    };
  }, []);

  const chooseIndustry = (industry: string) => {
    setSelectedIndustry(industry);
    setFormStatus("idle");
    setFormError("");
    setTimeout(() => scrollToId("assessment"), 0);
  };

  const handleAssessmentSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setFormError("");
    if (!form.checkValidity()) {
      setFormStatus("error");
      setFormError("Please complete all required fields, use a valid work email and confirm the Privacy Notice.");
      form.reportValidity();
      return;
    }
    setFormStatus("submitting");
    try {
      const data = new FormData(form);
      if (String(data.get("website") || "").trim()) {
        setFormStatus("success");
        return;
      }
      data.set("page_url", window.location.href);
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Formspree request failed");
      form.reset();
      setSelectedIndustry("");
      setFormStatus("success");
    } catch {
      setFormStatus("error");
      setFormError("We could not submit your request. Please try again or contact PEXEK directly through WhatsApp or email.");
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f4f8fc] text-[#081528]">
      <div className="grain" aria-hidden="true" />
      <div className="global-route-signature" aria-hidden="true"><span>INPUT</span><i /><b /><i /><b /><i /><b /><i /><b /><i /><b className="handoff" /><span>HANDOFF</span></div>
      <header className="site-header">
        <div className="container flex h-[76px] items-center justify-between">
          <button className="brand-mark" onClick={() => scrollToId("top")} aria-label="PEXEK — Back to top">
            <img src="/assets/NeonBlueGeometricPEmblem.webp" alt="" className="brand-symbol h-10 w-10 object-contain" />
            <span className="brand-wordmark"><strong className="font-display">PEXEK</strong><small>Workflow system</small></span>
          </button>
          <nav className="hidden items-center gap-7 text-[0.86rem] font-medium lg:flex" aria-label="Primary navigation">
            <a href="/solutions" className="nav-link">Solutions</a>
            <a href="/how-it-works" className="nav-link">How it works</a>
            <a href="/industries" className="nav-link">Industries</a>
            <button onClick={() => scrollToId("about")} className="nav-link">About</button>
          </nav>
          <Button onClick={() => scrollToId("assessment")} className="hidden h-11 rounded-md bg-[#18c9ff] px-5 text-[0.82rem] font-semibold text-[#03101f] shadow-[0_10px_28px_rgba(15,183,255,0.25)] hover:bg-[#74ddff] lg:inline-flex">
            See How PEXEK Could Work <ArrowUpRight className="size-4" />
          </Button>
          <button className="inline-flex size-11 items-center justify-center rounded-md border border-[#375572] bg-[#08172d] text-white lg:hidden" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Toggle navigation">
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-nav lg:hidden">
            <a href="/solutions" onClick={() => setMenuOpen(false)} className="border-b border-[#17334e] py-4 text-left text-lg font-medium">Solutions</a>
{[['How it works', '/how-it-works'], ['About', 'about']].map(([label, id]) => (
               id.startsWith('/') ? <a key={id} href={id} onClick={() => setMenuOpen(false)} className="border-b border-[#17334e] py-4 text-left text-lg font-medium">{label}</a> : <button key={id} onClick={() => { setMenuOpen(false); scrollToId(id); }} className="border-b border-[#17334e] py-4 text-left text-lg font-medium">{label}</button>
             ))}
            <a href="/industries" onClick={() => setMenuOpen(false)} className="border-b border-[#17334e] py-4 text-left text-lg font-medium">Industries</a>
            <Button onClick={() => { setMenuOpen(false); scrollToId("assessment"); }} className="mt-5 h-12 rounded-md bg-[#18c9ff] text-[#03101f]">See How PEXEK Could Work <ArrowUpRight className="size-4" /></Button>
          </div>
        )}
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="container relative grid items-center gap-12 pb-20 pt-12 lg:grid-cols-[1.04fr_0.96fr] lg:pb-28 lg:pt-20">
            <div className="relative z-10 max-w-2xl">
              <div className="eyebrow"><span className="eyebrow-dot" /> Managed conversation workflows</div>
              <h1 className="hero-title mt-6">Turn customer conversations into <em>clear next actions.</em></h1>
              <p className="mt-7 max-w-xl text-[1.08rem] leading-8 text-[#bed0df] md:text-[1.16rem]">PEXEK designs and manages AI voice, WhatsApp and website workflows that respond to enquiries, qualify requests, arrange the next action and hand useful context to your team.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button onClick={() => scrollToId("assessment")} className="h-13 rounded-md bg-[#18c9ff] px-6 text-[0.91rem] font-semibold text-[#03101f] shadow-[0_14px_28px_rgba(15,183,255,0.26)] hover:bg-[#74ddff]">See How PEXEK Could Work for Your Business <ArrowRight className="size-4" /></Button>
                <a href="/how-it-works" className="inline-flex h-13 items-center justify-center gap-2 rounded-md border border-[#52708e] bg-transparent px-6 text-[0.91rem] font-semibold text-white hover:bg-white/10 hover:text-white">See How It Works <ArrowDownIcon /></a>
              </div>
              <div className="mt-10 flex items-center gap-3 text-sm text-[#abc0d4]"><span className="grid size-8 place-items-center rounded-full bg-[#102b42] text-[#18c9ff]"><UsersRound className="size-4" /></span><span>Approved knowledge. Human control. Operational handoff signals.</span></div>
            </div>
            <div className="hero-visual">
              <div className="hero-image-shell"><img src="/assets/pexek-hero-signal-atelier_064b6c56.webp" alt="An abstract route showing a customer conversation becoming a human-owned next action" className="hero-image" /><div className="image-tint" /></div>
              <div className="hero-route-card card-float">
                <div className="mb-4 flex items-center justify-between"><span className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#70807a]">Signal route</span><span className="route-live">Configured</span></div>
                <div className="route-row"><span className="route-node route-node-1"><MessageCircleMore className="size-3.5" /></span><span>Inbound enquiry</span></div><div className="route-line" />
                <div className="route-row"><span className="route-node route-node-2"><Workflow className="size-3.5" /></span><span>Approved qualification</span></div><div className="route-line" />
                <div className="route-row"><span className="route-node route-node-3"><UsersRound className="size-3.5" /></span><span>Human-owned next action</span></div>
              </div>
              <div className="hero-note">One workflow.<br />A clearer handoff.</div>
              <div className="hero-business-note"><span>Route blueprint</span><strong>Inbound → qualify → next action → human handoff</strong></div>
            </div>
          </div>
          <div className="container"><div className="hero-rule" /></div>
        </section>

        <section id="solution" className="section-space">
          <div className="container">
            <div className="section-intro grid gap-8 lg:grid-cols-[0.65fr_1fr] lg:items-end"><div><div className="eyebrow"><span className="eyebrow-count">01</span> What PEXEK can handle</div><h2 className="section-title mt-5">One managed system for customer conversations.</h2></div><p className="max-w-2xl text-lg leading-8 text-[#5b6964]">Configure the channels and workflow steps your business needs—from the first enquiry to qualification, next action and human handoff. Each workflow remains approved, scoped and managed.</p></div>
            <div className="capability-manual mt-14">
              {capabilities.map(({ icon: Icon, label, body, detail }, index) => <article key={label} className="capability-panel"><div className="flex items-start justify-between"><span className="capability-index">0{index + 1}</span><span className="grid size-10 place-items-center bg-[#e7f7ff] text-[#087fe5]"><Icon className="size-[18px]" /></span></div><div className="capability-route" aria-hidden="true"><i /><b /><i /><b /><i /><b className="handoff" /></div><h3 className="mt-7 font-display text-[1.45rem] font-medium tracking-[-0.05em]">{label}</h3><p className="mt-3 text-sm leading-6 text-[#66736e]">{body}</p><span className="capability-detail">{detail}</span></article>)}
            </div>
            <div className="section-route-lane" aria-hidden="true"><span className="route-caption">Configured capabilities</span><i /><span className="route-cyan-node" /><i /><span className="route-cyan-node" /><i /><span className="route-cyan-node" /><i /><span className="route-apricot-node" /><span className="route-caption route-caption-end">Human handoff</span></div>
            <p className="mt-5 max-w-3xl text-xs leading-5 text-[#7b8581]">Availability depends on the selected channel, client environment, country, approved use case and agreed scope. PEXEK does not present every capability as active for every client.</p>
          </div>
        </section>

        <section className="signal-break" aria-label="How PEXEK organizes a conversation">
          <div className="container grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center"><div><div className="eyebrow text-[#b6e2db]"><span className="eyebrow-count border-[#448a81] text-[#b6e2db]">02</span> The operational model</div><h2 className="section-title mt-5 max-w-lg">One system. Many business contexts.</h2></div><div className="flow-strip">{[["Capture", "Voice · WhatsApp · Web"], ["Qualify", "Approved questions"], ["Act", "Next action"], ["Handoff", "Human context"]].map(([label, body], index) => <div className="flow-step" key={label}><span className="flow-number">0{index + 1}</span><span className="flow-label">{label}</span><span className="flow-detail">{body}</span></div>)}</div></div>
          <div className="container"><div className="measurement-note"><span className="measurement-label">Measured handoff</span><span>Response captured</span><i /><span>Qualification completed</span><i /><span>Summary created</span><i /><span>Human handoff requested</span><i /><span>Next-action status</span></div></div>
        </section>

        <section id="how" className="section-space bg-[#eef3f8]"><div className="container grid gap-14 lg:grid-cols-[0.72fr_1.28fr]"><div className="lg:sticky lg:top-24 lg:h-fit"><div className="eyebrow"><span className="eyebrow-count">03</span> How it works</div><h2 className="section-title mt-5">Built around a controlled workflow, not a big-bang rollout.</h2><p className="mt-6 max-w-md leading-7 text-[#62706b]">The first step is to understand what happens today—not to automate every conversation at once.</p><div className="evidence-photo mt-10"><img src="/assets/pexek-workflow-detail_54c4a6ba.webp" alt="A tactile representation of a managed customer workflow" className="aspect-[4/3] w-full rounded-[0.45rem] object-cover shadow-[0_20px_40px_rgba(18,35,31,0.08)]" /><span className="photo-note photo-note-top">Approved questions</span><span className="photo-route" aria-hidden="true"><i /><b /><i /><b className="handoff" /></span><span className="photo-note photo-note-bottom">Context, ready for review</span></div></div><div className="workflow-list">{workflowSteps.map(([number, title, body]) => <div key={number} className="workflow-item"><span className="workflow-index">{number}</span><div><h3 className="font-display text-2xl font-medium tracking-[-0.04em]">{title}</h3><p className="mt-2 max-w-xl leading-7 text-[#64716d]">{body}</p></div><ArrowUpRight className="workflow-arrow size-5" /></div>)}</div></div></section>

        <section className="section-space" id="industries"><div className="container"><div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div className="max-w-2xl"><div className="eyebrow"><span className="eyebrow-count">04</span> Industry workflows</div><h2 className="section-title mt-5">Designed around the next action that matters in your business.</h2></div><a href="/industries" className="text-link">Explore All Industries <ArrowRight className="size-4" /></a></div><div className="industry-manual mt-12"><aside className="industry-control-rail"><span>PEXEK / ROUTE CONTEXTS</span><strong>One operating standard.<br />Different business actions.</strong><div className="control-rail-route" aria-hidden="true"><i /><b /><i /><b /><i /><b className="handoff" /></div><small>Inbound → qualify → next action → human review</small></aside><div className="industry-panel-grid">{industryCards.map((card) => <button onClick={() => card.title === "Kitchens & Interior" ? window.location.assign("/industries/kitchens-interior") : chooseIndustry(card.title)} key={card.title} className="industry-card group text-left"><div className="flex items-start justify-between"><span className="text-xs font-semibold text-[#87928d]">CONTEXT {card.number}</span><ArrowUpRight className="size-4 text-[#087fe5] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></div><div className="industry-route-mini" aria-hidden="true"><i /><b /><i /><b /><i /><b className="handoff" /></div><h3 className="mt-8 font-display text-[1.45rem] font-medium tracking-[-0.05em]">{card.title}</h3><p className="mt-3 max-w-[18rem] text-sm leading-6 text-[#65726d]">{card.detail}</p><span className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#087fe5]">{card.title === "Kitchens & Interior" ? "Discover Lead-to-Showroom" : "Assess fit"} <ArrowRight className="size-3.5" /></span></button>)}</div></div><p className="mt-5 max-w-3xl text-sm leading-6 text-[#697671]">Some workflows are subject to industry, channel, country and data-handling requirements. A workflow assessment confirms fit before any deployment is proposed.</p></div></section>

        <section id="about" className="section-space responsibility-section text-[#f6f3ed]"><div className="container grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center"><div className="evidence-photo"><img src="/assets/pexek-human-handoff_0a838c5c.webp" alt="A human team reviewing the next action in a customer workflow" className="aspect-[3/2] w-full rounded-[0.45rem] object-cover" /><span className="photo-note photo-note-top">Structured handoff</span><span className="photo-route photo-route-light" aria-hidden="true"><i /><b /><i /><b className="handoff" /></span><div className="absolute -bottom-4 right-5 rounded-md bg-[#f0af79] px-4 py-3 text-sm font-semibold text-[#402519] shadow-lg">Human decision stays human.</div></div><div className="max-w-xl"><div className="eyebrow text-[#b6e2db]"><span className="eyebrow-count border-[#448a81] text-[#b6e2db]">05</span> Built for responsibility</div><h2 className="section-title mt-5">AI handles the repetitive first layer. Your team keeps the final decision.</h2><p className="mt-6 text-lg leading-8 text-[#c4d0cc]">PEXEK starts with approved knowledge, selected questions and a clear route back to the people who own the relationship. Quotes, technical decisions and complex cases stay with the human team.</p><div className="mt-9 grid gap-4 sm:grid-cols-2">{["Approved knowledge", "Human escalation", "Minimum data", "Controlled review"].map((item) => <div className="flex items-center gap-3 text-sm text-[#d9e4df]" key={item}><Check className="size-4 text-[#60d6ff]" />{item}</div>)}</div></div></div></section>

        <section className="founder-section"><div className="container grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end"><div className="founder-portrait"><img src="/assets/pexek-founder-salah-el-qaous_7f249be5.webp" alt="Salah Eddine El Qaous, Founder of PEXEK" /><div className="founder-portrait-route" aria-hidden="true"><i /><b /><i /><b className="handoff" /></div><div className="founder-portrait-label"><span>Founder / PEXEK</span><strong>Salah Eddine El Qaous</strong></div></div><div><div className="eyebrow"><span className="eyebrow-count">06</span> Founder-led</div><h2 className="section-title mt-5">Built around the workflow, not the hype.</h2><p className="mt-6 max-w-2xl text-lg leading-8 text-[#61728a]">PEXEK is built by Salah Eddine El Qaous around a simple operating principle: customer automation is useful only when it makes the next human action clearer. Every assessment starts with the existing workflow, its real friction and the decision a team still needs to own.</p><a className="founder-link" href={FOUNDER_LINKEDIN_URL} target="_blank" rel="noopener noreferrer">Connect with the founder on LinkedIn <ArrowUpRight className="size-4" /></a><div className="founder-meta"><span>Founder-led assessment</span><i /><span>No automatic campaign</span><i /><span>No obligation</span></div></div></div></section>

        <section id="assessment" className="assessment-section"><div className="container grid gap-12 lg:grid-cols-[0.72fr_1.28fr]"><div><div className="eyebrow"><span className="eyebrow-count">07</span> Workflow assessment</div><h2 className="section-title mt-5">See how PEXEK could work for your business.</h2><p className="mt-6 max-w-md leading-7 text-[#60706a]">Tell us where enquiries arrive today and what needs to happen next. PEXEK reviews the fit before suggesting any scoped workflow.</p><div className="mt-9 rounded-md border border-[#d8ddd5] bg-white/70 p-5 text-sm leading-6 text-[#5c6b66]"><strong className="block text-[#223530]">What happens next</strong> Your request is reviewed manually. Submitting this form does not start an automatic marketing campaign or guarantee acceptance for a PEXEK pilot.</div><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="assessment-contact-link"><MessageCircleMore className="size-4" /> Prefer WhatsApp? Start a conversation <ArrowUpRight className="size-3.5" /></a></div><form id="workflow-assessment-form" action={FORMSPREE_ENDPOINT} method="POST" onSubmit={handleAssessmentSubmit} className={`assessment-form${formStatus === "submitting" ? " is-submitting" : ""}`} aria-describedby="assessment-message" aria-busy={formStatus === "submitting"}><input type="hidden" name="_subject" value="New PEXEK Workflow Assessment" /><input type="hidden" name="form_source" value="PEXEK Global Homepage" /><input type="hidden" name="page_url" value="" /><input className="form-honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" /><div className="assessment-route" aria-hidden="true"><span>Conversation</span><i /><b /><i /><b /><i /><b className="handoff" /><span>Assessment</span></div><div className="grid gap-5 sm:grid-cols-2"><label className="form-label">Full name<input required name="full_name" autoComplete="name" className="form-input" placeholder="Your name" /></label><label className="form-label">Company<input required name="company" autoComplete="organization" className="form-input" placeholder="Company name" /></label><label className="form-label">Work email<input required type="email" name="email" autoComplete="email" className="form-input" placeholder="name@company.com" /></label><label className="form-label">Country<select required name="country" className="form-input default-select"><option value="">Select country</option><option>Morocco</option><option>United Kingdom</option><option>United Arab Emirates</option><option>Other</option></select></label><label className="form-label">Industry<select required name="industry" value={selectedIndustry} onChange={(event) => setSelectedIndustry(event.target.value)} className="form-input default-select"><option value="">Select industry</option>{industryCards.map((item) => <option key={item.title}>{item.title}</option>)}<option>Other qualified industry</option></select></label><label className="form-label">Approx. weekly enquiries<select required name="weekly_enquiries" className="form-input default-select"><option value="">Select volume</option><option>0–10</option><option>11–30</option><option>31–60</option><option>61–150</option><option>150+</option></select></label></div><label className="form-label mt-5 block">What needs to improve?<textarea name="workflow_problem" required className="form-input min-h-30 resize-y pt-3" placeholder="For example: slow first responses, incomplete context, appointment requests, follow-up or routing." /></label><label className="mt-5 flex items-start gap-3 text-xs leading-5 text-[#65736e]"><input required name="privacy_consent" value="yes" type="checkbox" className="mt-0.5 size-4 accent-[#087fe5]" /><span>I agree that PEXEK may process the submitted assessment information through Formspree to review and respond to this request, in line with the <a href="/privacy" className="font-semibold text-[#087fe5] underline underline-offset-2">Privacy Notice</a> and <a href="/terms" className="font-semibold text-[#087fe5] underline underline-offset-2">Terms</a>.</span></label><div id="assessment-message" className="mt-5" aria-live="polite">{formStatus === "error" && <p role="alert" className="form-message form-message-error">{formError}</p>}{formStatus === "success" && <p role="status" className="form-message form-message-success">Thank you. Your workflow assessment has been received. PEXEK will review the information and contact you if the workflow appears to be a suitable fit.</p>}</div><div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><Button disabled={formStatus === "submitting"} type="submit" className="h-12 rounded-md bg-[#087fe5] px-6 font-semibold text-white hover:bg-[#0569bf] disabled:cursor-not-allowed disabled:opacity-70">{formStatus === "submitting" ? "Submitting your assessment…" : "Request a Workflow Assessment"} <ArrowRight className="size-4" /></Button></div></form></div></section>
      </main>

      <footer className="bg-[#020718] py-10 text-[#c6d4ce]"><div className="container flex flex-col gap-8 md:flex-row md:items-end md:justify-between"><div><div className="flex items-center gap-2 text-white"><img src="/assets/NeonBlueGeometricPEmblem.webp" alt="" className="site-footer-logo size-9" /><span className="font-display font-semibold tracking-[-0.05em]">PEXEK</span></div><p className="mt-3 max-w-sm text-sm leading-6 text-[#9caea7]">Managed customer-conversation workflows with approved knowledge and human control.</p></div><div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#aebdb7]"><a href="/solutions">Solutions</a><a href="/industries">Industries</a><button onClick={() => scrollToId("assessment")}>Contact</button><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a><a href={PEXEK_LINKEDIN_URL} target="_blank" rel="noopener noreferrer">PEXEK on LinkedIn</a><a href="mailto:hello@pexek.com">hello@pexek.com</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><span>© {new Date().getFullYear()} PEXEK</span></div></div></footer>
    </div>
  );
}
