import Image from 'next/image';
import React from 'react'
import Section from '../layout/Section';
import Container from '../layout/Container';
import TypewriterText from '../ui/TypewriterText';

export default function IndustriesServedPage({data, lang = "en"}) {
  const industriesContent = data.sections.find(item => item.type === "Hero").content[0];
  const items =  data.faqs;

  return (
    <>
      <Section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className='absolute inset-0'>
          <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES}${industriesContent.image}`}
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
                <TypewriterText text={industriesContent.title} speed={50} />
            </h2>
        </div>
      </Section>

      {/* ── Industries List ── */}
      <Section>
        <Container>
          <div className="flex flex-col items-center mb-12">
            <span className={`${lang === "ar" ? "font-heading" : "font-display"} inline-block text-[0.8rem] font-bold tracking-[0.08em] uppercase
              text-[var(--primary-color)] bg-[rgba(55,118,189,0.08)] px-4 py-[0.35rem] rounded-full mb-4`}>
              {lang === "ar" ? "الصناعات" : "Industries"}
            </span>
            <h2 className={`${lang === "ar" ? "font-heading" : "font-display"} text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-[#0f172a] leading-[1.2] text-center`}>
              {lang === "ar" ? "القطاعات التي نخدمها" : "Sectors We Serve"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item, index) => (
              <div key={item.id} className="industry-row">
                {/* Number */}
                <span className="industry-number">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Content */}
                <div className="industry-content">
                  <h3 className="industry-title">{item.title}</h3>
                  <p className="industry-description">{item.description}</p>
                </div>

                {/* Arrow indicator */}
                <svg className="industry-arrow" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
