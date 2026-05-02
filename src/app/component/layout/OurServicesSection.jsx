"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from './Container';
import Section from './Section';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function OurServicesSection({ data, lang = 'en' }) {
  const serviceSection = data.sections.find(section => section.type === "Services");

  return (
    /* services-section */
    <Section className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8" id="services">
      {/* <Container> */}

        {/* section-header-center */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* section-label */}
          <span className={`${lang === "ar" ? "font-heading" : "font-display" }inline-block text-[0.8rem] font-bold tracking-[0.08em] uppercase text-[var(--primary-color)] bg-[rgba(55,118,189,0.08)] px-4 py-[0.35rem] rounded-full mb-4`}>
            {lang === "ar" ? "خدماتنا" : "Our Services"}
          </span>
          {/* section-heading */}
          <h2 className={`${lang === "ar" ? "font-heading" : "font-display"} mt-10 text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-[#0f172a] leading-[1.2] mb-4`}>
            <span className="text-[var(--primary-color)]">{serviceSection.header_title}</span>
          </h2>
          {/* section-subheading */}
          <p className="text-[#64748b] text-[1.05rem] leading-[1.7] w-9/12 mx-auto">
            {serviceSection.header_description}
          </p>
        </motion.div>

        {/* services-grid */}
        <div className="grid grid-cols-4 gap-7 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {serviceSection.content.items.map((item, index) => (
            /* service-card */
            <motion.div
              key={item.id}
              className="group bg-white rounded-[var(--radius-lg)] overflow-hidden border border-[#e2e8f0] flex flex-col transition-all duration-[350ms] hover:-translate-y-[6px] hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] hover:border-[var(--primary-color)]"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className="flex flex-col items-center gap-2 px-6 pt-8 pb-3 text-center">
                {/* <Image
                  src={item.image}
                  alt={item.name}
                  width={120}
                  height={120}
                  style={{ objectFit: 'cover', borderRadius: 'var(--radius-xl)' }}
                /> */}
                <img
                  src="/iso9001.jpg"
                  alt={item.name}
                  width={120}
                  height={120}
                  style={{ objectFit: 'cover' }}
                />
                <h3 className="font-display mt-3 text-[1.15rem] font-bold text-[#0f172a]">
                  {item.name}
                </h3>
                <p className="text-[var(--primary-color)] text-[0.8rem] font-semibold uppercase tracking-[0.04em]">
                  {item.category}
                </p>
                <p className="text-[#64748b] text-[0.85rem] leading-[1.6]">
                  {item.description.replace(/<[^>]*>/g, "").slice(0,153)}
                </p>
              </div>

              {/* service-card-footer */}
              <div className="px-6 pb-6 text-center">
                <Link
                  href={`/${lang}/our-service/${item.slug}`}
                  className="inline-flex items-center gap-[0.4rem] text-[var(--primary-color)] text-[0.85rem] font-semibold cursor-pointer transition-[gap] duration-[250ms] group-hover:gap-[0.65rem]">
                  {lang === "ar" ? "تعرف على المزيد" : "Learn More"}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* section-cta-center */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href={`/${lang}/our-service`}
            className="inline-flex items-center gap-2 px-8 py-[0.85rem] rounded-[var(--radius-xl)] bg-linear-to-br from-[var(--primary-color)] to-[#5b9bd5] text-white text-[0.95rem] font-semibold no-underline shadow-[0_2px_12px_rgba(55,118,189,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(55,118,189,0.35)]"
          >
            {lang === "ar" ? "عرض جميع الخدمات" : "View All Services"}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </Link>
        </motion.div>

      {/* </Container> */}
    </Section>
  );
}