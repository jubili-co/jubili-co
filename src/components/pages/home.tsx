import { useEffect, useState, type FormEvent } from "react";
import { ArrowDownRight, ArrowRight, Check, ChevronDown } from "lucide-react";
import { submitForm } from "@/lib/ploy-forms/submit-form";

const HERO_IMAGE = "https://storage.googleapis.com/ployai/6d1453e3-c9c4-41e7-931a-adfacef75c3f/user/c78251d5-warm-daylight-rental-living-room.webp";
const PROOF_IMAGE = "https://storage.googleapis.com/ployai/6d1453e3-c9c4-41e7-931a-adfacef75c3f/user/508d1a1f-bright-furnished-apartment.webp";

type Lang = "de" | "en";

const copy = {
  de: {
    navCta: "Gespräch buchen",
    heroTitle: "Ihre Wohnung ist fertig. Jetzt muss sie sich rechnen.",
    heroSub: "Einrichtungskonzept, Sourcing und Styling für möblierte Vermietung in Wien. Von einer Architektin, die selbst vermietet.",
    call: "Kostenloses Gespräch buchen",
    heroMeta: "Konzept ab €890 · Wien und Umgebung · Übergabetermine in 4–6 Wochen möglich",
    doorsTitle: "Wo stehen Sie gerade?",
    doorsIntro: "Wählen Sie den Ausgangspunkt. Sie kommen direkt zu den Zahlen und Leistungen, die für Ihre Wohnung relevant sind.",
    doorA: "Ich richte eine Wohnung neu ein",
    doorADesc: "Übergabe steht an, Wohnung ist leer, Möbelbudget steht.",
    doorB: "Ich stelle auf möblierte Vermietung um",
    doorBDesc: "Mieterwechsel, Kurzzeitvermietung fällt weg, Rendite soll steigen.",
    launcherTitle: "Der Übergabetermin steht. Die Entscheidungen müssen nicht alle bei Ihnen landen.",
    launcherIntro: "Wer allein einrichtet, kauft nicht nur Möbel. Sie kaufen Recherchezeit, Lieferprobleme und Fehlentscheidungen mit.",
    converterTitle: "Von der Kurzzeitvermietung zu einem planbaren Mietprodukt.",
    converterIntro: "Seit Juli 2024 regelt die Wiener Bauordnung die kurzfristige touristische Vermietung stadtweit. Über 90 Tage pro Jahr ist eine Ausnahmebewilligung der MA 37 erforderlich; in ausgewiesenen Wohnzonen ist sie in der Praxis stark eingeschränkt.",
    disclaimer: "Keine Rechtsberatung. Bitte prüfen Sie Ihren Fall mit MA 37 oder Ihrer Rechtsberatung.",
    opportunity: "Die Alternative: möblierte Vermietung für 1–9 Monate an eine klar definierte, solvente Zielgruppe — Relocating Professionals, Corporate Secondees, Mitarbeitende internationaler Organisationen, Gastforschende und Ärztinnen oder Ärzte.",
    rolesTitle: "Wer übernimmt was?",
    rolesSub: "Klare Zuständigkeiten vor Projektstart. Damit weder Lieferfenster noch Liftmaße am Ende zur Überraschung werden.",
    timelineTitle: "Von der ersten Frage bis zur fertigen Wohnung.",
    proofTitle: "Design, das Gäste aushält und sich rechnen muss.",
    proofQuote: "Die meisten Innenarchitekten planen für die Person, die dort wohnt. Ich plane für die Person, die dafür bezahlt — und für die Eigentümerin, bei der die Rechnung aufgehen muss.",
    whyTitle: "Warum eine Architektin?",
    notForTitle: "Nicht das richtige Angebot für alle.",
    faqTitle: "Fragen vor dem ersten Gespräch.",
    contactTitle: "Erzählen Sie mir von Ihrer Wohnung.",
    contactSub: "In 20 Minuten klären wir Ausgangslage, Termin, Budget und ob ich die Richtige für Ihr Projekt bin.",
    formButton: "Anfrage senden",
    formSuccess: "Danke. Ihre Anfrage ist angekommen.",
  },
  en: {
    navCta: "Book a call",
    heroTitle: "Your apartment is finished. Now it has to earn.",
    heroSub: "Interior concepts, sourcing and styling for furnished rentals in Vienna. By an architect who runs a rental herself.",
    call: "Book a free call",
    heroMeta: "Concepts from €890 · Vienna and nearby · 4–6 week handovers possible",
    doorsTitle: "Where are you now?",
    doorsIntro: "Choose your starting point. You will go straight to the numbers and services relevant to your property.",
    doorA: "I am furnishing a new apartment",
    doorADesc: "The handover is set, the apartment is empty, the furniture budget is ready.",
    doorB: "I am switching to furnished letting",
    doorBDesc: "A tenant is leaving, short-term letting no longer works, returns need to improve.",
    launcherTitle: "The handover date is set. The decisions do not all have to land with you.",
    launcherIntro: "Furnishing alone does not only cost furniture. It adds research time, delivery problems and expensive wrong turns.",
    converterTitle: "From short-term letting to a predictable rental product.",
    converterIntro: "Since July 2024, Vienna’s building code regulates short-term tourist letting citywide. Beyond 90 days per year, an exemption from MA 37 is required; in designated residential zones it is heavily restricted in practice.",
    disclaimer: "Not legal advice. Please check your case with MA 37 or your legal adviser.",
    opportunity: "The alternative: furnished mid-term letting for 1–9 months to a defined, solvent audience — relocating professionals, corporate secondees, international-organisation staff, visiting researchers and doctors.",
    rolesTitle: "Who does what?",
    rolesSub: "Clear responsibilities before work begins, so delivery windows and lift dimensions never become last-minute surprises.",
    timelineTitle: "From the first question to a rental-ready apartment.",
    proofTitle: "Design that survives guests and has to pay for itself.",
    proofQuote: "Most interior designers plan for the person who lives there. I plan for the person who pays to stay there — and for the owner whose numbers have to work.",
    whyTitle: "Why an architect?",
    notForTitle: "Not the right offer for everyone.",
    faqTitle: "Questions before the first call.",
    contactTitle: "Tell me about your apartment.",
    contactSub: "In 20 minutes we will clarify the property, timing, budget and whether I am the right fit.",
    formButton: "Send enquiry",
    formSuccess: "Thank you. Your enquiry has arrived.",
  },
};

