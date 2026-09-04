import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Work",
  description:
    "The kinds of projects Gumma Digital takes on: booking and scheduling platforms, internal tools, customer portals, and mobile apps.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work — Gumma Digital",
    description: "The kinds of projects Gumma Digital takes on.",
    url: "/work",
  },
};

/* ==========================================================================
   Example project types — NOT client case studies.
   As you complete real projects, replace each entry below with the real client
   name, a screenshot in place of the `mock` placeholder, and genuine outcome
   numbers in `metrics`.
   ========================================================================== */
type WorkItem = {
  kicker: string;
  title: string;
  body: string;
  /* Widths of the placeholder mock lines; `accent` highlights one of them. */
  lines: { width: string; accent?: boolean }[];
  dots: number;
  mockMaxWidth?: string;
  metrics: { num: string; label: string }[];
  flip: boolean;
};

const work: WorkItem[] = [
  {
    kicker: "Web application",
    title: "Booking & scheduling platforms",
    body: "Businesses that run on appointments usually run on a shared calendar and a phone. A proper booking system takes the availability rules, the deposits, the reminders, and the cancellations, and puts them somewhere they can't be double-booked. Customers book themselves in; staff see one schedule; nobody re-types anything.",
    dots: 3,
    lines: [
      { width: "70%" },
      { width: "45%", accent: true },
      { width: "88%" },
      { width: "60%" },
      { width: "78%" },
    ],
    metrics: [
      { num: "6–9 wks", label: "Typical build" },
      { num: "Stripe", label: "Deposits & payments" },
      { num: "Web + iOS", label: "Where it runs" },
    ],
    flip: false,
  },
  {
    kicker: "Internal tool",
    title: "The spreadsheet that outgrew itself",
    body: "Almost every small business has one: a workbook that started as a list and now runs operations, breaks when two people open it, and only one person truly understands. Replacing it with a real application means validation, an audit trail, permissions, and reporting that doesn't depend on someone remembering to re-sort a column.",
    dots: 3,
    lines: [
      { width: "52%" },
      { width: "92%" },
      { width: "66%", accent: true },
      { width: "40%" },
      { width: "84%" },
    ],
    metrics: [
      { num: "3–6 wks", label: "Typical build" },
      { num: "Postgres", label: "One source of truth" },
      { num: "Role-based", label: "Access control" },
    ],
    flip: true,
  },
  {
    kicker: "Mobile",
    title: "Field and customer-facing apps",
    body: "Apps for people who aren't at a desk — technicians logging jobs on site, drivers capturing proof of delivery, members checking in. The hard parts are rarely the screens: it's working offline in a basement with no signal, syncing cleanly when the connection returns, and getting through App Store review the first time.",
    dots: 1,
    mockMaxWidth: "180px",
    lines: [
      { width: "80%" },
      { width: "55%", accent: true },
      { width: "95%" },
      { width: "70%" },
      { width: "48%" },
      { width: "86%" },
    ],
    metrics: [
      { num: "8–12 wks", label: "Typical build" },
      { num: "Offline", label: "First-class support" },
      { num: "iOS + Android", label: "One codebase" },
    ],
    flip: false,
  },
  {
    kicker: "Website",
    title: "Sites that carry their weight",
    body: "A marketing site earns its cost by loading instantly, saying the right thing above the fold, and turning visitors into enquiries. Built by hand rather than assembled from plugins, it stays fast years later, costs almost nothing to host, and never breaks because an add-on updated itself overnight.",
    dots: 3,
    lines: [
      { width: "74%", accent: true },
      { width: "96%" },
      { width: "58%" },
      { width: "82%" },
      { width: "36%" },
    ],
    metrics: [
      { num: "2–3 wks", label: "Typical build" },
      { num: "< 1s", label: "Target load time" },
      { num: "0 plugins", label: "To maintain" },
    ],
    flip: true,
  },
];

export default function WorkPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <span className="eyebrow">Work</span>
          <h1>The kind of thing I build.</h1>
          <p className="lede">
            Gumma Digital is new, and I&apos;d rather show you what I can build than
            pad this page with logos. Below are the project shapes I take on and what
            each one actually involves. Client case studies land here as they ship.
          </p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap">
          <div className="grid" style={{ gap: "1.5rem" }}>
            {work.map((item) => (
              <article
                className={`work-card${item.flip ? " work-card--flip" : ""}`}
                data-reveal
                key={item.title}
              >
                <div className="work-card__visual" aria-hidden="true">
                  <div
                    className="mock"
                    style={
                      item.mockMaxWidth
                        ? { maxWidth: item.mockMaxWidth }
                        : undefined
                    }
                  >
                    <div className="mock__bar">
                      {Array.from({ length: item.dots }, (_, i) => (
                        <span className="mock__dot" key={i} />
                      ))}
                    </div>
                    {item.lines.map((line, i) => (
                      <div
                        className={`mock__line${
                          line.accent ? " mock__line--accent" : ""
                        }`}
                        style={{ width: line.width }}
                        key={i}
                      />
                    ))}
                  </div>
                </div>

                <div className="work-card__body">
                  <span className="work-card__kicker">{item.kicker}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <div className="metrics">
                    {item.metrics.map((metric) => (
                      <div className="metric" key={metric.label}>
                        <span className="metric__num">{metric.num}</span>
                        <span className="metric__label">{metric.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Founding client offer -------------------------------------------- */}
      <section className="section">
        <div className="wrap">
          <div className="cta" data-reveal>
            <span className="eyebrow">Founding clients</span>
            <h2>Early projects, early rates.</h2>
            <p className="lede">
              I&apos;m taking on a small number of first projects at a reduced rate,
              in exchange for a testimonial and permission to write the work up as a
              case study. Same process, same standard, same guarantees — just better
              timing for you.
            </p>
            <div className="btn-row">
              <Link className="btn btn--primary" href="/contact">
                Claim a founding slot
                <ArrowIcon />
              </Link>
              <Link className="btn btn--ghost" href="/services">
                See pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
