"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import {
  MdOutlineLocationOn,
  MdOutlinePhone,
  MdOutlineEmail,
} from "react-icons/md";
import { FiArrowUpRight } from "react-icons/fi";
import { t } from "../../i18n/navFooter";

export default function Footer({ lang = "en", settings = {} }) {
  const socialLinks = [
    {
      href: settings.Facebook || "https://www.facebook.com/ABSGlobals",
      icon: <FaFacebookF size={16} />,
      label: "Facebook",
      hoverClass: "social-facebook",
    },
    {
      href: settings.twitter || "https://www.twitter.com/",
      icon: <BsTwitterX size={16} />,
      label: "Twitter",
      hoverClass: "social-twitter",
    },
    {
      href: settings.instagram || "https://www.instagram.com/abs_global_certificate/",
      icon: <FaInstagram size={16} />,
      label: "Instagram",
      hoverClass: "social-instagram",
    },
    {
      href: settings.linkedin || "https://www.linkedin.com/company/absglobal-iso-service",
      icon: <FaLinkedinIn size={16} />,
      label: "LinkedIn",
      hoverClass: "social-linkedin",
    },
    {
      href: settings.whatsapp || "https://wa.me/+201026294642",
      icon: <FaWhatsapp size={16} />,
      label: "WhatsApp",
      hoverClass: "social-whatsapp",
    },
    {
      href: settings.youtube || "https://www.youtube.com/@ABSGLOBALS",
      icon: <FaYoutube size={16} />,
      label: "YouTube",
      hoverClass: "social-youtube",
    },
  ];
  const currentYear = new Date().getFullYear();
  const footer = t(lang, "footer");

  const quickLinks = [
    { href: `/${lang}`, label: footer.home },
    { href: `/${lang}/about-us`, label: footer.aboutUs },
    { href: `/${lang}/our-service`, label: footer.services },
    { href: `/${lang}/contact-us`, label: footer.contactUs },
  ];

  const resourceLinks = [
    { href: `/${lang}/blog`, label: footer.blog },
    { href: `/${lang}/faqs`, label: footer.faq },
    { href: `/${lang}/resources`, label: footer.resources },
    { href: `/${lang}/our-partners`, label: footer.ourPartners },
    { href: `/${lang}/industries-served`, label: footer.industriesServed },
  ];

  return (
    <footer className="footer-wrapper" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="footer-top-edge" />

      <div className="footer-main">
        <Container>
          <div className="footer-grid">
            <div className="footer-brand-col">
              <Link href={`/${lang}`} className="footer-logo-link">
                <Image
                  src="/logo.png"
                  alt="ABS Global Logo"
                  width={140}
                  height={140}
                />
              </Link>
              <p className="footer-brand-desc">
                {footer.brandDesc}
              </p>

              <div className="footer-social-row">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`footer-social-icon ${link.hoverClass}`}
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-links-col">
              <h4 className={`footer-col-title ${lang === "ar" ? "font-heading" : "font-display"}`}>{footer.quickLinksTitle}</h4>
              <ul className="footer-link-list">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-link">
                      <FiArrowUpRight className="footer-link-arrow" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-links-col">
              <h4 className="footer-col-title">{footer.resourcesTitle}</h4>
              <ul className="footer-link-list">
                {resourceLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-link">
                      <FiArrowUpRight className="footer-link-arrow" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-contact-col">
              <h4 className="footer-col-title">{footer.getInTouchTitle}</h4>

              <div className="footer-contact-items">
                <a
                  href="mailto:info@absglobal.com"
                  className="footer-contact-item"
                >
                  <span className="footer-contact-icon-wrap">
                    <MdOutlineEmail size={18} />
                  </span>
                  <span>info@absglobal.com</span>
                </a>

                <a href="https://wa.me/201026294642" target="_blank" className="footer-contact-item">
                  <span className="footer-contact-icon-wrap">
                    <MdOutlinePhone size={18} />
                  </span>
                  <span>+201026294642</span>
                </a>

                <div style={{alignItems: "flex-start"}} className="footer-contact-item">
                  <span className="footer-contact-icon-wrap">
                    <MdOutlineLocationOn size={18} />
                  </span>
                  <span>
                    {footer.headOffice} <br />
                    {footer.maadiOffice}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="footer-bottom">
        <Container>
          <div className="footer-bottom-inner">
            <p className="footer-copyright">
              © {currentYear} {footer.copyright}
            </p>
            <div className="footer-bottom-links">
              <Link href={`/${lang}/privacy`} className="footer-bottom-link">
                {footer.privacyPolicy}
              </Link>
              <span className="footer-bottom-sep">·</span>
              <Link href={`/${lang}/terms`} className="footer-bottom-link">
                {footer.termsOfService}
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}