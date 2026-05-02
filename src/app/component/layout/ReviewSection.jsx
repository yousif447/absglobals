"use client";

import React from 'react';
import Container from './Container';
import Section from './Section';
import Image from 'next/image';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

function StarRating({ count = 0 }) {
  return (
    <div className="flex mt-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={i < count ? '#f59e0b' : '#e5e7eb'}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewSection({ data, lang = "en" }) {
  const reviewSection = data?.sections?.find(
    (section) => section.type.trim().toLowerCase() === "reviews"
  );

  if (!reviewSection) return null;

  return (
    <div
      id="reviews"
      className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8"
    > 
        {/* Header */}
        <motion.div
          className="text-center mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className={`${lang === "ar" ? "font-heading" : "font-display" }inline-block text-[0.8rem] font-bold tracking-[0.08em] uppercase text-[var(--primary-color)] bg-[rgba(55,118,189,0.08)] px-4 py-[0.35rem] rounded-full mb-4`}>
            {lang === "ar" ? "آراء العملاء" : "Testimonials"}
          </span>

          <h2 className={`${lang === "ar" ? "font-heading" : "font-display" } mt-10 text-3xl md:text-4xl font-bold text-slate-900 mb-4`}>
            {reviewSection.header_title}
          </h2>

          <p className="text-slate-500 text-lg">
            {reviewSection.header_description}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviewSection.content.items.map((review, index) => (
            <motion.div
              key={review.id}
              className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {/* Quote */}
              <div className="text-primary opacity-20 mb-3">
                <svg width="30" height="30" fill="currentColor">
                  <path d="M7 17h3l2-4V7H6v6h3l-2 4zm10 0h3l2-4V7h-6v6h3l-2 4z"/>
                </svg>
              </div>


              {/* Stars */}
              <StarRating count={review.rating} />

              {/* Text */}
              <p className="text-slate-600 text-sm leading-relaxed mt-4 mb-6">
                {review.review}
              </p>

              {/* User */}
              <div className="pt-4 border-t">
                <div className="flex items-center gap-3">
                  <img src="/user.png" alt="user image" width={35} height={35} />
                  {/* <Image src={review.image} alt="user image" width={35} height={35} /> */}
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">
                      {review.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {review.job_title} • {review.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
    </div>
  );
}