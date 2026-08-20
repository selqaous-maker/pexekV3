/** Signal Atelier Midnight: global solution architecture, configurable workflows, cyan route signals and visible human ownership. */
import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Check,
  ChevronDown,
  FileInput,
  Globe2,
  Hand,
  Menu,
  MessageCircleMore,
  Phone,
  RefreshCw,
  Route,
  UsersRound,
  Workflow,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  { icon: Phone, name: "AI Voice Agents", description: "Support selected inbound conversations and approved outbound workflows using defined information, clear boundaries and human escalation when needed.", boundary: "Channel use, consent, escalation and operating requirements depend on the agreed scope and applicable requirements." },
  { icon: MessageCircleMore, name: "WhatsApp AI", description: "Organize WhatsApp conversations, answer approved questions and prepare the next action within the agreed workflow.", boundary: "The channel, message types and escalation rules depend on the agreed scope." },
  { icon: Globe2, name: "Website Enquiry Automation", description: "Respond to and structure incoming website enquiries so the first context is easier for your team to review.", boundary: "The website workflow does not turn an enquiry into an automatic quote or final decision." },
  { icon: FileInput, name: "Lead Qualification", description: "Ask agreed first-level questions and organize the information needed to understand the request.", boundary: "Qualification does not guarantee that a request is suitable, profitable or technically feasible." },
  { icon: CalendarCheck, name: "Appointment Booking", description: "Arrange or request appointments according to the availability and confirmation rules defined by the business.", boundary: "The business retains control of availability, confirmation, changes and exceptions." },
  { icon: RefreshCw, name: "Follow-up Automation", description: "Support defined follow-up steps when a request needs a reminder, status check or human review.", boundary: "Follow-up does not replace judgment, relationship management or complex commercial communication." },
  { icon: Route, name: "Integrations and Human Handoff", description: "Connect the selected workflow to the relevant business process and route context to the right person when human action is required.", boundary: "The final connection and handoff process depend on the business environment and the scope validated for the workflow." },
];

const workflowSteps = [
  ["01", "Customer enquiry", "A request arrives through a selected channel."],
  ["02", "Approved response", "The first reply follows the information defined for the workflow."],
  ["03", "First-level qualification", "Agreed questions organize the initial context."],
  ["04", "Context prepared", "The relevant information is grouped for review."],
  ["05", "Next action requested", "The workflow prepares the intended next step."],
  ["06", "Human review and handoff", "A person confirms what happens next."],
];

const faqs = [
  ["Are all solution categories included automatically?", "No. PEXEK workflows are configured around the business context, selected channels, approved information and the handoff process. An assessment determines which categories are relevant."],
  ["Can PEXEK make decisions on behalf of the business?", "PEXEK can organize conversations and prepare a next action within an approved scope. Pricing, technical feasibility, availability, exceptions and complex commercial decisions remain with the business team."],
  ["Can selected voice, WhatsApp and website workflows work together?", "They can work together when the combination is appropriate for the business context and included in the agreed scope. The workflow should not assume that every channel is required."],
  ["Can PEXEK provide automatic quotes or prices?", "No. The workflow may collect and structure the first information, but quotes, prices, discounts and negotiation remain confirmed by the business team."],
  ["Does PEXEK replace a sales or support team?", "No. PEXEK is designed to organize the first context and prepare a clearer handoff. Your team keeps the relationship, judgment, decisions and closing."],
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SolutionsHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header solutions-header">
      <div className="container flex h-[76px] items-center justify-between">
        <a className="brand-mark" href="/" aria-label="PEXEK homepage">
          <img src="/assets/NeonBlueGeometricPEmblem.webp" alt="" className="brand-symbol h-10 w-10 object-contain" />
          <span className="brand-wordmark"><strong className="font-display">PEXEK</strong><small>Workflow system</small></span>
        </a>
        <nav className="hidden items-center gap-7 text-[0.86rem] font-medium lg:flex" aria-label="Primary navigation">
          <a href="/solutions" aria-current="page" className="nav-link solutions-nav-active">Solutions</a>
          <a href="/how-it-works" className="nav-link">How it works</a>
          <a href="/industries" className="nav-link">Industries</a>
          <a href="/#about" className="nav-link">About</a>
        </nav>
        <a href="/#assessment" className="hidden h-11 items-center justify-center gap-2 rounded-md bg-[#18c9ff] px-5 text-[0.82rem] font-semibold text-[#03101f] shadow-[0_10px_28px_rgba(15,183,255,0.25)] hover:bg-[#74ddff] lg:inline-flex">Request a Workflow Assessment <ArrowUpRight className="size-4" /></a>
        <button className="inline-flex size-11 items-center justify-center rounded-md border border-[#375572] bg-[#08172d] text-white lg:hidden" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Toggle navigation">
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {menuOpen && <div className="mobile-nav lg:hidden">
        <a href="/solutions" aria-current="page" onClick={closeMenu} className="border-b border-[#17334e] py-4 text-left text-lg font-medium">Solutions</a>
        <a href="/how-it-works" onClick={closeMenu} className="border-b border-[#17334e] py-4 text-left text-lg font-medium">How it works</a>
        <a href="/industries" onClick={closeMenu} className="border-b border-[#17334e] py-4 text-left text-lg font-medium">Industries</a>
        <a href="/#about" onClick={closeMenu} className="border-b border-[#17334e] py-4 text-left text-lg font-medium">About</a>
        <a href="/#assessment" onClick={closeMenu} className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#18c9ff] text-[#03101f]">Request a Workflow Assessment <ArrowUpRight className="size-4" /></a>
      </div>}
    </header>
  );
}

