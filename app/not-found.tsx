import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section
      className="section"
      style={{ minHeight: "80vh", display: "grid", placeItems: "center" }}
    >
      <div className="wrap" style={{ textAlign: "center" }}>
        <span className="eyebrow" style={{ justifyContent: "center" }}>
          Error 404
        </span>
        <h1 style={{ marginBottom: "1.25rem" }}>This page doesn&apos;t exist.</h1>
        <p className="lede" style={{ marginInline: "auto" }}>
          The link may be out of date, or the address slightly off. Everything else is
          still where you left it.
        </p>
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <Link className="btn btn--primary" href="/">
            Back to home
          </Link>
          <Link className="btn btn--ghost" href="/contact">
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