const packages = [
  { name: "Einrichtungskonzept", price: "€890", time: "10 Werktage", event: "pkg_konzept", text: "Grundriss-Layout, vollständige Einkaufsliste mit Links und Preisen, Farb- und Materialkonzept, Styling-Leitfaden und Budgetübersicht. Sie bestellen selbst." },
  { name: "Komplett eingerichtet", price: "ab €3.500", time: "4–6 Wochen", event: "pkg_komplett", text: "Konzept plus Sourcing, Bestellkoordination, Lieferplanung und Styling-Tag. Typisches Möbelbudget zusätzlich: €12.000–€25.000 für eine Zwei-Zimmer-Wohnung." },
  { name: "Vermietungs-Check", price: "€490", time: "Entscheidungsgrundlage", event: "pkg_check", text: "Realistisches Potenzial, Zielmieter, notwendige Investition und Amortisationszeit. Bei einem Folgeauftrag wird das Honorar vollständig angerechnet." },
];

function track(label: string) {
  const payload = JSON.stringify({ type: "track", event: label, properties: { label }, timestamp: new Date().toISOString() });
  navigator.sendBeacon("/_ploy/ingest", payload);
}

function Cta({ children, label, className = "" }: { children: React.ReactNode; label: string; className?: string }) {
  return <a href="#kontakt" onClick={() => track(label)} className={`inline-flex items-center justify-center gap-2 rounded-[4px] bg-ploy-button-primary-background px-5 py-3.5 font-button text-sm font-semibold text-ploy-button-primary-text transition-opacity hover:opacity-85 ${className}`}>{children}<ArrowRight size={16} /></a>;
}

/**
 * @ployComponent
 * @ployComponentId petrina-home-page
 * @ployComponentType page
 * @ployComponentPattern landing-page
 * @ployComponentDescription Bilingual conversion landing page for a Vienna furnished-rental interior design practice, including buyer paths, pricing, proof, FAQ, analytics and lead capture.
 * @ployComponentTags homepage bilingual conversion interior-design
 * @ployComponentStatus stable
 */
