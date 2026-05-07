import Image from 'next/image'
import React from 'react'
import Container from '../layout/Container'
import Section from '../layout/Section'
import TypewriterText from '../ui/TypewriterText'
import { t } from '@/app/i18n/about'

function TimelineDot({ title, description, position = "top"}) {
  const placementClass = position === "top" ? "bottom-[calc(100%+16px)]" : "top-[calc(100%+16px)]"

  return (
    <div className="group relative w-[28px] h-[28px] bg-[var(--primary-color)] rounded-full flex items-center justify-center shrink-0 z-[1] cursor-pointer">

      <svg viewBox="0 0 12 10" fill="none" className="w-[13px] h-[13px]">
        <polyline points="1,5 4.5,8.5 11,1" stroke="#fff" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

      {/* Title pill */}
      <span className={`absolute left-1/2 -translate-x-1/2 ${placementClass} bg-white border-[1.5px] border-[#d1d1d6] rounded-lg px-[14px] py-[8px] text-[13px] text-[#1d1d1f] whitespace-nowrap font-medium transition-all duration-200 opacity-100 group-hover:opacity-0 group-hover:pointer-events-none`}>
        {title}
      </span>

      {/* Description card */}
      <div className={`absolute left-1/2 -translate-x-1/2 ${placementClass} w-[220px] bg-white border-[1.5px] border-[var(--primary-color)] rounded-xl px-4 py-3 shadow-[0_8px_24px_rgba(55,118,189,0.15)] transition-all duration-200 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto z-10`}>
        <p className="text-[11px] font-semibold text-[var(--primary-color)] uppercase tracking-wide mb-1">
          {title}
        </p>
        <p className="text-[12px] text-[#475569] leading-[1.5]">
          {description}
        </p>
      </div>
    </div>
  )
}

// Vertical timeline item — sm and md screens
function TimelineItem({ title, description, isLast }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex flex-col items-center">
        <div className="w-[28px] h-[28px] bg-[var(--primary-color)] rounded-full flex items-center justify-center shrink-0">
          <svg viewBox="0 0 12 10" fill="none" className="w-[13px] h-[13px]">
            <polyline points="1,5 4.5,8.5 11,1" stroke="#fff" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        {!isLast && (
          <div className="w-[2px] flex-1 min-h-[32px] bg-[#d1d1d6] mt-1" />
        )}
      </div>
      <div className="pb-8">
        <p className="text-[13px] font-semibold text-[var(--primary-color)] uppercase tracking-wide mb-2">
          {title}
        </p>
        <p className="text-[13px] text-[#475569] leading-[1.6]">
          {description}
        </p>
      </div>
    </div>
  )
}

export default function AboutUsPage({ data, lang = "en" }) {
  const aboutContent = data.sections.find(item => item.type === "About content").content[0];
  const textCards    = data.sections.find(item => item.type === "Text Cards Content").content;
  const whyUs        = data.sections.find(item => item.type === "Why Chose Us").content;

  const about = t(lang);

  return (
    <>
      {/* ── About Hero ── */}
      <Section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        {/* <img
          src="/about-us.png"
          alt="ABS Global team and certification"
          className="absolute inset-0 w-full h-full object-cover"
        /> */}
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGES}${aboutContent.image}`}
          alt="ABS Global team and certification"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.85)]" />

        {/* Text Content */}
        <div className="relative z-10 text-center px-6 py-20 max-w-7xl mx-auto">
          <h2 className={`${lang==="ar"? "font-heading" : "font-display"} text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-blue-500 leading-[1.2] mb-4 drop-shadow-lg`}>
            <TypewriterText text={aboutContent.title} speed={50} />
          </h2>
          <p className="text-[rgba(255,255,255,0.85)] text-[1.1rem] leading-[1.8]">
            {aboutContent.description}
          </p>
        </div>
      </Section>

        <Container>
          <Section>
            <div className="flex flex-col items-center mb-10">
              <span className={`${lang==="ar"? "font-heading" : "font-display"} inline-block text-[0.8rem] font-bold tracking-[0.08em] uppercase text-[var(--primary-color)] bg-[rgba(55,118,189,0.08)] px-4 py-[0.35rem] rounded-full mb-4`}>
                {about.milestones}
              </span>
              <h2 className={`${lang==="ar"? "font-heading" : "font-display"} text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-[#0f172a] leading-[1.2] text-center mb-8`}>
                {about.corporateIdentity}
              </h2>
            </div>

            {/* Vertical layout — below lg */}
            <div className="md:hidden flex flex-col mt-6">
              {textCards.map((item, index) => (
                <TimelineItem
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  isLast={index === textCards.length - 1}
                />
              ))}
            </div>

            {/* Horizontal layout — lg and above */}
            <div className="hidden md:block w-full py-16">
              <div className="relative h-[2px] bg-[#d1d1d6] flex items-center justify-between">
                {textCards.map((item, index) => (
                  <TimelineDot
                    key={item.title}
                    title={item.title}
                    description={item.description}
                    position={index % 2 === 0 ? "top" : "bottom"}
                    lang={lang}
                  />
                ))}
              </div>
            </div>
          </Section>
          {/* ── Timeline ── */}
        </Container>
          {/* ── Why Choose Us ── */}
          <div className='bg-[rgba(55,118,189,0.08)]'>
            <Section className='max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8'>
              <div className="flex flex-col items-center mb-10">
                <span className={`${lang==="ar"? "font-heading" : "font-display"} inline-block text-[0.8rem] font-bold tracking-[0.08em] uppercase text-[var(--primary-color)] bg-[rgba(55,118,189,0.08)] px-4 py-[0.35rem] rounded-full mb-4"}`}>
                  {about.whyChooseUs}
                </span>
                <h2 className={`${lang==="ar"? "font-heading" : "font-display"} text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-[#0f172a] leading-[1.2] text-center my-10`}>
                  {about.difference}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {whyUs.map((item, index) => (
                  <div
                    key={item.title}
                    className="group relative flex flex-col items-start bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm overflow-hidden hover:shadow-[0_8px_24px_rgba(55,118,189,0.15)] hover:border-[var(--primary-color)] transition-all duration-300"
                  >
                    <span className="text-[2.5rem] font-bold text-[rgba(55,118,189,0.2)] leading-none mb-3 select-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="w-[36px] h-[36px] bg-[var(--primary-color)] rounded-full flex items-center justify-center mb-4 shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <svg viewBox="0 0 12 10" fill="none" className="w-[14px] h-[14px]">
                        <polyline points="1,5 4.5,8.5 11,1" stroke="#fff" strokeWidth="1.8"
                          strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h5 className={`${lang==="ar"? "font-heading" : "font-display"} text-[1.1rem] font-semibold text-[#0f172a] mb-2 leading-snug`}>
                      {item.title}
                    </h5>
                    <p className="text-[#64748b] text-[0.95rem] leading-[1.7]">
                      {item.description}
                    </p>
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--primary-color)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                  </div>
                ))}
              </div>
            </Section>
          </div>
    </>
  )
}