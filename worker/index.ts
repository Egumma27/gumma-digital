/* ==========================================================================
   Contact form handler.

   Static assets are matched first, so this Worker only runs for paths with no
   corresponding file in out/ — /api/contact, plus genuine 404s, which fall
   through to the ASSETS binding and get out/404.html.
   ========================================================================== */

import { site } from "../lib/site";

export interface Env {
  ASSETS: Fetcher;
  /* wrangler secret put RESEND_API_KEY */
  RESEND_API_KEY: string;
}

const CONTACT_PATH = "/api/contact";

/* Must be on a domain verified in Resend. Adding Resend's DKIM/SPF records
   does not touch MX, so Google Workspace delivery is unaffected. */
const MAIL_FROM = "Gumma Digital <form@gummadigital.com>";

/* Generous caps — long enough for a real brief, short enough that nobody can
   post a novel through the form. */
const LIMITS = {
  name: 200,
  email: 320,
  project_type: 100,
  budget: 100,
  message: 5000,
} as const;

function field(data: FormData, name: keyof typeof LIMITS): string {
  const value = data.get(name);
  return typeof value === "string" ? value.trim().slice(0, LIMITS[name]) : "";
}

/* Deliberately loose: the browser already ran type="email" validation, and the
   only thing that truly matters here is that it cannot forge a header. */
function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !/[\r\n]/.test(value);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname !== CONTACT_PATH) {
      return env.ASSETS.fetch(request);
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", {
        status: 405,
        headers: { Allow: "POST" },
      });
    }

    // Without JS the browser POSTs the form natively and expects a page back.
    const wantsJson =
      request.headers.get("Accept")?.includes("application/json") ?? false;

    const respond = (status: number, message: string) =>
      wantsJson
        ? Response.json({ message }, { status })
        : status < 400
          ? Response.redirect(new URL("/thanks", url.origin).toString(), 303)
          : new Response(message, {
              status,
              headers: { "Content-Type": "text/plain; charset=utf-8" },
            });

    let data: FormData;
    try {
      data = await request.formData();
    } catch {
      return respond(400, "That submission could not be read.");
    }

    // Honeypot: a real person never fills this in. Answer as though it worked
    // so the bot has nothing to learn from the difference.
    if (String(data.get("company_website") ?? "").trim()) {
      return respond(200, "Thanks — your message is through.");
    }

    const name = field(data, "name");
    const email = field(data, "email");
    const message = field(data, "message");
    const projectType = field(data, "project_type");
    const budget = field(data, "budget");

    if (!name || !message || !looksLikeEmail(email)) {
      return respond(400, "Please provide your name, a valid email, and a message.");
    }

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Project type: ${projectType || "—"}`,
      `Budget: ${budget || "—"}`,
      "",
      message,
    ].join("\n");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: MAIL_FROM,
        to: [site.email],
        // Replying in your mail client goes straight back to the enquirer.
        reply_to: email,
        subject: `Project enquiry — ${name}`,
        text: body,
      }),
    });

    if (!res.ok) {
      console.error("Resend rejected the send", res.status, await res.text());
      return respond(502, `Something went wrong sending that. Email ${site.email} instead.`);
    }

    return respond(200, "Thanks — your message is through. I'll reply within one business day.");
  },
};
