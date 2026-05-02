import Image from "next/image";
import Section from "../layout/Section";
import TypewriterText from "../ui/TypewriterText";
import Container from "../layout/Container";
import CertificatesGrid from "../ui/CertificatesGrid";
import CertificationProcess from "../ui/CertificationProcess";
import CertificationLifecycle from "../ui/CertificationLifecycle";
import { t } from "@/app/i18n/services";

export default function ServicesPage({data, lang = 'en'}) {
  const service = t(lang);
  const headerContent = data.sections.find(item => item.type === "Hero").content[0];
  const itemsContent  = data.sections.find(item => item.type === "ISO Items").content.items;
  const cerCards      = data.faqs
  ?.filter(item => item.order === 0)
  ?.map(item => ({
      title: item.title,
      description: "", 
      substeps: item.description
        .replace(/<\/?p>/g, "")
        .split(/\d\s/)
        .filter(Boolean)
    }));
  const lifeCycle = data.faqs
  ?.filter(item => item.order === 1)
  ?.map((item, index) => ({
    title: item.title,
    fullTitle: item.title,
    accent: ["#10b981","#ef4444","#3776bd","#8b5cf6","#f59e0b","#06b6d4","#dc2626"][index % 7],
    substeps: item.description
      .replace(/<p>/g, "")
      .replace(/<\/p>/g, "\n")
      .split("\n")
      .map(s => s.trim())
      .filter(Boolean)
  }));
  return (
    <>
    <Section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src="/our-service.png"
        alt="ABS Global team and certification"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* <Image
        src={`${headerContent.image}`}
        alt="ABS Global team and certification"
        fill
        priority
        style={{ objectFit: 'cover' }}
      /> */}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.9)] opacity-60 to-[rgba(0,0,0,0.85)]" />

      {/* Text Content */}
      <div className="relative z-10 text-center px-6 py-20 max-w-7xl mx-auto">
        <h2 className={`${lang === "ar" ? "font-heading" : "font-display"} text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-blue-500 leading-[1.2] mb-4 drop-shadow-lg`}>
          <TypewriterText text={headerContent.title} speed={50} />
        </h2>
      </div>
    </Section>
      <Container>
        <Section>
          <div className="flex flex-col items-center mb-10">
            <span className={`${lang === "ar" ? "font-heading" : "font-display"} inline-block text-[0.8rem] font-bold tracking-[0.08em] uppercase text-(--primary-color) bg-[rgba(55,118,189,0.08)] px-4 py-2 rounded-full mb-4`}>
              {service.heroHeader}
            </span>
            <h2 className={`${lang === "ar" ? "font-heading" : "font-display"} text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-[#0f172a] leading-[1.2] text-center`}>
              {service.heroSubtitle}
            </h2>
          </div>
          <CertificatesGrid items={itemsContent} lang={lang}/>
        </Section>
          <hr className="border-(--primary-color)/50 border-1" />
        <Section>
          <CertificationProcess items={cerCards} t={service} lang={lang}/>
        </Section>
        <hr className="border-(--primary-color)/50 border-1" />
        <Section>
          <CertificationLifecycle items={lifeCycle} t={service} lang={lang}/>
        </Section>
      </Container>
    </>
  )
}

