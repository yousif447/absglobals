"use client";
import { useState } from "react";

export default function CertificationProcess({items, t, lang = 'en'}) {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = items?.[activeStep];

  return (
    <div>
      {/* Section Header */}
      <div className="flex flex-col items-center mb-14">
        <span
          className="${lang === 'ar' ? 'font-header' : 'font-display'} inline-block text-[0.8rem] font-bold tracking-[0.08em] uppercase text-[var(--primary-color)] bg-[rgba(55,118,189,0.08)] px-4 py-2 rounded-full mb-4"
        >
          {t.processTitle}
        </span>
        <h2 className={`${lang === "ar" ? "font-heading" : "font-display"} text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-[#0f172a] leading-[1.2] text-center`}>
          {t.processTitle}
        </h2>
        <p className="text-[#64748b] text-[0.95rem] mt-3 text-center max-w-xl leading-relaxed">
          {t.processDescription}
          
        </p>
      </div>

      {/* ──── Horizontal Step Selector (Top) ──── */}
      <div className="relative mb-12">
        {/* Background connector line */}
        <div className="absolute top-[23px] left-[5%] right-[5%] h-[2px] bg-[#e8ecf1] hidden md:block" />

        {/* Progress fill */}
        <div
          className="absolute top-[23px] left-[5%] h-[2px] hidden md:block transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            width: `${(activeStep / (items?.length - 1)) * 90}%`,
            background: "linear-gradient(90deg, #3776bd, #5b9bd5)",
          }}
        />

        <div className="flex overflow-x-auto scrollbar-hide md:overflow-visible md:justify-between gap-1 md:gap-0 pb-3 md:pb-0 snap-x snap-mandatory">
          {items?.map((step, i) => {
            const isActive = activeStep === i;
            const isPast = i < activeStep;
            return (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className="relative z-10 flex flex-col items-center gap-2 cursor-pointer group flex-shrink-0 snap-center min-w-[80px] md:min-w-0"
              >
                {/* Node */}
                <div
                  className={`
                    w-[46px] h-[46px] rounded-full flex items-center justify-center
                    text-[0.8rem] font-bold font-display transition-all duration-500
                    ${
                      isActive
                        ? "bg-gradient-to-br from-[#3776bd] to-[#5b9bd5] text-white shadow-[0_0_0_4px_rgba(55,118,189,0.15),0_4px_16px_rgba(55,118,189,0.25)] scale-110"
                        : isPast
                          ? "bg-[rgba(55,118,189,0.1)] text-[#3776bd] border-2 border-[rgba(55,118,189,0.2)]"
                          : "bg-[#f1f5f9] text-[#94a3b8] border-2 border-[#e2e8f0] group-hover:border-[rgba(55,118,189,0.2)] group-hover:text-[#64748b]"
                    }
                  `}
                >
                  {String(i + 1).padStart(2, "0")}
                  {isActive && (
                    <span className="absolute inset-0 rounded-full border-2 border-[rgba(55,118,189,0.3)] animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]" />
                  )}
                </div>

                {/* Label */}
                <span
                  className={`text-[0.68rem] font-semibold ${lang === 'ar' ? 'font-header' : 'font-display'} leading-tight text-center max-w-[90px] transition-colors duration-300 ${isActive ? "text-[#3776bd]" : isPast ? "text-[#475569]" : "text-[#94a3b8] group-hover:text-[#64748b]"}`}
                >
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ──── Detail Panel ──── */}
      <div
        key={activeStep}
        className="relative rounded-[24px] overflow-hidden border border-[#e8ecf1] bg-gradient-to-br from-[rgba(55,118,189,0.03)] via-white to-[rgba(55,118,189,0.02)] shadow-[0_4px_32px_rgba(15,23,42,0.04),0_1px_4px_rgba(15,23,42,0.03)]"
      >
        {/* Top accent bar */}
        <div className="h-[3px] w-full bg-gradient-to-r from-[#3776bd] via-[#5b9bd5] to-transparent" />

        {/* Watermark number */}
        <div className="absolute top-2 right-8 text-[clamp(7rem,12vw,11rem)] font-bold font-display text-[rgba(55,118,189,0.04)] leading-none select-none pointer-events-none">
          {String(activeStep + 1).padStart(2, "0")}
        </div>

        <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-12">
          {/* Phase header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-[#3776bd] to-[#5b9bd5] text-white text-[0.8rem] font-bold font-display shadow-[0_4px_12px_rgba(55,118,189,0.25)]">
                {String(activeStep + 1).padStart(2, "0")}
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-[rgba(55,118,189,0.2)] to-transparent" />
            </div>
            <h3 className={`${lang === "ar" ? "font-heading" : "font-display"} text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold text-[#0f172a] leading-tight`}>
              {currentStep.title}
            </h3>
            <p className="text-[#64748b] text-[0.92rem] mt-2 leading-relaxed max-w-lg">
              {currentStep.description}
            </p>
          </div>

          {/* Substeps — 2-column flowing layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0">
            {currentStep.substeps.map((sub, i) => (
              <div
                key={`${activeStep}-${i}`}
                className="group relative flex items-start gap-4 py-[14px] animate-[fadeSlideIn_0.4s_ease_both]"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Number indicator */}
                <div
                  className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-[0.7rem] font-bold font-display flex-shrink-0 bg-[rgba(55,118,189,0.07)] border border-[rgba(55,118,189,0.12)] text-[#3776bd] transition-all duration-300 group-hover:bg-[rgba(55,118,189,0.12)] group-hover:border-[rgba(55,118,189,0.25)] group-hover:shadow-[0_0_10px_rgba(55,118,189,0.1)]"
                >
                  {i + 1}
                </div>

                {/* Substep text */}
                <p className="text-[#475569] text-[0.9rem] leading-[1.7] pt-[4px] transition-colors duration-300 group-hover:text-[#1e293b]">
                  {sub}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom: Step counter + progress dots */}
          <div className="flex items-center gap-3 mt-10 pt-6 border-t border-[#f1f5f9]">
            <span className="text-[0.78rem] text-[#94a3b8] font-display font-semibold">
              {lang === "ar" ? "الخطوة" : "Step"} {activeStep + 1} {lang === "ar" ? "من" : "of"} {items?.length}
            </span>

            <div className="flex gap-1.5 ml-auto">
              {items?.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`
                    h-2 rounded-full transition-all duration-300 cursor-pointer
                    ${
                      i === activeStep
                        ? "w-6 bg-gradient-to-r from-[#3776bd] to-[#5b9bd5]"
                        : i < activeStep
                          ? "w-2 bg-[rgba(55,118,189,0.25)]"
                          : "w-2 bg-[#e2e8f0] hover:bg-[#cbd5e1]"
                    }
                  `}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