export function HomePage() {
  const [lang, setLang] = useState<Lang>("de");
  const t = copy[lang];

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  return <div className="min-h-screen bg-ploy-background-primary font-body text-ploy-text-primary selection:bg-ploy-accent-primary selection:text-ploy-text-on-accent-primary">
    <header className="sticky top-0 z-50 border-b border-ploy-border-primary bg-ploy-background-primary/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-10">
        <a href="#top" className="font-heading text-xl font-semibold tracking-tight">Petrina Salema</a>
        <div className="flex items-center gap-3">
          <button onClick={() => setLang(lang === "de" ? "en" : "de")} className="min-w-10 text-sm font-semibold underline underline-offset-4" aria-label="Sprache wechseln">{lang === "de" ? "EN" : "DE"}</button>
          <Cta label="nav_call" className="hidden sm:inline-flex">{t.navCta}</Cta>
        </div>
      </div>
    </header>

    <main id="top">
      <section className="hero mx-auto grid max-w-[1440px] gap-8 px-5 pb-14 pt-10 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:pb-24 lg:pt-16">
        <div className="hero__copy max-w-2xl pb-2">
          <p className="mb-8 max-w-md text-sm font-semibold uppercase tracking-[0.14em] text-ploy-text-secondary">Interior Design für möblierte Vermietung · Wien</p>
          <h1 className="hero__title text-balance font-heading text-5xl font-medium leading-[0.92] tracking-[-0.04em] md:text-7xl lg:text-[5.8rem]">{t.heroTitle}</h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ploy-text-secondary md:text-xl">{t.heroSub}</p>
          <div className="mt-8"><Cta label="hero_call">{t.call}</Cta><p className="mt-3 text-xs leading-relaxed text-ploy-text-secondary">{t.heroMeta}</p></div>
        </div>
        <img src={HERO_IMAGE} alt="Helles, warm eingerichtetes Wohnzimmer" className="hero__image h-[58vh] min-h-[480px] w-full object-cover object-center lg:h-[76vh]" />
      </section>

      <section className="border-y border-ploy-border-primary bg-ploy-background-secondary px-5 py-16 md:px-10 lg:py-24">
        <div className="mx-auto max-w-[1200px]"><h2 className="text-balance font-heading text-4xl md:text-6xl">{t.doorsTitle}</h2><p className="mt-4 max-w-2xl text-ploy-text-secondary">{t.doorsIntro}</p>
          <div className="mt-10 grid gap-px bg-ploy-border-primary md:grid-cols-2">
            {[{ href: "#neu-einrichten", title: t.doorA, desc: t.doorADesc, event: "doorA" }, { href: "#umstellen", title: t.doorB, desc: t.doorBDesc, event: "doorB" }].map((door) => <a key={door.event} href={door.href} onClick={() => track(door.event)} className="group bg-ploy-background-primary p-7 md:p-10"><div className="flex items-start justify-between gap-5"><div><h3 className="max-w-md font-heading text-3xl md:text-4xl">{door.title}</h3><p className="mt-4 max-w-md leading-relaxed text-ploy-text-secondary">{door.desc}</p></div><ArrowDownRight className="shrink-0 transition-transform group-hover:rotate-12" /></div></a>)}
          </div>
        </div>
      </section>

      <section id="neu-einrichten" className="scroll-mt-24 px-5 py-20 md:px-10 lg:py-32"><div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div><h2 className="text-balance font-heading text-4xl md:text-6xl">{t.launcherTitle}</h2><p className="mt-5 text-lg leading-relaxed text-ploy-text-secondary">{t.launcherIntro}</p></div>
        <div className="grid gap-px bg-ploy-border-primary sm:grid-cols-2">{[["6–8", "Wochenenden für Recherche, Einkauf und Aufbau"], ["€3–6k", "gehen häufig durch falsche Maße, Haltbarkeit oder Retouren verloren"], ["12", "Wochen Lieferzeit können den Übergabetermin kippen"], ["⅓", "unteres Drittel des Preisbands, wenn Inseratsfotos flach wirken"]].map(([n, d]) => <div key={d} className="bg-ploy-background-secondary p-7"><div className="font-heading text-5xl">{n}</div><p className="mt-4 text-sm leading-relaxed text-ploy-text-secondary">{d}</p></div>)}</div>
      </div></section>

      <section className="border-y border-ploy-border-primary bg-ploy-background-secondary px-5 py-20 md:px-10 lg:py-28"><div className="mx-auto max-w-[1200px]"><div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><h2 className="max-w-2xl text-balance font-heading text-4xl md:text-6xl">Drei klare Wege zur fertigen Wohnung.</h2><p className="max-w-md text-sm leading-relaxed text-ploy-text-secondary">Der erste Schritt bleibt überschaubar. Beim Vermietungs-Check wird das Honorar bei einem Folgeauftrag vollständig angerechnet.</p></div>
        <div className="grid gap-px bg-ploy-border-primary lg:grid-cols-3">{packages.map((pkg) => <article key={pkg.name} className="flex min-h-[390px] flex-col bg-ploy-background-primary p-7 md:p-9"><p className="text-sm font-semibold">{pkg.time}</p><h3 className="mt-6 font-heading text-3xl">{pkg.name}</h3><p className="mt-3 font-heading text-5xl">{pkg.price}</p><p className="mt-6 flex-1 leading-relaxed text-ploy-text-secondary">{pkg.text}</p><Cta label={pkg.event} className="mt-8 w-full">{lang === "de" ? "Gespräch buchen" : "Book a call"}</Cta></article>)}</div>
      </div></section>

      <section id="umstellen" className="scroll-mt-24 px-5 py-20 md:px-10 lg:py-32"><div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-2">
        <div><h2 className="text-balance font-heading text-4xl md:text-6xl">{t.converterTitle}</h2><p className="mt-6 text-lg leading-relaxed text-ploy-text-secondary">{t.converterIntro}</p><p className="mt-4 border-l-2 border-ploy-accent-primary pl-4 text-sm text-ploy-text-secondary">{t.disclaimer}</p></div>
        <div className="border-t border-ploy-border-primary pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0"><p className="font-heading text-3xl leading-tight">{t.opportunity}</p><div className="mt-9"><Cta label="pkg_check">Vermietungs-Check · €490</Cta></div></div>
      </div></section>

      <section className="border-y border-ploy-border-primary bg-ploy-background-secondary px-5 py-20 md:px-10"><div className="mx-auto max-w-[1200px]"><h2 className="text-balance font-heading text-4xl md:text-6xl">{t.rolesTitle}</h2><p className="mt-4 max-w-2xl text-ploy-text-secondary">{t.rolesSub}</p>
        <div className="mt-10 overflow-x-auto"><table className="w-full min-w-[680px] border-collapse text-left"><thead><tr className="border-b border-ploy-border-primary"><th className="py-4 pr-4"></th><th className="py-4 pr-4 font-heading text-2xl">Ich übernehme</th><th className="py-4 font-heading text-2xl">Sie übernehmen</th></tr></thead><tbody>{[["Planung", "Aufmaß, Konzept, Layout, Spezifikation", "Zugang zur Wohnung, vorhandene Pläne"], ["Bestellung", "Sourcing, Warenkorb, Lieferkoordination", "Freigabe und Bezahlung der Bestellungen"], ["Logistik", "Lieferfenster, Abstimmung mit Lieferanten", "Gebäudezugang, Liftmaße, Hausverwaltung"], ["Umsetzung", "Aufbaukoordination, Styling, letzte Kontrolle", "Entsorgung nur nach Vereinbarung"], ["Vermarktung", "Fotografie-Briefing und Set-up", "Fotograf oder Zusatzbeauftragung"]].map((row) => <tr key={row[0]} className="border-b border-ploy-border-primary"><th className="py-5 pr-4 text-sm font-semibold">{row[0]}</th><td className="py-5 pr-4 text-ploy-text-secondary">{row[1]}</td><td className="py-5 text-ploy-text-secondary">{row[2]}</td></tr>)}</tbody></table></div>
      </div></section>

      <section className="px-5 py-20 md:px-10 lg:py-28"><div className="mx-auto max-w-[1200px]"><h2 className="text-balance font-heading text-4xl md:text-6xl">{t.timelineTitle}</h2><div className="mt-12 grid gap-px bg-ploy-border-primary md:grid-cols-4">{[["Woche 1", "Gespräch und Aufmaß"], ["Woche 1–2", "Konzept"], ["Woche 2–4", "Sourcing und Bestellung"], ["Woche 4–6", "Lieferung und Styling"]].map(([week, step]) => <div key={step} className="bg-ploy-background-primary p-6"><p className="text-xs font-bold uppercase tracking-widest text-ploy-text-secondary">{week}</p><p className="mt-8 font-heading text-3xl">{step}</p></div>)}</div></div></section>

      <section className="border-y border-ploy-border-primary bg-ploy-background-secondary px-5 py-20 md:px-10 lg:py-28"><div className="mx-auto max-w-[1200px]"><div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"><img src={PROOF_IMAGE} alt="Hell eingerichtete Wohnung mit neutralen Möbeln" className="h-[520px] w-full object-cover" /><div><p className="text-sm font-semibold uppercase tracking-widest text-ploy-text-secondary">Ausgewähltes Einrichtungsbeispiel</p><h2 className="mt-5 text-balance font-heading text-4xl md:text-6xl">{t.proofTitle}</h2><blockquote className="mt-8 border-l-2 border-ploy-accent-primary pl-5 font-heading text-2xl leading-snug">{t.proofQuote}</blockquote></div></div>
        <div className="mt-14 grid gap-px bg-ploy-border-primary md:grid-cols-3">{[["4,98/5", "Gästebewertung"], ["97,6%", "Fünf-Sterne-Aufenthalte"], ["€125k+", "Gästeumsatz in 5 Jahren"]].map(([n, d]) => <div key={d} className="bg-ploy-background-primary p-7"><div className="font-heading text-5xl">{n}</div><p className="mt-2 text-sm text-ploy-text-secondary">{d}</p></div>)}</div><p className="mt-4 text-xs text-ploy-text-secondary">Eigenes Pilotobjekt, Wien · Jubili · fünf Jahre Betrieb · Wachstum von zwei auf vier Zimmer.</p>
      </div></section>

      <section className="px-5 py-20 md:px-10 lg:py-28"><div className="mx-auto max-w-[1200px]"><div className="grid gap-12 lg:grid-cols-2"><h2 className="text-balance font-heading text-4xl md:text-6xl">{t.whyTitle}</h2><div className="space-y-0">{[["Grundriss und Kosten", "Ich lese den Bestand, erkenne, welche Wand sich bewegt — und was diese Entscheidung kostet."], ["Für intensive Nutzung spezifiziert", "15 Jahre Architektur, auch im Gesundheits- und institutionellen Bereich: robust, verständlich und trotzdem ruhig."], ["Selbst im Betrieb", "Ich kenne Übergaben, Turnovers und Gästefragen nicht nur aus Moodboards, sondern aus dem eigenen Objekt."]].map(([h, p]) => <div key={h} className="border-t border-ploy-border-primary py-6"><h3 className="font-heading text-2xl">{h}</h3><p className="mt-2 leading-relaxed text-ploy-text-secondary">{p}</p></div>)}</div></div>
        <div className="mt-20 grid gap-10 border-t border-ploy-border-primary pt-12 lg:grid-cols-2"><h2 className="font-heading text-4xl">{t.notForTitle}</h2><ul className="space-y-4 text-ploy-text-secondary">{["Eigentümer, die ausschließlich die billigste Einrichtung suchen.", "Wer eine Einkaufsliste um €200 erwartet.", "Hotelgruppen mit 40 oder mehr Einheiten.", "Wer den eigenen Geschmack reproduzieren möchte statt ein Produkt für einen definierten Mieter zu bauen."].map((item) => <li key={item} className="flex gap-3"><Check className="mt-1 shrink-0" size={16} />{item}</li>)}</ul></div>
      </div></section>

      <section className="border-y border-ploy-border-primary bg-ploy-background-secondary px-5 py-20 md:px-10"><div className="mx-auto max-w-[900px]"><h2 className="text-balance font-heading text-4xl md:text-6xl">{t.faqTitle}</h2><div className="mt-10">{[
        ["Was kostet es insgesamt, inklusive Möbel?", "Für eine Zwei-Zimmer-Wohnung liegt das Möbelbudget typischerweise bei €12.000–€25.000. Dazu kommt das Planungshonorar ab €890 beziehungsweise die Komplettbegleitung ab €3.500."],
        ["Wie lange dauert es — und schaffen Sie meinen Übergabetermin?", "Ein Konzept dauert rund 10 Werktage. Komplettprojekte benötigen meist 4–6 Wochen. Im Erstgespräch prüfen wir Lieferzeiten und Terminrisiken konkret."],
        ["Bestellen und übernehmen Sie die Lieferung?", "Beim Konzept bestellen Sie selbst. Beim Komplettpaket koordiniere ich Bestellungen und Lieferfenster; Zahlung, Gebäudezugang und Liftangaben bleiben bei Ihnen."],
        ["Arbeiten Sie außerhalb Wiens?", "Wien und Umgebung sind der Kernbereich. Andere Standorte prüfe ich im Erstgespräch abhängig von Umfang und Logistik."],
        ["Sprechen Sie Englisch?", "Ja. Projekte und Unterlagen sind auf Deutsch und Englisch möglich."],
        ["Ist möblierte mittelfristige Vermietung in meinem Gebäude erlaubt?", "Das hängt vom Objekt, Vertrag, Gebäude und Nutzungskonzept ab. Ich gebe keine Rechtsberatung; bitte klären Sie Ihren Fall mit MA 37 oder Ihrer Rechtsberatung."],
        ["Was passiert im kostenlosen Gespräch?", "Wir klären Wohnung, Bezirk, Größe, Termin, Möbelbudget und Vermietungsziel. Danach wissen beide Seiten, ob und mit welchem Paket es sinnvoll weitergeht."]
      ].map(([q, a]) => <details key={q} className="group border-t border-ploy-border-primary py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-heading text-2xl"><span>{q}</span><ChevronDown className="shrink-0 transition-transform group-open:rotate-180" size={20} /></summary><p className="max-w-2xl pt-4 leading-relaxed text-ploy-text-secondary">{a}</p></details>)}</div></div></section>

      <ContactSection lang={lang} title={t.contactTitle} subtitle={t.contactSub} button={t.formButton} success={t.formSuccess} />
    </main>

    <footer className="border-t border-ploy-border-primary px-5 py-8 md:px-10"><div className="mx-auto flex max-w-[1200px] flex-col gap-6 text-sm md:flex-row md:items-center md:justify-between"><div><strong>Petrina Salema</strong><span className="ml-2 text-ploy-text-secondary">Petrina Manase Salema e.U. · Wien</span></div><nav className="flex flex-wrap gap-5"><a href="#" aria-label="Instagram">Instagram</a><a href="#" aria-label="LinkedIn">LinkedIn</a><a href="mailto:office@jubili.co">E-Mail</a><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a></nav></div></footer>
  </div>;
}

