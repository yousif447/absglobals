import Image from 'next/image';
import TypewriterText from '../ui/TypewriterText';
import Section from '../layout/Section';
import Container from '../layout/Container';
import { v4 as uuid } from 'uuid';

export default function RecourcesPage({ data, lang = "en" }) {
    const resourcesContent = data.sections.find(item => item.type === "Hero").content[0];
    const items = resourcesContent.sub_items || [];

  return (
    <>
      {/* ── Hero Banner ── */}
      <Section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className='absolute inset-0'>
          {/* <img
            src="/resources.png"
            alt="ABS Global resources"
            className="w-full h-full object-cover"
          /> */}
          <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES}${resourcesContent.image}`}
              alt="ABS Global resources"
              fill
              style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-[rgba(0,0,0,0.9)] opacity-80 to-[rgba(0,0,0,0.85)]" />

            {/* Text Content */}
            <div className="relative z-10 text-center px-6 py-20 max-w-7xl mx-auto">
            <h2 className={`${lang === "ar" ? "font-heading" : "font-display"} text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-blue-500 leading-[1.2] mb-4 drop-shadow-lg`}>
                <TypewriterText text={resourcesContent.title} speed={50} />
            </h2>
        </div>
      </Section>

      {/* ── Resources Grid ── */}
      <Section>
        <Container>
          <div className="flex flex-col items-center mb-12">
            <span className={`${lang === "ar" ? "font-heading" : "font-display"} inline-block text-[0.8rem] font-bold tracking-[0.08em] uppercase text-[var(--primary-color)] bg-[rgba(55,118,189,0.08)] px-4 py-[0.35rem] rounded-full mb-4`}>
              {lang === 'ar' ? 'الموارد' : 'Resources'}
            </span>
            <h2 className={`${lang === "ar" ? "font-heading" : "font-display"} text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-[#0f172a] leading-[1.2] text-center mt-5`}>
              {lang === 'ar' ? 'الوثائق والسياسات' : 'Documents & Policies'}
            </h2>
          </div>

          <div className="resource-grid">
            {items.map((item, index) => (
              <div key={uuid()} className="resource-tile">
                {/* Number */}
                <span className="industry-number pb-3">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Text */}
                <h3 className="resource-title">{item.title}</h3>
                <p className="resource-desc">{item.description}</p>

                {/* Bottom accent + arrow */}
                <div className="resource-footer">
                  <svg className="resource-link-arrow" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>

                {/* Hover accent line */}
                <div className="resource-accent" />
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
