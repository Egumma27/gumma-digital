# Gumma Digital — website

A five-page marketing site: plain HTML, one CSS file, one JS file. No build step,
no framework, no dependencies. Open `index.html` and it works.

```
gumma-digital/
├── index.html          Home
├── services.html       Services + pricing + FAQ
├── work.html           Project types (replace with real case studies)
├── about.html          About + principles
├── contact.html        Contact form + details
├── 404.html
├── robots.txt
├── sitemap.xml
└── assets/
    ├── favicon.svg
    ├── css/styles.css
    └── js/main.js
```

## Run it locally

```sh
cd gumma-digital
python3 -m http.server 8000
# → http://localhost:8000
```

## Before you launch — the checklist

These are the placeholders I could not fill in for you. Search-and-replace across
all files.

| # | What | Where |
|---|------|-------|
| 1 | **`hello@gummadigital.com`** → your real address | every page (footer, CTAs, contact) + `contact.html` `data-email` + JSON-LD in `index.html` |
| 2 | **`https://gummadigital.com`** → your real domain | `<link rel="canonical">` and `og:url` on each page, `robots.txt`, `sitemap.xml` |
| 3 | **Contact form endpoint** | `contact.html` → the form's `action` attribute (see below) |
| 4 | **Pricing** — `$2,500` / `$9,000` / `$750` are placeholders | `services.html` |
| 5 | **Your background** — two paragraphs marked `PERSONALISE` | `about.html` |
| 6 | **Tech stack tags** — trim to what you want to be hired for | `about.html` |
| 7 | **Availability line** | `contact.html`, plus the "Available for new projects" badge on `index.html` |

### Wiring up the contact form

The form works *today* without any setup: submitting opens the visitor's mail
client with all the answers pre-filled. That's a fine launch state, but it loses
people on phones with no mail app configured.

To collect submissions properly, create a free form at
[Formspree](https://formspree.io) (or Basin, or Web3Forms) and paste the endpoint
into the form's `action` in `contact.html`:

```html
<form class="form" data-contact-form
      data-email="you@yourdomain.com"
      action="https://formspree.io/f/abcdwxyz"   <!-- ← your endpoint -->
      method="POST">
```

That single attribute drives both paths — the JS `fetch` submit and the plain
browser POST if JS fails — so they can't drift apart. The JS detects the
`YOUR_FORM_ID` placeholder and falls back to `mailto:` until you replace it.

A honeypot field (`company_website`) is already in place and catches most naive
spam bots.

## A note on the Work page

`work.html` deliberately describes **project types**, not client case studies —
it's framed as "here's the kind of thing I build" because Gumma Digital is new.
Nothing on it claims a client you don't have.

As real projects ship, replace each `.work-card` with:

- the real client and project name,
- a screenshot swapped in for the `.work-card__visual` placeholder,
- genuine numbers in the `.metrics` block.

Resist the urge to invent case studies in the meantime — prospects check, and the
"founding clients" section at the bottom of the page is a stronger play for a new
business anyway.

## Deploying

Any static host. No build command, publish directory is the project root.

- **Netlify** — drag the folder onto app.netlify.com/drop
- **Vercel** — `npx vercel` in the project root
- **Cloudflare Pages** — connect the repo, leave the build command empty
- **GitHub Pages** — push to a repo, enable Pages on the branch root

The `404.html` uses absolute paths, so it renders correctly on any of these when
served from the domain root.

## Customising the look

Everything visual is driven by the custom properties at the top of
`assets/css/styles.css`:

```css
--accent:     #5eead4;   /* teal — buttons, links, highlights */
--accent-alt: #818cf8;   /* indigo — second half of gradients */
--bg:         #08090b;
```

Change `--accent` and `--accent-alt` and the whole site — logo, buttons, focus
rings, gradients, ambient background glow — follows.

## Accessibility & performance

- Skip link, visible focus rings, `aria-current` on the active nav item,
  labelled form fields, live region for form status.
- `prefers-reduced-motion` disables all animation and scroll reveal.
- Scroll reveal only hides content when `IntersectionObserver` exists, so the
  page is never blank with JS disabled.
- Google Fonts are the only external request; drop the two `<link>` tags and the
  system font stack in `--font-sans` takes over cleanly.
