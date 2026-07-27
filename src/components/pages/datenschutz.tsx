/**
 * @ployComponent
 * @ployComponentId jubili-privacy-page
 * @ployComponentType page
 * @ployComponentPattern legal-page
 * @ployComponentDescription English privacy policy page for Jubili covering hosting, analytics, enquiries, retention, and GDPR rights.
 * @ployComponentTags legal privacy gdpr
 * @ployComponentStatus stable
 */
export function DatenschutzPage() {
  return (
<main className="mx-auto min-h-screen max-w-3xl px-6 py-20 text-ploy-text-primary">
    <a href="/" className="text-sm underline underline-offset-4">← Back</a>

    <header className="mt-12 border-b border-ploy-border-primary pb-10">
      <p className="text-sm uppercase tracking-[0.16em] text-ploy-text-secondary">Jubili · Vienna</p>
      <h1 className="mt-4 font-heading text-5xl leading-tight md:text-6xl">Privacy Policy</h1>
      <p className="mt-5 max-w-2xl leading-relaxed text-ploy-text-secondary">
        This policy explains which personal data is processed when you visit this website or contact Jubili, why it is processed, and which rights you have under the General Data Protection Regulation (GDPR).
      </p>
    </header>

    <article className="space-y-12 py-12 text-ploy-text-secondary">
      <section className="space-y-4">
        <h2 className="font-heading text-3xl text-ploy-text-primary">1. Controller</h2>
        <p>The controller responsible for data processing through this website is:</p>
        <address className="not-italic leading-relaxed text-ploy-text-primary">
          Petrina Manase Salema, Sole Proprietor<br />
          Jubili<br />
          Tegelweg 4<br />
          1220 Vienna<br />
          Austria<br />
          Email: <a className="underline underline-offset-4" href="mailto:office@jubili.co">office@jubili.co</a>
        </address>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-3xl text-ploy-text-primary">2. General principles</h2>
        <p>
          Personal data is processed only where there is a lawful basis and only for the purposes described in this policy. The principal legal bases are steps taken at your request before entering into a contract, the performance of a contract, compliance with legal obligations, and legitimate interests in operating a secure and useful website and responding to enquiries.
        </p>
        <p>
          You are not generally required to provide personal data to browse this website. Certain technical data is processed automatically so that the website can be delivered securely. If you contact Jubili, the information needed to understand and answer your enquiry must be provided; otherwise, the enquiry may not be processed.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-3xl text-ploy-text-primary">3. Website hosting and server logs</h2>
        <p>
          When you access this website, technical request data may be processed automatically. This can include your IP address, the requested page or file, the date and time of access, the referring page, browser and device information, user agent, and response or error information.
        </p>
        <p>
          This processing is necessary to deliver the website, maintain its stability and security, diagnose errors, prevent misuse, and protect the website and its visitors. The legal basis is the legitimate interest in the secure and reliable operation of the website under Article 6(1)(f) GDPR.
        </p>
        <p>
          The website is hosted and operated using services provided by Ploy, Inc. Ploy and infrastructure providers acting on its behalf may process technical data as processors where this is necessary to provide, secure, and maintain the website. Technical logs are retained only for as long as reasonably necessary for operational, security, abuse-prevention, and legal purposes.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-3xl text-ploy-text-primary">4. Ploy Analytics</h2>
        <p>
          This website uses Ploy's built-in, first-party analytics. It may record page views, requested pages, referral and traffic-source information, timestamps, browser and device information, approximate location derived from network information, and interactions such as calls to action or form-submission events. IP addresses may be processed at the website edge to deliver requests, protect the service, and derive limited technical or regional information.
        </p>
        <p>
          Ploy's built-in analytics do not rely on third-party analytics scripts or analytics cookies. This website does not currently use Google Analytics, advertising pixels, session-replay tools, or marketing trackers.
        </p>
        <p>
          Analytics data is used to understand aggregate website use, improve content and usability, measure whether important functions work, and protect the service. The legal basis is the legitimate interest in operating, evaluating, and improving the website under Article 6(1)(f) GDPR. Analytics data is retained according to the operational needs and configuration of the service and is deleted or aggregated when it is no longer needed for these purposes.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-3xl text-ploy-text-primary">5. Contact enquiries</h2>
        <p>
          If you contact Jubili through the website form or by email, the information you provide is processed to assess the project, answer your enquiry, take requested steps before a possible contract, and handle follow-up questions.
        </p>
        <p>The website form may collect:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>name and email address;</li>
          <li>Vienna district and property size;</li>
          <li>handover or availability date;</li>
          <li>rental type and indicative furniture budget;</li>
          <li>the project information included in your message; and</li>
          <li>technical submission data needed to deliver and protect the form.</li>
        </ul>
        <p>
          The legal basis is Article 6(1)(b) GDPR where processing is necessary to take steps at your request before entering into a contract. For general enquiries that are not directed towards a possible contract, the legal basis is the legitimate interest in responding to communications and managing business enquiries under Article 6(1)(f) GDPR.
        </p>
        <p>
          Form submissions are processed through Ploy's form service, stored for the workspace, and sent to Jubili by email. Ploy and the email and IT service providers used to receive and secure the enquiry may therefore process the information as service providers. Enquiry data is not sold or used for unrelated promotional email.
        </p>
        <p>
          Enquiry data is normally deleted 12 months after the last relevant contact if no contract is concluded. If an enquiry leads to a contract, relevant records may be retained for longer where necessary to perform the contract, establish or defend legal claims, or comply with statutory accounting, tax, and documentation obligations.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-3xl text-ploy-text-primary">6. Recipients, processors, and international processing</h2>
        <p>
          Personal data is disclosed only where necessary for the purposes described above, where required by law, or where you have separately authorised disclosure. Categories of recipients may include website hosting and platform providers, infrastructure and security providers, email and IT service providers, and professional advisers or public authorities where legally required.
        </p>
        <p>
          Ploy, Inc. is based in the United States, so the use of its services may involve processing outside the European Economic Area. Where Chapter V of the GDPR applies to a transfer, the transfer must be based on an applicable adequacy decision or appropriate safeguards, such as the European Commission's standard contractual clauses, together with any required supplementary measures. You may request further information about applicable safeguards by emailing <a className="underline underline-offset-4" href="mailto:office@jubili.co">office@jubili.co</a>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-3xl text-ploy-text-primary">7. Cookies and external services</h2>
        <p>
          This website does not currently use non-essential analytics or marketing cookies. It also does not currently offer a newsletter, send promotional email through a newsletter system, use an external booking tool, or embed third-party video, map, or social-media widgets.
        </p>
        <p>
          Ordinary links to another website or an email application do not transmit information to that service until you activate the link. The external provider's own privacy information applies after you leave this website.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-3xl text-ploy-text-primary">8. Data security</h2>
        <p>
          Appropriate technical and organisational measures are used to protect personal data against accidental or unlawful destruction, loss, alteration, unauthorised disclosure, and unauthorised access. These measures include encrypted transmission of the website and access controls for the systems used to manage enquiries. No method of transmission or storage can guarantee absolute security.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-3xl text-ploy-text-primary">9. Your rights</h2>
        <p>Subject to the conditions and limits in the GDPR, you may have the right to:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>obtain information about and a copy of your personal data;</li>
          <li>have inaccurate or incomplete data corrected;</li>
          <li>request deletion or restriction of processing;</li>
          <li>receive data you provided in a portable format;</li>
          <li>object to processing based on legitimate interests; and</li>
          <li>withdraw consent at any time where processing is based on consent, without affecting processing carried out before withdrawal.</li>
        </ul>
        <p>
          This website does not use automated decision-making or profiling that produces legal or similarly significant effects.
        </p>
        <p>
          To exercise your rights, email <a className="underline underline-offset-4" href="mailto:office@jubili.co">office@jubili.co</a>. Reasonable information may be requested to confirm your identity before a request is fulfilled.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-3xl text-ploy-text-primary">10. Right to complain</h2>
        <p>
          If you believe that your personal data has been processed unlawfully, you may contact Jubili or lodge a complaint with a supervisory authority. In Austria, the competent authority is:
        </p>
        <address className="not-italic leading-relaxed text-ploy-text-primary">
          Austrian Data Protection Authority<br />
          Barichgasse 40–42<br />
          1030 Vienna<br />
          Austria<br />
          Email: <a className="underline underline-offset-4" href="mailto:dsb@dsb.gv.at">dsb@dsb.gv.at</a><br />
          Website: <a className="underline underline-offset-4" href="https://www.dsb.gv.at/" rel="noreferrer">www.dsb.gv.at</a>
        </address>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-3xl text-ploy-text-primary">11. Changes to this policy</h2>
        <p>
          This policy may be updated if the website, service providers, or legal requirements change. The current version will always be published on this page. If a newsletter, external booking service, additional analytics, advertising technology, or embedded third-party service is introduced, this policy will be updated before or when that processing begins.
        </p>
        <p className="text-sm">Last updated: 27 July 2026</p>
      </section>
    </article>
  </main>
  );
}
