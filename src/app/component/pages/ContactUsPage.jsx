import Image from "next/image";
import Container from "../layout/Container";
import Section from "../layout/Section";
import ContactForm from "../ui/ContactForm";
import TypewriterText from "../ui/TypewriterText";
import { t } from "@/app/i18n/contact";

const MENA_COUNTRIES = [
  { code: "sa", name: "Saudi Arabia" },
  { code: "ae", name: "UAE" },
  { code: "eg", name: "Egypt" },
  { code: "qa", name: "Qatar" },
  { code: "kw", name: "Kuwait" },
  { code: "bh", name: "Bahrain" },
  { code: "om", name: "Oman" },
  { code: "jo", name: "Jordan" },
  { code: "lb", name: "Lebanon" },
  { code: "iq", name: "Iraq" },
  { code: "ye", name: "Yemen" },
  { code: "sy", name: "Syria" },
  { code: "ps", name: "Palestine" },
  { code: "ly", name: "Libya" },
  { code: "tn", name: "Tunisia" },
  { code: "dz", name: "Algeria" },
  { code: "ma", name: "Morocco" },
  { code: "sd", name: "Sudan" },
  { code: "mr", name: "Mauritania" },
  { code: "so", name: "Somalia" },
  { code: "dj", name: "Djibouti" },
  { code: "km", name: "Comoros" },
];

export function MenaFlags({ lang }) {
  const doubled = [...MENA_COUNTRIES, ...MENA_COUNTRIES];

  return (
    <div className="w-full overflow-hidden border-y border-slate-100 py-5 mb-12">
      <h2
        className={`${lang === "ar" ? "font-heading" : "font-display"} text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-[#0f172a] leading-[1.2] text-center mb-10 text-[var(--primary-color)] bg-[rgba(55,118,189,0.08)] px-8 py-[0.5rem] rounded-full w-fit mx-auto`}
      >
        {lang === "ar" ? "الدول التي نخدمها" : "Countries we serve"}
      </h2>
      <div
        className="flex w-max"
        style={{ animation: "mena-scroll 36s linear infinite" }}
      >
        {doubled.map((country, i) => (
          <div key={i} className="flex items-stretch">
            {i > 0 && (
              <div className="w-px bg-slate-100 self-stretch my-2 mx-1" />
            )}
            <div className="group flex flex-col items-center gap-2 px-6 cursor-default">
              <img
                src={`https://flagcdn.com/w80/${country.code}.png`}
                alt={country.name}
                width={48}
                height={32}
                className="rounded-sm object-cover transition-transform duration-200 group-hover:scale-110"
                style={{ width: 48, height: 32 }}
              />
              <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap tracking-wide">
                {country.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



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
          <MenaFlags lang={lang}/>
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
