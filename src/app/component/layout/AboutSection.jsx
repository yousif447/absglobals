"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutSection({ data, lang = 'en' }) {
  const aboutSection = data.sections.find(section => section.type === "About ").content[0];
  return (
    <>
        {/* about-grid */}
        <div className="grid grid-cols-2 gap-16 items-center max-md:grid-cols-1 max-md:gap-10">

          {/* about-text-col */}
          <motion.div
            className="flex flex-col items-start"
            initial={{ opacity: 0, x: lang === "ar" ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >

            {/* section-label */}
            <span className={`${lang === "ar" ? "font-heading" : "font-display"}inline-block text-[0.8rem] font-bold tracking-[0.08em] uppercase text-[var(--primary-color)] bg-[rgba(55,118,189,0.08)] px-4 py-[0.35rem] rounded-full mb-4`}>
              {aboutSection.sub_items[0].value}
            </span>

            {/* section-heading */}
            <h2 className={`${lang === "ar" ? "font-heading" : "font-display"} text-[var(--primary-color)] text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.2] mb-4`}>
              {aboutSection.title} 
            </h2>

            {/* about-description */}
            <p className="text-[#64748b] text-[1.05rem] leading-[1.8] mb-6">
              {aboutSection.description}
            </p>
            {/* about-btn */}
            <Link
              href={`/${lang}/about-us`}
              className="inline-flex items-center gap-2 px-8 py-[0.85rem] rounded-[var(--radius-xl)] bg-linear-to-br from-[var(--primary-color)] to-[#5b9bd5] text-white text-[0.95rem] font-semibold no-underline shadow-[0_2px_12px_rgba(55,118,189,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(55,118,189,0.35)]"
            >
              {aboutSection.button_text}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </Link>

          </motion.div>

          {/* about-image-col */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: lang === "ar" ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* about-image-wrapper */}
            <div className="relative rounded-[var(--radius-xl)] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
              <img
                src="/about.png"
                alt="ABS Global team and certification"
                width={600}
                height={500}
                style={{ objectFit: 'cover', borderRadius: 'var(--radius-xl)' }}
              />
              {/* <Image
                src={aboutSection.image}
                alt="ABS Global team and certification"
                width={600}
                height={500}
                style={{ objectFit: 'cover', borderRadius: 'var(--radius-xl)' }}
              /> */}
            </div>
          </motion.div>

        </div>
      </>
  );
}