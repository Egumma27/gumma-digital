import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowIcon,
  BrowserIcon,
  CheckIcon,
  ChevronIcon,
  GearIcon,
  GlobeIcon,
  PhoneIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "Web applications, marketing websites, and mobile apps built to a fixed scope and a fixed price. See what Gumma Digital builds and what it costs.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services & Pricing — Gumma Digital",
    description:
      "Web apps, websites, and mobile apps at a fixed scope and fixed price.",
    url: "/services",
  },
};

const services = [
  {
    icon: <BrowserIcon />,
    title: "Web applications",
    body: "Software with real logic behind it — accounts, permissions, data, payments. Typically an internal tool that replaces a spreadsheet, a customer portal, or the first version of a SaaS product.",
    points: [
      "User accounts, roles, and permissions",
      "Stripe billing and subscriptions",
      "Admin dashboards your team can run",
      "Integrations with the tools you already use",
    ],
  },
  {
    icon: <GlobeIcon />,
    title: "Websites & landing pages",
    body: "The site your business is judged by. Hand-built rather than assembled from plugins, so it loads in under a second, survives a redesign, and costs almost nothing to host.",
    points: [
      "Responsive down to the smallest phone",
      "Technical SEO and structured data",
      "Optional CMS so you can edit copy yourself",
      "Analytics and conversion tracking wired up",
    ],
  },
  {
    icon: <PhoneIcon />,
    title: "Mobile apps",
    body: "One codebase for iOS and Android, or fully native where the platform genuinely matters. I handle the parts that usually stall a launch — signing, store listings, and review rejections.",
    points: [
      "iOS and Android from a shared codebase",
      "Push notifications and offline support",
      "App Store and Play Store submission",
      "Over-the-air updates after launch",
    ],
  },
  {
    icon: <GearIcon />,
    title: "Rescue & maintenance",
    body: "An inherited codebase nobody understands, a site that keeps breaking, or a developer who disappeared. I'll audit what's there, tell you plainly whether to fix or rebuild, and then do it.",
    points: [
      "Codebase audit with a written verdict",
      "Performance and security fixes",
      "Dependency and platform upgrades",
      "Documentation so the next person copes",
    ],
  },
];

/* PLACEHOLDER PRICING — set these to your own numbers before you launch. */
const plans = [
  {
    name: "Website",
    blurb: "Marketing sites and landing pages.",
    price: "$2,500",
    unit: "+",
    timeline: "Typically 2–3 weeks",
    points: [
      "Up to 6 custom pages",
      "Design and build from scratch",
      "SEO, analytics, contact forms",
      "Deployed to your hosting",
      "30 days of free fixes",
    ],
    cta: "Get a quote",
    featured: false,
  },
  {
    name: "Application",
    blurb: "Web apps, internal tools, and mobile apps.",
    price: "$9,000",
    unit: "+",
    timeline: "Typically 6–10 weeks",
    points: [
      "Full product design and build",
      "Accounts, database, payments",
      "Weekly demos on a live link",
      "Store submission where relevant",
      "Handover docs and 30 days of fixes",
    ],
    cta: "Get a quote",
    featured: true,
  },
  {
    name: "Retainer",
    blurb: "Ongoing work on something live.",
    price: "$750",
    unit: "/ month",
    timeline: "Rolling, cancel any time",
    points: [
      "A block of hours each month",
      "New features and improvements",
      "Security and dependency updates",
      "Priority on urgent fixes",
      "No long-term contract",
    ],
    cta: "Enquire",
    featured: false,
  },
];

const faqs = [
  {
    q: "How do payments work?",
    a: "Half up front to book the slot, half on delivery. Longer projects are split into milestones so you're never paying far ahead of the work. Retainers are billed monthly.",
  },
  {
    q: "What if I don't know exactly what I want yet?",
    a: "That's normal, and it's what the discovery call is for. Most people arrive with a problem rather than a spec. We'll turn it into one together — and if the honest answer is that you don't need custom software, I'll tell you that.",
  },
  {
    q: "Who owns the code and the accounts?",
    a: "You do, entirely, once the final invoice is paid. Code sits in your repository, hosting and domains go in your name, and you get the handover documentation. Nothing is held hostage.",
  },
  {
    q: "What happens if the scope changes mid-project?",
    a: "Small adjustments are part of building something well and I don't nickel and dime them. Anything genuinely new gets quoted separately before it starts, so the original timeline and price stay honest.",
  },
  {
    q: "Do you work with clients in other time zones?",
    a: "Yes. Work happens asynchronously with a written update and a demo each week, plus a call whenever one is genuinely useful. Overlap of a couple of hours is plenty.",
  },
  {
    q: "Can you take over a project someone else started?",
    a: "Often, yes. It starts with a paid audit — a few days spent reading the code and infrastructure — after which you get a written recommendation on whether to continue it, refactor it, or start again. The audit fee comes off the project if you go ahead.",
  },
];

function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>
          <CheckIcon />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ServicesPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <span className="eyebrow">Services</span>
          <h1>What I build, and what it costs.</h1>
          <p className="lede">
            Every project is quoted as a fixed price against a written scope.
            You&apos;ll know the number before anything starts, and it doesn&apos;t
            move unless you ask it to.
          </p>
        </div>
      </section>

      {/* Detailed services ------------------------------------------------ */}
      <section className="section section--tight">
        <div className="wrap">
          <div className="grid grid--2">
            {services.map((service) => (
              <article className="card" data-reveal key={service.title}>
                <span className="card__icon" aria-hidden="true">
                  {service.icon}
                </span>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
                <CheckList items={service.points} />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing ---------------------------------------------------------- */}
      <section className="section">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <span className="eyebrow">Pricing</span>
            <h2>Starting points, not final quotes</h2>
            <p className="lede">
              Every project is different, so these are the floors rather than the
              answer. You get a firm number in writing after the discovery call — and
              it&apos;s the number you pay.
            </p>
          </div>

          <div className="grid grid--3">
            {plans.map((plan) => (
              <div
                className={`price-card${
                  plan.featured ? " price-card--featured" : ""
                }`}
                data-reveal
                key={plan.name}
              >
                {plan.featured && (
                  <span className="price-card__flag">Most common</span>
                )}
                <h3>{plan.name}</h3>
                <p className="muted">{plan.blurb}</p>
                <span className="price-card__price">
                  {plan.price} <span className="unit">{plan.unit}</span>
                </span>
                <p className="muted" style={{ fontSize: "0.88rem" }}>
                  {plan.timeline}
                </p>
                <CheckList items={plan.points} />
                <Link
                  className={`btn ${
                    plan.featured ? "btn--primary" : "btn--ghost"
                  } btn--block`}
                  href="/contact"
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ -------------------------------------------------------------- */}
      <section className="section">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <span className="eyebrow">Questions</span>
            <h2>The things people ask first</h2>
          </div>

          <div className="faq" data-reveal>
            {faqs.map((faq) => (
              <details className="faq-item" key={faq.q}>
                <summary>
                  {faq.q}
                  <ChevronIcon />
                </summary>
                <div className="faq-item__body">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="cta" data-reveal>
            <span className="eyebrow">Next step</span>
            <h2>Get a fixed quote in a few days.</h2>
            <p className="lede">
              Send over what you have — a paragraph, a sketch, or a full spec. The
              discovery call is free and there&apos;s no pitch deck at the end of it.
            </p>
            <div className="btn-row">
              <Link className="btn btn--primary" href="/contact">
                Start a project
                <ArrowIcon />
              </Link>
              <Link className="btn btn--ghost" href="/work">
                See the kind of work I do
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
