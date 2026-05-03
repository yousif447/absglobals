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
      <Section className="relative w-full min-h-[55vh] flex items-center justify-center overflow-hidden">
        <img
          src="/blog.png"
          alt="Blog hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
        <div className="relative z-10 text-center px-6 py-20 max-w-4xl mx-auto flex flex-col items-center gap-4">
          <h1 className={`${lang === "ar" ? "font-heading" : "font-display"} text-[clamp(1.6rem,3.5vw,2.75rem)] font-bold text-blue-400 leading-[1.2] drop-shadow-lg`}>
            <TypewriterText text={blogsHeader.title} speed={50} />
          </h1>
          {blogsHeader.description && (
            <p className="text-white/70 text-[0.95rem] leading-[1.8] max-w-xl">
              {blogsHeader.description}
            </p>
          )}
        </div>
      </Section>

      {/* ── Grid ── */}
      <Container>
        <Section>
          <div className="flex flex-col items-center mb-10">
            <span className={`${lang === "ar" ? "font-heading" : "font-display"} inline-block text-[0.72rem] font-bold tracking-[0.08em] uppercase text-[var(--primary-color)] bg-[rgba(55,118,189,0.08)] px-4 py-2 rounded-full mb-4`}>
              {lang === "ar" ? "المدونة" : "Our Blog"}
            </span>
            <h2 className={`${lang === "ar" ? "font-heading" : "font-display"} text-[clamp(1.4rem,3vw,2rem)] font-bold text-[#0f172a] leading-[1.2] text-center max-w-2xl`}>
              {lang === "ar" ? "آخر المقالات والأخبار" : "Latest Articles & Insights"}
            </h2>
          </div>
          <BlogsGrid items={blogsContent} lang={lang} />
        </Section>
      </Container>
    </>
  );
}