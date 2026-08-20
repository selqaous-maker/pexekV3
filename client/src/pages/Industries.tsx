/**
 * Signal Atelier Midnight: global editorial industry map with cyan workflow signals and apricot human ownership.
 * The page is an overview, not proof of deployment in every listed industry; only Kitchens & Interior is linked.
 */
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, Route, ShieldCheck, UsersRound, X } from "lucide-react";
import { useState } from "react";

const groups = [
  {
    label: "Project, property and service enquiries",
    entries: [
      { name: "Kitchens & Interior", description: "Project enquiries that need structured information before a showroom visit, measurement, callback or other commercial next action.", featured: true },
      { name: "Home Services", description: "Incoming requests that need clearer context before scheduling, qualification or a human response." },
      { name: "Real Estate", description: "Buyer or property enquiries that need structured information before a viewing request or advisor handoff." },
    ],
  },
  {
    label: "Mobility, hospitality and guest journeys",
    entries: [
      { name: "Automotive", description: "First-interest, test-drive, service or follow-up requests that need a defined route to the relevant team." },
      { name: "Hospitality", description: "Guest enquiries, booking-related requests and service questions that may require approved information and human escalation." },
      { name: "Restaurants", description: "Reservation, menu, event or service enquiries that can be organized before a team member confirms the next step." },
    ],
  },
  {
    label: "Administrative and appointment-led contexts",
    entries: [
      { name: "Dental & Aesthetic Administration", description: "Administrative enquiries and appointment coordination, with sensitive or clinical matters routed to the appropriate human team." },
      { name: "Healthcare Administration", description: "Information collection, appointment coordination and administrative routing only, with no medical advice or clinical decision-making." },
      { name: "Education", description: "Programme, admissions, scheduling or information requests that need an approved first response and clear human follow-up." },
    ],
  },
  {
    label: "Digital demand and professional workflows",
    entries: [
      { name: "E-commerce", description: "Product, order, delivery or support enquiries organized according to the approved business process and human escalation rules." },
      { name: "Legal & Professional Services", description: "Initial enquiries and information collection structured for review, with professional judgment and advice remaining with the responsible team." },
    ],
  },
];

const workflowSteps = [
  ["01", "Demand source", "Website, WhatsApp, selected voice workflow or another approved source of enquiry."],
  ["02", "Approved context", "The information and first-level questions defined for the business process."],
  ["03", "Next action prepared", "A requested callback, appointment, review, handoff or other agreed next step."],
  ["04", "Human ownership", "The business confirms decisions, exceptions, feasibility and the customer relationship."],
];

const faqs = [
  ["Can PEXEK support any industry?", "PEXEK can assess a range of business contexts. The right workflow depends on where enquiries arrive, what information is needed, what should happen next and which decisions remain with the human team."],
  ["Can a workflow begin with one channel?", "Yes. A workflow can begin with the enquiry source creating the most avoidable work, such as a website, WhatsApp or an approved voice workflow. Additional channels should be added only when they fit the business context and agreed scope."],
  ["Does the industry determine what the workflow can do?", "Yes. Demand source, approved information, next action, applicable requirements and human ownership shape the workflow."],
  ["Can PEXEK make professional, technical or clinical decisions?", "No. Professional judgment, technical feasibility, clinical matters, pricing, exceptions and final decisions remain with the responsible human team."],
  ["How do we know where to begin?", "Begin with a workflow assessment describing where enquiries arrive, what context is missing and what next action the team needs to own."],
];

const industryNames = groups.flatMap((group) => group.entries);

