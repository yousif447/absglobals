"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { Menu, X } from "lucide-react";
import Button from "../ui/Button";
import LanguageToggle from "./LanguageToggle";
import { t } from "../../i18n/navFooter";

export default function MobileMenu({ lang = "en" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const nav = t(lang, "nav");
  const isRtl = lang === "ar";

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
    { href: `/${lang}/reports`, label: nav.report },
  ];

  const socialLinks = [
    {
      href: "https://www.facebook.com/ABSGlobals",
      icon: <FaFacebookF size={18} />,
      hoverClass: "social-facebook",
      label: "Facebook",
    },
    {
      href: "https://www.twitter.com/",
      icon: <BsTwitterX size={18} />,
      hoverClass: "social-twitter",
      label: "Twitter",
    },
    {
      href: "https://www.instagram.com/abs_global_certificate/",
      icon: <FaInstagram size={18} />,
      hoverClass: "social-instagram",
      label: "Instagram",
    },
    {
      href: "https://www.linkedin.com/company/absglobal-iso-service",
      icon: <FaLinkedinIn size={18} />,
      hoverClass: "social-linkedin",
      label: "LinkedIn",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const linkVariants = {
    closed: { opacity: 0, x: isRtl ? -20 : 20 },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.08 + i * 0.04, duration: 0.3 },
    }),
  };

  // The overlay + drawer are portalled to <body> so they escape
  // the nav's stacking context created by backdrop-blur.
  const drawerContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[59]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            dir={isRtl ? "rtl" : "ltr"}
            className={`fixed top-0 ${isRtl ? "left-0" : "right-0"} h-full w-[min(340px,85vw)] bg-white z-[60] shadow-[-8px_0_30px_rgba(0,0,0,0.1)] flex flex-col overflow-y-auto overscroll-contain`}
            initial={{ x: isRtl ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? "-100%" : "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-6 flex flex-col h-full">
              <div
                className={`flex ${isRtl ? "justify-start" : "justify-end"} mb-6`}
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-[var(--radius-md)] hover:bg-gray-100 transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    custom={i}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center px-4 py-3 rounded-[var(--radius-md)] text-[15px] font-medium transition-all duration-200 ${
                        pathname === link.href
                          ? "bg-[var(--primary-color)] text-white shadow-md"
                          : `text-gray-600 hover:bg-gray-50 hover:text-[var(--primary-color)] ${isRtl ? "hover:pr-6" : "hover:pl-6"}`
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="my-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

              <div className="flex items-center gap-2 px-4 py-2 mb-4 rounded-[var(--radius-md)] hover:bg-gray-50 cursor-pointer transition-colors">
                <LanguageToggle />
              </div>

              <Link href={`/${lang}/contact-us`} onClick={() => setIsOpen(false)}>
                <Button className="w-full text-center">{nav.contactUs}</Button>
              </Link>

              <div className="mt-auto pt-8 pb-4">
                <div className="flex items-center justify-center gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`social-icon-link ${link.hoverClass}`}
                      aria-label={link.label}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <div className="xl:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-[var(--radius-md)] hover:bg-gray-100 transition-colors"
        aria-label="Open navigation menu"
      >
        <Menu size={24} />
      </button>

      {/* Portal the drawer to <body> to escape nav's stacking context */}
      {mounted && createPortal(drawerContent, document.body)}
    </div>
  );
}
