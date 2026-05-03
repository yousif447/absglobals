"use client";
import { useState } from "react";

export default function CertificationLifecycle({ items, t, lang = "en" }) {
  const [active, setActive] = useState(0);
  const current = items?.[active] || {};
  const total = items?.length ?? 0;
  const progressFraction = total > 1 ? active / (total - 1) : 1;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col items-center mb-12">
        <span className={`inline-block ${lang === "ar" ? "font-heading" : "font-display"} text-[0.72rem] font-bold tracking-[0.08em] uppercase text-[var(--primary-color)] bg-[rgba(55,118,189,0.08)] px-4 py-2 rounded-full mb-4`}>
          {t.lifecycleHeader}
        </span>
        <h2 className={`${lang === "ar" ? "font-heading" : "font-display"} text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-[#0f172a] leading-[1.25] text-center max-w-3xl`}>
          {t.lifecycleTitle}
        </h2>
        <p className="text-[#64748b] text-[0.88rem] mt-3 text-center max-w-xl leading-relaxed">
          {t.lifecycleDescription}
        </p>
      </div>

      {/* ── Pipeline ── */}
      <div className="relative max-w-5xl mx-auto mb-10">
        <div className="absolute top-[35px] left-[23px] right-[23px] h-[1.5px] bg-[#e2e8f0]" />
        <div
          className={`absolute top-[35px] ${lang === "ar" ? "right-[23px]" : "left-[23px]"} h-[1.5px] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]`}
          style={{
            width: `calc(${progressFraction} * (100% - 46px))`,
            background: `linear-gradient(90deg, ${items?.[0]?.accent ?? "#3776bd"}, ${current?.accent ?? "#5b9bd5"})`,
          }}
        />
        <div className="flex overflow-x-auto scrollbar-hide md:overflow-visible justify-between py-3 snap-x snap-mandatory">
          {items?.map((s, i) => {
            const isActive = active === i;
            const isPast = i < active;
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="relative z-1 flex flex-col items-center gap-2 cursor-pointer group flex-1 min-w-[56px] max-w-[90px] snap-center border-none bg-transparent"
              >
                <div
                  className="w-[46px] h-[46px] rounded-full flex items-center justify-center text-[0.7rem] font-bold font-display transition-all duration-500 flex-shrink-0"
                  style={{
                    background: isActive ? s.accent : isPast ? `${s.accent}18` : "#f1f5f9",
                    color: isActive ? "#fff" : isPast ? s.accent : "#94a3b8",
                    boxShadow: isActive ? `0 0 0 4px ${s.accent}20, 0 4px 14px ${s.accent}30` : "none",
                    transform: isActive ? "scale(1.12)" : "scale(1)",
                    border: !isActive && !isPast ? "1.5px solid #e2e8f0" : "none",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <span
                  className={`${lang === "ar" ? "font-heading" : "font-display"} text-[0.62rem] font-semibold transition-colors duration-300`}
                  style={{ color: isActive ? s.accent : isPast ? "#475569" : "#94a3b8" }}
                >
                  {s.title}
                </span>
                {isActive && (
                  <div className="absolute -bottom-2 w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: s.accent }} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Detail Panel ── */}
      <div
        key={active}
        className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden border transition-all duration-500"
        style={{ borderColor: `${current.accent}18`, background: `linear-gradient(135deg, ${current.accent}04, transparent 60%)` }}
      >
        <div
          className="h-[3px] w-full transition-all duration-700"
          style={{ background: `linear-gradient(90deg, ${current.accent}, ${current.accent}60, transparent)` }}
        />

        {/* Watermark */}
        <div
          className="hidden sm:block absolute top-2 right-6 text-[clamp(5rem,10vw,8rem)] font-bold font-display leading-none select-none pointer-events-none"
          style={{ color: current.accent, opacity: 0.04 }}
        >
          {String(active + 1).padStart(2, "0")}
        </div>

        <div className="relative z-10 px-5 py-8 sm:px-10 sm:py-11">
          {/* Title row */}
          <div className="flex items-center gap-2.5 mb-6">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-[0.7rem] font-bold font-display flex-shrink-0"
              style={{ background: current.accent }}
            >
              {String(active + 1).padStart(2, "0")}
            </div>
            <h3 className={`${lang === "ar" ? "font-heading" : "font-display"} text-[clamp(1rem,2vw,1.4rem)] font-bold text-[#0f172a] leading-tight`}>
              {current.fullTitle}
            </h3>
          </div>

          {/* Substeps — single col mobile, 2-col sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
            {current.substeps?.map((sub, i) => (
              <div
                key={`${active}-${i}`}
                className="flex items-start gap-3 py-3 border-b border-[#f1f5f9] last:border-0 sm:even:border-0"
              >
                <div
                  className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-[0.65rem] font-bold font-display flex-shrink-0 border"
                  style={{ color: current.accent, borderColor: `${current.accent}25`, background: `${current.accent}08` }}
                >
                  {i + 1}
                </div>
                <div
                  className="text-[#475569] text-[0.85rem] leading-[1.65] pt-[3px]"
                  dangerouslySetInnerHTML={{ __html: sub }}
                />
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-8 pt-5 border-t border-[#f1f5f9]">
            <button
              onClick={() => setActive(Math.max(0, active - 1))}
              disabled={active === 0}
              className={`${lang === "ar" ? "font-heading" : "font-display"} flex items-center gap-1.5 text-[0.78rem] font-semibold text-[#94a3b8] hover:text-[var(--primary-color)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              {lang === "ar" ? "السابق" : "Previous"}
            </button>

            <span className="text-[0.72rem] text-[#94a3b8] font-display font-semibold">
              {active + 1} / {total}
            </span>

            <button
              onClick={() => setActive(Math.min(total - 1, active + 1))}
              disabled={active === total - 1}
              className={`${lang === "ar" ? "font-heading" : "font-display"} flex items-center gap-1.5 text-[0.78rem] font-semibold text-[#94a3b8] hover:text-[var(--primary-color)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer`}
            >
              {lang === "ar" ? "التالي" : "Next"}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}