function ContactSection({ lang, title, subtitle, button, success }: { lang: Lang; title: string; subtitle: string; button: string; success: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("sending");
    const data = Object.fromEntries(new FormData(event.currentTarget).entries()) as Record<string, string>;
    try { await submitForm("wohnung-anfrage", data); track("form_submit"); setStatus("success"); event.currentTarget.reset(); } catch { setStatus("error"); }
  }
  return <section id="kontakt" className="scroll-mt-24 px-5 py-20 md:px-10 lg:py-28"><div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[0.8fr_1.2fr]"><div><h2 className="text-balance font-heading text-4xl md:text-6xl">{title}</h2><p className="mt-5 text-lg leading-relaxed text-ploy-text-secondary">{subtitle}</p><div className="mt-8"><Cta label="contact_call">{lang === "de" ? "Gespräch buchen" : "Book a call"}</Cta></div></div>
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">{[
      ["name", "Name *", "text"], ["email", "E-Mail *", "email"], ["sqm", "Größe in m² *", "number"], ["handover", "Übergabe / Verfügbarkeit *", "text"]
    ].map(([name, placeholder, type]) => <input key={name} name={name} type={type} required placeholder={placeholder} className="rounded-[4px] border border-ploy-input-border bg-ploy-input-background px-4 py-3.5 outline-none focus:ring-2 focus:ring-ploy-accent-primary" />)}
      <select name="district" required defaultValue="" className="rounded-[4px] border border-ploy-input-border bg-ploy-input-background px-4 py-3.5"><option value="" disabled>Bezirk *</option>{Array.from({ length: 23 }, (_, index) => <option key={index + 1}>{index + 1}. Bezirk</option>)}</select>
      <select name="rentalType" defaultValue="" className="rounded-[4px] border border-ploy-input-border bg-ploy-input-background px-4 py-3.5"><option value="">Vermietungsart</option><option>Kurzzeit</option><option>Mittelfristig möbliert</option><option>Unbefristet</option><option>Noch unklar</option></select>
      <select name="budget" defaultValue="" className="rounded-[4px] border border-ploy-input-border bg-ploy-input-background px-4 py-3.5 sm:col-span-2"><option value="">Möbelbudget</option><option>Unter €10k</option><option>€10–20k</option><option>€20–35k</option><option>Über €35k</option><option>Noch offen</option></select>
      <textarea name="message" rows={5} placeholder="Worum geht es?" className="rounded-[4px] border border-ploy-input-border bg-ploy-input-background px-4 py-3.5 sm:col-span-2" />
      <button type="submit" disabled={status === "sending"} className="rounded-[4px] bg-ploy-button-primary-background px-5 py-4 font-semibold text-ploy-button-primary-text sm:col-span-2">{status === "sending" ? "…" : button}</button>
      {status === "success" && <p className="text-sm sm:col-span-2">{success}</p>}{status === "error" && <p className="text-sm sm:col-span-2">Bitte versuchen Sie es erneut oder schreiben Sie an office@jubili.co.</p>}
    </form></div></section>;
}
