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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialLinks = [
    {
      href: "https://www.facebook.com/ABSGlobals",
      icon: <FaFacebookF size={14} />,
      hoverClass: "social-facebook",
      label: "Facebook",
    },
    {
      href: "https://www.twitter.com/",
      icon: <BsTwitterX size={14} />,
      hoverClass: "social-twitter",
      label: "Twitter",
    },
    {
      href: "https://www.instagram.com/abs_global_certificate/",
      icon: <FaInstagram size={14} />,
      hoverClass: "social-instagram",
      label: "Instagram",
    },
    {
      href: "https://www.linkedin.com/company/absglobal-iso-service",
      icon: <FaLinkedinIn size={14} />,
      hoverClass: "social-linkedin",
      label: "LinkedIn",
    },
  ];

  return (
    <nav
      className={`top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-2 bg-white/85 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.04)]"
          : "py-4 bg-white"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="ABS Global Logo"
              width={120}
              height={120}
              priority
            />
          </Link>

          <NavLinks />

          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="hidden xl:flex items-center gap-1.5">
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

            <div className="hidden xl:block w-px h-6 bg-gray-200" />

            <div className="hidden xl:flex items-center gap-1.5 cursor-pointer hover:opacity-70 transition-opacity">
              <Image
                src="/us-flag.png"
                alt="United States Flag"
                width={18}
                height={18}
              />
              <p className="text-sm text-gray-500 font-medium">EN</p>
            </div>

            <div className="hidden xl:block">
              <Button className="py-2 px-3 rounded-[var(--radius-xl)]" size="sm">Get in Touch</Button>
            </div>

            <MobileMenu />
          </div>
        </div>
      </Container>
    </nav>
  );
}
