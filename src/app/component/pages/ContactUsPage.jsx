import Image from "next/image";
import Container from "../layout/Container";
import Section from "../layout/Section";
import ContactForm from "../ui/ContactForm";
import TypewriterText from "../ui/TypewriterText";
import { t } from "@/app/i18n/contact";

export default function ContactUsPage({ lang = "en" }) {
  const contact = t(lang);
  return (
    <>
      {/* ── Hero Banner ── */}
      <Section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/contact-us.jpg"
          alt="ABS Global team and certification"
          fill
          priority
          style={{ objectFit: "cover" }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-[rgba(0,0,0,0.9)] opacity-80 to-[rgba(0,0,0,0.85)]" />

        {/* Text Content */}
        <div className="relative z-10 text-center px-6 py-20 max-w-7xl mx-auto">
          <h2
            className={`${lang === "ar" ? "font-heading" : "font-display"} text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-blue-500 leading-[1.2] mb-4 drop-shadow-lg`}
          >
            <TypewriterText text={contact.header} speed={50} />
          </h2>
        </div>
      </Section>
      {/* ── Form Section ── */}
      <Section>
        <Container>
          <div className="flex flex-col items-center mb-12">
            <h2
              className={`${lang === "ar" ? "font-heading" : "font-display"} text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-[#0f172a] leading-[1.2] text-center mb-2`}
            >
              {contact.subtitle}
            </h2>
            <p className="text-[#64748b] text-[0.95rem] text-center max-w-[540px]">
              {contact.description}
            </p>
          </div>

          <ContactForm lang={lang} />
        </Container>
      </Section>
    </>
  );
}
