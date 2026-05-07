import React from 'react'
import Container from '../layout/Container'
import Section from '../layout/Section'
import HeroSection from '../layout/HeroSection'
import AboutSection from '../layout/AboutSection'
import OurServicesSection from '../layout/OurServicesSection'
import OurPartnersSection from '../layout/OurPartnersSection'
import ReviewSection from '../layout/ReviewSection'
import ContactUsSection from '../layout/ContactUsSection'
import AnimateOnScroll from '../ui/AnimateOnScroll'

export default async function HomePage({lang = "en"}) {
  let data;
  const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/pages/home`,
      { headers: { lang }, cache: "no-store" }
    );
    if (!res.ok) throw new Error(`API returned ${res.status}: ${res.statusText}`);
    const pages = await res.json();
    data = pages.data;
  return (
    <>
      <HeroSection data={data} lang={lang}/>
      {/* <Container> */}
        <AnimateOnScroll variant="fadeUp" duration={0.8}>
          <Section className='max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8'>
            <AboutSection data={data} lang={lang}/>
          </Section>
        </AnimateOnScroll>
        <AnimateOnScroll variant="fadeUp" duration={0.8} delay={0.1}>
          <section className='bg-linear-to-b from-[#f8fafc] to-[#f1f5f9]'>
            <OurServicesSection data={data} lang={lang}/>
          </section>
        </AnimateOnScroll>
        <AnimateOnScroll variant="fadeUp" duration={0.8} delay={0.1}>
          <Section className='max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8'>
            <OurPartnersSection data={data} lang={lang}/>
          </Section>
        </AnimateOnScroll>
        <AnimateOnScroll variant="fadeUp" duration={0.8} delay={0.1}>
          <Section className='bg-linear-to-b from-[#f8fafc] to-[#f1f5f9]'>
            <ReviewSection data={data} lang={lang}/>
          </Section>
        </AnimateOnScroll>
        <AnimateOnScroll variant="fadeUp" duration={0.8} delay={0.1}>
          <Section className='max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8'>
            <ContactUsSection data={data} lang={lang}/>
          </Section>
        </AnimateOnScroll>
      {/* </Container> */}
    </>
  )
}
