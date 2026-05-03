import React from "react";
import Section from "../layout/Section";
import Container from "../layout/Container";
import TypewriterText from "../ui/TypewriterText";
import { notFound } from "next/navigation";
import Link from "next/link";
import Button from "../ui/Button";
import { FaWhatsapp } from "react-icons/fa6";
import ContactForm from "../ui/ContactForm";
import { t } from "@/app/i18n/contact";

function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, "").trim();
}

// ─── Hero ──────────────────────────────────────────────────────────────────
function HeroSection({ name, lang }) {
  return (
    <Section className="relative w-full min-h-[55vh] flex items-center justify-center overflow-hidden">
      <img
        src="/man.jpg"
        alt="ABS Global"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 text-center px-6 py-20 max-w-4xl mx-auto">
        <h1 className={`${lang === "ar" ? "font-heading" : "font-display"} text-[clamp(1.6rem,3.5vw,2.75rem)] font-bold text-blue-400 leading-[1.2] drop-shadow-lg`}>
          <TypewriterText text={name} speed={50} />
        </h1>
      </div>
    </Section>
  );
}

// ─── Overview Card ─────────────────────────────────────────────────────────
function CertificateOverview({ image, name, description, certificate_category, lang, whatsappUrl }) {
  const ActionButtons = ({ size = "default" }) => (
    <div className="flex flex-wrap sm:justify-center items-center gap-2">
      <Link href={`/${lang}/contact-us`}>
        <Button
          size="sm"
          className={`rounded-xl hover:bg-[#2e7ddf] hover:scale-[1.02] transition-all duration-200 whitespace-nowrap
            ${size === "sm" ? "py-2 px-3 text-[0.75rem]" : "py-2.5 px-5 text-[0.85rem]"}`}
        >
          {lang === "ar" ? "طلب شهادة" : "Request Certificate"}
        </Button>
      </Link>
      <a
        href={whatsappUrl || "https://wa.me/+201026294642"}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-2 rounded-xl bg-[#25d366] text-white font-semibold hover:bg-[#20b858] hover:scale-[1.02] transition-all duration-200 whitespace-nowrap
          ${size === "sm" ? "py-2 px-3 text-[0.75rem]" : "py-2.5 px-5 text-[0.85rem]"}`}
      >
        <FaWhatsapp size={size === "sm" ? 14 : 17} />
        <span className={lang === "ar" ? "font-heading" : "font-display"}>
          {lang === "ar" ? "تواصل معنا" : "WhatsApp"}
        </span>
      </a>
    </div>
  );

  return (
    <div className="border border-[#e2e8f0] rounded-2xl overflow-hidden bg-white shadow-sm">

      {/* ── Mobile layout (< sm) ── */}
      <div className="flex sm:hidden flex-col gap-4 px-5 py-5 border-b border-[#e2e8f0]">
        {/* Row: logo + title/category */}
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-[70px] h-[70px] rounded-xl overflow-hidden">
            <img src="/iso9001.jpg" alt={name} className="w-full h-full object-cover rounded-xl" />
          </div>
          <div className="flex flex-col gap-1.5 min-w-0">
            <h2 className={`${lang === "ar" ? "font-heading" : "font-display"} text-[1rem] font-bold text-[#0f172a] leading-tight`}>
              {name}
            </h2>
            <span className="inline-flex items-center gap-1 text-[0.62rem] font-semibold tracking-[0.05em] uppercase text-[var(--primary-color)] bg-[rgba(55,118,189,0.08)] border border-[rgba(55,118,189,0.2)] rounded-md px-2 py-0.5 w-fit">
              <span className="w-[4px] h-[4px] rounded-full bg-[var(--primary-color)]" />
              {certificate_category}
            </span>
          </div>
        </div>
        {/* Buttons row */}
        <ActionButtons size="sm" />
      </div>

      {/* ── Desktop layout (>= sm) ── */}
      <div className="hidden sm:flex items-center gap-6 px-8 py-6 border-b border-[#e2e8f0]">
        {/* Logo */}
        <div className="flex-shrink-0 w-[100px] h-[100px] lg:w-[120px] lg:h-[120px] rounded-xl overflow-hidden">
          <img src="/iso9001.jpg" alt={name} className="w-full h-full object-cover rounded-xl" />
        </div>

        {/* Name + category + actions — all in one row */}
        <div className="flex flex-1 items-center justify-between gap-4 min-w-0">
          <div className="flex flex-col gap-2 min-w-0">
            <h2 className={`${lang === "ar" ? "font-heading" : "font-display"} text-[clamp(1.1rem,2vw,1.45rem)] font-bold text-[#0f172a] leading-tight`}>
              {name}
            </h2>
            <div className="w-8 h-[3px] bg-[var(--primary-color)] rounded-full" />
            <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-semibold tracking-[0.06em] uppercase text-[var(--primary-color)] bg-[rgba(55,118,189,0.08)] border border-[rgba(55,118,189,0.2)] rounded-md px-2.5 py-1 w-fit">
              <span className="w-[5px] h-[5px] rounded-full bg-[var(--primary-color)]" />
              {certificate_category}
            </span>
          </div>
          <ActionButtons />
        </div>
      </div>

      {/* ── Description ── */}
      <div className="flex gap-4 px-5 sm:px-8 py-5 sm:py-6">
        <div className="flex-shrink-0 w-[3px] rounded-full bg-[var(--primary-color)] self-stretch" />
        <div className="flex flex-col gap-2">
          <p className={`${lang === "ar" ? "font-heading" : "font-display"} text-[0.95rem] sm:text-[1.05rem] font-bold text-[#0f172a]`}>
            {lang === "ar" ? "وصف" : "Description"}
          </p>
          <p className="text-[#475569] text-[0.88rem] sm:text-[0.92rem] leading-[1.85]">
            {stripHtml(description)}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Q&A ───────────────────────────────────────────────────────────────────
const qaStyles = `
  .qa-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0 2rem;
  }
  .qa-row {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 1.25rem;
    padding: 1.75rem 1.25rem 1.75rem 1.75rem;
    border-top: 0.5px solid #e2e8f0;
    cursor: default;
    transition: background 0.35s ease, padding-left 0.35s ease;
  }
  .qa-row::before {
    content: "";
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: var(--primary-color);
    border-radius: 0 3px 3px 0;
    transform: scaleY(0);
    transform-origin: center;
    transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s ease;
  }
  .qa-row:hover::before {
    transform: scaleY(1);
    box-shadow: 0 0 14px rgba(55,118,189,0.25);
  }
  .qa-row:hover {
    background: linear-gradient(90deg, rgba(55,118,189,0.04), transparent);
    padding-left: 2.25rem;
  }
  .qa-badge {
    font-size: 1.75rem;
    font-weight: 800;
    color: rgba(55,118,189,0.2);
    line-height: 1;
    min-width: 44px;
    flex-shrink: 0;
    transition: color 0.3s ease;
    user-select: none;
    padding-top: 0.1rem;
  }
  .qa-row:hover .qa-badge { color: rgba(55,118,189,0.5); }
  .qa-content { flex: 1 }
  .qa-question {
    font-size: 0.97rem;
    font-weight: 700;
    color: #0f172a;
    line-height: 1.4;
    transition: color 0.3s ease;
  }
  .qa-row:hover .qa-question { color: var(--primary-color); }
  .qa-answer {
    font-size: 0.88rem;
    color: #64748b;
    line-height: 1.75;
    white-space: pre-line;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    margin-top: 0;
    transition: max-height 0.45s cubic-bezier(0.4,0,0.2,1),
                opacity 0.35s ease 0.1s,
                margin-top 0.35s ease;
  }
  .qa-row:hover .qa-answer { max-height: 300px; opacity: 1; margin-top: 0.6rem; }
  .qa-arrow {
    width: 18px; height: 18px;
    color: #cbd5e1;
    flex-shrink: 0;
    margin-top: 0.25rem;
    transition: color 0.3s ease, transform 0.35s cubic-bezier(0.4,0,0.2,1);
  }
  .qa-row:hover .qa-arrow { color: var(--primary-color); transform: translateX(4px); }

  @media (max-width: 768px) {
    .qa-list { grid-template-columns: 1fr; gap: 0; }
  }
  @media (max-width: 480px) {
    .qa-row { padding: 1.25rem 0.75rem 1.25rem 1rem; gap: 0.75rem; }
    .qa-row:hover { padding-left: 1.5rem; }
    .qa-badge { font-size: 1.35rem; min-width: 32px; }
    .qa-question { font-size: 0.9rem; }
    .qa-arrow { display: none; }
  }
`;

function QASection({ qa, lang }) {
  if (!qa?.length) return null;
  const sorted = [...qa].sort((a, b) => a.order - b.order);

  return (
    <div>
      <style>{qaStyles}</style>
      <div className="flex flex-col items-center mb-8">
        <span className={`${lang === "ar" ? "font-heading" : "font-display"} inline-block text-[0.72rem] font-bold tracking-[0.08em] uppercase text-[var(--primary-color)] bg-[rgba(55,118,189,0.08)] px-4 py-2 rounded-full mb-4`}>
          {lang === "ar" ? "الأسئلة الشائعة" : "FAQ"}
        </span>
        <h3 className={`${lang === "ar" ? "font-heading" : "font-display"} text-[clamp(1.2rem,2.5vw,1.75rem)] font-bold text-[#0f172a] text-center`}>
          {lang === "ar" ? "أسئلة حول هذه الشهادة" : "Questions About This Certificate"}
        </h3>
      </div>
      <div className="qa-list">
        {sorted.map((item, index) => (
          <div key={item.id} className="qa-row">
            <span className="qa-badge">{String(index + 1).padStart(2, "0")}</span>
            <div className="qa-content">
              <h4 className="qa-question">{item.question}</h4>
              <p className="qa-answer">{item.answer}</p>
            </div>
            <svg className="qa-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Contact Section ───────────────────────────────────────────────────────
function ContactSection({ lang, contact }) {
  return (
    <div className="flex flex-col items-center mb-10">
      <span className={`${lang === "ar" ? "font-heading" : "font-display"} inline-block text-[0.72rem] font-bold tracking-[0.08em] uppercase text-[var(--primary-color)] bg-[rgba(55,118,189,0.08)] px-4 py-2 rounded-full mb-4`}>
        {lang === "ar" ? "طلب الشهادة" : "Request Certification"}
      </span>
      <h2 className={`${lang === "ar" ? "font-heading" : "font-display"} text-[clamp(1.3rem,3vw,2rem)] font-bold text-[#0f172a] leading-[1.2] text-center mb-2`}>
        {contact.subtitle}
      </h2>
      <p className="text-[#64748b] text-[0.88rem] text-center max-w-[520px] leading-relaxed">
        {contact.description}
      </p>
    </div>
  );
}

// ─── Data fetchers ─────────────────────────────────────────────────────────
async function fetchSettings(lang) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages/home`, {
      headers: { lang },
      cache: "force-cache",
    });
    if (!res.ok) return {};
    return (await res.json()).data?.settings ?? {};
  } catch {
    return {};
  }
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default async function ServicePage({ lang, slug }) {
  const contact = t(lang);
  let data;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/iso/${slug}`, {
      headers: { lang },
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);
    data = (await res.json()).data;
  } catch (err) {
    console.error("Failed to fetch ISO item:", err.message);
  }

  if (!data) return notFound();

  const settings = await fetchSettings(lang);
  const { name, description, image, certificate_category, iso_item_qa } = data;

  return (
    <>
      <HeroSection name={name} lang={lang} />

      <Container>
        <Section>
          <CertificateOverview
            image={image}
            name={name}
            description={description}
            certificate_category={certificate_category}
            lang={lang}
            whatsappUrl={settings.whatsapp}
          />
        </Section>

        {iso_item_qa?.length > 0 && (
          <Section className="bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] rounded-2xl">
            <QASection qa={iso_item_qa} lang={lang} />
          </Section>
        )}

        <Section>
          <ContactSection lang={lang} contact={contact} />
          <ContactForm lang={lang} />
        </Section>
      </Container>
    </>
  );
}