function scrollToWorkflow() {
  document.getElementById("industry-standard")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function IndustriesHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return (
    <header className="site-header industries-header">
      <div className="container flex h-[76px] items-center justify-between">
        <a className="brand-mark" href="/" aria-label="PEXEK homepage">
          <img src="/assets/NeonBlueGeometricPEmblem.webp" alt="" className="brand-symbol h-10 w-10 object-contain" />
          <span className="brand-wordmark"><strong className="font-display">PEXEK</strong><small>Workflow system</small></span>
        </a>
        <nav className="hidden items-center gap-7 text-[0.86rem] font-medium lg:flex" aria-label="Primary navigation">
          <a href="/solutions" className="nav-link">Solutions</a>
          <a href="/industries" aria-current="page" className="nav-link industries-nav-active">Industries</a>
          <a href="/how-it-works" className="nav-link">How it works</a>
          <a href="/#about" className="nav-link">About</a>
        </nav>
        <a href="/#assessment" className="hidden h-11 items-center justify-center gap-2 rounded-md bg-[#18c9ff] px-5 text-[0.82rem] font-semibold text-[#03101f] shadow-[0_10px_28px_rgba(15,183,255,0.25)] hover:bg-[#74ddff] lg:inline-flex">See How PEXEK Could Work for Your Business <ArrowUpRight className="size-4" /></a>
        <button className="inline-flex size-11 items-center justify-center rounded-md border border-[#375572] bg-[#08172d] text-white lg:hidden" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Toggle navigation">
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {menuOpen && <div className="mobile-nav lg:hidden">
        <a href="/solutions" onClick={closeMenu} className="border-b border-[#17334e] py-4 text-left text-lg font-medium">Solutions</a>
        <a href="/industries" aria-current="page" onClick={closeMenu} className="border-b border-[#17334e] py-4 text-left text-lg font-medium">Industries</a>
        <a href="/how-it-works" onClick={closeMenu} className="border-b border-[#17334e] py-4 text-left text-lg font-medium">How it works</a>
        <a href="/#about" onClick={closeMenu} className="border-b border-[#17334e] py-4 text-left text-lg font-medium">About</a>
        <a href="/#assessment" onClick={closeMenu} className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#18c9ff] text-[#03101f]">See How PEXEK Could Work for Your Business <ArrowUpRight className="size-4" /></a>
      </div>}
    </header>
  );
}

