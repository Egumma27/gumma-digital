"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { ArrowIcon } from "@/components/icons";

type Status = { message: string; ok: boolean } | null;

/* The endpoint ships unconfigured. Until it is set, fall back to the visitor's
   mail client so the form still does something useful. */
const configured =
  site.formEndpoint !== "" && !site.formEndpoint.includes("YOUR_FORM_ID");

export default function ContactForm() {
  const [status, setStatus] = useState<Status>(null);
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;

    // Let the browser run its own required/type validation first.
    if (!form.checkValidity()) return;

    e.preventDefault();

    const data = new FormData(form);

    // Honeypot: a real person never fills this in.
    if (data.get("company_website")) return;

    if (!configured) {
      const subject = `Project enquiry — ${data.get("name") || "Website"}`;
      const body = [
        `Name: ${data.get("name") || ""}`,
        `Email: ${data.get("email") || ""}`,
        `Project type: ${data.get("project_type") || ""}`,
        `Budget: ${data.get("budget") || ""}`,
        "",
        String(data.get("message") || ""),
      ].join("\n");

      window.location.href =
        `mailto:${site.email}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

      setStatus({
        message: `Opening your email app — if nothing happens, write to ${site.email}.`,
        ok: true,
      });
      return;
    }

    setSending(true);

    try {
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      form.reset();
      setStatus({
        message:
          "Thanks — your message is through. I'll reply within one business day.",
        ok: true,
      });
    } catch {
      setStatus({
        message: `Something went wrong sending that. Email ${site.email} instead.`,
        ok: false,
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      className="form"
      /* The action attribute is the single place the endpoint is configured, so
         the fetch path and the plain browser POST can never drift apart. */
      action={site.formEndpoint}
      method="POST"
      onSubmit={onSubmit}
    >
      <div className="field-row">
        <div className="field">
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Jane Doe"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            placeholder="jane@company.com"
            required
          />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="project_type">What do you need?</label>
          <select id="project_type" name="project_type" defaultValue="">
            <option value="">Choose one…</option>
            <option>Website or landing page</option>
            <option>Web application</option>
            <option>Mobile app</option>
            <option>Rescue an existing project</option>
            <option>Ongoing support</option>
            <option>Not sure yet</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="budget">
            Rough budget <span className="hint">(optional)</span>
          </label>
          <select id="budget" name="budget" defaultValue="">
            <option value="">Prefer not to say</option>
            <option>Under $2,500</option>
            <option>$2,500 – $9,000</option>
            <option>$9,000 – $25,000</option>
            <option>$25,000+</option>
            <option>Monthly retainer</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="message">About the project</label>
        <textarea
          id="message"
          name="message"
          required
          placeholder="What are you trying to solve? Who's it for? Is there a date it needs to be live by?"
        />
      </div>

      {/* Honeypot — hidden from people, catches naive spam bots. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="company_website">Leave this field empty</label>
        <input
          type="text"
          id="company_website"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <p
        className={
          status
            ? `form-status ${status.ok ? "form-status--ok" : "form-status--err"}`
            : "form-status"
        }
        hidden={!status}
        role="status"
        aria-live="polite"
      >
        {status?.message}
      </p>

      <button className="btn btn--primary" type="submit" disabled={sending}>
        {sending ? "Sending…" : "Send message"}
        {!sending && <ArrowIcon />}
      </button>

      <p className="form__note">
        Your details are used to reply to this enquiry and nothing else. No list, no
        newsletter, no sharing.
      </p>
    </form>
  );
}
