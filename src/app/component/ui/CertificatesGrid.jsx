"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const INITIAL_COUNT = 6;

export default function CertificatesGrid({ items, lang }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? items : items.slice(0, INITIAL_COUNT);
  const hasMore = items.length > INITIAL_COUNT;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {visible.map((item) => (
          <Link
            key={item.id}
            href={`/${lang}/our-service/${item.slug}`}
            className="group flex flex-col items-center gap-3 bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-none hover:shadow-[0_4px_20px_rgba(55,118,189,0.12)] hover:border-[var(--primary-color)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]"
          >
            {/* Logo / Image */}
            <div className="w-[72px] h-[72px] rounded-xl overflow-hidden flex-shrink-0 bg-[rgba(55,118,189,0.06)] flex items-center justify-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGES}${item.image}`}
                alt={item.name}
                width={72}
                height={72}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Text */}
            <div className="text-center flex-1">
              <h5
                className={`${lang === "ar" ? "font-heading" : "font-display"} text-[0.95rem] font-semibold text-[#0f172a] mb-1.5 leading-snug`}
              >
                {item.name}
              </h5>
              <p className="text-[#64748b] text-[0.82rem] leading-[1.65] line-clamp-3">
                {item.description.replace(/<[^>]*>/g, "")}
              </p>
            </div>
            <span
              className="inline-flex items-center gap-[0.4rem] text-[var(--primary-color)] text-[0.85rem] font-semibold cursor-pointer transition-[gap] duration-[250ms] group-hover:gap-[0.65rem]"
            >
              {lang === "ar" ? "تعرف على المزيد" : "Learn More"}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </span>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAll((p) => !p)}
            className="px-7 py-2 text-sm font-semibold text-[var(--primary-color)] border-[1.5px] border-[var(--primary-color)] rounded-full cursor-pointer hover:bg-[var(--primary-color)] hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]"
          >
            {showAll
              ? lang === "ar" ? "عرض أقل" : "View Less"
              : lang === "ar" ? "عرض المزيد..." : "View More..."}
          </button>
        </div>
      )}
    </>
  );
}