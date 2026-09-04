import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Gumma Digital about your project. Free 30-minute discovery call, a reply within one business day, and a fixed quote in writing.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Gumma Digital",
    description:
      "Tell me about your project. Free discovery call, reply within one business day.",
    url: "/contact",
  },
};

const next = [
  "I reply within one business day",
  "A free 30-minute call to dig in",
  "A written scope and fixed price",
  "No pressure, no follow-up sequence",
];

export default function ContactPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <span className="eyebrow">Contact</span>
          <h1>Tell me what you&apos;re building.</h1>
          <p className="lede">
            A paragraph is enough to start. I read every message myself and reply
            within one business day — including the times when the answer is that
            I&apos;m not the right fit.
          </p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap">
          <div className="contact-grid">
            <div data-reveal>
              <ContactForm />
            </div>

            <aside className="contact-aside" data-reveal>
              <div className="contact-box">
                <h3>Prefer email?</h3>
                <p>
                  Write directly and skip the form. Attachments, briefs, and sketches
                  all welcome.
                </p>
                <a className="link" href={`mailto:${site.email}`}>
                  {site.email}
                  <ArrowIcon size={15} />
                </a>
              </div>

              <div className="contact-box">
                <h3>What happens next</h3>
                <ul className="check-list" style={{ marginTop: "1rem" }}>
                  {next.map((item) => (
                    <li key={item}>
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="contact-box">
                <h3>Current availability</h3>
                <p>
                  <span className="badge" style={{ margin: "0.25rem 0 0.75rem" }}>
                    <span className="badge__dot" aria-hidden="true" />
                    Taking new projects
                  </span>
                  {/* Keep this line current — it's the first thing serious
                      clients check. */}
                  New builds can usually start within two weeks of a signed scope.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
