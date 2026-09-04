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
| 3 | **Contact form endpoint** | `lib/site.ts` (`formEndpoint`) — see below |
| 4 | **Pricing** — `$2,500` / `$9,000` / `$750` are placeholders | `app/services/page.tsx` (`plans`) |
| 5 | **Your background** — the paragraphs marked `PERSONALISE` | `app/about/page.tsx` |
| 6 | **Tech stack tags** — trim to what you want to be hired for | `app/about/page.tsx` (`stack`) |
| 7 | **Availability line** | `app/contact/page.tsx`, plus the "Available for new projects" badge on `app/page.tsx` |

Items 1–3 all live in one file, so a single edit to `lib/site.ts` covers the
whole site.

### Wiring up the contact form

The form works *today* without any setup: submitting opens the visitor's mail
client with all the answers pre-filled. That's a fine launch state, but it loses
people on phones with no mail app configured.

To collect submissions properly, create a free form at
[Formspree](https://formspree.io) (or Basin, or Web3Forms) and paste the endpoint
into `lib/site.ts`:

```ts
formEndpoint: "https://formspree.io/f/abcdwxyz",   // ← your endpoint
```

That single value drives both paths — the `fetch` submit and the form's `action`
attribute, which the browser POSTs to if JavaScript fails — so they can't drift
apart. `ContactForm` detects the `YOUR_FORM_ID` placeholder and falls back to
`mailto:` until you replace it.

A honeypot field (`company_website`) is already in place and catches most naive
spam bots.

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
