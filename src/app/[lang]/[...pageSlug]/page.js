import React from "react";
import AboutUsPage from "../../component/pages/AboutUsPage";
import ServicePage from "../../component/pages/ServicePage";
import ServicesPage from "../../component/pages/ServicesPage";
import PartnersPage from "../../component/pages/PartnersPage";
import IndustriesServedPage from "../../component/pages/IndustriesServedPage";
import RecourcesPage from "../../component/pages/RecourcesPage";
import ContactUsPage from "../../component/pages/ContactUsPage";
import BlogsPage from "../../component/pages/BlogsPage";
import BlogPage from "../../component/pages/BlogPage";
import FaqPage from "../../component/pages/FaqPage";
import ValidationPage from "../../component/pages/ValidationPage";
import ReportsPages from "../../component/pages/ReportsPages";
import NotFound from "../../not-found";

// ─── SEO metadata ───────────────────────────────────────────────────────────

/**
 * Resolves the correct API endpoint for a given pageSlug array.
 * Returns null for pages that have no backend data.
 */
function resolveEndpoint(pageSlug) {
  // Individual service page  →  /iso/{slug}
  if (pageSlug[0] === "our-service" && pageSlug[1]) {
    return `/iso/${pageSlug[1]}`;
  }
  // Individual blog post  →  /posts/{slug}
  if (pageSlug[0] === "blog" && pageSlug[1]) {
    return `/posts/${pageSlug[1]}`;
  }
  // Pages with no backend data
  const noDataPages = new Set(["contact-us", "validation", "reports"]);
  if (noDataPages.has(pageSlug[0])) return null;

  // All other pages  →  /{slug}
  return `/${pageSlug[0]}`;
}

/**
 * Returns the fetch cache option for the given page slug.
 *
 * SSG  (force-cache) → about-us, contact-us, faqs, resources, validation,
 *                       our-partners, industries-served
 * ISR  (revalidate)  → blog (listing page)
 * SSR  (no-store)    → our-service (services listing page)
 */
function resolveCacheOption(pageSlug) {
  const slug = pageSlug[0];

  // SSR pages — always fetch fresh
  const ssrPages = new Set(["our-service"]);
  if (ssrPages.has(slug)) return { cache: "no-store" };

  // ISR pages — revalidate every hour
  const isrPages = new Set(["blog"]);
  if (isrPages.has(slug)) return { next: { revalidate: 3600 } };

  // SSG pages — cache indefinitely (build-time)
  return { next: { revalidate: false } };
}

export async function generateMetadata({ params }) {
  const { lang, pageSlug } = await params;
  const endpoint = resolveEndpoint(pageSlug);

  if (endpoint && !endpoint.includes("/iso") && !endpoint.includes("/posts")) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/pages${endpoint}`,
        { headers: { lang }, ...resolveCacheOption(pageSlug) },
      );
      if (!res.ok) throw new Error(`API returned ${res.status}`);
      const json = await res.json();
      const seo = json.data?.seo_meta;
      // console.log(seo.description.slice(0, 155))

      if (seo) {
        return {
          title: seo.title,
          description: seo.description.slice(0, 155),
          keywords: seo.keywords,
        };
      }
    } catch (err) {
      console.error(
        `Failed to fetch SEO metadata for /${pageSlug.join("/")}:`,
        err.message,
      );
    }
  }

  // Fallback: format the slug into a readable title
  const fallbackTitle = pageSlug[pageSlug.length - 1]
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${fallbackTitle} | ABS Global`,
    description: "ABS Global — ISO Certification Services",
  };
}

// ─── Page component ─────────────────────────────────────────────────────────

export default async function page({ params }) {
  const { lang, pageSlug } = await params;

  if (pageSlug[0] === "our-service" && pageSlug[1]) {
    return <ServicePage lang={lang} slug={pageSlug[1]} />;
  }
  if (pageSlug[0] === "blog" && pageSlug[1]) {
    return <BlogPage lang={lang} slug={pageSlug[1]} />;
  }

  const pagesMap = {
    "about-us": AboutUsPage,
    blog: BlogsPage,
    "our-service": ServicesPage,
    "our-partners": PartnersPage,
    "industries-served": IndustriesServedPage,
    resources: RecourcesPage,
    "contact-us": ContactUsPage,
    faqs: FaqPage,
    validation: ValidationPage,
    reports: ReportsPages,
  };

  // Pages that don't need backend data (form-only, static, etc.)
  const noDataPages = new Set(["contact-us", "validation", "reports"]);

  const Component = pagesMap[pageSlug[0]];
  if (!Component) return <NotFound lang={lang} />;

  // If the page doesn't need data, render it directly
  if (noDataPages.has(pageSlug[0])) {
    return <Component lang={lang} />;
  }

  let data;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/pages/${pageSlug[0]}`,
      { headers: { lang }, ...resolveCacheOption(pageSlug) },
    );
    if (!res.ok)
      throw new Error(`API returned ${res.status}: ${res.statusText}`);
    const pages = await res.json();
    data = pages.data;
  } catch (err) {
    console.error("Failed to fetch pages:", err.message);
  }

  if (!data) return <NotFound lang={lang} />;

  return <Component data={data} lang={lang} />;
}
