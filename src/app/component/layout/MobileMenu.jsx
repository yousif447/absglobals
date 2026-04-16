"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { Menu, X } from "lucide-react";
import Button from "../ui/Button";
import Image from "next/image";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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

  const socialLinks = [
    { href: "https://www.facebook.com/ABSGlobals", icon: <FaFacebookF size={18} />, hoverClass: "social-facebook", label: "Facebook" },
    { href: "https://www.twitter.com/", icon: <BsTwitterX size={18} />, hoverClass: "social-twitter", label: "Twitter" },
    { href: "https://www.instagram.com/abs_global_certificate/", icon: <FaInstagram size={18} />, hoverClass: "social-instagram", label: "Instagram" },
    { href: "https://www.linkedin.com/company/absglobal-iso-service", icon: <FaLinkedinIn size={18} />, hoverClass: "social-linkedin", label: "LinkedIn" },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
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
    closed: { opacity: 0, x: 20 },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.08 + i * 0.04, duration: 0.3 },
    }),
  };

  return (
    <div className="xl:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 p-2 rounded-[var(--radius-md)] hover:bg-gray-100 transition-colors"
        aria-label="Toggle navigation menu"
        id="mobile-menu-toggle"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed top-0 right-0 h-full w-[min(340px,85vw)] bg-white z-40 shadow-[-8px_0_30px_rgba(0,0,0,0.1)] flex flex-col overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="p-6 pt-20 flex flex-col h-full">
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
                            : "text-gray-600 hover:bg-gray-50 hover:text-[var(--primary-color)] hover:pl-6"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="my-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                <div className="flex items-center gap-2 px-4 py-2 mb-4 rounded-[var(--radius-md)] hover:bg-gray-50 cursor-pointer transition-colors">
                  <Image src="/us-flag.png" alt="United States Flag" width={20} height={20} />
                  <p className="text-sm text-gray-600 font-medium">English</p>
                </div>

                <Button className="w-full text-center">Get in Touch</Button>

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
    </div>
  );
}
