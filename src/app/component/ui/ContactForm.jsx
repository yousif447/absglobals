'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Button from './Button';
import { t } from '@/app/i18n/contact';
import { createContactSchema2 } from '@/lib/schemas/contactSchema2';
import { zodResolver } from '@hookform/resolvers/zod';

const ISO_STANDARDS = [
  'ISO 9001:2015',
  'ISO 14001:2015',
  'ISO 45001:2018',
  'ISO 22000:2018',
  'GMP',
  'HACCP',
  'ISO 27001:2022',
  'ISO 13485:2016',
  'ISO 21001:2025',
  'ISO 20000-1: 2018',
  'ISO 37000:2021',
  'ISO 37001:2025',
  'ISO 39001:2012',
  'ISO 41001:2018',
  'ISO 50001:2018',
  'ISO 22301:2019',
];

const CERTIFICATION_TYPES_EN = [
  'Initial Certification',
  '1st Surveillance',
  '2nd Surveillance',
  'Recertification',
];

const CERTIFICATION_TYPES_AR = [
  'الشهادة الأولية',
  'المراقبة الأولى',
  'المراقبة الثانية',
  'إعادة التصديق',
];

const COUNTRIES_EN = [
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria',
  'Bahrain', 'Bangladesh', 'Belgium', 'Brazil', 'Canada', 'Chile', 'China',
  'Colombia', 'Czech Republic', 'Denmark', 'Egypt', 'Ethiopia', 'Finland',
  'France', 'Germany', 'Ghana', 'Greece', 'Hungary', 'India', 'Indonesia',
  'Iraq', 'Ireland', 'Italy', 'Japan', 'Jordan', 'Kenya', 'Kuwait',
  'Lebanon', 'Libya', 'Malaysia', 'Mexico', 'Morocco', 'Netherlands',
  'New Zealand', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine',
  'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania',
  'Russia', 'Saudi Arabia', 'Singapore', 'South Africa', 'South Korea',
  'Spain', 'Sudan', 'Sweden', 'Switzerland', 'Syria', 'Thailand',
  'Tunisia', 'Turkey', 'UAE', 'Uganda', 'Ukraine', 'United Kingdom',
  'United States', 'Vietnam', 'Yemen',
];

const COUNTRIES_AR = [
  "أفغانستان", "ألبانيا", "الجزائر", "الأرجنتين", "أستراليا", "النمسا",
  "البحرين", "بنغلاديش", "بلجيكا", "البرازيل", "كندا", "تشيلي", "الصين",
  "كولومبيا", "جمهورية التشيك", "الدنمارك", "مصر", "إثيوبيا", "فنلندا",
  "فرنسا", "ألمانيا", "غانا", "اليونان", "المجر", "الهند", "إندونيسيا",
  "العراق", "أيرلندا", "إيطاليا", "اليابان", "الأردن", "كينيا", "الكويت",
  "لبنان", "ليبيا", "ماليزيا", "المكسيك", "المغرب", "هولندا", "نيوزيلندا",
  "نيجيريا", "النرويج", "سلطنة عُمان", "باكستان", "فلسطين", "بيرو",
  "الفلبين", "بولندا", "البرتغال", "دولة قطر", "رومانيا", "روسيا",
  "المملكة العربية السعودية", "سنغافورة", "جنوب أفريقيا", "كوريا الجنوبية",
  "إسبانيا", "السودان", "السويد", "سويسرا", "سوريا", "تايلاند", "تونس",
  "تركيا", "الإمارات العربية المتحدة", "أوغندا", "أوكرانيا", "المملكة المتحدة",
  "الولايات المتحدة", "فيتنام", "اليمن",
];

