"use client";

import { motion } from "framer-motion";

const palettes = [
  { card: "from-blue-50 to-sky-50/40", number: "text-blue-200/50", bar: "from-[var(--primary-color)] to-blue-400" },
  { card: "from-sky-50 to-blue-50/40", number: "text-sky-200/50", bar: "from-sky-400 to-[var(--primary-color)]" },
  { card: "from-indigo-50 to-blue-50/40", number: "text-indigo-200/50", bar: "from-indigo-400 to-blue-500" },
  { card: "from-blue-50/80 to-indigo-50/30", number: "text-blue-200/50", bar: "from-blue-500 to-indigo-400" },
  { card: "from-sky-50/80 to-cyan-50/30", number: "text-sky-200/50", bar: "from-[var(--primary-color)] to-sky-400" },
];

/* indices that span 2 columns on desktop for visual variety */
const wideIndices = new Set([0, 5]);

export default function CertificationBenefits({ items, t, lang = "en" }) {
  const isRtl = lang === "ar";

  return (
    <div>
      {/* ── Section header ── */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <span
          className={`${isRtl ? "font-heading" : "font-display"} inline-block text-[0.8rem] font-bold tracking-[0.08em] uppercase text-(--primary-color) bg-[rgba(55,118,189,0.08)] px-4 py-[0.35rem] rounded-full mb-4`}
        >
          {t.benefitsHeader}
        </span>
        <h2
          className={`${isRtl ? "font-heading" : "font-display"} mt-4 text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-[#0f172a] leading-[1.2] mb-4`}
        >
          {t.benefitsTitle}
        </h2>
        <p className="text-[#64748b] text-[1.05rem] leading-[1.7] w-9/12 mx-auto max-sm:w-full">
          {t.benefitsDescription}
        </p>
      </motion.div>

      {/* ── Bento grid ── */}
      <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {items.map((item, i) => {
          const p = palettes[i % palettes.length];
          const isWide = wideIndices.has(i);

          return (
            <motion.div
              key={item.id ?? i}
              className={`
                relative overflow-hidden rounded-2xl border border-white/80
                bg-linear-to-br ${p.card}
                p-7 group cursor-default
                transition-all duration-350
                hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]
                ${isWide ? "col-span-2 max-sm:col-span-1" : ""}
              `}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: i * 0.07,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {/* Large watermark number */}
              <span
                className={`absolute -top-3 p-5 ${isRtl ? "-left-1" : "-right-1"} text-[6.5rem] opacity-70 font-black ${p.number} leading-none select-none pointer-events-none transition-transform duration-500 group-hover:scale-110`}
                style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Gradient accent bar */}
              <div
                className={`w-10 h-1 rounded-full bg-linear-to-r ${p.bar} mb-5 transition-all duration-500 group-hover:w-16`}
              />

              {/* Content */}
              <div className="relative z-10">
                <h3
                  className={`${isRtl ? "font-heading" : "font-display"} text-[1.1rem] font-bold text-[#0f172a] mb-2 leading-snug`}
                >
                  {item.title}
                </h3>
                <p className="text-[#64748b] text-[0.88rem] leading-[1.7]">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
