"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { t } from "../../i18n/navFooter";

export default function NavLinks({ lang = "en" }) {
  const pathname = usePathname();
  const [hoveredHref, setHoveredHref] = useState(null);
  const nav = t(lang, "nav");

  const navLinks = [
    { href: `/${lang}`, label: nav.home },
    { href: `/${lang}/about-us`, label: nav.about },
    { href: `/${lang}/our-service`, label: nav.services },
    { href: `/${lang}/blog`, label: nav.blogs },
    { href: `/${lang}/faqs`, label: nav.faq },
    { href: `/${lang}/industries-served`, label: nav.industriesServed },
    { href: `/${lang}/our-partners`, label: nav.ourPartners },
    { href: `/${lang}/resources`, label: nav.resources },
    { href: `/${lang}/validation`, label: nav.validation },
    { href: `/${lang}/contact-us`, label: nav.contact },
  ];

  const indicatorTarget = hoveredHref ?? pathname;

  return (
    <div className="rounded-[var(--radius-xl)] p-2 border border-[#dadcdf] hidden xl:flex items-center gap-0.5">
      {navLinks.map((link) => {
        const isIndicatorHere = indicatorTarget === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className="relative rounded-[var(--radius-md)] px-2.5 py-1.5 transition-colors text-sm font-medium whitespace-nowrap"
            onMouseEnter={() => setHoveredHref(link.href)}
            onMouseLeave={() => setHoveredHref(null)}
          >
            {isIndicatorHere && (
              <motion.span
                layoutId="nav-indicator"
                className="absolute inset-0 rounded-[var(--radius-xl)] bg-[var(--primary-color)]"
                style={{ zIndex: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                }}
              />
            )}

            <span
              className="relative z-10 transition-colors duration-200"
              style={{
                color: isIndicatorHere ? "white" : "#4B5563",
              }}
            >
              {link.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}