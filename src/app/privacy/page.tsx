export default function PrivacyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">
            <i /> PRIVACY AND DATA
          </span>
          <h1>
            RESPECT THE <span>DATA.</span>
          </h1>
          <p>
            Starter privacy information for the CCIT Week 2026 website. Organizers should review and approve the final notice before collecting real data.
          </p>
        </div>
      </section>

      <section className="page-content">
        <div className="container privacy-copy">
          <h2>Information collection</h2>
          <p>
            The registration demo does not send or store submitted form data. Before production use, the organizers must identify what information is necessary, why it is collected, who can access it, and how long it will be retained.
          </p>

          <h2>Purpose and access</h2>
          <p>
            Any production registration data should be used only for event administration and handled by authorized personnel. Public pages must never expose private student information, email addresses, student numbers, or internal records.
          </p>

          <h2>Security and retention</h2>
          <p>
            Use server-side validation, access controls, secure database policies, and an approved retention/deletion process. Never place credentials or private service keys in frontend code.
          </p>

          <h2>Contact</h2>
          <p>
            Add the official CCIT event contact and data-protection contact before publishing this notice. This template is not legal advice and must be reviewed for the institution’s policies and applicable law.
          </p>
        </div>
      </section>
    </>
  );
}