"use client";

import { useState } from "react";
import Image from "next/image";
import Section from "../layout/Section";
import Container from "../layout/Container";
import TypewriterText from "../ui/TypewriterText";
import { t } from "../../i18n/validation";
import CertificateCard from "../ui/CertificateCard";

export default function ValidationPage({lang = "en"}) {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const placeholder = t(lang,"inputPlaceholder");
  const search = t(lang,"search"); 
  const header = t(lang,"header");
  const valid = t(lang,"title");
  const sub = t(lang,"subtitle");
  const desc = t(lang,"description");


  const handleSearch = async (e) => {
  e.preventDefault();
  if (!code.trim()) return;
  setLoading(true);
  setResult(null);
  setSearched(false);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CONTACT_API_URL}/validate-certificate`, {
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

  return (
    <>
      {/* ── Hero Banner ── */}
      <Section dir={lang === "ar" ? "rtl" : "ltr"} className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/validation.png"
          alt="ABS Global Validation Page"
          fill
          priority
          style={{ objectFit: "fill" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.9)] opacity-90 to-[rgba(0,0,0,0.85)]" />

        <div className="relative z-10 text-center px-6 py-20 max-w-7xl mx-auto">
          <h2 className={` ${lang==="ar"? "font-heading" : "font-display"} text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-blue-500 leading-[1.2] mb-4 drop-shadow-lg`}>
            <TypewriterText
              text={header}
              speed={50}
            />
          </h2>
        </div>
      </Section>

      {/* ── Search Section ── */}
      <Section>
        <Container>
          <div className="flex flex-col items-center mb-12">
            <span
              className={`inline-block ${lang==="ar"? "font-heading" : "font-display"} text-[0.8rem] font-bold tracking-[0.08em] uppercase
              text-[var(--primary-color)] bg-[rgba(55,118,189,0.08)] px-4 py-[0.35rem] rounded-full mb-4`}
            >
              {valid}
            </span>
            <h2 className={`${lang==="ar"? "font-heading" : "font-display"} text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-[#0f172a] leading-[1.2] text-center mb-2`}>
              {sub}
            </h2>
            <p className="text-[#64748b] text-[0.95rem] text-center max-w-[540px]">
              {desc}
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="validation-search-form">
            <div className={`validation-input-wrap ${lang==="ar"? "font-heading" : "font-display"}`}>
              {/* Search icon */}
              <svg
                className={`validation-search-icon`}
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
                id="certificate-code-input"
                type="text"
                className={`validation-input ${lang==="ar"? "font-heading" : "font-display"}`}
                placeholder={placeholder}
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <button
              id="search-now-btn"
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
                  {search}
                </>
              )}
            </button>
          </form>

          {/* ── Results ── */}
          {loading && (
            <div className="validation-loading">
              <div className="validation-loading-dots">
                <span />
                <span />
                <span />
              </div>
              <p>{lang === "ar" ? "جاري البحث عن شهادتك…" : "Searching for your certificate…"}</p>
            </div>
          )}

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
              <h3>{lang === "ar" ? "لا يوجد نتائج" : "No Result Found"}</h3>
              <p>
                {lang === "ar" ? "الرجاء التحقق من رمز الشهادة والمحاولة مرة أخرى. إذا استمرت المشكلة، يرجى الاتصال بفريق الدعم لدينا." : "Please check the certificate code and try again. If the issue persists, contact our support team."}
              </p>
            </div>
          )}

          {result && <CertificateCard data={result} lang={lang} />}
        </Container>
      </Section>
    </>
  );
}
