// BlogPage.jsx
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "../layout/Container";

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });
}

function preprocessContent(html = "") {
  return html.replace(/<p>(.*?)<\/p>/g, (match, inner) => {
    const text = inner.trim();
    if (text.endsWith("؟") || text.endsWith("?")) return `<h2>${text}</h2>`;
    return match;
  });
}

function RelatedCard({ item, lang }) {
  const isAr = lang === "ar";
  return (
    <Link
      href={`/${lang}/blog/${item.slug}`}
      className="group flex gap-3 p-3.5 rounded-xl border border-[#e8edf3] bg-white hover:border-[var(--primary-color)] hover:shadow-[0_4px_16px_rgba(55,118,189,0.1)] transition-all duration-300"
    >
      <div className="flex-shrink-0 w-[72px] h-[72px] rounded-lg overflow-hidden">
        <img src="/blog.png" alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" />
      </div>
      <div className={`flex flex-col justify-center gap-1 min-w-0 ${isAr ? "text-right" : ""}`}>
        {item.category && (
          <span className="text-[0.62rem] font-bold tracking-widest uppercase text-[var(--primary-color)]">
            {item.category.name}
          </span>
        )}
        <h4 className={`${isAr ? "font-heading" : "font-display"} text-[0.85rem] font-semibold text-[#0f172a] leading-snug line-clamp-2 group-hover:text-[var(--primary-color)] transition-colors duration-300`}>
          {item.title}
        </h4>
        <span className="text-[0.7rem] text-[#94a3b8]">{formatDate(item.published_at)}</span>
      </div>
    </Link>
  );
}

