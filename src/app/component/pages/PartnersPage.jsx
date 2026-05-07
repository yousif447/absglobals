'use client';
import Image from 'next/image';
import Section from '../layout/Section';
import TypewriterText from '../ui/TypewriterText';
import Container from '../layout/Container';
import { motion } from 'framer-motion';
import CountUpStats from '../layout/CountUpStats';
import { t } from '@/app/i18n/partners';

export default function PartnersPage({ data , lang }) {
  const partnerHeader = data.sections.find(item => item.type === "Hero").content[0];
  const partnersList = data.sections.find(item => item.type === "Partners List").content.items;
  const partner = t(lang);

  return (
    <>
      {/* ── Hero Banner ── */}
      <Section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGES}${partnerHeader.image}`}
          alt="ABS Global team and certification"
          fill
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.9)] opacity-90 to-[rgba(0,0,0,0.85)]" />
        <div className="relative z-10 text-center px-6 py-20 max-w-7xl mx-auto">
          <h2 className={`${lang === 'ar' ? 'font-header' : 'font-display'} text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-blue-500 leading-[1.2] mb-4 drop-shadow-lg`}>
            <TypewriterText text={partner.partnersTitle} speed={50} />
          </h2>
        </div>
      </Section>

      {/* ── Partners Showcase ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#f8fafc] via-white to-[#f0f4f8]">
        {/* Decorative blurred orbs */}
        <div className="absolute top-[-120px] right-[-80px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(55,118,189,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-[-100px] left-[-60px] w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(223,6,34,0.05)_0%,transparent_70%)] pointer-events-none" />

        <Container>
          <Section>
            {/* Section Header */}
            <motion.div
              className="flex flex-col items-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span className={`${lang === 'ar' ? 'font-header' : 'font-display'} inline-block text-[0.8rem] font-bold tracking-[0.08em] uppercase text-[var(--primary-color)] bg-[rgba(55,118,189,0.08)] px-4 py-2 rounded-full mb-4`}>
                {partner.partnersHeader}
              </span>
              <h2 className={`${lang === 'ar' ? 'font-header' : 'font-display'} text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-[#0f172a] leading-[1.2] text-center`}>
                {partner.partnersTitle}
              </h2>
              <p className="text-[#64748b] text-[1rem] leading-[1.7] max-w-[560px] mx-auto text-center mt-3">
                {partner.partnersDescription}
              </p>
            </motion.div>
            <CountUpStats partner={partner} lang={lang}/>

            {/* Partners Grid */}
            <div className="partners-showcase-grid">
              {partnersList.map((item, index) => (
                <motion.div
                  key={`${item.name}-${index}`}
                  className="partner-showcase-card group"
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.06,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <div className="partner-card-glow" />

                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <div className="partner-card-inner">
                      <div className="partner-logo-wrap relative w-[70px] h-[70px] md:w-[88px] md:h-[88px]">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMAGES}${item.image}`}
                          alt={item.name || 'Partner logo'}
                          fill
                          className="object-contain transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      <div className="partner-info">
                        <h3 className={`${lang === 'ar' ? 'font-header' : 'font-display'} text-[10px] md:font-bold md:text-[16px]`}>{item.name}</h3>
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </Section>
        </Container>
      </div>
    </>
  );
}
