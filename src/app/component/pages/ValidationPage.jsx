"use client";

import { useState } from "react";
import Image from "next/image";
import Section from "../layout/Section";
import Container from "../layout/Container";
import TypewriterText from "../ui/TypewriterText";
import { t } from "../../i18n/validation";
import CertificateCard from "../ui/CertificateCard";

// ── Tab selector ────────────────────────────────────────────────────────────
function TypeSelector({ type, setType, lang }) {
  const isAr = lang === "ar";
  const tabs = [
    {
      id: "company",
      label: isAr ? "شهادات الشركات" : "Company Certificates",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 21h18M3 7v14M21 7v14M6 21V3h12v18M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
        </svg>
      ),
      desc: isAr
        ? "تحقق من صحة شهادات المنظمات والشركات"
        : "Verify organization & business certificates",
    },
    {
      id: "individual",
      label: isAr ? "شهادات الأفراد" : "Individual Certificates",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      desc: isAr
        ? "تحقق من صحة شهادات الأفراد والمهنيين"
        : "Verify personal & professional certificates",
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {tabs.map((tab) => {
          const isActive = type === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setType(tab.id)}
              className={`group relative flex flex-col items-center gap-3 p-5 sm:p-6 rounded-2xl border-[1.5px] transition-all duration-300 cursor-pointer text-center
                ${
                  isActive
                    ? "border-[var(--primary-color)] bg-[rgba(55,118,189,0.06)] shadow-[0_4px_20px_rgba(55,118,189,0.12)]"
                    : "border-[#e2e8f0] bg-white hover:border-[rgba(55,118,189,0.4)] hover:shadow-[0_2px_12px_rgba(55,118,189,0.08)]"
                }`}
            >
              {/* Active indicator top bar */}
              <div
                className={`absolute top-0 left-1/2 -translate-x-1/2 h-[3px] rounded-full transition-all duration-300
                ${isActive ? "w-12 bg-[var(--primary-color)]" : "w-0"}`}
              />

              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                ${
                  isActive
                    ? "bg-[var(--primary-color)] text-white shadow-[0_4px_12px_rgba(55,118,189,0.3)]"
                    : "bg-[#f1f5f9] text-[#64748b] group-hover:bg-[rgba(55,118,189,0.08)] group-hover:text-[var(--primary-color)]"
                }`}
              >
                {tab.icon}
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1">
                <span
                  className={`${isAr ? "font-heading" : "font-display"} text-[0.9rem] sm:text-[0.95rem] font-bold leading-tight transition-colors duration-300
                  ${isActive ? "text-[var(--primary-color)]" : "text-[#0f172a]"}`}
                >
                  {tab.label}
                </span>
                <span className="text-[0.72rem] sm:text-[0.75rem] text-[#94a3b8] leading-relaxed hidden sm:block">
                  {tab.desc}
                </span>
              </div>

              {/* Check badge */}
              {isActive && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[var(--primary-color)] flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Search form ─────────────────────────────────────────────────────────────
function SearchForm({ type, lang, onResult }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState(null);

  const isAr = lang === "ar";
  const isCompany = type === "company";

  const placeholder = isCompany
    ? isAr
      ? "أدخل رمز شهادة الشركة..."
      : "Enter company certificate code..."
    : isAr
      ? "أدخل رمز الشهادة الشخصية..."
      : "Enter individual certificate code...";

  const endpoint = isCompany
    ? `${process.env.NEXT_PUBLIC_API_URL}/validate-certificate`
    : `${process.env.NEXT_PUBLIC_API_URL}/validate-certificate`;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setResult(null);
    setSearched(false);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ certificate_code: code.trim() }),
      });
      if (!res.ok) throw new Error("Not found");
      const json = await res.json();
      setResult(json.data);
    } catch {
      setResult(null);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  // Reset when type changes
  useState(() => {
    setCode("");
    setResult(null);
    setSearched(false);
  }, [type]);

  return (
    <div className="w-full">
      {/* Form */}
      <form onSubmit={handleSearch} className="validation-search-form">
        <div
          className={`validation-input-wrap ${isAr ? "font-heading" : "font-display"}`}
        >
          <svg
            className="validation-search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            className={`validation-input ${isAr ? "font-heading" : "font-display"}`}
            placeholder={placeholder}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="validation-btn"
          disabled={loading || !code.trim()}
        >
          {loading ? (
            <span className="validation-spinner" />
          ) : (
            <>
              <svg
                className="validation-btn-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              {isAr ? "بحث" : "Search"}
            </>
          )}
        </button>
      </form>

      {/* Loading */}
      {loading && (
        <div className="validation-loading">
          <div className="validation-loading-dots">
            <span />
            <span />
            <span />
          </div>
          <p>
            {isAr ? "جاري البحث عن شهادتك…" : "Searching for your certificate…"}
          </p>
        </div>
      )}

      {/* Not found */}
      {searched && !loading && !result && (
        <div className="validation-empty">
          <svg
            className="validation-empty-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m15 9-6 6" />
            <path d="m9 9 6 6" />
          </svg>
          <h3>{isAr ? "لا يوجد نتائج" : "No Result Found"}</h3>
          <p>
            {isAr
              ? "الرجاء التحقق من رمز الشهادة والمحاولة مرة أخرى."
              : "Please check the certificate code and try again."}
          </p>
        </div>
      )}

      {/* Result */}
      {result && <CertificateCard data={result} lang={lang} />}
    </div>
  );
}

// ── Main Page ───────────────────────────────────────────────────────────────
export default function ValidationPage({ lang = "en" }) {
  const [type, setType] = useState("company");
  const isAr = lang === "ar";

  const header = t(lang, "header");
  const valid = t(lang, "title");
  const sub = t(lang, "subtitle");
  const desc = t(lang, "description");

  return (
    <>
      {/* ── Hero ── */}
      <Section
        dir={isAr ? "rtl" : "ltr"}
        className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden"
      >
        <Image
          src="/valid.png"
          alt="ABS Global Validation Page"
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-6 py-20 max-w-4xl mx-auto">
          <h2
            className={`${isAr ? "font-heading" : "font-display"} text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-blue-400 leading-[1.2] mb-4 drop-shadow-lg`}
          >
            <TypewriterText text={header} speed={50} />
          </h2>
        </div>
      </Section>

      {/* ── Search Section ── */}
      <Section>
        <Container>
          {/* Section header */}
          <div className="flex flex-col items-center mb-10">
            <span
              className={`inline-block ${isAr ? "font-heading" : "font-display"} text-[0.72rem] font-bold tracking-[0.08em] uppercase text-[var(--primary-color)] bg-[rgba(55,118,189,0.08)] px-4 py-2 rounded-full mb-4`}
            >
              {valid}
            </span>
            <h2
              className={`${isAr ? "font-heading" : "font-display"} text-[clamp(1.4rem,3vw,2rem)] font-bold text-[#0f172a] leading-[1.2] text-center mb-2`}
            >
              {sub}
            </h2>
            <p className="text-[#64748b] text-[0.9rem] text-center max-w-[500px] leading-relaxed">
              {desc}
            </p>
          </div>

          {/* Type selector */}
          <TypeSelector type={type} setType={setType} lang={lang} />

          {/* Divider with label */}
          <div className="flex items-center gap-4 max-w-2xl mx-auto mb-8">
            <div className="flex-1 h-[0.5px] bg-[#e2e8f0]" />
            <span
              className={`${isAr ? "font-heading" : "font-display"} text-[0.72rem] font-semibold text-[#94a3b8] uppercase tracking-wider whitespace-nowrap`}
            >
              {type === "company"
                ? isAr
                  ? "أدخل رمز شهادة الشركة"
                  : "Enter company code"
                : isAr
                  ? "أدخل رمز الشهادة الشخصية"
                  : "Enter individual code"}
            </span>
            <div className="flex-1 h-[0.5px] bg-[#e2e8f0]" />
          </div>

          {/* Search — key forces remount on type change to reset state */}
          <div className="max-w-2xl mx-auto">
            <SearchForm key={type} type={type} lang={lang} />
          </div>
        </Container>
      </Section>
    </>
  );
}