export default function Solutions() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": "https://pexek.com/solutions#webpage", url: "https://pexek.com/solutions", name: "PEXEK Solutions | AI Conversation Workflows with Human Control", description: "Explore PEXEK solution categories for voice, WhatsApp, website enquiries, qualification, booking and follow-up workflows—configured around your business with clear human handoff.", inLanguage: "en" },
      { "@type": "ItemList", "@id": "https://pexek.com/solutions#solution-categories", name: "PEXEK solution categories", itemListElement: categories.map((category, index) => ({ "@type": "ListItem", position: index + 1, name: category.name, description: category.description })) },
      { "@type": "FAQPage", "@id": "https://pexek.com/solutions#faq", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
    ],
  };

  return (
    <div className="solutions-page min-h-screen overflow-x-hidden bg-[#f4f8fc] text-[#081528]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="grain" aria-hidden="true" />
      <div className="global-route-signature" aria-hidden="true"><span>INPUT</span><i /><b /><i /><b /><i /><b /><i /><b className="handoff" /><span>HANDOFF</span></div>
      <SolutionsHeader />
      <main>
        <section className="solutions-hero">
          <div className="container relative grid items-center gap-12 pb-20 pt-12 lg:grid-cols-[1.02fr_.98fr] lg:pb-28 lg:pt-20">
            <div className="relative z-10 max-w-2xl">
              <div className="eyebrow"><span className="eyebrow-dot" /> PEXEK / SOLUTIONS</div>
              <h1 className="solutions-hero-title mt-6">Build the right workflow around every <em>customer enquiry.</em></h1>
              <p className="mt-7 max-w-xl text-[1.08rem] leading-8 text-[#bed0df] md:text-[1.16rem]">PEXEK helps businesses organize customer conversations across selected channels, qualify the first request, prepare the next action and pass useful context to the right person.</p>
              <p className="mt-5 max-w-xl text-[0.98rem] leading-7 text-[#9fb8cb]">The workflow is configured around your business context. Approved knowledge, escalation rules and human decisions remain part of the design.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href="/#assessment" className="solutions-primary-cta">See How PEXEK Could Work for Your Business <ArrowRight className="size-4" /></a>
                <button onClick={() => scrollToId("connected-workflow")} className="solutions-secondary-cta">See the workflow <ArrowDown className="size-4" /></button>
              </div>
            </div>
            <div className="solutions-hero-visual" aria-label="Illustrative workflow from customer enquiry to human handoff">
              <div className="solutions-blueprint-grid" aria-hidden="true" />
              <div className="solutions-route-label">ILLUSTRATIVE WORKFLOW</div>
              <div className="solutions-hero-route">
                <div className="solutions-hero-route-line" aria-hidden="true" />
                <div><span className="solutions-route-dot cyan" />Customer enquiry</div>
                <div><span className="solutions-route-dot cyan" />Approved qualification</div>
                <div><span className="solutions-route-dot apricot" />Human review and handoff</div>
              </div>
              <div className="solutions-hero-note">Selected channel.<br />Defined next action.</div>
            </div>
          </div>
        </section>

        <section id="solution-categories" className="solutions-light-section solutions-categories-section">
          <div className="container">
            <div className="solutions-section-intro"><div className="eyebrow"><span className="eyebrow-count">02</span> Solution categories</div><h2 className="solutions-section-title mt-5">Choose the workflow your business actually needs.</h2><p className="mt-6">PEXEK solutions are configurable building blocks. Depending on the channel, enquiry type and next action, a workflow may use one category or combine several. The final scope is defined after reviewing the business context.</p></div>
            <div className="solutions-category-grid mt-12">{categories.map(({ icon: Icon, name, description, boundary }) => <article className="solutions-category" key={name}><div className="solutions-category-icon"><Icon className="size-5" /></div><h3>{name}</h3><p>{description}</p><small>{boundary}</small></article>)}</div>
            <p className="solutions-category-note"><Hand className="size-4" /> Not every category is automatically included. The appropriate combination depends on the business context, channel, process and agreed scope.</p>
          </div>
        </section>

        <section id="connected-workflow" className="solutions-dark-section solutions-workflow-section">
          <div className="container"><div className="solutions-section-intro dark"><div className="eyebrow"><span className="eyebrow-count">03</span> One connected workflow</div><h2 className="solutions-section-title mt-5">The value is in the handoff between steps.</h2><p className="mt-6">A business may receive an enquiry through its website, WhatsApp or a selected voice workflow. PEXEK can organize the approved first response, collect agreed information, prepare the next action and pass the context to the team responsible for the decision.</p></div>
            <div className="solutions-workflow-route mt-12">{workflowSteps.map(([number, label, detail], index) => <div className={`solutions-workflow-step${index === workflowSteps.length - 1 ? " human" : ""}`} key={number}><span>{number}</span><div><strong>{label}</strong><small>{detail}</small></div>{index < workflowSteps.length - 1 && <ArrowRight className="solutions-step-arrow size-4" />}</div>)}</div>
            <p className="solutions-illustrative-note">Illustrative workflow. The actual sequence, channels and handoff rules are defined for each business context.</p><p className="solutions-scope-note">The workflow can be narrow and focused. It does not need to activate every solution category, and it should not introduce a channel or decision step that the business has not approved.</p>
          </div>
        </section>

        <section className="solutions-dark-section solutions-control-section">
          <div className="container"><div className="solutions-section-intro dark"><div className="eyebrow"><span className="eyebrow-count">04</span> Human control</div><h2 className="solutions-section-title mt-5">Automation prepares the context. People keep the decisions that matter.</h2><p className="mt-6">PEXEK can organize the first level of a conversation, but the business remains responsible for the decisions, approvals and exceptions that shape the customer relationship.</p></div><div className="solutions-control-grid mt-12"><div className="solutions-control-block"><h3>PEXEK can organize</h3>{["Approved first responses.", "Agreed qualification questions.", "Structured conversation context.", "A requested next action.", "A defined handoff status, such as response captured, qualification completed, summary prepared or human action requested."].map((item) => <p key={item}><Check className="size-4" />{item}</p>)}</div><div className="solutions-control-block human"><h3>The business keeps</h3>{["Pricing, discounts and negotiation.", "Technical feasibility and design decisions.", "Availability, stock and delivery commitments.", "Sensitive, exceptional or complex requests.", "Final approval, relationship management and closing."].map((item) => <p key={item}><span className="solutions-human-marker" />{item}</p>)}</div></div><div className="solutions-control-note">Where the workflow reaches the edge of its approved scope, it should stop, clarify or route the request to a person.</div></div>
        </section>

        <section className="solutions-light-section solutions-context-section">
          <div className="container"><div className="solutions-context-layout"><div className="solutions-section-intro"><div className="eyebrow"><span className="eyebrow-count">05</span> Configured for business context</div><h2 className="solutions-section-title mt-5">Start with the conversation that is creating the most avoidable work.</h2><p className="mt-6">The right starting point may be a website enquiry, a WhatsApp conversation, a selected voice workflow, an appointment process or a follow-up gap. PEXEK begins by examining the current source of demand, the information your team needs and the handoff that should happen next.</p></div><div className="solutions-context-panel"><div><span>01</span><strong>Where do requests arrive?</strong></div><div><span>02</span><strong>What information is usually missing?</strong></div><div><span>03</span><strong>Who needs to act next, and what must they confirm?</strong></div><p>A workflow assessment determines which categories are relevant. It does not assume that every channel or feature should be activated.</p></div></div></div>
        </section>

        <section id="assessment" className="solutions-light-section solutions-faq-section">
          <div className="container"><div className="solutions-faq-layout"><div className="solutions-section-intro"><div className="eyebrow"><span className="eyebrow-count">06</span> FAQ and assessment</div><h2 className="solutions-section-title mt-5">See how PEXEK could work for your business.</h2><p className="mt-6">Share the conversation source that matters most, the information your team needs and the point where a human should take over. PEXEK will examine the context before proposing a suitable workflow direction.</p><a href="/#assessment" className="solutions-primary-cta dark-text mt-8">Request a Workflow Assessment <ArrowRight className="size-4" /></a><span className="solutions-cta-note">No automatic scope is assumed. The workflow is discussed and defined around your business context.</span></div><div className="solutions-faq-list">{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<ChevronDown className="size-4" /></summary><p>{answer}</p></details>)}</div></div></div>
        </section>
      </main>
      <footer className="bg-[#020718] py-10 text-[#c6d4ce]"><div className="container flex flex-col gap-8 md:flex-row md:items-end md:justify-between"><div><div className="flex items-center gap-2 text-white"><img src="/assets/NeonBlueGeometricPEmblem.webp" alt="" className="site-footer-logo size-9" /><span className="font-display font-semibold tracking-[-0.05em]">PEXEK</span></div><p className="mt-3 max-w-sm text-sm leading-6 text-[#9caea7]">Managed customer-conversation workflows with approved knowledge and human control.</p></div><div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#aebdb7]"><a href="/solutions">Solutions</a><a href="/industries">Industries</a><a href="/#assessment">Contact</a><a href="https://wa.me/212633323828?text=Hello%20PEXEK%2C%20I%20would%20like%20to%20understand%20how%20a%20customer-conversation%20workflow%20could%20work%20for%20my%20business." target="_blank" rel="noopener noreferrer">WhatsApp</a><a href="https://www.linkedin.com/company/pexek-agency/" target="_blank" rel="noopener noreferrer">PEXEK on LinkedIn</a><a href="mailto:hello@pexek.com">hello@pexek.com</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><span>© {new Date().getFullYear()} PEXEK</span></div></div></footer>
    </div>
  );
}
