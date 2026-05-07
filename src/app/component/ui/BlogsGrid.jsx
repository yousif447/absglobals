"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const INITIAL_COUNT = 6;

function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, "").trim();
}

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

function BlogCard({ item, lang, featured = false }) {
  const excerpt = stripHtml(item.content).slice(0, featured ? 220 : 85) + "…";

  return (
    <Link
      href={`/${lang}/blog/${item.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-[#e8edf3]
        shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_32px_rgba(55,118,189,0.16)]
        hover:-translate-y-1 transition-all duration-300 ease-out
        ${featured ? "sm:flex-row sm:col-span-full sm:h-auto md:h-[280px]" : ""}`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden flex-shrink-0
        ${featured ? "h-[200px] sm:h-full sm:w-[42%]" : "h-[180px]"}`}>
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGES}${item.image}`}
          alt={item.title}
          fill
          style={{ objectFit: 'cover' }}
        />
        {/* Gradient overlay bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {item.category && (
          <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 text-[0.65rem] font-bold tracking-widest uppercase bg-[var(--primary-color)] text-white px-2.5 py-1 rounded-full shadow">
            {item.category.name}
          </span>
        )}
      </div>

      {/* Content */}
      <div className={`flex flex-col justify-between flex-1 p-5 ${featured ? "sm:p-7" : ""}`}>
        <div className="flex flex-col gap-2.5">
          {/* Meta */}
          <div className="flex items-center gap-2.5 text-[0.74rem] text-[#94a3b8]">
            <span>{formatDate(item.published_at)}</span>
            {item.view_count > 0 && (
              <>
                <span className="w-[3px] h-[3px] rounded-full bg-[#cbd5e1]" />
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  {item.view_count.toLocaleString()} {lang === "ar" ? "مشاهدة" : "views"}
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className={`${lang === "ar" ? "font-heading" : "font-display"} font-bold text-[#0f172a] leading-snug
            group-hover:text-[var(--primary-color)] transition-colors duration-300
            ${featured ? "text-[1.15rem] sm:text-[1.3rem]" : "text-[1rem]"}`}>
            {item.title}
          </h3>

          {/* Excerpt */}
          <p className={`text-[#64748b] text-[0.85rem] leading-[1.7]
            ${featured ? "line-clamp-3 sm:line-clamp-4" : "line-clamp-2"}`}>
            {excerpt}
          </p>
        </div>

        {/* Read more */}
        <div className="flex items-center gap-1.5 text-[var(--primary-color)] text-[0.82rem] font-bold mt-4">
          <span>{lang === "ar" ? "اقرأ المزيد" : "Read more"}</span>
          <svg
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function BlogsGrid({ items = [], lang = "en" }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? items : items.slice(0, INITIAL_COUNT);
  const hasMore = items.length > INITIAL_COUNT;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {visible.map((item, index) => (
          <BlogCard key={item.id} item={item} lang={lang} featured={index === 0} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowAll(p => !p)}
            className={`group flex items-center gap-2 px-7 py-2.5 text-[var(--primary-color)] font-bold text-[0.88rem] border-[1.5px] border-[var(--primary-color)] rounded-full hover:bg-[var(--primary-color)] hover:text-white transition-all duration-300 ${lang === "ar" ? "font-heading" : "font-display"}`}
          >
            {showAll ? (lang === "ar" ? "عرض أقل" : "View Less") : (lang === "ar" ? "عرض المزيد" : "View More")}
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
        </div>
      )}
    </>
  );
}