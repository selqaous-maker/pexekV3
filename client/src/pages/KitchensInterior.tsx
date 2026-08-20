/** Signal Atelier Midnight: French-first Lead-to-Showroom funnel, controlled workflow, human-owned decision. */
import { useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  FileText,
  ArrowUpRight,
  Check,
  ChevronDown,
  Menu,
  MessageCircleMore,
  MoveRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xkodykaj";
const WHATSAPP_URL = "https://wa.me/212633323828?text=Bonjour%20PEXEK%2C%20je%20souhaite%20comprendre%20le%20workflow%20Lead-to-Showroom%20pour%20mon%20showroom.";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const goTo = (id: string) => {
    setMenuOpen(false);
    window.location.href = id === "how" ? "/how-it-works" : `/#${id}`;
  };
  return (
    <header className="site-header">
      <div className="container flex h-[76px] items-center justify-between">
        <a className="brand-mark" href="/" aria-label="PEXEK homepage">
          <img src="/assets/NeonBlueGeometricPEmblem.webp" alt="" className="brand-symbol h-10 w-10 object-contain" />
          <span className="brand-wordmark"><strong className="font-display">PEXEK</strong></span>
        </a>
        <nav className="hidden items-center gap-7 text-[0.86rem] font-medium lg:flex" aria-label="Navigation principale">
          <a href="/solutions" className="nav-link">Solutions</a>
          <button onClick={() => goTo("how")} className="nav-link">Comment ça marche</button>
          <a href="/industries" className="nav-link">Secteurs</a>
          <button onClick={() => goTo("about")} className="nav-link">À propos</button>
        </nav>
        <Button onClick={() => scrollToId("eligibility")} className="hidden h-11 rounded-md bg-[#18c9ff] px-5 text-[0.82rem] font-semibold text-[#03101f] shadow-[0_10px_28px_rgba(15,183,255,0.25)] hover:bg-[#74ddff] lg:inline-flex">Vérifier l’éligibilité <ArrowUpRight className="size-4" /></Button>
        <button className="inline-flex size-11 items-center justify-center rounded-md border border-[#375572] bg-[#08172d] text-white lg:hidden" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Ouvrir la navigation">
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {menuOpen && <div className="mobile-nav lg:hidden">
        <a href="/solutions" onClick={() => setMenuOpen(false)} className="border-b border-[#17334e] py-4 text-left text-lg font-medium">Solutions</a>{[['Comment ça marche', 'how'], ['À propos', 'about']].map(([label, id]) => <button key={id} onClick={() => goTo(id)} className="border-b border-[#17334e] py-4 text-left text-lg font-medium">{label}</button>)}<a href="/industries" onClick={() => setMenuOpen(false)} className="border-b border-[#17334e] py-4 text-left text-lg font-medium">Secteurs</a>
        <Button onClick={() => { setMenuOpen(false); scrollToId("eligibility"); }} className="mt-5 h-12 rounded-md bg-[#18c9ff] text-[#03101f]">Vérifier l’éligibilité <ArrowUpRight className="size-4" /></Button>
      </div>}
    </header>
  );
}