function SidebarContent({ lang, published_at, category, view_count, related_posts }) {
  const isAr = lang === "ar";
  const rows = [
    {
      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
      label: isAr ? "تاريخ النشر" : "Published",
      value: formatDate(published_at),
    },
    ...(category ? [{
      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
      label: isAr ? "التصنيف" : "Category",
      value: category.name,
    }] : []),
    ...(view_count > 0 ? [{
      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
      label: isAr ? "المشاهدات" : "Views",
      value: view_count.toLocaleString(),
    }] : []),
  ];

  return (
    <>
      <div className="bg-white rounded-2xl border border-[#e8edf3] shadow-sm overflow-hidden">
        <div className="h-[3px] bg-[var(--primary-color)]" />
        <div className="p-5">
          <h3 className={`${isAr ? "font-heading text-right" : "font-display"} text-[0.75rem] font-bold text-[#0f172a] uppercase tracking-widest mb-4 flex items-center gap-2 ${isAr ? "flex-row-reverse" : ""}`}>
            <span className="w-4 h-[2px] bg-[var(--primary-color)] rounded-full" />
            {isAr ? "عن المقال" : "Article Info"}
          </h3>
          <div className="flex flex-col gap-3.5">
            {rows.map((row, i) => (
              <div key={i} className={`flex items-start gap-3 ${isAr ? "flex-row-reverse text-right" : ""}`}>
                <span className="mt-[2px] flex-shrink-0 text-[var(--primary-color)]">{row.icon}</span>
                <div>
                  <p className="text-[0.68rem] text-[#94a3b8] uppercase tracking-wider font-medium mb-0.5">{row.label}</p>
                  <p className="text-[0.88rem] font-semibold text-[#1e293b]">{row.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {related_posts.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#e8edf3] shadow-sm overflow-hidden">
          <div className="h-[3px] bg-[var(--primary-color)]" />
          <div className="p-5">
            <h3 className={`${isAr ? "font-heading text-right" : "font-display"} text-[0.75rem] font-bold text-[#0f172a] uppercase tracking-widest mb-4 flex items-center gap-2 ${isAr ? "flex-row-reverse" : ""}`}>
              <span className="w-4 h-[2px] bg-[var(--primary-color)] rounded-full" />
              {isAr ? "مقالات ذات صلة" : "Related Articles"}
            </h3>
            <div className="flex flex-col gap-2.5">
              {related_posts.slice(0, 3).map(p => <RelatedCard key={p.id} item={p} lang={lang} />)}
            </div>
          </div>
        </div>
      )}

      <Link
        href={`/${lang}/blog`}
        className={`group flex items-center justify-center gap-2.5 p-3.5 rounded-xl border-[1.5px] border-[var(--primary-color)] text-[var(--primary-color)] font-bold text-[0.85rem] hover:bg-[var(--primary-color)] hover:text-white transition-all duration-300 ${isAr ? "flex-row-reverse" : ""}`}
      >
        <svg className={`w-4 h-4 transition-transform duration-300 ${isAr ? "rotate-180 group-hover:translate-x-1" : "group-hover:-translate-x-1"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
        </svg>
        {isAr ? "العودة للمدونة" : "Back to Blog"}
      </Link>
    </>
  );
}

export default async function BlogPage({ lang, slug }) {
  let data;
  let related_posts = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`,
      {
        headers: {
          lang,
          "view": "+1",
        },
        cache: "no-store",
      }
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
      <div className="relative w-full h-[60vh] min-h-[380px] max-h-[520px] overflow-hidden">
        <img src="/blogs.png" alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/10" />
        <div className={`absolute bottom-0 left-0 right-0 z-10 max-w-5xl mx-auto px-5 sm:px-8 pb-10 sm:pb-14 ${isAr ? "text-right" : "text-left"}`}>

          {/* Breadcrumb */}
          <div className={`flex items-center gap-1.5 text-white/60 text-[0.72rem] mb-4 flex-wrap ${isAr ? "flex-row-reverse justify-end" : ""}`}>
            <Link href={`/${lang}/blogs`} className="hover:text-white transition-colors">{isAr ? "المدونة" : "Blog"}</Link>
            <span>/</span>
            {category && <><span>{category.name}</span><span>/</span></>}
            <span className="truncate max-w-[180px] text-white/40">{title}</span>
          </div>

          {category && (
            <span className="inline-flex items-center gap-1 text-[0.65rem] font-bold tracking-widest uppercase bg-[var(--primary-color)] text-white px-2.5 py-1 rounded-full mb-3 shadow-lg">
              {category.name}
            </span>
          )}

          <h1 className={`${isAr ? "font-heading" : "font-display"} text-[clamp(1.4rem,3.5vw,2.4rem)] font-bold text-white leading-[1.2] drop-shadow-xl max-w-3xl mb-4`}>
            {title}
          </h1>

          <div className={`flex items-center gap-4 flex-wrap ${isAr ? "flex-row-reverse justify-end" : ""}`}>
            <span className="flex items-center gap-1.5 text-white/60 text-[0.78rem]">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              {formatDate(published_at)}
            </span>
            {view_count > 0 && (
              <span className="flex items-center gap-1.5 text-white/60 text-[0.78rem]">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                {view_count.toLocaleString()} {isAr ? "مشاهدة" : "views"}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <Container>
        <div className="max-w-6xl mx-auto py-10 sm:py-14 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 items-start">

            {/* Article */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#e8edf3] overflow-hidden min-w-0">
              <div className="h-[3px] bg-[var(--primary-color)]" />
              <div className="p-6 sm:p-10">
                <article
                  dir={isAr ? "rtl" : "ltr"}
                  className={`blog-content max-w-none ${isAr ? "font-heading" : "font-display"}`}
                  dangerouslySetInnerHTML={{ __html: processedContent }}
                />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="flex flex-col gap-5 lg:sticky lg:top-8">
              <SidebarContent
                lang={lang}
                published_at={published_at}
                category={category}
                view_count={view_count}
                related_posts={related_posts}
              />
            </aside>
          </div>
        </div>

        {/* Related grid */}
        {related_posts.length > 3 && (
          <div className="max-w-6xl mx-auto pb-14 px-4">
            <div className={`mb-7 flex items-center gap-4 ${isAr ? "flex-row-reverse" : ""}`}>
              <div className="flex-shrink-0 w-[3px] h-8 rounded-full bg-[var(--primary-color)]" />
              <div className={isAr ? "text-right" : ""}>
                <p className="text-[0.7rem] font-bold tracking-widest uppercase text-[var(--primary-color)] mb-0.5">{isAr ? "اقرأ أيضاً" : "Keep Reading"}</p>
                <h2 className={`${isAr ? "font-heading" : "font-display"} text-[1.25rem] font-bold text-[#0f172a] leading-tight`}>{isAr ? "مقالات ذات صلة" : "Related Articles"}</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related_posts.map(item => (
                <Link key={item.id} href={`/${lang}/blog/${item.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-[#e8edf3] shadow-sm hover:shadow-[0_6px_24px_rgba(55,118,189,0.13)] hover:-translate-y-1 hover:border-[var(--primary-color)] transition-all duration-300"
                >
                  <div className="relative h-[150px] overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {item.category && (
                      <span className="absolute top-2.5 left-2.5 text-[0.6rem] font-bold tracking-widest uppercase bg-[var(--primary-color)] text-white px-2 py-0.5 rounded-full">
                        {item.category.name}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 p-4 flex-1">
                    <h4 className={`${isAr ? "font-heading text-right" : "font-display"} text-[0.88rem] font-semibold text-[#0f172a] leading-snug line-clamp-2 group-hover:text-[var(--primary-color)] transition-colors duration-300`}>
                      {item.title}
                    </h4>
                    <div className={`mt-auto flex items-center justify-between pt-3 border-t border-[#f1f5f9] ${isAr ? "flex-row-reverse" : ""}`}>
                      <span className="text-[0.7rem] text-[#94a3b8]">{formatDate(item.published_at)}</span>
                      <svg className={`w-3.5 h-3.5 text-[var(--primary-color)] transition-transform duration-300 ${isAr ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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