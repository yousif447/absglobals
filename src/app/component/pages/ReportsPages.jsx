import Image from 'next/image'
import Section from '../layout/Section'
import Container from '../layout/Container'
import TypewriterText from '../ui/TypewriterText'
import ReportForm from '../layout/ReportForm'

export default function ReportsPages({ lang = "en" }) {
  return (
    <>
        <Section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <Image
                src="/report.jpg"
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
                <TypewriterText text={lang === "ar" ? "بلاغ عن شهادة" : "Report for a Certification"} speed={50} />
                </h2>
            </div>
        </Section>
        <Section>
            <Container>
                <div className="flex flex-col items-center mb-12">
                <h2
                    className={`${lang === "ar" ? "font-heading" : "font-display"} text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-[#0f172a] leading-[1.2] text-center mb-2`}
                >
                    {lang === "ar" ? "بلاغ عن شهادة" : "Report a Certification"}
                </h2>
                <p className="text-[#64748b] text-[0.95rem] text-center max-w-[540px]">
                    {lang === "ar" ? "املأ النموذج أدناه وسيقوم فريقنا بالرد عليك في غضون 24 ساعة" : "Fill out the form below and our team will get back to you within 24 hours"}
                </p>
                </div>
                <ReportForm lang={lang} />
            </Container>
        </Section>
    </>
  )
}