export default function KitchensInterior() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");
  const [hasValidationAttempt, setHasValidationAttempt] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setHasValidationAttempt(true);
    setFormError("");
    const hasSource = Array.from(form.querySelectorAll<HTMLInputElement>('input[name="enquiry_sources"]')).some((input) => input.checked);
    if (!form.checkValidity() || !hasSource) {
      setFormStatus("error");
      setFormError(hasSource ? "Veuillez compléter les champs requis et accepter la Privacy Notice." : "Veuillez sélectionner au moins une source actuelle de demandes et compléter les champs requis.");
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
      const response = await fetch(FORMSPREE_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      setHasValidationAttempt(false);
      setFormStatus("success");
    } catch {
      setFormStatus("error");
      setFormError("La demande n’a pas pu être envoyée. Réessayez ou contactez PEXEK via WhatsApp.");
    }
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": "https://pexek.com/industries/kitchens-interior#webpage", url: "https://pexek.com/industries/kitchens-interior", name: "PEXEK Lead-to-Showroom | Cuisines & Aménagement Intérieur au Maroc", description: "PEXEK aide les showrooms de cuisines et d’aménagement intérieur à organiser les demandes de leur site, structurer le contexte et préparer la prochaine action commerciale.", inLanguage: "fr" },
      { "@type": "Service", name: "PEXEK Lead-to-Showroom", serviceType: "Workflow de qualification de demandes et relais commercial pour showrooms de cuisines et aménagement intérieur", description: "Un workflow contrôlé pour organiser les demandes du site, recueillir les premières informations et transmettre le contexte à une équipe humaine.", provider: { "@type": "Organization", name: "PEXEK", url: "https://pexek.com" }, areaServed: { "@type": "Country", name: "Morocco" } },
    ],
  };

  return (
    <div className="kitchen-page min-h-screen overflow-x-hidden bg-[#f4f8fc] text-[#081528]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="grain" aria-hidden="true" />
      <div className="global-route-signature" aria-hidden="true"><span>DEMANDE</span><i /><b /><i /><b /><i /><b /><i /><b className="handoff" /><span>ÉQUIPE</span></div>
      <Header />
      <main>
        <section className="kitchen-hero">
          <div className="container relative grid gap-12 pb-20 pt-12 lg:grid-cols-[1.02fr_.98fr] lg:pb-28 lg:pt-20">
            <div className="relative z-10 max-w-2xl">
              <p className="kitchen-breadcrumb">PEXEK / SECTEURS / CUISINES & AMÉNAGEMENT INTÉRIEUR</p>
              <div className="eyebrow mt-6"><span className="eyebrow-dot" /> Pour showrooms de cuisines & aménagement intérieur au Maroc</div>
              <h1 className="kitchen-hero-title mt-6">Transformez chaque demande en <em>prochaine étape claire</em> pour votre showroom.</h1>
              <p className="mt-7 max-w-xl text-[1.06rem] leading-8 text-[#c1d3e2] md:text-[1.16rem]">PEXEK recueille les premières informations sur le projet, structure la demande et transmet à votre équipe le contexte nécessaire pour organiser une visite, un métrage ou un rappel.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button onClick={() => scrollToId("eligibility")} className="h-13 rounded-md bg-[#18c9ff] px-6 text-[0.9rem] font-semibold text-[#03101f] shadow-[0_14px_28px_rgba(15,183,255,0.26)] hover:bg-[#74ddff]">Vérifier l’éligibilité de mon showroom <ArrowRight className="size-4" /></Button>
                <Button onClick={() => scrollToId("workflow")} variant="outline" className="h-13 rounded-md border-[#52708e] bg-transparent px-6 text-[0.9rem] font-semibold text-white hover:bg-white/10">Voir le workflow Lead-to-Showroom <ArrowDown className="size-4" /></Button>
              </div>
              <p className="mt-8 flex items-center gap-2 text-sm text-[#b9cde0]"><span className="kitchen-human-dot" /> Votre équipe conserve les devis, la faisabilité et la décision finale.</p>
            </div>
            <div className="kitchen-hero-board" aria-label="Exemple de workflow">
              <div className="kitchen-board-grid" />
              <span className="kitchen-board-note">Exemple de workflow, adapté au processus de chaque showroom.</span>
              <div className="kitchen-route-card">
                {["Demande", "Informations projet", "Contexte structuré", "Visite / métrage / rappel"].map((step, index) => <div className="kitchen-route-step" key={step}><span className={index === 3 ? "kitchen-route-node handoff" : "kitchen-route-node"}>{String(index + 1).padStart(2, "0")}</span><span>{step}</span>{index < 3 && <i />}</div>)}
                <div className="kitchen-human-end"><Check className="size-4" /> Équipe commerciale</div>
              </div>
            </div>
          </div>
        </section>

        <section className="kitchen-section kitchen-problem">
          <div className="container grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <div><div className="eyebrow"><span className="eyebrow-count">01</span> Quand une demande arrive, la suite doit être claire</div><h2 className="section-title mt-5">Une bonne demande mérite plus qu’un simple message à rappeler.</h2></div>
            <p className="max-w-2xl text-lg leading-8 text-[#5b6d7e]">Quand les premières informations sont incomplètes, votre équipe doit reprendre les mêmes questions avant de savoir s’il faut proposer une visite, demander un métrage ou rappeler le client. PEXEK aide à préparer ce premier contexte pour que la suite soit plus simple à gérer.</p>
          </div>
          <div className="container kitchen-fragments mt-12">{[["Première réponse", "Répondre avec les informations approuvées."], ["Contexte projet", "Comprendre ce qui intéresse réellement le prospect."], ["Prochaine action", "Faire émerger la visite, le métrage ou le rappel adapté."], ["Relais commercial", "Transmettre un résumé utile à la bonne personne."]].map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>

        <section id="workflow" className="kitchen-workflow-section">
          <div className="container">
            <div className="max-w-2xl"><div className="eyebrow text-[#b9dcf0]"><span className="eyebrow-count border-[#448a81] text-[#b9dcf0]">02</span> Le parcours Lead-to-Showroom</div><h2 className="section-title mt-5">Un parcours simple pour préparer la prochaine action commerciale.</h2><p className="mt-6 text-lg leading-8 text-[#c4d7e4]">PEXEK ne remplace pas votre manière de vendre. Le workflow organise le premier niveau de la demande afin que votre équipe reçoive les informations nécessaires pour faire avancer le projet.</p></div>
            <div className="kitchen-workflow-route mt-12">{["Demande depuis votre site", "Réponse approuvée", "Premières questions sur le projet", "Résumé structuré", "Visite showroom, métrage ou rappel", "Confirmation par votre équipe"].map((step, index) => <div className="kitchen-workflow-step" key={step}><span className={index === 5 ? "step-number human" : "step-number"}>{String(index + 1).padStart(2, "0")}</span><div><strong>{step}</strong>{index === 5 && <small>Décision et confirmation humaines</small>}</div>{index < 5 && <MoveRight className="step-arrow size-4" />}</div>)}</div>
            <p className="kitchen-scope-note mt-7">Le workflow de demande depuis le site est le point de départ. WhatsApp ou la voix peuvent être ajoutés uniquement selon le périmètre retenu, la vérification technique et l’accord du showroom.</p>
          </div>
        </section>

        <section className="kitchen-section kitchen-qualification">
          <div className="container grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
            <div><div className="eyebrow"><span className="eyebrow-count">03</span> Les bonnes questions, puis le bon relais</div><h2 className="section-title mt-5">Préparer l’échange sans transformer la demande en devis automatique.</h2><p className="mt-6 text-lg leading-8 text-[#5b6d7e]">Les premières questions sont définies avec votre équipe. Elles servent à comprendre le type de projet et à préparer l’action suivante, sans prendre de décision commerciale ou technique à votre place.</p><a href="#eligibility" className="kitchen-text-link">Vérifier l’éligibilité de mon showroom <ArrowRight className="size-4" /></a></div>
            <div className="kitchen-qual-grid"><div className="kitchen-question-list"><h3>Exemple de questions</h3>{[["Quel type de projet envisagez-vous ?", "Cuisine, dressing/rangement, rénovation, aménagement intérieur, autre."], ["Dans quelle ville se situe le projet ?", "Ville ou zone générale."], ["À quel stade se trouve votre projet ?", "Réflexion, comparaison, prêt à avancer."], ["Quel délai envisagez-vous ?", "Prochainement, dans les prochains mois, à discuter."], ["Quelle est votre prochaine préférence ?", "Visite showroom, métrage, rappel humain."]].map(([question, answer]) => <div key={question}><strong>{question}</strong><span>{answer}</span></div>)}</div><aside className="kitchen-handoff-sample"><span className="sample-label">Exemple illustratif</span><h3>Résumé transmis à l’équipe</h3><dl><div><dt>Projet</dt><dd>Cuisine sur mesure</dd></div><div><dt>Ville</dt><dd>Casablanca</dd></div><div><dt>Stade</dt><dd>Projet en comparaison</dd></div><div><dt>Délai</dt><dd>Dans les prochains mois</dd></div><div><dt>Action</dt><dd>Visite showroom</dd></div></dl><p><span className="kitchen-human-dot" /> À confirmer par l’équipe : créneau, faisabilité, devis et suite commerciale.</p></aside></div>
          </div>
        </section>

        <div className="kitchen-resource-band">
          <div className="container">
            <aside className="kitchen-resource-card" aria-labelledby="lead-to-showroom-guide-title">
              <div className="kitchen-resource-icon" aria-hidden="true"><FileText className="size-5" /></div>
              <div className="kitchen-resource-copy">
                <h3 id="lead-to-showroom-guide-title">Guide pratique Lead-to-Showroom</h3>
                <p>Découvrez comment structurer les premières demandes et préparer un relais commercial plus clair.</p>
                <a href="/resources/guide-lead-to-showroom-showrooms-cuisines-maroc.pdf" download="guide-lead-to-showroom-showrooms-cuisines-maroc.pdf" className="kitchen-resource-link" aria-label="Télécharger le guide PDF Lead-to-Showroom">Télécharger le guide PDF <ArrowUpRight className="size-4" /></a>
                <span className="kitchen-resource-meta">PDF gratuit · 6 pages · Sans formulaire supplémentaire</span>
              </div>
            </aside>
          </div>
        </div>

        <section className="kitchen-responsibility-section">
          <div className="container"><div className="max-w-2xl"><div className="eyebrow text-[#b9dcf0]"><span className="eyebrow-count border-[#448a81] text-[#b9dcf0]">04</span> Automatisation contrôlée, décision humaine</div><h2 className="section-title mt-5">PEXEK prépare le contexte. Votre équipe garde les décisions qui comptent.</h2></div><div className="kitchen-boundary-grid mt-12"><div><h3>PEXEK organise selon le périmètre retenu</h3>{["Réponse approuvée à une demande", "Questions de qualification", "Contexte structuré du projet", "Demande de prochaine action", "Relais vers la bonne personne", "Suivi du statut du relais"].map((item) => <p key={item}><Check className="size-4" />{item}</p>)}</div><div className="human-column"><h3>Votre équipe décide toujours</h3>{["Devis final et prix", "Remises et négociation", "Stock et disponibilité", "Délais de livraison", "Faisabilité technique et choix de conception", "Closing et décision commerciale complexe"].map((item) => <p key={item}><span className="kitchen-human-dot" />{item}</p>)}</div></div><div className="kitchen-method-note"><strong>Un cadre clair pour démarrer.</strong><span>Le parcours commence avec une source de demande et un relais humain définis. La disponibilité dépend du fit du showroom, du canal retenu et du périmètre validé.</span></div></div>
        </section>

        <section className="kitchen-section kitchen-faq"><div className="container grid gap-10 lg:grid-cols-[.68fr_1.32fr]"><div><div className="eyebrow"><span className="eyebrow-count">05</span> Questions fréquentes</div><h2 className="section-title mt-5">Des réponses simples avant de parler de workflow.</h2></div><div className="kitchen-faq-list">{[["Le workflow peut-il établir un devis ?", "Non. Il peut recueillir et structurer les premières informations. Le devis reste confirmé par votre équipe."], ["Peut-il décider d’un prix ou d’une remise ?", "Non. Les décisions de prix, de remise et de négociation restent entre les mains du showroom."], ["Peut-il confirmer le stock ou un délai de livraison ?", "Non. Les disponibilités et les délais sont vérifiés et confirmés par votre équipe."], ["Peut-il décider si un projet est techniquement faisable ?", "Non. La faisabilité et les choix de conception restent confirmés par vos équipes techniques ou commerciales."], ["Est-ce que WhatsApp ou la voix sont inclus automatiquement ?", "Non. Le canal est choisi selon le périmètre, la vérification technique et l’accord du showroom."], ["PEXEK remplace-t-il le commercial ?", "Non. PEXEK organise le premier contexte et le relais. Votre équipe garde la relation, la décision et le closing."]].map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<ChevronDown className="size-4" /></summary><p>{answer}</p></details>)}</div></div></section>

        <section id="eligibility" className="kitchen-eligibility-section"><div className="container grid gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><div className="eyebrow"><span className="eyebrow-count">06</span> Évaluation de showroom</div><h2 className="section-title mt-5">Votre showroom est-il adapté à un workflow Lead-to-Showroom ?</h2><p className="mt-6 max-w-md text-lg leading-8 text-[#5b6d7e]">Expliquez-nous comment vos demandes arrivent aujourd’hui. PEXEK examine le contexte avant de proposer un workflow adapté.</p><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="assessment-contact-link"><MessageCircleMore className="size-4" /> Préférez WhatsApp ? Démarrer une conversation <ArrowUpRight className="size-3.5" /></a></div>
          <form noValidate onSubmit={handleSubmit} className={`assessment-form kitchen-form${formStatus === "submitting" ? " is-submitting" : ""}${hasValidationAttempt ? " validation-attempted" : ""}`} aria-describedby="kitchen-form-message" aria-busy={formStatus === "submitting"}><input type="hidden" name="_subject" value="New PEXEK Lead-to-Showroom Assessment" /><input type="hidden" name="form_source" value="PEXEK Lead-to-Showroom — Kitchens & Interior" /><input type="hidden" name="page_url" value="" /><input className="form-honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" /><div className="assessment-route" aria-hidden="true"><span>Demande</span><i /><b /><i /><b /><i /><b className="handoff" /><span>Équipe</span></div><div className="grid gap-5 sm:grid-cols-2"><label className="form-label">Nom complet<input required name="full_name" autoComplete="name" className="form-input" /></label><label className="form-label">Showroom / société<input required name="showroom_company" autoComplete="organization" className="form-input" /></label><label className="form-label">E-mail professionnel<input required type="email" name="email" autoComplete="email" className="form-input" placeholder="nom@entreprise.ma" /></label><label className="form-label">Ville<input required name="city" autoComplete="address-level2" className="form-input" placeholder="Casablanca" /></label><label className="form-label">Activité principale<select required name="main_activity" className="form-input default-select"><option value="">Sélectionner</option><option>Cuisine</option><option>Aménagement intérieur</option><option>Les deux</option><option>Autre</option></select></label><label className="form-label">Téléphone ou WhatsApp professionnel <span className="form-optional">Optionnel</span><input name="professional_phone_whatsapp" type="tel" autoComplete="tel" className="form-input" /></label></div><fieldset className="kitchen-sources"><legend>Sources actuelles des demandes <span>*</span></legend><div>{["Site web", "WhatsApp", "Téléphone", "Réseaux sociaux", "Autre"].map((source) => <label key={source}><input type="checkbox" name="enquiry_sources" value={source} />{source}</label>)}</div></fieldset><div className="grid gap-5 sm:grid-cols-2"><label className="form-label">Volume approximatif de demandes par semaine <span className="form-optional">Optionnel</span><select name="weekly_enquiry_volume" className="form-input default-select"><option value="">Sélectionner</option><option>0–10</option><option>11–30</option><option>31–60</option><option>61–150</option><option>150+</option></select></label><label className="form-label">Prochaine action la plus fréquente <span className="form-optional">Optionnel</span><select name="frequent_next_action" className="form-input default-select"><option value="">Sélectionner</option><option>Visite showroom</option><option>Métrage</option><option>Rappel</option><option>Autre</option></select></label></div><label className="form-label mt-5 block">Principal blocage actuel<textarea required name="main_workflow_blocker" className="form-input min-h-30 resize-y pt-3" placeholder="Par exemple : réponses lentes, informations incomplètes, relance ou prise de rendez-vous." /></label><label className="mt-5 flex items-start gap-3 text-xs leading-5 text-[#65736e]"><input required name="privacy_consent" value="yes" type="checkbox" className="mt-0.5 size-4 accent-[#087fe5]" /><span>J’accepte que PEXEK traite les informations soumises via Formspree afin d’examiner cette demande, conformément à la <a href="/privacy" className="font-semibold text-[#087fe5] underline underline-offset-2">Privacy Notice</a> et aux <a href="/terms" className="font-semibold text-[#087fe5] underline underline-offset-2">Terms</a>.</span></label><div id="kitchen-form-message" className="mt-5" aria-live="polite">{formStatus === "error" && <p role="alert" className="form-message form-message-error">{formError}</p>}{formStatus === "success" && <p role="status" className="form-message form-message-success">Merci. PEXEK examinera votre contexte showroom et vous contactera si le workflow Lead-to-Showroom semble adapté. Cette demande ne garantit pas l’acceptation d’un pilote.</p>}</div><div className="mt-6"><Button disabled={formStatus === "submitting"} type="submit" className="h-12 rounded-md bg-[#087fe5] px-6 font-semibold text-white hover:bg-[#0569bf] disabled:cursor-not-allowed disabled:opacity-70">{formStatus === "submitting" ? "Envoi de votre demande…" : "Vérifier l’éligibilité de mon showroom"} <ArrowRight className="size-4" /></Button></div></form>
        </div></section>
      </main>
      <footer className="bg-[#020718] py-10 text-[#c6d4ce]"><div className="container flex flex-col gap-8 md:flex-row md:items-end md:justify-between"><div><a href="/" className="flex items-center gap-2 text-white"><img src="/assets/NeonBlueGeometricPEmblem.webp" alt="" className="site-footer-logo size-9" /><span className="font-display font-semibold tracking-[-0.05em]">PEXEK</span></a><p className="mt-3 max-w-sm text-sm leading-6 text-[#9caea7]">Des workflows de conversation client structurés, avec des informations approuvées et un contrôle humain.</p></div><div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#aebdb7]"><a href="/industries">Secteurs</a><a href="/#about">À propos</a><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a><a href="mailto:hello@pexek.com">hello@pexek.com</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><span>© {new Date().getFullYear()} PEXEK</span></div></div></footer>
    </div>
  );
}
