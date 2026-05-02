    "use client";

    import Link from "next/link";
    import { usePathname } from "next/navigation";
    import { t } from "../../i18n/navFooter";

    /**
     * Maps URL slugs to their localized display labels.
     * Falls back to formatting the slug as a title-case string.
     */
    function getLabel(slug, lang) {
    const nav = t(lang, "nav");

    const slugToLabel = {
        "about-us": nav.about,
        "contact-us": nav.contact,
        "our-service": nav.services,
        blog: nav.blogs,
        faq: nav.faq,
        "industries-served": nav.industriesServed,
        "our-partners": nav.ourPartners,
        resources: nav.resources,
        validation: nav.validation,
    };

    if (slugToLabel[slug]) return slugToLabel[slug];

    // Fallback: format slug into a readable title
    return slug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
    }

    // ── Chevron separator ───────────────────────────────────────────────────────
    function ChevronSeparator() {
    return (
        <svg
        className="w-3.5 h-3.5 text-[#94a3b8] rtl:rotate-180 flex-shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        >
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="m9 5 7 7-7 7"
        />
        </svg>
    );
    }

    // ── Home icon ───────────────────────────────────────────────────────────────
    function HomeIcon() {
    return (
        <svg
        className="w-[15px] h-[15px]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        >
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
        />
        </svg>
    );
    }

    // ── Main Breadcrumb component ───────────────────────────────────────────────
    export default function Breadcrumb({ lang = "en" }) {
    const pathname = usePathname();
  const nav = t(lang, "nav");

  // Split the pathname and remove empty strings + the lang segment
  // e.g. "/en/our-service/iso-9001" → ["our-service", "iso-9001"]
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .filter((seg) => seg !== lang);

  // Don't render breadcrumb on the homepage
  if (segments.length === 0) return null;

  // Build crumb items: each has a label and an href
  const crumbs = segments.map((slug, index) => {
    const href = `/${lang}/${segments.slice(0, index + 1).join("/")}`;
    const label = getLabel(slug, lang);
    const isLast = index === segments.length - 1;
    return { slug, href, label, isLast };
  });

  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-[#f8fafc] border-b border-[#e8edf3]"
    >
      <div className="max-w-11/12 px-4 sm:px-6 lg:px-8 mx-auto">
        <ol className="flex items-center gap-2 py-3 text-[0.82rem]">
          {/* Home */}
          <li className="flex items-center">
            <Link
              href={`/${lang}`}
              className="flex items-center gap-1.5 text-[#64748b] hover:text-[var(--primary-color)] transition-colors duration-200 font-medium">
              <HomeIcon />
              <span>{nav.home}</span>
            </Link>
          </li>

          {/* Dynamic segments */}
          {crumbs.map((crumb) => (
            <li key={crumb.href} className="flex items-center gap-2">
              <ChevronSeparator />

              {crumb.isLast ? (
                <span
                  className="text-[var(--primary-color)] font-semibold truncate max-w-[200px]"
                  aria-current="page"
                >
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-[#64748b] hover:text-[var(--primary-color)] transition-colors duration-200 font-medium truncate max-w-[200px]">
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}