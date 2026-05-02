"use client";
import { useState } from "react";

export default function CertificationLifecycle({items, t, lang = 'en'}) {
  const [active, setActive] = useState(0);
  const current = items?.[active] || {};

  return (
    <div>
      {/* Section Header */}
      <div className="flex flex-col items-center mb-14">
        <span
          className={`inline-block ${lang === 'ar' ? 'font-header' : 'font-display'} text-[0.8rem] font-bold tracking-[0.08em] uppercase text-[var(--primary-color)] bg-[rgba(55,118,189,0.08)] px-4 py-2 rounded-full mb-4`}
        >
          {t.lifecycleHeader}
        </span>
        <h2 className={`${lang === 'ar' ? 'font-header' : 'font-display'} text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-[#0f172a] leading-[1.2] text-center max-w-3xl`}>
          {t.lifecycleTitle}
        </h2>
        <p className="text-[#64748b] text-[0.95rem] mt-3 text-center max-w-xl leading-relaxed">
          {t.lifecycleDescription}
        </p>
      </div>

      {/* ──── Pipeline Navigation ──── */}
      <div className="relative max-w-5xl mx-auto mb-14">
        {/* Background connector line */}
        <div className="absolute top-[23px] left-[7%] right-[7%] h-[2px] bg-[#e8ecf1] hidden md:block" />

        {/* Animated progress fill */}
        <div
          className="absolute top-[23px] left-[7%] h-[2px] hidden md:block transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            width: `${(active / (items?.length - 1)) * 86}%`,
            background: `linear-gradient(90deg, ${items?.[0].accent}, ${current?.accent})`,
          }}
        />

        {/* Status nodes */}
        <div className="flex overflow-x-auto scrollbar-hide md:overflow-visible md:justify-between gap-2 md:gap-0 pb-2 md:pb-0 snap-x snap-mandatory">
          {items?.map((s, i) => {
            const isActive = active === i;
            const isPast = i < active;
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="relative z-10 flex flex-col items-center gap-2.5 cursor-pointer group flex-shrink-0 snap-center min-w-[90px] md:min-w-0 pt-0.5"
              >
                {/* Node circle */}
                <div
                  className="w-[46px] h-[46px] rounded-full flex items-center justify-center font-display text-[0.85rem] font-bold transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{
                    background: isActive
                      ? s.accent
                      : isPast
                        ? `${s.accent}18`
                        : "#f1f5f9",
                    color: isActive
                      ? "#fff"
                      : isPast
                        ? s.accent
                        : "#94a3b8",
                    boxShadow: isActive
                      ? `0 0 0 4px ${s.accent}20, 0 4px 16px ${s.accent}30`
                      : "none",
                    transform: isActive ? "scale(1.15)" : "scale(1)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Label */}
                <span
                  className={`${lang === 'ar' ? 'font-header' : 'font-display'} text-[0.75rem] font-semibold transition-colors duration-300 whitespace-nowrap`}
                  style={{
                    color: isActive ? s.accent : isPast ? "#475569" : "#94a3b8",
                  }}
                >
                  {s.title}
                </span>

                {/* Active indicator dot */}
                {isActive && (
                  <div
                    className="absolute -bottom-3 w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: s.accent }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ──── Detail Panel ──── */}
      <div
        key={active}
        className="relative max-w-5xl mx-auto rounded-[24px] overflow-hidden border transition-all duration-500"
        style={{
          borderColor: `${current.accent}15`,
          background: `linear-gradient(135deg, ${current.accent}04, transparent 60%)`,
        }}
      >
        {/* Top accent bar */}
        <div
          className="h-[3px] w-full transition-all duration-700"
          style={{
            background: `linear-gradient(90deg, ${current.accent}, ${current.accent}60, transparent)`,
          }}
        />

        {/* Watermark number */}
        <div
          className="absolute top-4 right-8 text-[clamp(7rem,12vw,11rem)] font-bold font-display leading-none select-none pointer-events-none opacity-[0.04]"
          style={{ color: current.accent }}
        >
          {String(active + 1).padStart(2, "0")}
        </div>

        <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-12">
          {/* Title row */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-[0.8rem] font-bold font-display shadow-sm"
              style={{ background: current.accent }}
            >
              {String(active + 1).padStart(2, "0")}
            </div>
            <h3 className={`${lang === 'ar' ? 'font-header' : 'font-display'} text-[clamp(1.1rem,2vw,1.5rem)] font-bold text-[#0f172a] leading-tight`}>
              {current.fullTitle}
            </h3>
          </div>

          {/* Substeps — Staggered 2-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0">
            {current.substeps.map((sub, i) => (
              <div
                key={`${active}-${i}`}
                className="group relative flex items-start gap-4 py-[14px] animate-[fadeSlideIn_0.4s_ease_both]"
                style={{
                  animationDelay: `${i * 60}ms`,
                  // Stagger offset: odd items in right column get a top margin
                  marginTop:
                    i % 2 === 1 && i < current.substeps.length
                      ? "0"
                      : undefined,
                }}
              >
                {/* Number indicator */}
                <div
                  className="w-[28px] h-[28px] rounded-full flex items-center justify-center text-[0.7rem] font-bold font-display flex-shrink-0 transition-all duration-300 border"
                  style={{
                    color: current.accent,
                    borderColor: `${current.accent}25`,
                    background: `${current.accent}08`,
                  }}
                >
                  {i + 1}
                </div>

                {/* Text */}
                <p className="text-[#475569] text-[0.9rem] leading-[1.7] pt-[3px] transition-colors duration-300 group-hover:text-[#1e293b]">
                  {sub}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom: Navigation arrows + counter */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-[#f1f5f9]">
            <button
              onClick={() => setActive(Math.max(0, active - 1))}
              disabled={active === 0}
              className={`${lang === 'ar' ? 'font-header' : 'font-display'} flex items-center gap-2 text-[0.82rem] font-semibold text-[#94a3b8] hover:text-[var(--primary-color)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {lang === "ar" ? "السابق" : "Previous"}
            </button>

            <span className="text-[0.78rem] text-[#94a3b8] font-display font-semibold">
              {active + 1} / {items?.length}
            </span>

            <button
              onClick={() =>
                setActive(Math.min(items?.length - 1, active + 1))
              }
              disabled={active === items?.length - 1}
              className={`${lang === 'ar' ? 'font-header' : 'font-display'} flex items-center gap-2 text-[0.82rem] font-semibold text-[#94a3b8] hover:text-[var(--primary-color)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer`}
            >
              {lang === "ar" ? "التالي" : "Next"}
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
