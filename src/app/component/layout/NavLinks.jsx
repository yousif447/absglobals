"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NavLinks() {
  const pathname = usePathname();
  const [hoveredHref, setHoveredHref] = useState(null);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact-us", label: "Contact" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
    { href: "/industries-served", label: "Industries Served" },
    { href: "/our-partners", label: "Our Partners" },
    { href: "/resources", label: "Resources" },
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
            <AnimatePresence>
              {isIndicatorHere && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-[var(--radius-md)] bg-[var(--primary-color)] rounded-[var(--radius-xl)]"
                  style={{ zIndex: 0 }}
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
            </AnimatePresence>

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