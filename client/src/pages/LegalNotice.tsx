/** Signal Atelier Midnight: plain, truthful legal-route placeholders until reviewed policy copy is approved. */
export default function LegalNotice({ type }: { type: "privacy" | "terms" }) {
  const isPrivacy = type === "privacy";
  const title = isPrivacy ? "Privacy Notice" : "Terms of Use";
  return (
    <main className="min-h-screen bg-[#f4f8fc] px-5 py-16 text-[#081528] sm:px-10">
      <div className="mx-auto max-w-3xl border-t-4 border-[#18c9ff] bg-white p-8 shadow-[0_22px_50px_rgba(10,50,85,0.09)] sm:p-12">
        <a href="/" className="text-sm font-semibold text-[#0569bf]">← Back to PEXEK</a>
        <p className="mt-12 text-xs font-bold uppercase tracking-[0.16em] text-[#59758b]">PEXEK / Legal route</p>
        <h1 className="mt-4 font-display text-5xl font-medium tracking-[-0.06em]">{title}</h1>
        {isPrivacy ? <><p className="mt-8 text-lg leading-8 text-[#536b7b]">PEXEK uses the information submitted through its workflow assessment forms to review the request, respond to the enquiry and discuss a possible workflow. Form submissions are processed through Formspree.</p><p className="mt-5 text-sm leading-7 text-[#536b7b]">Please do not submit payment-card, identity-document, medical, special-category or other unnecessary sensitive information. PEXEK may update this notice as its website and services develop.</p></> : <><p className="mt-8 text-lg leading-8 text-[#536b7b]">These Terms of Use govern access to the PEXEK website and requests submitted through its workflow assessment forms. The website provides general information about PEXEK’s managed customer-conversation workflows.</p><p className="mt-5 text-sm leading-7 text-[#536b7b]">Submitting a request does not create a service agreement, guarantee availability or authorize a deployment. Any services, scope, fees, data-handling arrangements and responsibilities are agreed separately in writing.</p></>}
        <p className="mt-6 text-sm leading-7 text-[#536b7b]">For a general enquiry, contact <a className="font-semibold text-[#0569bf]" href="mailto:hello@pexek.com">hello@pexek.com</a>.</p>
      </div>
    </main>
  );
}
