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
import Image from "next/image";

// ─── helper: strip HTML tags ───────────────────────────────────────────────
function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, "").trim();
}

// ─── Sub-components ────────────────────────────────────────────────────────

function HeroSection({ name, lang }) {
  return (
    <Section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Dark Overlay */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-[rgba(0,0,0,0.9)] opacity-80 to-[rgba(0,0,0,0.85)]" />
      <img
        src="/man.jpg"
        alt="ABS Global team and certification"
        className="absolute inset-0 object-fill w-full h-full"
      />
      {/* <Image
        src="/hero/our-service.png"
        alt="ABS Global team and certification"
        fill
        priority
        style={{ objectFit: 'cover' }}
        className="absolute inset-0 w-full h-full object-cover"
      /> */}
      {/* Text Content */}
      <div className="relative z-10 text-center px-6 py-20 max-w-7xl mx-auto">
        <h1
          className={`${
            lang === "ar" ? "font-heading" : "font-display"
          } text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-blue-500 leading-[1.2] mb-4 drop-shadow-lg`}
        >
          <TypewriterText text={name} speed={50} />
        </h1>
      </div>
    </Section>
  );
}

function CertificateOverview({ image, name, description, certificate_category, lang, whatsappUrl }) {
  return (
    <div className="border border-[#e2e8f0] rounded-2xl overflow-hidden bg-white shadow-sm">

      {/* ── Top: image + title + category ── */}
      <div className="flex items-center gap-6 px-8 py-7 border-b border-[#e2e8f0]">
        {/* Image box */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <img
            src="/iso.png"
            alt={name}
            width={150}
            height={150}
            className="object-contain relative z-10 rounded-[var(--radius-lg)]"
          />
          {/* <Image
            src={image}
            alt={name}
            fill
            priority
            width={120}
            height={120}
            className="object-contain relative z-10 rounded-[var(--radius-lg)]"
          /> */}
        </div>

        {/* Name + category */}
        <div className="flex items-center justify-between w-10/12">
          
          <div className="flex flex-col gap-[10px]">
            <h2
              className={`${
                lang === "ar" ? "font-heading" : "font-display"
              } text-[1.5rem] font-bold text-[#0f172a] leading-tight m-0`}
            >
              {name}
            </h2>

            {/* Blue divider */}
            <div className="w-9 h-[3px] bg-[var(--primary-color)] rounded-full" />

            {/* Category badge */}
            <span className="inline-flex items-center gap-[6px] text-[0.72rem] font-semibold tracking-[0.06em] uppercase text-[var(--primary-color)] bg-[rgba(55,118,189,0.08)] border border-[rgba(55,118,189,0.2)] rounded-md px-[10px] py-[4px] w-fit">
              <span className="w-[6px] h-[6px] rounded-full bg-[var(--primary-color)] flex-shrink-0" />
              {certificate_category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link href={`/${lang}/contact-us`}>
              <Button className="py-3 px-4 rounded-[var(--radius-xl)] hover:bg-[#2e7ddf] hover:scale-[1.02] transition-all duration-200" size="sm">
                {lang === "ar" ? "طلب شهادة" : "Request a Certificate"}
              </Button>
            </Link>
            <a
              href={whatsappUrl || "https://wa.me/+201026294642"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-3 px-4 rounded-[var(--radius-xl)] bg-[#3fc150] text-white hover:bg-[#3fc150]/80 hover:scale-[1.02] transition-all duration-200"
            >
              <FaWhatsapp size={20} />
              <span className={`${lang === "ar" ? "font-heading" : "font-display"}`}>{lang === "ar" ? "تواصل معنا" : "Contact Us"}</span>
            </a>
          </div>
        </div>

      </div>

      {/* ── Bottom: description with vertical accent bar ── */}
      <div className="flex gap-4 px-8 py-7">
        {/* Vertical bar */}
        <div className="flex-shrink-0 w-[3px] rounded-full bg-[var(--primary-color)] self-stretch" />
        {/* Text */}
        <div className="flex flex-col gap-2">
          <p className={`${lang === "ar" ? "font-heading" : "font-display"} text-[1.5rem] font-bold text-[#0f172a] leading-tight m-0`}>
            {lang === "ar" ? "وصف" : "Description"}
          </p>
          <p className="text-[#475569] text-[0.97rem] leading-[1.85] m-0">
            {stripHtml(description)}
          </p>
        </div>
      </div>

    </div>
  );
}

// ── styles injected once ────────────────────────────────────────────────────
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
    gap: 1.5rem;
    padding: 2rem 1.5rem 2rem 2rem;
    border-top: 1px solid #e2e8f0;
    border-bottom: 1px solid #e2e8f0;
    cursor: default;
    transition: background 0.35s ease, padding-left 0.35s ease;
  }

  /* glowing left accent bar */
  .qa-row::before {
    content: "";
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 4px;
    background: var(--primary-color);
    border-radius: 0 4px 4px 0;
    transform: scaleY(0);
    transform-origin: center;
    transition: transform 0.35s cubic-bezier(0.4,0,0.2,1),
                box-shadow 0.35s ease;
  }

  .qa-row:hover::before {
    transform: scaleY(1);
    box-shadow: 0 0 16px rgba(55,118,189,0.3);
  }

  .qa-row:hover {
    background: linear-gradient(90deg, rgba(55,118,189,0.04), transparent);
    padding-left: 2.5rem;
  }

  /* Q badge number */
  .qa-badge {
    font-family: var(--font-display);
    font-size: 2rem;
    font-weight: 800;
    color: rgba(55,118,189,0.25);
    line-height: 1;
    min-width: 52px;
    flex-shrink: 0;
    transition: color 0.35s ease;
    user-select: none;
    padding-top: 0.15rem;
  }

  .qa-row:hover .qa-badge {
    color: rgba(55,118,189,0.55);
  }

  /* content */
  .qa-content { flex: 1; min-width: 0; }

  .qa-question {
    font-family: var(--font-display);
    font-size: 1.1rem;
    font-weight: 700;
    color: #0f172a;
    line-height: 1.3;
    transition: color 0.3s ease;
  }

  .qa-row:hover .qa-question {
    color: var(--primary-color);
  }

  /* answer collapses by default, expands on hover */
  .qa-answer {
    font-size: 0.92rem;
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

  .qa-row:hover .qa-answer {
    max-height: 300px;
    opacity: 1;
    margin-top: 0.75rem;
  }

  /* arrow */
  .qa-arrow {
    width: 22px; height: 22px;
    color: #cbd5e1;
    flex-shrink: 0;
    margin-top: 0.35rem;
    transition: color 0.3s ease, transform 0.35s cubic-bezier(0.4,0,0.2,1);
  }

  .qa-row:hover .qa-arrow {
    color: var(--primary-color);
    transform: translateX(4px);
  }

  @media (max-width: 768px) {
    .qa-list { grid-template-columns: 1fr; }
  }

  @media (max-width: 640px) {
    .qa-row { padding: 1.5rem 1rem 1.5rem 1.25rem; gap: 1rem; }
    .qa-row:hover { padding-left: 1.75rem; }
    .qa-badge { font-size: 1.5rem; min-width: 38px; }
    .qa-question { font-size: 1rem; }
    .qa-arrow { display: none; }
  }
`;

function QASection({ qa, lang }) {
  if (!qa || qa.length === 0) return null;

  const sorted = [...qa].sort((a, b) => a.order - b.order);

  return (
    <div className="">
      {/* inject styles once */}
      <style>{qaStyles}</style>

      {/* Section Header */}
      <div className="flex flex-col items-center mb-8">
        <span className={`${lang === "ar" ? "font-heading" : "font-display"} inline-block text-[0.8rem] font-bold tracking-[0.08em] uppercase text-[var(--primary-color)] bg-[rgba(55,118,189,0.08)] px-4 py-2 rounded-full mb-4`}>
          {lang === "ar" ? "الأسئلة الشائعة" : "FAQ"}
        </span>
        <h3 className={`${lang === "ar" ? "font-heading" : "font-display"} text-[clamp(1.3rem,2.5vw,1.9rem)] font-bold text-[#0f172a] text-center`}>
          {lang === "ar" ? "أسئلة حول هذه الشهادة" : "Questions About This Certificate"}
        </h3>
      </div>

      {/* Q&A rows — same pattern as industries-list */}
      <div className="qa-list">
        {sorted.map((item, index) => (
          <div key={item.id} className="qa-row">
            {/* badge */}
            <span className="qa-badge">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* content */}
            <div className="qa-content">
              <h4 className="qa-question">{item.question}</h4>
              <p className="qa-answer">{item.answer}</p>
            </div>

            {/* arrow */}
            <svg
              className="qa-arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page Component ───────────────────────────────────────────────────

async function fetchSettings(lang) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/pages/home`,
      { headers: { lang }, cache: "force-cache" }
    );
    if (!res.ok) return {};
    const json = await res.json();
    return json.data?.settings ?? {};
  } catch {
    return {};
  }
}

export default async function ServicePage({ lang, slug }) {
  const contact = t(lang);
  let data;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/iso/${slug}`,
      {
        headers: { lang },
        next: { revalidate: 86400 }, 
      }
    );

    if (!res.ok) throw new Error(`API returned ${res.status}: ${res.statusText}`);

    const pages = await res.json();
    data = pages.data;
  } catch (err) {
    console.error("Failed to fetch ISO item:", err.message);
  }

  if (!data) return notFound();

  const settings = await fetchSettings(lang);

  const { name, description, image, certificate_category, iso_item_qa } = data;

  return (
    <>
      {/* Hero */}
      <HeroSection name={name} lang={lang} />

      <Container>
        {/* Overview Card */}
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

        {/* Q&A */}
        <Section>
          <QASection qa={iso_item_qa} lang={lang} />
        </Section>
        <Section>
          <Container>
            <div className="flex flex-col items-center mb-12">
              <span className={`${lang === "ar" ? "font-heading" : "font-display"} inline-block text-[0.8rem] font-bold tracking-[0.08em] uppercase text-[var(--primary-color)] bg-[rgba(55,118,189,0.08)] px-4 py-2 rounded-full mb-4`}>
                {lang === "ar" ? "طلب الشهادة" : "Request the Certification"}
              </span>
              <h2 className={`${lang === "ar" ? "font-heading" : "font-display"} text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-[#0f172a] leading-[1.2] text-center mb-2`}>
                {contact.subtitle}
              </h2>
              <p className="text-[#64748b] text-[0.95rem] text-center max-w-[540px]">
                {contact.description}
              </p>
            </div>
            <ContactForm lang={lang} />
          </Container>
        </Section>
      </Container>
    </>
  );
}