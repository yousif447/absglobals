"use client";

import { useState, useEffect } from "react";
import Container from "./Container";
import Image from "next/image";
import Button from "../ui/Button";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import LanguageToggle from "./LanguageToggle";
import { t } from "../../i18n/navFooter";

export default function Navbar({ lang = "en", settings = {} }) {
  const [scrolled, setScrolled] = useState(false);
  const nav = t(lang, "nav");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialLinks = [
    {
      href: settings.Facebook || "https://www.facebook.com/ABSGlobals",
      icon: <FaFacebookF size={14} />,
      label: "Facebook",
      hoverClass:
        "hover:bg-[#1877F2] hover:shadow-[0_4px_14px_rgba(24,119,242,0.4)]",
    },
    {
      href: settings.twitter || "https://www.twitter.com/",
      icon: <BsTwitterX size={14} />,
      label: "Twitter",
      hoverClass:
        "hover:bg-[#181818] hover:shadow-[0_4px_14px_rgba(29,161,242,0.4)]",
    },
    {
      href:
        settings.instagram ||
        "https://www.instagram.com/abs_global_certificate/",
      icon: <FaInstagram size={14} />,
      label: "Instagram",
      hoverClass:
        "hover:bg-[linear-gradient(135deg,#833AB4,#E4405F,#FCAF45)] hover:shadow-[0_4px_14px_rgba(228,64,95,0.4)]",
    },
    {
      href:
        settings.linkedin ||
        "https://www.linkedin.com/company/absglobal-iso-service",
      icon: <FaLinkedinIn size={14} />,
      label: "LinkedIn",
      hoverClass:
        "hover:bg-[#0A66C2] hover:shadow-[0_4px_14px_rgba(10,102,194,0.4)]",
    },
  ];

  return (
    <nav
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`sticky top-0 z-50 ransition-all duration-300 ${
        scrolled
          ? "py-2 bg-white/85 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.04)]"
          : "py-4 bg-white"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between gap-4">
          <Link href={`/${lang}`} className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="ABS Global Logo"
              width={120}
              height={120}
              priority
            />
          </Link>

          <NavLinks lang={lang} />

          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="hidden xl:flex items-center gap-1.5">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className={`flex items-center justify-center w-[34px] h-[34px] rounded-full
                    text-[#9CA3AF] bg-transparent border border-[#E5E7EB]
                    transition-all duration-300
                    hover:-translate-y-[3px] hover:text-white hover:border-transparent
                    ${link.hoverClass}`}
                >
                  {link.icon}
                </a>
              ))}
            </div>

            <div className="hidden xl:block w-px h-6 bg-gray-200" />

            <div className="hidden xl:flex items-center gap-1.5 cursor-pointer hover:opacity-70 transition-opacity">
              <LanguageToggle />
            </div>

            <div className="hidden xl:block">
              <Link href={"#contact"}>
                <Button
                  className="py-2 px-3 rounded-[var(--radius-xl)]"
                  size="sm"
                >
                  {nav.getInTouch}
                </Button>
              </Link>
            </div>

            <MobileMenu lang={lang} />
          </div>
        </div>
      </Container>
    </nav>
  );
}
