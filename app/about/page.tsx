import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { ArrowIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Gumma Digital is a one-person software studio. Meet the developer, the way of working, and the tools behind the projects.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Gumma Digital",
    description: "A one-person software studio. Here's how it works.",
    url: "/about",
  },
};

/* PERSONALISE: trim this to the stack you actually want to be hired for. */
const stack = [
  {
    group: "Front end",
    items: ["TypeScript", "React", "Next.js", "Astro", "Tailwind"],
  },
  { group: "Back end", items: ["Node", "Postgres", "Prisma", "REST", "Stripe"] },
  { group: "Mobile", items: ["React Native", "Expo", "Swift"] },
  {
    group: "Infrastructure",
    items: ["Vercel", "Cloudflare", "Docker", "GitHub Actions"],
  },
];

const principles = [
  {
    num: "01",
    title: "Say the hard thing early",
    body: "If a deadline is unrealistic or a feature isn't worth building, you hear it at the start, not in a status update three weeks later.",
  },
  {
    num: "02",
    title: "Show, don't report",
    body: "There's a working link from the first week. Progress is something you click through, not a percentage in a document.",
  },
  {
    num: "03",
    title: "Leave it better than a handover",
    body: "Documented, tested where it matters, and deployed from a pipeline anyone can run. No knowledge that lives only in my head.",
  },
  {
    num: "04",
    title: "One client at a time",
    body: "I take a limited number of projects concurrently so yours gets real focus and a timeline that survives contact with reality.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <span className="eyebrow">About</span>
          <h1>One developer, and no layers in between.</h1>
          <p className="lede">
            Gumma Digital is a studio of one — deliberately. Small teams and founders
            get better results from a single engineer who understands the whole
            problem than from an agency that bills for the meetings about it.
          </p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap">
          <div className="about-grid">
            {/* PERSONALISE: replace the paragraphs below with your own background
                — where you've worked, what you've shipped, what you specialise in.
                Keep it factual; it's the part clients read most. */}
            <div className="prose" data-reveal>
              <h2 style={{ marginBottom: "1.25rem" }}>Hello — I&apos;m Emilio.</h2>

              <p>
                I started Gumma Digital because the good version of this job is simple
                and most people never get it: you explain your problem to the person
                who will solve it, they tell you honestly what it will take, and then
                they build it and hand it over. No discovery workshops that bill by
                the hour, no requirements telephoned through three layers of
                management, no invoice for work you didn&apos;t agree to.
              </p>

              <p>
                What I do is design and build software — web applications, marketing
                sites, and mobile apps — for businesses that need something real
                rather than something impressive. Most of my work starts with a
                process that&apos;s outgrown its spreadsheet, or a product idea that
                needs a first version people can actually use.
              </p>

              <p>
                I care about the unglamorous parts: that it&apos;s fast on a bad
                connection, that it doesn&apos;t fall over at month end, that the next
                developer who opens the repository can find their way around.{" "}
                <strong>
                  Software you own and can hand to someone else is worth more than
                  software that only works while I&apos;m around.
                </strong>
              </p>

              <p>
                If that&apos;s the kind of working relationship you want, the
                discovery call is free and I&apos;ll give you a straight answer —
                including when the answer is that you don&apos;t need me.
              </p>

              <div className="btn-row">
                <Link className="btn btn--primary" href="/contact">
                  Book a discovery call
                  <ArrowIcon />
                </Link>
              </div>
            </div>

            <aside className="card" data-reveal>
              <h3 style={{ marginBottom: "1.5rem" }}>Tools I reach for</h3>
              <ul className="stack-list">
                {stack.map((section) => (
                  <li key={section.group}>
                    <h4>{section.group}</h4>
                    <ul className="tags" style={{ marginTop: 0 }}>
                      {section.items.map((item) => (
                        <li className="tag" key={item}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* Principles ------------------------------------------------------- */}
      <section className="section">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <span className="eyebrow">How I work</span>
            <h2>Four commitments</h2>
          </div>

          <div className="steps" data-reveal>
            {principles.map((principle) => (
              <div className="step" key={principle.num}>
                <span className="step__num">{principle.num}</span>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="cta" data-reveal>
            <span className="eyebrow">Next step</span>
            <h2>Let&apos;s talk about what you&apos;re building.</h2>
            <p className="lede">
              Thirty minutes, no obligation, and you&apos;ll leave with a clearer idea
              of the scope whether or not we work together.
            </p>
            <div className="btn-row">
              <Link className="btn btn--primary" href="/contact">
                Get in touch
                <ArrowIcon />
              </Link>
              <a className="btn btn--ghost" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
