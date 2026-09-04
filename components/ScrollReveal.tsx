"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/* Ports the original scroll-reveal behaviour. Elements keep their plain
   `data-reveal` attribute in the server-rendered markup, so pages stay server
   components and nothing is hidden unless we can observe it back into view. */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const root = document.documentElement;
    root.classList.add("js-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el, i) => {
      // Stagger siblings slightly so groups cascade instead of popping at once.
      el.style.transitionDelay = `${Math.min(i % 6, 5) * 70}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
