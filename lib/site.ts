/* Single source of truth for the values that appear on every page.
   The pre-launch checklist in the README points here. */

export const site: {
  name: string;
  url: string;
  email: string;
  tagline: string;
  formEndpoint: string;
} = {
  name: "Gumma Digital",
  /* Your real domain — also drives canonical URLs, sitemap, and robots.txt. */
  url: "https://gummadigital.com",
  /* Your real address — used in the footer, CTAs, contact page, and JSON-LD. */
  email: "support@gummadigital.com",
  tagline:
    "Freelance software development — web apps, websites, and mobile apps for founders and small teams.",
  /* Handled by worker/index.ts, which emails site.email via Resend. */
  formEndpoint: "/api/contact",
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