export default function Industries() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": "https://pexek.com/industries#webpage", url: "https://pexek.com/industries", name: "PEXEK Industries | Customer Conversation Workflows by Business Context", description: "Explore how PEXEK workflows can be configured for kitchens, services, property, automotive, hospitality, healthcare administration, e-commerce and professional contexts—with clear human ownership.", inLanguage: "en" },
      { "@type": "ItemList", "@id": "https://pexek.com/industries#industry-contexts", name: "PEXEK industry contexts", itemListElement: industryNames.map((industry, index) => ({ "@type": "ListItem", position: index + 1, name: industry.name, description: industry.description, ...(industry.featured ? { item: "https://pexek.com/industries/kitchens-interior" } : {}) })) },
      { "@type": "FAQPage", "@id": "https://pexek.com/industries#faq", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
      { "@type": "BreadcrumbList", "@id": "https://pexek.com/industries#breadcrumb", itemListElement: [{ "@type": "ListItem", position: 1, name: "PEXEK", item: "https://pexek.com/" }, { "@type": "ListItem", position: 2, name: "Industries", item: "https://pexek.com/industries" }] },
    ],
  };

  return (
    <div className="industries-page min-h-screen overflow-x-hidden bg-[#f4f8fc] text-[#081528]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="grain" aria-hidden="true" />
      <div className="global-route-signature" aria-hidden="true"><span>INPUT</span><i /><b /><i /><b /><i /><b /><i /><b className="handoff" /><span>HANDOFF</span></div>
      <IndustriesHeader />
      <main>
        <section className="industries-hero">
          <div className="container relative grid items-center gap-12 pb-20 pt-12 lg:grid-cols-[1.02fr_.98fr] lg:pb-28 lg:pt-20">
            <div className="relative z-10 max-w-2xl">
              <div className="eyebrow"><span className="eyebrow-dot" /> PEXEK / INDUSTRIES</div>
              <h1 className="industries-hero-title mt-6">Workflows shaped around the <em>business action that matters next.</em></h1>
              <p className="mt-7 max-w-xl text-[1.08rem] leading-8 text-[#bed0df] md:text-[1.16rem]">PEXEK helps businesses organize customer conversations across selected channels, structure the first context, prepare the next action and route the decision to the right person.</p>
              <p className="mt-5 max-w-xl text-[0.98rem] leading-7 text-[#9fb8cb]">The operating standard stays consistent. The workflow changes with the industry, demand source, information required and human ownership defined for the business.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href="/#assessment" className="industries-primary-cta">See How PEXEK Could Work for Your Business <ArrowRight className="size-4" /></a>
                <a href="/industries/kitchens-interior" className="industries-secondary-cta">Explore Kitchens & Interior <ArrowUpRight className="size-4" /></a>
              </div>
            </div>
            <div className="industries-hero-visual" aria-label="Illustrative workflow from demand source to human ownership">
              <div className="industries-blueprint-grid" aria-hidden="true" />
              <div className="industries-hero-label">ILLUSTRATIVE OPERATING STANDARD</div>
              <div className="industries-hero-route"><div className="industries-hero-route-line" aria-hidden="true" /><div><span className="industries-route-dot cyan" />Demand source</div><div><span className="industries-route-dot cyan" />Next action prepared</div><div><span className="industries-route-dot apricot" />Human ownership</div></div>
              <div className="industries-hero-note">One standard.<br />Different contexts.</div>
            </div>
          </div>
        </section>

        <section className="industries-light-section industries-contexts-section">
          <div className="container">
            <div className="industries-section-intro"><div className="eyebrow"><span className="eyebrow-count">02</span> Industry contexts</div><h2 className="industries-section-title mt-5">Different industries. The same need for a clearer next action.</h2><p className="mt-6">Customer conversations look different across sectors, but the operational questions are often similar: where did the request arrive, what context is needed, what should happen next and when should a person take over?</p></div>
            <div className="industries-group-grid mt-12">{groups.map((group, groupIndex) => <section className="industries-group" key={group.label}><div className="industries-group-heading"><span>0{groupIndex + 1}</span><h3>{group.label}</h3></div><div className="industries-group-entries">{group.entries.map((entry) => entry.featured ? <a className="industries-entry industries-entry-featured" href="/industries/kitchens-interior" key={entry.name}><div><strong>{entry.name}</strong><p>{entry.description}</p></div><ArrowUpRight className="size-4" /></a> : <article className="industries-entry" key={entry.name}><strong>{entry.name}</strong><p>{entry.description}</p></article>)}</div></section>)}</div>
          </div>
        </section>

        <section id="industry-standard" className="industries-dark-section industries-standard-section">
          <div className="container"><div className="industries-section-intro dark"><div className="eyebrow"><span className="eyebrow-count">03</span> One operating standard</div><h2 className="industries-section-title mt-5">The industry changes. The handoff standard stays clear.</h2><p className="mt-6">A PEXEK workflow begins with a selected demand source, uses approved information and agreed questions, prepares a defined next action and routes the context to the person responsible for the decision.</p></div><div className="industries-workflow-route mt-12">{workflowSteps.map(([number, label, detail], index) => <div className={`industries-workflow-step${index === workflowSteps.length - 1 ? " human" : ""}`} key={number}><span>{number}</span><div><strong>{label}</strong><small>{detail}</small></div>{index < workflowSteps.length - 1 && <ArrowRight className="industries-step-arrow size-4" />}</div>)}</div><p className="industries-illustrative-note">Illustrative operating model. The actual channels, questions, integrations and handoff rules depend on the business context and agreed scope.</p></div>
        </section>

        <section className="industries-dark-section industries-boundaries-section">
          <div className="container"><div className="industries-section-intro dark"><div className="eyebrow"><span className="eyebrow-count">04</span> Context and control</div><h2 className="industries-section-title mt-5">Configured for the context. Controlled by the people who own the decision.</h2><p className="mt-6">Industry context determines what information may be collected, which next action is appropriate and when the workflow must stop or route to a person. It does not transfer responsibility for commercial, technical, professional or clinical decisions to the workflow.</p></div><div className="industries-boundaries-grid mt-12"><div className="industries-boundary-block"><h3>PEXEK can help organize</h3>{["Approved first responses.", "Agreed first-level questions.", "Structured conversation context.", "A requested next action.", "A defined handoff status such as response captured, qualification completed, summary prepared or human action requested."].map((item) => <p key={item}><Check className="size-4" />{item}</p>)}</div><div className="industries-boundary-block human"><h3>The business keeps</h3>{["Pricing, discounts, negotiation and commercial approval.", "Technical feasibility, design decisions and professional judgment.", "Availability, stock, delivery and service commitments.", "Sensitive, exceptional and complex requests.", "Final approval, relationship management and closing."].map((item) => <p key={item}><span className="industries-human-marker" />{item}</p>)}</div></div><div className="industries-control-note"><ShieldCheck className="size-4" />Where the workflow reaches the edge of its approved scope, it should stop, clarify or route the request to a person. Healthcare-related workflows remain limited to administrative enquiries, information collection, appointment coordination and human routing.</div></div>
        </section>

        <section className="industries-light-section industries-kitchens-section">
          <div className="container"><div className="industries-kitchens-panel"><div><div className="eyebrow"><span className="eyebrow-count">05</span> Focused context</div><h2 className="industries-section-title mt-5">For structured kitchen and interior showrooms, start with the Lead-to-Showroom workflow.</h2><p className="mt-6">Moroccan kitchen and interior showrooms can explore a focused workflow for organizing early project enquiries and preparing the next commercial action. The dedicated page explains the operational boundaries, eligibility process and showroom-specific context in French.</p><a href="/industries/kitchens-interior" className="industries-featured-link mt-7">Explore Kitchens & Interior <ArrowUpRight className="size-4" /></a></div><div className="industries-kitchens-aside"><span className="industries-context-label">Morocco · French</span><Route className="size-8 text-[#18c9ff]" /><strong>One specific commercial journey.</strong><p>PEXEK supports different business contexts. This focused pathway shows how the operating model can be applied to one specific commercial journey.</p></div></div></div>
        </section>

        <section className="industries-light-section industries-assessment-section"><div className="container"><div className="industries-assessment-layout"><div><div className="eyebrow"><span className="eyebrow-count">06</span> Workflow assessment</div><h2 className="industries-section-title mt-5">See how PEXEK could work for your business.</h2><p className="mt-6">Tell us which industry context you operate in, where enquiries arrive today and what your team needs to happen next. PEXEK will review the context before recommending a suitable starting workflow.</p><a href="/#assessment" className="industries-primary-cta light mt-8">See How PEXEK Could Work for Your Business <ArrowRight className="size-4" /></a><p className="industries-final-disclosure">No automatic scope is assumed. The workflow is discussed and defined around the business context, applicable requirements and human ownership.</p></div><div className="industries-faq" id="industry-faq">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown className="size-4" /></summary><p>{answer}</p></details>)}</div></div></div></section>
      </main>
      <footer className="bg-[#020718] py-10 text-[#c6d4ce]"><div className="container flex flex-col gap-8 md:flex-row md:items-end md:justify-between"><div><a href="/" className="flex items-center gap-2 text-white"><img src="/assets/NeonBlueGeometricPEmblem.webp" alt="" className="site-footer-logo size-9" /><span className="font-display font-semibold tracking-[-0.05em]">PEXEK</span></a><p className="mt-3 max-w-sm text-sm leading-6 text-[#9caea7]">Managed customer-conversation workflows with approved knowledge and human control.</p></div><div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#aebdb7]"><a href="/solutions">Solutions</a><a href="/industries">Industries</a><a href="/how-it-works">How it works</a><a href="/#assessment">Contact</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><span>© {new Date().getFullYear()} PEXEK</span></div></div></footer>
    </div>
  );
}
