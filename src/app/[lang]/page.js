import HomePage from "../component/pages/HomePage";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/pages/home`,
      { headers: { lang } }
    );
    if (!res.ok) throw new Error(`API returned ${res.status}`);
    const json = await res.json();
    const seo = json.data?.seo_meta;

    if (seo) {
      return {
        title: seo.title,
        description: seo.description.slice(0, 155),
        keywords: seo.keywords,
      };
    }
  } catch (err) {
    console.error("Failed to fetch home SEO metadata:", err.message);
  }

  return {
    title: "ABS Global",
    description: "ISO Certification Services",
  };
}

export default async function Home({params}) {
  const {lang} = await params;
  console.log(lang)
  return (
    <div>
      <HomePage lang={lang}/>
    </div>
  );
}
