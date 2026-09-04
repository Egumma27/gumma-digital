"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/site";
import { BrandMark, CloseIcon, MenuIcon } from "@/components/icons";

export default function SiteHeader() {
  const pathname = usePathname();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  /* Sticky header shading. */
  useEffect(() => {
    const applyStuck = () => setStuck(window.scrollY > 8);
    applyStuck();
    window.addEventListener("scroll", applyStuck, { passive: true });
    return () => window.removeEventListener("scroll", applyStuck);
  }, []);

  /* Close on Escape, and whenever the viewport grows past the mobile breakpoint. */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      document.querySelector<HTMLButtonElement>(".nav__toggle")?.focus();
    };
    const onResize = () => {
      if (window.innerWidth > 820) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  /* A client-side navigation should not leave the menu hanging open. */
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`site-header${stuck ? " is-stuck" : ""}`}>
      <div className="wrap">
        <nav className="nav" aria-label="Primary">
          <Link className="brand" href="/" aria-label="Gumma Digital — home">
            <BrandMark gradientId="bm" />
            <span className="brand__name">
              Gumma<span className="dim"> Digital</span>
            </span>
          </Link>

          <button
            className="nav__toggle"
            type="button"
            aria-expanded={open}
            aria-controls="nav-links"
            aria-label="Toggle navigation menu"
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon />
            <CloseIcon />
          </button>

          <ul className="nav__links" id="nav-links" data-open={String(open)}>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="nav__link"
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="nav__cta">
              <Link className="btn btn--primary" href="/contact">
                Start a project
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
