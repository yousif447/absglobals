import React from 'react';
import Container from './Container';
import Section from './Section';
import { MdOutlineLocationOn, MdOutlinePhone, MdAccessTime } from 'react-icons/md';
import ContactForm from './ContactForm';
import { t } from '@/app/i18n/contact';

export default function ContactUsSection({lang = "en"}) {
  const contact = t(lang)
  return (
    <Section className="bg-white" id="contact">
      <Container>

        {/* section-header-center */}
        <div className="text-center mb-14">
          {/* section-label */}
          <span className={`${lang === "ar" ? "font-heading" : "font-display"} inline-block text-[0.8rem] font-bold tracking-[0.08em] uppercase text-[var(--primary-color)] bg-[rgba(55,118,189,0.08)] px-4 py-[0.35rem] rounded-full mb-4`}>
            {contact.header}
          </span>
          {/* section-heading */}
          <h2 className={`${lang === "ar" ? "font-heading" : "font-display"} text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-[#0f172a] leading-[1.2] mb-4`}>
            {contact.title}
          </h2>
          {/* section-subheading */}
          <p className="text-[#64748b] text-[1.05rem] leading-[1.7] max-w-[620px] mx-auto">
            {contact.description1}
          </p>
        </div>

        {/* contact-grid */}
        <div className="grid grid-cols-2 gap-12 items-start max-lg:grid-cols-1 max-lg:gap-8">

          {/* contact-info-col */}
          <div className="flex flex-col gap-6">

            {/* contact-map-wrapper */}
            <div className="grid grid-cols-2 gap-2 rounded-[var(--radius-lg)] overflow-hidden">
              <div className='text-center'>
                <p className={`${lang === "ar" ? "font-heading" : "font-display"} font-semibold text-[var(--primary-color)] bg-[rgba(55,118,189,0.08)] py-[0.35rem] rounded-xl mb-2`}>{lang === "ar" ? "فرع حدائق الأهرام" : "Hadayk Al-Ahram Branch"}</p>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3325.9238130541275!2d31.108233599999995!3d29.9667697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584f00713ce79f%3A0x8380fb2bffc1cdc3!2zQ2FsbWEgc3BhINmF2YbYqtis2Lkg2LXYrdmKINmE2YTYs9mK2K_Yp9iq!5e1!3m2!1sen!2seg!4v1778439781826!5m2!1sen!2seg"
                  width="100%"
                  height="260"
                  style={{ border: 0, borderRadius: "var(--radius-lg)" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
              <div className='text-center'>
                <p className={`${lang === "ar" ? "font-heading" : "font-display"} font-semibold text-[var(--primary-color)] bg-[rgba(55,118,189,0.08)] py-[0.35rem] rounded-xl mb-2`}>{lang === "ar" ? "فرع المعادي" : "Maadi Branch"}</p>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.0277731200217!2d31.2315896752734!3d29.978631821686424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145847ac1b58b095%3A0xc442d010c8dc8696!2sAbs%20Globals%20(%20Maadi%20Office)!5e0!3m2!1sen!2seg!4v1776595226219!5m2!1sen!2seg"
                  width="100%"
                  height="260"
                  style={{ border: 0, borderRadius: "var(--radius-lg)" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* contact-info-cards */}
            <div className="flex flex-col gap-4">

              {/* contact-info-card */}
              <div className="flex items-start gap-4 p-5 bg-[#f8fafc] rounded-[var(--radius-md)] border border-[#e2e8f0] transition-all duration-300 hover:border-[var(--primary-color)] hover:bg-[rgba(55,118,189,0.03)]">
                {/* contact-info-icon */}
                <div className="flex items-center justify-center w-11 h-11 rounded-[var(--radius-md)] bg-[rgba(55,118,189,0.1)] text-[var(--primary-color)] shrink-0">
                  <MdAccessTime size={22} />
                </div>
                <div>
                  <h4 className={`${lang === "ar" ? "font-heading" : "font-display"} font-bold text-[#0f172a] text-[0.95rem] mb-1`}>
                    {contact.workingHoursTitle}
                  </h4>
                  <p className="text-[#64748b] text-[0.875rem] leading-[1.65]">
                    {contact.workingHoursDays}<br />{contact.workingHoursTime}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-[#f8fafc] rounded-[var(--radius-md)] border border-[#e2e8f0] transition-all duration-300 hover:border-[var(--primary-color)] hover:bg-[rgba(55,118,189,0.03)]">
                <div className="flex items-center justify-center w-11 h-11 rounded-[var(--radius-md)] bg-[rgba(55,118,189,0.1)] text-[var(--primary-color)] shrink-0">
                  <MdOutlineLocationOn size={22} />
                </div>
                <div className='flex flex-col gap-2'>
                  <div>
                    <h4 className={`${lang === "ar" ? "font-heading" : "font-display"} font-bold text-[#0f172a] text-[0.95rem] mb-1`}>
                      {contact.branchTitle1}
                    </h4>
                    <p className="text-[#64748b] text-[0.875rem] leading-[1.65]">
                      {contact.branchAddress1}
                    </p>
                  </div>
                  <div>
                    <h4 className={`${lang === "ar" ? "font-heading" : "font-display"} font-bold text-[#0f172a] text-[0.95rem] mb-1`}>
                      {contact.branchTitle2}
                    </h4>
                    <p className="text-[#64748b] text-[0.875rem] leading-[1.65]">
                      {contact.branchAddress2}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-[#f8fafc] rounded-[var(--radius-md)] border border-[#e2e8f0] transition-all duration-300 hover:border-[var(--primary-color)] hover:bg-[rgba(55,118,189,0.03)]">
                <div className="flex items-center justify-center w-11 h-11 rounded-[var(--radius-md)] bg-[rgba(55,118,189,0.1)] text-[var(--primary-color)] shrink-0">
                  <MdOutlinePhone size={22} />
                </div>
                <div>
                  <h4 className={`${lang === "ar" ? "font-heading" : "font-display"} font-bold text-[#0f172a] text-[0.95rem] mb-1`}>
                    {contact.landline}
                  </h4>
                  <p className="text-[#64748b] text-[0.875rem] leading-[1.65]">
                    <a href={`tel:${contact.branchPhone}`}
                      className="text-[var(--primary-color)] no-underline font-semibold transition-colors duration-200 hover:text-[#1e5a9e]">
                      {contact.branchPhone}
                    </a>
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* contact-form-col */}
          <div className="flex flex-col">
            {/* contact-form-card */}
            <div className="bg-[#f8fafc] rounded-[var(--radius-lg)] p-10 border border-[#e2e8f0] max-md:p-6">
              <h3 className={`${lang === "ar" ? "font-heading" : "font-display"} text-[1.35rem] font-bold text-[#0f172a] mb-2`}>
                {contact.subtitle2}
              </h3>
              <p className={`${lang === "ar" ? "font-heading" : "font-display"} text-[#64748b] text-[0.9rem] leading-[1.6] mb-8`}>
                {contact.description}
              </p>
              <ContactForm lang={lang}/>
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
}