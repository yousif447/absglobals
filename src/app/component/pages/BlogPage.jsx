import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "../layout/Container";

// ── helpers ─────────────────────────────────────────────────────────────────
function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });
}

// ── Convert question <p> to <h2> ─────────────────────────────────────────────
function preprocessContent(html = "") {
  return html.replace(/<p>(.*?)<\/p>/g, (match, inner) => {
    const text = inner.trim();
    if (text.endsWith("؟") || text.endsWith("?")) {
      return `<h2>${text}</h2>`;
    }
    return match;
  });
}

// ── Related post card ────────────────────────────────────────────────────────
function RelatedCard({ item, lang }) {
  const isAr = lang === "ar";
  return (
    <Link
      href={`/${lang}/blog/${item.slug}`}
      className="group flex gap-4 p-4 rounded-xl border border-[#e8edf3] bg-white hover:border-[var(--primary-color)] hover:shadow-[0_4px_20px_rgba(55,118,189,0.12)] transition-all duration-300"
    >
      <div className="relative flex-shrink-0 w-[80px] h-[80px] rounded-lg overflow-hidden">
        <img
          src="/blog.png"
          alt={item.title}
          className="object-cover group-hover:scale-105 transition-transform duration-400 w-full h-full"
        />
      </div>
      <div className={`flex flex-col justify-center gap-1 min-w-0 ${isAr ? "text-right" : ""}`}>
        {item.category && (
          <span className="text-[0.68rem] font-bold tracking-widest uppercase text-[var(--primary-color)]">
            {item.category.name}
          </span>
        )}
        <h4 className={`${isAr ? "font-heading" : "font-display"} text-[0.9rem] font-semibold text-[#0f172a] leading-snug line-clamp-2 group-hover:text-[var(--primary-color)] transition-colors duration-300`}>
          {item.title}
        </h4>
        <span className="text-[0.75rem] text-[#94a3b8]">{formatDate(item.published_at)}</span>
      </div>
    </Link>
  );
}

