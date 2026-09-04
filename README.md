# Gumma Digital — website

A five-page marketing site built with Next.js (App Router) and React. One global
stylesheet, no CSS framework. It builds to static HTML, so it still deploys to any
static host.

```
gumma-digital/
├── app/
│   ├── layout.tsx          Header, footer, fonts, shared metadata
│   ├── globals.css         The whole design — tokens at the top
│   ├── page.tsx            Home
│   ├── services/page.tsx   Services + pricing + FAQ
│   ├── work/page.tsx       Project types (replace with real case studies)
│   ├── about/page.tsx      About + principles
│   ├── contact/page.tsx    Contact form + details
│   ├── thanks/page.tsx     Landing for a no-JS form POST
│   ├── not-found.tsx       404
│   ├── sitemap.ts          → /sitemap.xml
│   └── robots.ts           → /robots.txt
├── components/
│   ├── SiteHeader.tsx      Sticky shading + mobile nav
│   ├── SiteFooter.tsx
│   ├── ContactForm.tsx     Submit, honeypot, mailto fallback
│   ├── ScrollReveal.tsx    IntersectionObserver reveal
│   ├── Year.tsx            Footer copyright year
│   └── icons.tsx           Every inline SVG, including the brand mark
├── worker/index.ts         POST /api/contact -> emails you via Resend
├── lib/site.ts             Domain, email, form endpoint, nav
└── public/assets/favicon.svg
```

## Run it locally

```sh
npm install
npm run dev
# → http://localhost:3000
```

`npm run build` writes the static site to `out/`.

## Before you launch — the checklist

These are the placeholders I could not fill in for you.

| # | What | Where |
|---|------|-------|
| 1 | ~~Email address~~ — set to `support@gummadigital.com` | `lib/site.ts` (`email`) — drives the footer, CTAs, contact page, and JSON-LD |
| 2 | **`https://gummadigital.com`** → your real domain | `lib/site.ts` (`url`) — drives canonical URLs, Open Graph, `sitemap.xml`, `robots.txt` |
| 3 | **`RESEND_API_KEY`** + a verified sending domain | Worker secret — see below |
| 4 | **Pricing** — `$2,500` / `$9,000` / `$750` are placeholders | `app/services/page.tsx` (`plans`) |
| 5 | **Your background** — the paragraphs marked `PERSONALISE` | `app/about/page.tsx` |
| 6 | **Tech stack tags** — trim to what you want to be hired for | `app/about/page.tsx` (`stack`) |
| 7 | **Availability line** | `app/contact/page.tsx`, plus the "Available for new projects" badge on `app/page.tsx` |

Items 1–3 all live in one file, so a single edit to `lib/site.ts` covers the
whole site.

### How the contact form works

Submissions go to `POST /api/contact`, handled by `worker/index.ts`, which emails
you via [Resend](https://resend.com). Nothing third-party stores your enquiries,
and the visitor never opens their own mail client.

Two things to set up once:

**1. Verify the sending domain in Resend.** Add the DKIM and SPF records Resend
gives you to the `gummadigital.com` zone. These are `TXT` records — they do not
touch `MX`, so Google Workspace delivery is unaffected. Then confirm
`MAIL_FROM` at the top of `worker/index.ts` uses an address on that domain.

**2. Give the Worker the API key:**

```sh
npx wrangler secret put RESEND_API_KEY
```

Worker secrets live on the deployed Worker, not in CI — a GitHub Actions deploy
will not overwrite it, and it never enters the repo.

The mail is sent with `reply_to` set to the enquirer, so replying in your mail
client goes straight back to them.

**Both paths are covered.** With JavaScript the form `fetch`es and shows the
result inline. Without it, the browser POSTs natively to the same URL and the
Worker redirects to `/thanks`. The honeypot (`company_website`) is checked in the
Worker as well as the client, since a bot can post straight past the client, and
a caught bot gets the same success response as a real person so it learns
nothing from the difference.

Worth adding before you get traffic: a
[rate limit](https://developers.cloudflare.com/waf/rate-limiting-rules/) on
`/api/contact`. Nothing currently stops someone scripting the endpoint.

## A note on the Work page

`app/work/page.tsx` deliberately describes **project types**, not client case
studies — it's framed as "here's the kind of thing I build" because Gumma Digital
is new. Nothing on it claims a client you don't have.

As real projects ship, replace each entry in the `work` array with:

- the real client and project name,
- a screenshot (`next/image`) swapped in for the `work-card__visual` placeholder,
- genuine numbers in `metrics`.

Resist the urge to invent case studies in the meantime — prospects check, and the
"founding clients" section at the bottom of the page is a stronger play for a new
business anyway.

## Deploying

`output: "export"` in `next.config.mjs` means the build produces plain HTML — no
Node server needed.

- **Vercel** — `npx vercel`, or connect the repo; it detects Next.js
- **Netlify** — build command `npm run build`, publish directory `out`
- **Cloudflare Pages** — same: `npm run build`, output directory `out`
- **GitHub Pages** — publish the `out/` directory

If you later want server-rendered routes, API routes, or on-demand image
optimisation, drop the `output: "export"` line and deploy to a host that runs
Node.

## Customising the look

Everything visual is driven by the custom properties at the top of
`app/globals.css`:

```css
--accent:     #5eead4;   /* teal — buttons, links, highlights */
--accent-alt: #818cf8;   /* indigo — second half of gradients */
--bg:         #08090b;
```

Change `--accent` and `--accent-alt` and the whole site — logo, buttons, focus
rings, gradients, ambient background glow — follows.

Fonts come from `next/font/google` in `app/layout.tsx`, which self-hosts Inter and
JetBrains Mono at build time. Remove those two imports and the system font stacks
in `--font-sans` / `--font-mono` take over cleanly.

## Accessibility & performance

- Skip link, visible focus rings, `aria-current` on the active nav item,
  labelled form fields, live region for form status.
- `prefers-reduced-motion` disables all animation and scroll reveal.
- Scroll reveal only hides content when `IntersectionObserver` exists, so the
  page is never blank with JS disabled.
- Every page is prerendered to real HTML, including the JSON-LD on the home page,
  so crawlers see the full content without running JavaScript.
- No external requests at runtime — the fonts are served from your own domain.
