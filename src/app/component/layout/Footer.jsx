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

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/contact-us", label: "Contact" },
];

const resourceLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/resources", label: "Resources" },
  { href: "/our-partners", label: "Our Partners" },
  { href: "/industries-served", label: "Industries Served" },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/ABSGlobals",
    icon: <FaFacebookF size={16} />,
    label: "Facebook",
    hoverClass: "social-facebook",
  },
  {
    href: "https://www.twitter.com/",
    icon: <BsTwitterX size={16} />,
    label: "Twitter",
    hoverClass: "social-twitter",
  },
  {
    href: "https://www.instagram.com/abs_global_certificate/",
    icon: <FaInstagram size={16} />,
    label: "Instagram",
    hoverClass: "social-instagram",
  },
  {
    href: "https://www.linkedin.com/company/absglobal-iso-service",
    icon: <FaLinkedinIn size={16} />,
    label: "LinkedIn",
    hoverClass: "social-linkedin",
  },
  {
    href: "https://wa.me/",
    icon: <FaWhatsapp size={16} />,
    label: "WhatsApp",
    hoverClass: "social-whatsapp",
  },
  {
    href: "https://www.youtube.com/",
    icon: <FaYoutube size={16} />,
    label: "YouTube",
    hoverClass: "social-youtube",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-wrapper">
      <div className="footer-top-edge" />

      <div className="footer-main">
        <Container>
          <div className="footer-grid">
            <div className="footer-brand-col">
              <Link href="/" className="footer-logo-link">
                <Image
                  src="/logo.png"
                  alt="ABS Global Logo"
                  width={140}
                  height={140}
                />
              </Link>
              <p className="footer-brand-desc">
                ABS Global is a leading provider of ISO certification and
                management consulting services, helping organizations achieve
                excellence and compliance worldwide.
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
              <h4 className="footer-col-title">Quick Links</h4>
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
              <h4 className="footer-col-title">Resources</h4>
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
              <h4 className="footer-col-title">Get in Touch</h4>

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
                    Head office: Hadayeq Alahram, Giza, Egypt <br />
                    Maadi Office: Tower 3B, Engineers Towers, 18th floor, Cornich Al Maadi, Cairo, Egypt.,
                  </span>
                </div>
              </div>

              <div className="footer-newsletter">
                <p className="footer-newsletter-label">
                  Subscribe to our newsletter
                </p>
                <div className="footer-newsletter-form">
                  <div className="footer-newsletter-input-wrap">
                    <HiOutlineMail
                      className="footer-newsletter-mail-icon"
                      size={18}
                    />
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="footer-newsletter-input"
                    />
                  </div>
                  <button className="footer-newsletter-btn" type="button">
                    Subscribe
                  </button>
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
              © {currentYear} ABS Global. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <Link href="/privacy" className="footer-bottom-link">
                Privacy Policy
              </Link>
              <span className="footer-bottom-sep">·</span>
              <Link href="/terms" className="footer-bottom-link">
                Terms of Service
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
