"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeroSection({ data, lang = 'en' }) {
  const heroSection = data.sections.find(section => section.type === "Hero").content[0];
  return (
    /* hero-section */
    <section
      className="relative w-full min-h-[91vh] flex items-center justify-center overflow-hidden max-sm:min-h-[85vh]"
      id="hero"
    >
      {/* hero-image-wrapper */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,23,42,0.82)_0%,rgba(15,23,42,0.6)_40%,rgba(55,118,189,0.35)_100%] opacity-100 to-[rgba(0,0,0,0.85)]">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGES}${heroSection.image}`}
          alt="ABS Global certification services hero background"
          fill
          style={{ 
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover', 
            objectPosition: 'center' 
          }}
        />
        {/* <Image
          src={heroSection.image}
          alt="ABS Global certification services hero background"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        /> */}
        {/* hero-overlay */}
        <div className="absolute inset-0 z-1 bg-[linear-gradient(135deg,rgba(15,23,42,0.82)_0%,rgba(15,23,42,0.6)_40%,rgba(55,118,189,0.35)_100%)]" />
      </div>

      {/* hero-content */}
      <div className="relative z-[2] text-center max-w-[800px] px-6 py-8">

        {/* hero-badge */}
        <motion.span
          className="text-white/90 inline-block text-[0.85rem] font-bold bg-white/10 backdrop-blur-sm border border-white/15 px-5 py-[0.4rem] rounded-full mb-6 tracking-[0.03em]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {heroSection.sub_items[1].value}
        </motion.span>

        {/* hero-title */}
        <motion.h1
          className={`${lang === 'ar' ? 'font-header' : 'font-display'} text-[#589ae6] text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.15] mb-5`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {heroSection.title}
        </motion.h1>

        {/* hero-description */}
        <motion.p
          className="text-[1.1rem] text-white leading-[1.7] max-w-[600px] mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {heroSection.description}
        </motion.p>

        {/* hero-actions */}
        <motion.div
          className="flex items-center justify-center gap-4 flex-wrap max-sm:flex-col"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* hero-btn-primary */}
          <Link href={`/${lang}/our-service`}
            className="inline-flex items-center gap-2 px-8 py-[0.9rem] rounded-[var(--radius-xl)] bg-linear-to-br from-[var(--primary-color)] to-[#5b9bd5] text-white text-base font-semibold no-underline shadow-[0_4px_20px_rgba(55,118,189,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(55,118,189,0.5)]">
            {heroSection.button_text}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </Link>

          {/* hero-btn-secondary */}
          <a href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 px-8 py-[0.9rem] rounded-[var(--radius-xl)] bg-white/10 backdrop-blur-sm border border-white/25 text-white text-base font-semibold no-underline transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5">
            {heroSection.sub_items[0].value}
          </a>

        </motion.div>
      </div>
    </section>
  );
}