export default function ContactForm({ lang = "en" }) {
  const [submitted, setSubmitted] = useState(false);

  const contact = t(lang);
  const schema = createContactSchema2(lang);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      isoStandard: 'ISO 9001:2015',
      certificationType: '1st Surveillance',
      country: 'Egypt',
    },
  });

  const onSubmit = async (data) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CONTACT_API_URL}/certification-request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        organization_name: data.organizationName,
        address: data.address,
        state_region: data.state,
        city: data.city,
        postal_code: data.postalCode,
        country: data.country,
        contact_name: data.contactName,
        contact_phone: data.contactPhone,
        contact_email: data.contactMail,
        iso_standard: data.isoStandard,
        scope_of_certification: data.scopeOfCertification,
        certification_type: data.certificationType,
        comments: data.comments,
      }),
    });

    if (!res.ok) throw new Error("Server error");
    const result = await res.json();
    console.log("Success:", result);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
        console.error("Error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form" noValidate>
      {/* Success message */}
      {submitted && (
        <div className="contact-success">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span>{contact.successMessage}</span>
        </div>
      )}

      {/* ── Row 1: Organization + Address ── */}
      <div className="contact-row">
        <div className="contact-field">
          <label className={`contact-label ${lang === 'ar' ? 'font-header' : 'font-display'}`}>
            {contact.organizationName} <span className="contact-req">*</span>
          </label>
          <input
            type="text"
            className={`contact-input ${errors.organizationName ? 'contact-input--error' : ''} ${lang === 'ar' ? 'font-header' : 'font-display'}`}
            placeholder={contact.organizationPlaceholder}
            {...register('organizationName')}
          />
          {errors.organizationName && (
            <p className="contact-error">{errors.organizationName.message}</p>
          )}
        </div>
        <div className="contact-field">
          <label className="contact-label">
            {contact.address} <span className="contact-req">*</span>
          </label>
          <input
            type="text"
            className={`contact-input ${errors.address ? 'contact-input--error' : ''}`}
            placeholder={contact.addressPlaceholder}
            {...register('address')}
          />
          {errors.address && (
            <p className="contact-error">{errors.address.message}</p>
          )}
        </div>
      </div>

      {/* ── Row 2: State + City ── */}
      <div className="contact-row">
        <div className="contact-field">
          <label className="contact-label">{contact.state}</label>
          <input
            type="text"
            className="contact-input"
            placeholder={contact.statePlaceholder}
            {...register('state')}
          />
        </div>
        <div className="contact-field">
          <label className="contact-label">
            {contact.city} <span className="contact-req">*</span>
          </label>
          <input
            type="text"
            className={`contact-input ${errors.city ? 'contact-input--error' : ''}`}
            placeholder={contact.cityPlaceholder}
            {...register('city')}
          />
          {errors.city && (
            <p className="contact-error">{errors.city.message}</p>
          )}
        </div>
      </div>

      {/* ── Row 3: Postal Code + Country ── */}
      <div className="contact-row">
        <div className="contact-field">
          <label className="contact-label">
            {contact.postalCode} <span className="contact-req">*</span>
          </label>
          <input
            type="text"
            className={`contact-input ${errors.postalCode ? 'contact-input--error' : ''}`}
            placeholder={contact.postalCodePlaceholder}
            {...register('postalCode')}
          />
          {errors.postalCode && (
            <p className="contact-error">{errors.postalCode.message}</p>
          )}
        </div>
        <div className="contact-field">
          <label className="contact-label">{contact.country} <span className="contact-req">*</span></label>
          <select
            className={`contact-select ${errors.country ? 'contact-input--error' : ''}`}
            {...register('country')}
          >
            {lang === 'en' ? (
              COUNTRIES_EN.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))
            ) : (
              COUNTRIES_AR.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))
            )}
          </select>
          {errors.country && (
            <p className="contact-error">{errors.country.message}</p>
          )}
        </div>
      </div>

      {/* ── Full-width: Contact Name ── */}
      <div className="contact-field">
        <label className="contact-label">
          {contact.contactName} <span className="contact-req">*</span>
        </label>
        <input
          type="text"
          className={`contact-input ${errors.contactName ? 'contact-input--error' : ''}`}
          placeholder={contact.contactNamePlaceholder}
          {...register('contactName')}
        />
        {errors.contactName && (
          <p className="contact-error">{errors.contactName.message}</p>
        )}
      </div>

      {/* ── Full-width: Contact Phone ── */}
      <div className="contact-field">
        <label className="contact-label">
          {contact.contactPhone} <span className="contact-req">*</span>
        </label>
        <input
          type="tel"
          dir={lang === "ar" ? "rtl" : "ltr"}
          className={`contact-input ${errors.contactPhone ? 'contact-input--error' : ''}`}
          placeholder={contact.contactPhonePlaceholder}
          {...register('contactPhone')}
        />
        {errors.contactPhone && (
          <p className="contact-error">{errors.contactPhone.message}</p>
        )}
      </div>

      {/* ── Full-width: Contact Mail ── */}
      <div className="contact-field">
        <label className="contact-label">
          {contact.contactMail} <span className="contact-req">*</span>
        </label>
        <input
          type="email"
          className={`contact-input ${errors.contactMail ? 'contact-input--error' : ''}`}
          placeholder={contact.contactMailPlaceholder}
          {...register('contactMail')}
        />
        {errors.contactMail && (
          <p className="contact-error">{errors.contactMail.message}</p>
        )}
      </div>

      {/* ── ISO Standard Radio Group ── */}
      <div className="contact-field">
        <label className="contact-label">
          {contact.isoStandard} <span className="contact-req">*</span>
        </label>
        <div className="contact-radio-group">
          {ISO_STANDARDS.map((standard) => (
            <label key={standard} className="contact-radio-item">
              <input
                type="radio"
                value={standard}
                className="contact-radio"
                {...register('isoStandard')}
              />
              <span className="contact-radio-custom" />
              <span className="contact-radio-label">{standard}</span>
            </label>
          ))}
        </div>
        {errors.isoStandard && (
          <p className="contact-error">{errors.isoStandard.message}</p>
        )}
      </div>

      {/* ── Row: Scope + Certification Type ── */}
      <div className="contact-row">
        <div className="contact-field">
          <label className="contact-label">
            {contact.scope} <span className="contact-req">*</span>
          </label>
          <input
            type="text"
            className={`contact-input ${errors.scopeOfCertification ? 'contact-input--error' : ''}`}
            placeholder={contact.scopePlaceholder}
            {...register('scopeOfCertification')}
          />
          {errors.scopeOfCertification && (
            <p className="contact-error">{errors.scopeOfCertification.message}</p>
          )}
        </div>
        <div className="contact-field">
          <label className="contact-label">
            {contact.certificationType} <span className="contact-req">*</span>
          </label>
          <select
            className={`contact-select ${errors.certificationType ? 'contact-input--error' : ''}`}
            {...register('certificationType')}
          >
            <option value="">{contact.certificationType}</option>
            {lang === "en" ? CERTIFICATION_TYPES_EN.map((type) => (
              <option key={type} value={type}>{type}</option>
            )) : CERTIFICATION_TYPES_AR.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.certificationType && (
            <p className="contact-error">{errors.certificationType.message}</p>
          )}
        </div>
      </div>

      {/* ── Full-width: Comments ── */}
      <div className="contact-field">
        <label className="contact-label">
          {contact.comments} <span className="contact-req">*</span>
        </label>
        <textarea
          className={`contact-textarea ${errors.comments ? 'contact-input--error' : ''}`}
          placeholder={contact.commentsPlaceholder}
          rows={5}
          {...register('comments')}
        />
        {errors.comments && (
          <p className="contact-error">{errors.comments.message}</p>
        )}
      </div>

      {/* ── Submit ── */}
      <div className="flex justify-center">
        <Button
          type="submit"
          className={`contact-submit ${lang === "ar" ? "font-heading" : "font-display"}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="contact-spinner" />
              {contact.sending}
            </>
          ) : (
            <>
              {contact.submit}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="contact-submit-icon">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </>
          )}
        </Button>
      </div>
    </form>
  );
}