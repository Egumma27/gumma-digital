import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Message sent",
  /* Only ever reached by submitting the form; nothing to index. */
  robots: { index: false },
};

/* Where the Worker redirects a form POST that arrived without JavaScript. With
   JS the form never navigates — it shows the status inline instead. */
export default function ThanksPage() {
  return (
    <section className="page-head">
      <div className="wrap">
        <span className="eyebrow">Contact</span>
        <h1>Thanks — your message is through.</h1>
        <p className="lede">
          I read every enquiry myself and reply within one business day. If it&apos;s
          urgent, or you want to send attachments, write to{" "}
          <a className="link" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
        <div className="btn-row">
          <Link className="btn btn--primary" href="/">
            Back to home
          </Link>
          <Link className="btn btn--ghost" href="/work">
            See the kind of work I do
          </Link>
        </div>
      </div>
    </section>
  );
}
