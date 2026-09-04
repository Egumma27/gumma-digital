import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { ArrowIcon, BrowserIcon, GlobeIcon, PhoneIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: {
    absolute: "Gumma Digital — Freelance App & Website Development",
  },
  alternates: { canonical: "/" },
  openGraph: {
    title: "Gumma Digital — Freelance App & Website Development",
    description:
      "Custom web apps, websites, and mobile apps for founders and small teams.",
    url: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description:
    "Freelance software studio building custom web apps, websites, and mobile apps.",
  url: `${site.url}/`,
  email: site.email,
  serviceType: [
    "Web Development",
    "Mobile App Development",
    "Software Consulting",
  ],
};

const stats = [
  { num: "1", label: "Developer, start to finish" },
  { num: "2–8 wks", label: "Typical project timeline" },
  { num: "100%", label: "Custom code you own" },
  { num: "< 24h", label: "Reply to every enquiry" },
];

const services = [
  {
    icon: <BrowserIcon />,
    title: "Web applications",
    body: "Dashboards, internal tools, booking systems, customer portals — software with real logic behind it. Authentication, databases, payments, and an admin side that your team can actually operate.",
    tags: ["React", "Node", "Postgres", "Stripe"],
  },
  {
    icon: <GlobeIcon />,
    title: "Websites & landing pages",
    body: "Marketing sites that load fast, rank well, and read clearly on a phone. Hand-built and hosted for pennies — with a CMS if you want to edit copy yourself, and none of the plugin maintenance if you don't.",
    tags: ["Next.js", "Astro", "SEO", "Analytics"],
  },
  {
    icon: <PhoneIcon />,
    title: "Mobile apps",
    body: "iOS and Android from one codebase, or native where it genuinely matters. Push notifications, offline support, and the App Store submission handled end to end so you aren't left decoding review rejections.",
    tags: ["React Native", "Expo", "Swift"],
  },
];

const steps = [
  {
    num: "01",
    title: "Discovery call",
    body: "Thirty minutes, free. We work out what you're really trying to solve and whether building software is even the right answer.",
  },
  {
    num: "02",
    title: "Proposal & scope",
    body: "A written plan: features, timeline, fixed price. No hourly surprises and nothing starts until you've signed off on it.",
  },
  {
    num: "03",
    title: "Build in the open",
    body: "You get a working link from week one and a demo every Friday. Change your mind early and it costs nothing.",
  },
  {
    num: "04",
    title: "Launch & support",
    body: "I deploy it, hand over the keys and the code, and stay on for 30 days of free fixes. Ongoing support is optional, never locked in.",
  },
];

const differentiators = [
  {
    title: "You talk to the person building it",
    body: "No project manager relaying your requirements to an offshore team. The person on the call is the person writing the code, so nothing gets lost in translation and decisions happen in minutes rather than sprints.",
  },
  {
    title: "You own everything",
    body: "Code in your repository, hosting in your accounts, domains in your name. If you hire someone else next year, they inherit a clean, documented codebase instead of a proprietary black box.",
  },
  {
    title: "Fixed price, not a meter",
    body: "Scope is agreed up front and quoted as one number. You can ask a question or request a tweak without watching an hourly counter tick over.",
  },
  {
    title: "Built to be handed over",
    body: "Tests where they earn their keep, sensible structure, and a README that explains how to run and deploy it. The goal is software that outlives the engagement.",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero ------------------------------------------------------------- */}
      <section className="hero">
        <div className="wrap">
          <div className="hero__inner">
            <span className="badge">
              <span className="badge__dot" aria-hidden="true" />
              Available for new projects
            </span>

            <h1>
              Custom <span className="grad">apps and websites</span>, built to last.
            </h1>

            <p className="lede">
              Gumma Digital is an independent software studio. I work directly with
              founders and small teams to design, build, and ship products that hold
              up in production — no account managers, no handoffs, no page-builder
              shortcuts.
            </p>

            <div className="btn-row">
              <Link className="btn btn--primary" href="/contact">
                Start a project
                <ArrowIcon />
              </Link>
              <Link className="btn btn--ghost" href="/services">
                See what I build
              </Link>
            </div>

            <div className="stats">
              {stats.map((stat) => (
                <div className="stat" key={stat.label}>
                  <span className="stat__num">{stat.num}</span>
                  <span className="stat__label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services --------------------------------------------------------- */}
      <section className="section" id="services">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <span className="eyebrow">What I do</span>
            <h2>Three ways I can help</h2>
            <p className="lede">
              Most projects fall into one of these. If yours doesn&apos;t, get in touch
              anyway — I&apos;ll tell you honestly whether I&apos;m the right fit.
            </p>
          </div>

          <div className="grid grid--3">
            {services.map((service) => (
              <article className="card" data-reveal key={service.title}>
                <span className="card__icon" aria-hidden="true">
                  {service.icon}
                </span>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
                <ul className="tags">
                  {service.tags.map((tag) => (
                    <li className="tag" key={tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="btn-row" data-reveal>
            <Link className="link" href="/services">
              Full services and pricing
              <ArrowIcon size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Process ---------------------------------------------------------- */}
      <section className="section">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <span className="eyebrow">How it works</span>
            <h2>A process without the mystery</h2>
            <p className="lede">
              You always know what&apos;s being built, what it costs, and when it
              lands. Fixed scope, fixed price, weekly demos.
            </p>
          </div>

          <div className="steps" data-reveal>
            {steps.map((step) => (
              <div className="step" key={step.num}>
                <span className="step__num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators -------------------------------------------------- */}
      <section className="section">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <span className="eyebrow">Why Gumma Digital</span>
            <h2>What working together actually looks like</h2>
          </div>

          <div className="grid grid--2">
            {differentiators.map((item) => (
              <article className="card" data-reveal key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA -------------------------------------------------------------- */}
      <section className="section">
        <div className="wrap">
          <div className="cta" data-reveal>
            <span className="eyebrow">Next step</span>
            <h2>Have something you want built?</h2>
            <p className="lede">
              Tell me what you&apos;re working on. If I&apos;m not the right fit
              I&apos;ll say so, and point you somewhere better.
            </p>
            <div className="btn-row">
              <Link className="btn btn--primary" href="/contact">
                Book a discovery call
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
