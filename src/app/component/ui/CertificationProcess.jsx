"use client";
import { useState } from "react";

export default function CertificationProcess({ items, t, lang = "en" }) {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = items?.[activeStep];
  const total = items?.length ?? 0;

  // Width of progress fill relative to the track (track = 100% - 46px)
  const progressFraction = total > 1 ? activeStep / (total - 1) : 1;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col items-center mb-12">
        <span className={`${lang === "ar" ? "font-heading" : "font-display"} inline-block text-[0.72rem] font-bold tracking-[0.08em] uppercase text-[var(--primary-color)] bg-[rgba(55,118,189,0.08)] px-4 py-2 rounded-full mb-4`}>
          {t.processTitle}
        </span>
        <h2 className={`${lang === "ar" ? "font-heading" : "font-display"} text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-[#0f172a] leading-[1.25] text-center`}>
          {t.processSubtitle}
        </h2>
        <p className="text-[#64748b] text-[0.88rem] mt-3 text-center max-w-xl leading-relaxed">
          {t.processDescription}
        </p>
      </div>

      {/* ── Pipeline ── */}
      <div className="relative mb-4 md:mb-10">
        {/* Track */}
        <div className="absolute top-[35px] left-[23px] right-[23px] h-[1.5px] bg-[#e2e8f0]" />

        {/* Fill — لازم يبدأ من 23px ويكمل بالفراكشن × (100% - 46px) */}
        <div
          className={`absolute top-[35px] ${lang === "ar" ? "right-[23px]" : "left-[23px]"} h-[1.5px] z-10 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]`}
          style={{
            width: `calc(${progressFraction} * (100% - 46px))`,
            background: "linear-gradient(90deg, #3776bd, #5b9bd5)",
          }}
        />

        {/* Nodes row */}
        <div className="flex justify-between overflow-x-auto scrollbar-hide md:overflow-visible py-3 snap-x snap-mandatory">
          {items?.map((step, i) => {
            const isActive = activeStep === i;
            const isPast = i < activeStep;
            return (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className="relative z-20 flex flex-col items-center gap-2 flex-1 min-w-[56px] max-w-[80px] snap-center border-none bg-transparent cursor-pointer group"
              >
                {/* Circle */}
                <div
                  className={`w-[46px] h-[46px] rounded-full flex items-center justify-center text-[0.7rem] font-bold font-display transition-all duration-400 flex-shrink-0 relative
                    ${isActive
                      ? "bg-[#3776bd] text-white shadow-[0_0_0_4px_rgba(55,118,189,0.15),0_4px_12px_rgba(55,118,189,0.25)] scale-110"
                      : isPast
                        ? "bg-[rgba(55,118,189,0.1)] text-[#3776bd] border border-[rgba(55,118,189,0.2)]"
                        : "bg-[#f1f5f9] text-[#94a3b8] border border-[#e2e8f0] group-hover:border-[rgba(55,118,189,0.25)] group-hover:text-[#64748b]"
                    }`}
                >
                  {String(i + 1).padStart(2, "0")}
                  {isActive && (
                    <span className="absolute inset-[-4px] rounded-full border border-[rgba(55,118,189,0.3)] animate-ping" />
                  )}
                </div>

                {/* Label */}
                <span
                  className={`text-[0.62rem] font-semibold ${lang === "ar" ? "font-heading" : "font-display"} leading-tight text-center w-full px-1 break-words transition-colors duration-300
                    ${isActive ? "text-[#3776bd]" : isPast ? "text-[#475569]" : "text-[#94a3b8] group-hover:text-[#64748b]"}`}
                >
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Detail Panel ── */}
      <div
        key={activeStep}
        className="rounded-2xl border border-[#e8ecf1] bg-white overflow-hidden"
      >
        <div className="h-[3px] bg-gradient-to-r from-[#3776bd] via-[#5b9bd5] to-transparent" />

        <div className="relative px-5 py-8 sm:px-10 sm:py-11">
          {/* Watermark — hidden xs */}
          <div className="hidden sm:block absolute top-2 right-6 text-[clamp(5rem,10vw,8rem)] font-bold font-display text-[rgba(55,118,189,0.04)] leading-none select-none pointer-events-none">
            {String(activeStep + 1).padStart(2, "0")}
          </div>

          {/* Phase header */}
          <div className="flex items-center gap-2.5 mb-4 relative z-10">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#3776bd] text-white text-[0.7rem] font-bold font-display flex-shrink-0">
              {String(activeStep + 1).padStart(2, "0")}
            </span>
            <div className="h-[0.5px] flex-1 bg-gradient-to-r from-[rgba(55,118,189,0.2)] to-transparent" />
          </div>
          <h3 className={`${lang === "ar" ? "font-heading" : "font-display"} text-[clamp(1rem,2vw,1.4rem)] font-bold text-[#0f172a] leading-tight mb-2 relative z-10`}>
            {currentStep.title}
          </h3>
          <p className="text-[#64748b] text-[0.85rem] leading-relaxed max-w-lg mb-6 relative z-10">
            {currentStep.description}
          </p>

          {/* Substeps — single col on mobile, 2-col on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 relative z-10">
            {currentStep.substeps.map((sub, i) => (
              <div
                key={`${activeStep}-${i}`}
                className="flex items-start gap-3 py-3 border-b border-[#f1f5f9] last:border-0 sm:even:border-0"
                style={{ animationDelay: `${i * 55}ms` }}
              >
                <div className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-[0.65rem] font-bold font-display flex-shrink-0 bg-[rgba(55,118,189,0.07)] border border-[rgba(55,118,189,0.12)] text-[#3776bd]">
                  {i + 1}
                </div>
                <p className="text-[#475569] text-[0.85rem] leading-[1.65] pt-[3px]">{sub}</p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex flex-wrap items-center gap-3 mt-7 pt-5 border-t border-[#f1f5f9] relative z-10">
            <span className="text-[0.73rem] text-[#94a3b8] font-display font-semibold whitespace-nowrap">
              {lang === "ar" ? "الخطوة" : "Step"} {activeStep + 1} {lang === "ar" ? "من" : "of"} {total}
            </span>
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
                disabled={activeStep === 0}
                className="w-8 h-8 rounded-full border border-[#e2e8f0] text-[#64748b] flex items-center justify-center transition-all hover:border-[#3776bd] hover:text-[#3776bd] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-base leading-none"
              >
                {lang === "ar" ? "›" : "‹"}
              </button>
              <div className="flex gap-1.5 items-center">
                {items?.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`h-[6px] rounded-full transition-all duration-300 cursor-pointer
                      ${i === activeStep ? "w-5 bg-[#3776bd]" : i < activeStep ? "w-[6px] bg-[rgba(55,118,189,0.3)]" : "w-[6px] bg-[#e2e8f0]"}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setActiveStep((s) => Math.min(total - 1, s + 1))}
                disabled={activeStep === total - 1}
                className="w-8 h-8 rounded-full border border-[#e2e8f0] text-[#64748b] flex items-center justify-center transition-all hover:border-[#3776bd] hover:text-[#3776bd] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-base leading-none"
              >
                {lang === "ar" ? "‹" : "›"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}