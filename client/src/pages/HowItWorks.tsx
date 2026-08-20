import { ArrowDown, ArrowRight, ArrowUpRight, Check, CircleDot, Hand, Sparkles } from "lucide-react";

const stages = [
  { number: "01", name: "Assess", short: "Understand the current conversation and where it loses momentum.", body: "PEXEK reviews the demand source, the current first response, the information teams repeatedly request, the next action the business wants to prepare and the points where a person must take over." },
  { number: "02", name: "Design", short: "Define the workflow, approved information and boundaries.", body: "Together, the business and PEXEK agree which request types are in scope, which first-level questions are appropriate, what the workflow may say or prepare, and which situations must stop or escalate." },
  { number: "03", name: "Configure", short: "Connect the selected channel and the agreed handoff path.", body: "The selected workflow is configured around the approved response, questions, next action, status signals and human handoff. Any connection depends on the validated business context and agreed scope." },
  { number: "04", name: "Test", short: "Review realistic scenarios before the workflow is exposed.", body: "The business reviews illustrative conversations, expected requests and edge cases. Questions, boundaries and handoff behavior can be adjusted before the workflow is used with real customer conversations." },
  { number: "05", name: "Learn", short: "Review outcomes and decide the next improvement or scope decision.", body: "The business reviews what the workflow captured, where requests were handed off and which parts of the process may need clarification. Learn means a human-led review and improvement decision. It does not mean autonomous machine learning, automatic self-improvement or unapproved changes." },
];

const inputs = [
  ["Demand source and current friction", "Where requests arrive and where the current conversation loses momentum, such as slow responses, incomplete context or unclear routing."],
  ["Desired next action", "The outcome to prepare, such as a callback, appointment, showroom visit, review or qualification handoff."],
  ["Approved information and first-level questions", "The information and questions the team approves for the first layer of the workflow."],
  ["Exceptions and stop conditions", "The sensitive, complex, unusual or out-of-scope situations that must stop, clarify or route to a person."],
  ["Human ownership", "The person or team responsible for reviewing the context and confirming what happens next."],
];

const configureItems = [
  "A selected demand channel or combination of channels.",
  "Approved first responses, information requests and first-level questions.",
  "A defined next action, status signal and human handoff path.",
  "Selected calendar, CRM, webhook or business-tool connections where validated and in scope.",
  "Stop and escalation rules for complex, sensitive or out-of-scope requests.",
];

const testingItems = [
  "Normal, incomplete, ambiguous and clarification-required enquiries.",
  "Questions outside the approved information set and requests that need a human response.",
  "Sensitive, exceptional, complex or out-of-scope requests.",
  "Handoff summaries, status signals and the information visible to the responsible team.",
  "Changes, cancellations and cases where the business must make the decision.",
];

const faqs = [
  ["What does PEXEK need before defining a workflow?", "PEXEK needs the current conversation, its main friction, the desired next action, approved information and the situations that must remain human-owned. A perfect technical specification is not required at the first assessment stage."],
  ["Does PEXEK configure every channel or integration automatically?", "No. Channels, integrations and workflow categories are selected according to the business context and agreed scope. A workflow may use one channel or combine selected channels where appropriate."],
  ["How does PEXEK test a workflow before it is used?", "The business reviews illustrative normal, incomplete, ambiguous and edge-case scenarios. The review checks approved information, boundaries and handoff situations that require a person."],
  ["What happens when a request falls outside the approved scope?", "The workflow should stop, clarify or route the request to a person according to the agreed handoff rules. Sensitive, exceptional or complex requests remain human-owned."],
  ["Who remains responsible for the final decision?", "The business remains responsible for pricing, negotiation, feasibility, professional or clinical judgment, exceptions, final approval and the customer relationship."],
];

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebPage", "@id": "https://pexek.com/how-it-works#webpage", url: "https://pexek.com/how-it-works", name: "How PEXEK Works | Controlled Customer Conversation Workflows", description: "See how PEXEK moves from business context to a configured, tested and reviewed customer conversation workflow with human control at every important step." },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://pexek.com/" }, { "@type": "ListItem", position: 2, name: "How it works", item: "https://pexek.com/how-it-works" }] },
    { "@type": "FAQPage", "@id": "https://pexek.com/how-it-works#faq", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ],
};

