import Image from "next/image";
import Container from "../layout/Container";
import Section from "../layout/Section";
import TypewriterText from "../ui/TypewriterText";
import FaqAccordion from "../ui/FaqAccordion";

export default function FaqPage({data, lang = "en"}) {
  const faqsContent = data.sections.find(item => item.type === "Hero").content[0];
  const items = faqsContent.sub_items || [];
  
  return (
    <>
      <Section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {/* <img
            src="/faqs.png"
            alt="ABS Global team and certification"
            className="w-full h-full object-cover"
          /> */}
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGES}${faqsContent.image}`}
            alt="ABS Global team and certification"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.85)]" />

        {/* Text Content */}
        <div className="relative z-10 text-center px-6 py-20 max-w-7xl mx-auto">
          <h2 className={`${lang === "ar" ? "font-heading" : "font-display"} text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-blue-500 leading-[1.2] mb-4 drop-shadow-lg`}>
            <TypewriterText text={faqsContent.title} speed={50} />
          </h2>
        </div>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-col items-center mb-12">
            <span className={`${lang === "ar" ? "font-heading" : "font-display"} inline-block text-[0.8rem] font-bold tracking-[0.08em] uppercase
              text-[var(--primary-color)] bg-[rgba(55,118,189,0.08)] px-4 py-[0.35rem] rounded-full mb-4"`}>
              {lang === "ar" ? "الأسئلة الشائعة" : "FAQ"}
            </span>
            <h2 className={`${lang === "ar" ? "font-heading" : "font-display"} text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-[#0f172a] leading-[1.2] text-center mt-10`}>
              {lang === "ar" ? "هل لديك أسئلة؟" : "Got Questions? We Have Answers"}
            </h2>
          </div>

          <FaqAccordion items={items} lang={lang} />
        </Container>
      </Section>
    </>
  )
}
