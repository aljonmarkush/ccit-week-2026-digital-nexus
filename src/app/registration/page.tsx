import RegistrationForm from "@/components/registration/RegistrationForm";

export default function RegistrationPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">
            <i /> YOUR NEXT MOVE
          </span>
          <h1>
            GET IN THE <span>NEXUS.</span>
          </h1>
          <p>
            Submit your interest in a CCIT Week activity. This starter project demonstrates the registration flow and must be connected to an approved secure backend before collecting real data.
          </p>
        </div>
      </section>

      <section className="page-content">
        <div className="container registration-layout">
          <aside className="registration-aside">
            <h2>
              MAKE YOUR
              <br />
              <span>MARK.</span>
            </h2>
            <p>
              Choose your group, pick your arena, and get ready to participate. The organizing committee will announce confirmed dates, venues, eligibility, and deadlines.
            </p>
            <div className="score-note">
              Privacy first: this demo does not transmit or save your form information. Real registration requires secure server-side validation, a database, and an approved privacy notice.
            </div>
          </aside>
          <RegistrationForm />
        </div>
      </section>
    </>
  );
}