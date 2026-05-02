import Image from "next/image";
import Section from "../layout/Section";
import TypewriterText from "../ui/TypewriterText";
import Container from "../layout/Container";
import BlogsGrid from "../ui/BlogsGrid";

export default function BlogsPage({ data, lang = "en" }) {
  const blogsHeader = data.sections.find(item => item.type === "Hero ").content[0];
  const blogsContent = data.sections.find(item => item.type === "Blog List").content.items;

  return (
    <>
      {/* ── Hero ── */}
      <Section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
  
        {/* Image */}
        <img
          src="/blog.png"
          alt="Blog hero"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* <Image
          src={blogsHeader.image}
          alt="Blog hero"
          fill
          priority
          style={{ objectFit: "cover" }}
        /> */}

        {/* Overlay */}
        <div className="absolute inset-0 opacity-100 bg-gradient-to-b from-black/80 via-black/60 to-black/80 z-10" />

        {/* Content */}
        <div className="relative z-20 text-center px-6 py-20 max-w-4xl mx-auto">
          <h1 className={`${lang === "ar" ? "font-heading" : "font-display"} text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-blue-400 leading-[1.2] mb-6 drop-shadow-lg`}>
            <TypewriterText text={blogsHeader.title} speed={50} />
          </h1>

          <p className="text-white/70 text-[1rem] leading-[1.8] max-w-2xl mx-auto">
            {blogsHeader.description}
          </p>
        </div>

      </Section>

      {/* ── Grid ── */}
      <Container>
        <Section>
          <div className="flex flex-col items-center mb-12">
            <span className={`${lang === "ar" ? "font-heading" : "font-display"} inline-block text-[0.8rem] font-bold tracking-[0.08em] uppercase text-[var(--primary-color)] bg-[rgba(55,118,189,0.08)] px-4 py-[0.35rem] rounded-full mb-4`}>
              {lang === "ar" ? "المدونة" : "Our Blog"}
            </span>
            <h2 className={`${lang === "ar" ? "font-heading" : "font-display"} text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-[#0f172a] leading-[1.2] text-center max-w-2xl`}>
              {lang === "ar" ? "آخر المقالات والأخبار" : "Latest Articles & Insights"}
            </h2>
          </div>
          <BlogsGrid items={blogsContent} lang={lang} />
        </Section>
      </Container>
    </>
  );
}   