import Link from "next/link";
import { navItems, site } from "@/lib/site";
import { BrandMark } from "@/components/icons";
import Year from "@/components/Year";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-about">
            <Link className="brand" href="/">
              <BrandMark gradientId="bmf" />
              <span className="brand__name">
                Gumma<span className="dim"> Digital</span>
              </span>
            </Link>
            <p>{site.tagline}</p>
          </div>

          <div className="footer-col">
            <h4>Site</h4>
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Get in touch</h4>
            <ul>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <Link href="/contact">Start a project</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            &copy; <Year buildYear={new Date().getFullYear()} /> Gumma Digital. All
            rights reserved.
          </span>
          <span>Built from scratch. No templates.</span>
        </div>
      </div>
    </footer>
  );
}