// ── Sidebar ──────────────────────────────────────────────────────────────────
function SidebarContent({ lang, published_at, category, view_count, related_posts }) {
  const isAr = lang === "ar";
  const rows = [
    {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      ),
      label: isAr ? "تاريخ النشر" : "Published",
      value: formatDate(published_at),
    },
    ...(category ? [{
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
        </svg>
      ),
      label: isAr ? "التصنيف" : "Category",
      value: category.name,
    }] : []),
    ...(view_count > 0 ? [{
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
        </svg>
      ),
      label: isAr ? "المشاهدات" : "Views",
      value: view_count.toLocaleString(),
    }] : []),
  ];

  return (
    <>
      {/* Article info */}
      <div className="bg-white rounded-2xl border border-[#e8edf3] shadow-sm overflow-hidden">
        <div className="h-[3px] bg-[var(--primary-color)]" />
        <div className="p-6">
          <h3 className={`${isAr ? "font-heading text-right" : "font-display"} text-[0.82rem] font-bold text-[#0f172a] uppercase tracking-widest mb-5 flex items-center gap-2 ${isAr ? "flex-row-reverse" : ""}`}>
            <span className="w-4 h-[2px] bg-[var(--primary-color)] rounded-full" />
            {isAr ? "عن المقال" : "Article Info"}
          </h3>
          <div className="flex flex-col gap-4">
            {rows.map((row, i) => (
              <div key={i} className={`flex items-start gap-3 ${isAr ? "flex-row-reverse text-right" : ""}`}>
                <span className="mt-[2px] flex-shrink-0 text-[var(--primary-color)]">{row.icon}</span>
                <div>
                  <p className="text-[0.72rem] text-[#94a3b8] uppercase tracking-wider font-medium mb-0.5">{row.label}</p>
                  <p className="text-[0.9rem] font-semibold text-[#1e293b]">{row.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related posts */}
      {related_posts.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#e8edf3] shadow-sm overflow-hidden">
          <div className="h-[3px] bg-[var(--primary-color)]" />
          <div className="p-6">
            <h3 className={`${isAr ? "font-heading text-right" : "font-display"} text-[0.82rem] font-bold text-[#0f172a] uppercase tracking-widest mb-5 flex items-center gap-2 ${isAr ? "flex-row-reverse" : ""}`}>
              <span className="w-4 h-[2px] bg-[var(--primary-color)] rounded-full" />
              {isAr ? "مقالات ذات صلة" : "Related Articles"}
            </h3>
            <div className="flex flex-col gap-3">
              {related_posts.slice(0, 3).map(p => <RelatedCard key={p.id} item={p} lang={lang} />)}
            </div>
          </div>
        </div>
      )}

      {/* Back */}
      <Link
        href={`/${lang}/blog`}
        className={`group flex items-center justify-center gap-3 p-4 rounded-xl border-2 border-[var(--primary-color)] text-[var(--primary-color)] font-bold text-[0.9rem] hover:bg-[var(--primary-color)] hover:text-white transition-all duration-300 ${isAr ? "flex-row-reverse" : ""}`}
      >
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isAr ? "rotate-180 group-hover:translate-x-1" : "group-hover:-translate-x-1"}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
        </svg>
        {isAr ? "العودة للمدونة" : "Back to Blog"}
      </Link>
    </>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default async function BlogPage({ lang, slug }) {
  let data;
  let related_posts = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`,
      { headers: { lang }, next: { revalidate: 86400 } }
    );
    if (!res.ok) throw new Error(`${res.status}`);
    const json = await res.json();
    data = json.data;
    related_posts = json.related_posts ?? [];
  } catch (err) {
    console.error("Failed to fetch blog post:", err.message);
  }

  if (!data) return notFound();

  const { title, content, published_at, view_count, category } = data;
  const isAr = lang === "ar";
  const processedContent = preprocessContent(content);

  return (
    <div className="bg-[#f8fafc] min-h-screen">

      {/* ── HERO ── */}
      <div className="relative w-full h-[70vh] min-h-[420px] overflow-hidden">
        <img src="/blogs.png" alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/10" />
        <div className={`absolute bottom-0 left-0 right-0 z-10 max-w-5xl mx-auto px-6 pb-12 ${isAr ? "text-right" : "text-left"}`}>
          <div className={`flex items-center gap-2 text-white/70 text-[0.78rem] mb-5 ${isAr ? "flex-row-reverse justify-end" : ""}`}>
            <Link href={`/${lang}/blogs`} className="hover:text-white transition-colors">{isAr ? "المدونة" : "Blog"}</Link>
            <span>/</span>
            {category && <><span>{category.name}</span><span>/</span></>}
            <span className="truncate max-w-[200px]">{title}</span>
          </div>
          {category && (
            <span className="inline-flex items-center gap-1.5 text-[0.7rem] font-bold tracking-widest uppercase bg-[var(--primary-color)] text-white px-3 py-1 rounded-full mb-4 shadow-lg">
              {category.name}
            </span>
          )}
          <h1 className={`${isAr ? "font-heading" : "font-display"} text-[clamp(1.6rem,3.5vw,2.6rem)] font-bold text-white leading-[1.15] drop-shadow-xl max-w-3xl mb-5`}>
            {title}
          </h1>
          <div className={`flex items-center gap-5 flex-wrap ${isAr ? "flex-row-reverse justify-end" : ""}`}>
            <span className="flex items-center gap-2 text-white/60 text-[0.82rem]">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              {formatDate(published_at)}
            </span>
            {view_count > 0 && (
              <span className="flex items-center gap-2 text-white/60 text-[0.82rem]">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                {view_count} {isAr ? "مشاهدة" : "views"}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <Container>
        <div className="max-w-6xl mx-auto py-14 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 items-start">

            {/* Article */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#e8edf3] overflow-hidden">
              <div className="h-[4px] bg-[var(--primary-color)]" />
              <div className="p-8 md:p-12">
                <article
                  dir={isAr ? "rtl" : "ltr"}
                  className={`blog-content max-w-none ${isAr ? "font-heading" : "font-display"}`}
                  dangerouslySetInnerHTML={{ __html: processedContent }}
                />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="flex flex-col gap-6 sticky top-8">
              <SidebarContent lang={lang} published_at={published_at} category={category} view_count={view_count} related_posts={related_posts} />
            </aside>
          </div>
        </div>

        {/* Related grid */}
        {related_posts.length > 3 && (
          <div className="max-w-6xl mx-auto pb-16 px-4">
            <div className={`mb-8 flex items-center gap-4 ${isAr ? "flex-row-reverse" : ""}`}>
              <div className="flex-shrink-0 w-[4px] h-8 rounded-full bg-[var(--primary-color)]" />
              <div className={isAr ? "text-right" : ""}>
                <p className="text-[0.75rem] font-bold tracking-widest uppercase text-[var(--primary-color)] mb-0.5">{isAr ? "اقرأ أيضاً" : "Keep Reading"}</p>
                <h2 className={`${isAr ? "font-heading" : "font-display"} text-[1.4rem] font-bold text-[#0f172a] leading-tight`}>{isAr ? "مقالات ذات صلة" : "Related Articles"}</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related_posts.map((item) => (
                <Link key={item.id} href={`/${lang}/blog/${item.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-[#e8edf3] shadow-sm hover:shadow-[0_8px_30px_rgba(55,118,189,0.15)] hover:-translate-y-1 hover:border-[var(--primary-color)] transition-all duration-300"
                >
                  <div className="relative h-[160px] overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {item.category && (
                      <span className="absolute top-3 left-3 text-[0.65rem] font-bold tracking-widest uppercase bg-[var(--primary-color)] text-white px-2.5 py-1 rounded-full">
                        {item.category.name}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 p-4 flex-1">
                    <h4 className={`${isAr ? "font-heading text-right" : "font-display"} text-[0.92rem] font-semibold text-[#0f172a] leading-snug line-clamp-2 group-hover:text-[var(--primary-color)] transition-colors duration-300`}>
                      {item.title}
                    </h4>
                    <div className={`mt-auto flex items-center justify-between pt-3 border-t border-[#f1f5f9] ${isAr ? "flex-row-reverse" : ""}`}>
                      <span className="text-[0.72rem] text-[#94a3b8]">{formatDate(item.published_at)}</span>
                      <svg className={`w-4 h-4 text-[var(--primary-color)] transition-transform duration-300 ${isAr ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}