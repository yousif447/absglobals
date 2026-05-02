"use client";

import { useState } from "react";
import Link from "next/link";

const INITIAL_COUNT = 6;

// ── strip HTML ─────────────────────────────────────────
function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, "").trim();
}

// ── format date ────────────────────────────────────────
function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ── single card ────────────────────────────────────────
function BlogCard({ item, lang, featured = false }) {
  const excerpt = stripHtml(item.content).slice(0, featured ? 260 : 90) + "…";

  return (
    <Link
      href={`/${lang}/blog/${item.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-[#e8edf3]
      shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(55,118,189,0.18)]
      hover:-translate-y-1 transition-all duration-300 ease-out
      
      ${featured ? "md:flex-row md:col-span-2 md:h-[300px]" : "h-[300px]"}`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden flex-shrink-0 
        ${featured ? "md:w-1/3 h-full" : "h-[180px]"}`}
      >
        <img
          src="/blogg.jpg"
          alt={item.title}
          className="w-full h-full object-fill transition-transform duration-500 group-hover:scale-105"
        />
        {/* <Image
          src={item.image}
          alt={item.title}
          fill
          priority
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        /> */}

        {/* Category */}
        {item.category && (
          <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 text-[0.7rem] font-bold tracking-widest uppercase bg-[var(--primary-color)] text-white px-3 py-1 rounded-full shadow-md">
            {item.category.name}
          </span>
        )}
      </div>

      {/* Content */}
      <div
        className={`flex flex-col justify-between h-full ${featured ? "md:p-8 p-5" : "p-5"}`}
      >
        <div className="flex flex-col gap-3">
          {/* Meta */}
          <div className="flex items-center gap-3 text-[0.78rem] text-[#94a3b8]">
            <span>{formatDate(item.published_at)}</span>
            {item.view_count > 0 && (
              <>
                <span className="w-1 h-1 rounded-full bg-[#cbd5e1]" />
                <span>{item.view_count} {lang === "ar" ? "مشاهدة" : "views"}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3
            className={`${lang === "ar"? "font-heading" : "font-display"} font-bold text-[#0f172a] leading-snug 
            group-hover:text-[var(--primary-color)] transition-colors duration-300 
            ${featured ? "text-[1.3rem]" : "text-[1.05rem]"}`}
          >
            {item.title}
          </h3>

          {/* Excerpt */}
          <p
            className={`text-[#64748b] text-[0.9rem] leading-[1.7]
            ${featured ? "line-clamp-4" : "line-clamp-3"}`}
          >
            {excerpt}
          </p>
        </div>

        {/* Read more */}
        <div className="flex items-center gap-2 text-[var(--primary-color)] text-[0.85rem] font-bold">
          <span>{lang === "ar" ? "اقرأ المزيد" : "Read more"}</span>
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

// ── grid ───────────────────────────────────────────────
export default function BlogsGrid({ items = [], lang = "en" }) {
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? items : items.slice(0, INITIAL_COUNT);
  const hasMore = items.length > INITIAL_COUNT;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visible.map((item, index) => (
          <BlogCard
            key={item.id}
            item={item}
            lang={lang}
            featured={index === 0}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className={`group flex items-center gap-2 px-7 py-3 text-[var(--primary-color)] font-bold text-[0.9rem] border-2 border-[var(--primary-color)] rounded-full hover:bg-[var(--primary-color)] hover:text-white transition-all duration-300 ${
              lang === "ar" ? "font-heading" : "font-display"
            }`}
          >
            {showAll
              ? lang === "ar"
                ? "عرض أقل"
                : "View Less"
              : lang === "ar"
              ? "عرض المزيد"
              : "View More"}

            <svg
              className={`w-4 h-4 transition-transform duration-300 ${
                showAll ? "rotate-180" : ""
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}