function BrandMark() {
  return <a href="/" className="site-brand" aria-label="PEXEK"><img src="/assets/NeonBlueGeometricPEmblem.webp" alt="" className="site-brand-mark" /><span><strong>PEXEK</strong><small>WORKFLOW SYSTEM</small></span></a>;
}

function SiteHeader() {
  return <header className="site-header"><div className="container flex items-center justify-between"><BrandMark /><nav className="hidden items-center gap-7 text-[0.86rem] font-medium lg:flex" aria-label="Primary navigation"><a href="/solutions" className="nav-link">Solutions</a><a href="/how-it-works" aria-current="page" className="nav-link how-nav-active">How it works</a><a href="/industries" className="nav-link">Industries</a><a href="/#about" className="nav-link">About</a></nav><a href="/#assessment" className="header-cta">See How PEXEK Could Work for Your Business <ArrowUpRight className="size-4" /></a></div></header>;
}

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="eyebrow"><span className="eyebrow-count">{number}</span>{children}</div>;
}

export default function HowItWorks() {
  return <div className="min-h-screen bg-[#eef3f8] text-[#06152b]">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
    <SiteHeader />
    <main>
      <section className="hiw-hero">
        <div className="container hiw-hero-grid">
          <div className="hiw-hero-copy"><SectionLabel number="01">PEXEK / HOW IT WORKS</SectionLabel><h1>Turn a conversation problem into a workflow your team can own.</h1><p className="hiw-lead">PEXEK starts by understanding where customer conversations lose momentum, then helps define, configure and review a focused workflow around the next action that matters.</p><p className="hiw-support">The process is practical and controlled: approved information, clear boundaries, tested scenarios and a defined route back to the people responsible for the decision.</p><div className="hiw-hero-actions"><a href="/#assessment" className="hiw-primary-cta">See How PEXEK Could Work for Your Business <ArrowRight className="size-4" /></a><a href="/solutions" className="hiw-secondary-cta">Explore Solutions <ArrowUpRight className="size-4" /></a></div></div>
          <div className="hiw-process-visual" aria-label="Illustrative operating process"><span className="hiw-visual-label">Illustrative operating process</span><div className="hiw-signal-route">{stages.map((stage, index) => <div className={`hiw-signal-step${index === stages.length - 1 ? " handoff" : ""}`} key={stage.number}><span>{stage.number}</span><strong>{stage.name}</strong></div>)}</div><div className="hiw-visual-note">Approved scope.<br />Human ownership.</div></div>
        </div>
      </section>

      <section className="hiw-section hiw-process-section"><div className="container"><SectionLabel number="02">THE OPERATING PROCESS</SectionLabel><div className="hiw-section-heading"><h2>Five stages from a defined problem to a reviewed next step.</h2><p>Every workflow begins with the business context and stays within the scope that the business approves. The stages can be adapted to the selected channel, use case and operating requirements, but the control points remain clear.</p></div><div className="hiw-stage-route">{stages.map((stage) => <article className="hiw-stage" key={stage.number}><div className="hiw-stage-top"><span>{stage.number}</span><CircleDot className="size-4" /></div><h3>{stage.name}</h3><strong>{stage.short}</strong><p>{stage.body}</p></article>)}</div></div></section>

      <section className="hiw-section hiw-inputs-section"><div className="container hiw-two-col"><div className="hiw-sticky-heading"><SectionLabel number="03">BUSINESS INPUTS</SectionLabel><h2>The better the context, the clearer the workflow boundary.</h2><p>PEXEK does not begin by assuming that every conversation should be automated. The business provides the context needed to define one focused workflow and the conditions under which a human must remain involved.</p><a href="/solutions" className="hiw-text-link">Explore the solution categories <ArrowUpRight className="size-4" /></a></div><div><div className="hiw-input-list">{inputs.map(([title, body]) => <div className="hiw-input-row" key={title}><span className="hiw-row-signal" /><div><h3>{title}</h3><p>{body}</p></div></div>)}</div><div className="hiw-boundary-note"><Hand className="size-4" /><span>The business does not need to prepare a perfect technical specification. It does need to explain the current process, the desired next action and the decisions that must remain human-owned.</span></div></div></div></section>

      <section className="hiw-section hiw-config-section"><div className="container"><SectionLabel number="04">CONFIGURE AND TEST</SectionLabel><div className="hiw-section-heading"><h2>Configure the first layer. Test the edges before customer use.</h2><p>A PEXEK workflow is configured around selected information, agreed questions and a defined next action. Testing focuses on whether the workflow stays inside its approved boundary and routes the right context to the right person.</p></div><div className="hiw-boundary-grid"><div className="hiw-boundary-card"><div className="hiw-card-kicker"><Sparkles className="size-4" /> PEXEK may help configure</div><ul>{configureItems.map((item) => <li key={item}><Check className="size-4" />{item}</li>)}</ul></div><div className="hiw-boundary-card hiw-boundary-card-dark"><div className="hiw-card-kicker"><CircleDot className="size-4" /> Testing should review</div><ul>{testingItems.map((item) => <li key={item}><Check className="size-4" />{item}</li>)}</ul></div></div><div className="hiw-illustrative-note">The workflow is not a live product demonstration unless PEXEK explicitly identifies it as one. Diagrams, example conversations and process visuals on this page are illustrative operating examples.</div></div></section>

      <section className="hiw-section hiw-control-section"><div className="container hiw-control-grid"><div className="hiw-control-visual"><div className="hiw-control-route"><span>Approved scope</span><i /><span>Tested edge</span><i className="apricot" /><strong>Human decision</strong></div><div className="hiw-control-stamp">CONTROLLED START</div></div><div className="hiw-control-copy"><SectionLabel number="05">CONTROLLED START</SectionLabel><h2>Start with a defined workflow. Keep the decision with the team.</h2><p>A workflow should begin only after the business has reviewed the scope, approved the information and agreed what happens when the request reaches the edge of that scope. The team remains responsible for the final commercial, technical, professional or clinical decision.</p><div className="hiw-principles"><p><b>Start narrow.</b> Begin with a specific conversation type, channel or next action rather than activating every possible capability.</p><p><b>Keep approval visible.</b> Approved knowledge, questions, boundaries and handoff rules should remain clear to the responsible team.</p><p><b>Route exceptions.</b> Complex, sensitive, ambiguous or out-of-scope requests should stop, clarify or move to a person.</p><p><b>Review the outcome.</b> The business reviews captured context, handoff status and recurring friction before deciding whether to clarify, improve or expand the workflow.</p><p><b>Keep ownership human.</b> Pricing, negotiation, feasibility, professional judgment, availability commitments, final approval and relationship management remain with the business.</p></div><div className="hiw-human-callout">PEXEK prepares context and the next action. Your team keeps the decisions that matter.</div><div className="hiw-kitchen-example"><strong>Focused example · Kitchens &amp; Interior</strong><p>For a structured kitchen or interior showroom, the workflow might organize the first project enquiry and prepare a showroom visit, measurement or callback. The showroom team still confirms feasibility, pricing, availability and the next commercial decision.</p><a href="/industries/kitchens-interior">See the Lead-to-Showroom example <ArrowUpRight className="size-4" /></a><small>Example only. The actual workflow depends on the showroom process, selected channels and agreed scope.</small></div></div></div></section>

      <section className="hiw-section hiw-faq-section"><div className="container hiw-faq-grid"><div className="hiw-faq-intro"><SectionLabel number="06">NEXT STEP</SectionLabel><h2>See how the process could fit your business.</h2><p>Tell PEXEK where customer conversations currently lose momentum, which next action matters and where your team needs clearer context. The assessment starts with the existing workflow—not with a promise to automate everything.</p><a href="/#assessment" className="hiw-primary-cta">See How PEXEK Could Work for Your Business <ArrowRight className="size-4" /></a></div><div className="hiw-faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<ArrowDown className="size-4" /></summary><p>{answer}</p></details>)}</div></div></section>
    </main>
    <footer className="hiw-footer"><div className="container flex flex-col gap-8 md:flex-row md:items-end md:justify-between"><div><BrandMark /><p className="mt-3 max-w-sm text-sm leading-6 text-[#9caea7]">Managed customer-conversation workflows with approved knowledge and human control.</p></div><div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#aebdb7]"><a href="/solutions">Solutions</a><a href="/industries">Industries</a><a href="/how-it-works" aria-current="page">How it works</a><a href="/#assessment">Contact</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><span>© {new Date().getFullYear()} PEXEK</span></div></div></footer>
  </div>;
}
