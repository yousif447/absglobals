import { notFound } from "next/navigation";
import Navbar from "../component/layout/Navbar";
import Footer from "../component/layout/Footer";
import Breadcrumb from "../component/ui/BreadCrumb";
import { SettingsProvider } from "../context/SettingsContext";

const SUPPORTED_LANGS = ["en", "ar"];

async function fetchSettings(lang) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/pages/home`,
      { headers: { lang }, cache: 'force-cache' }
    );
    if (!res.ok) return {};
    const json = await res.json();
    return json.data?.settings ?? {};
  } catch {
    return {};
  }
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;

  if (!SUPPORTED_LANGS.includes(lang)) {
    notFound();
  }

  const settings = await fetchSettings(lang);

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"}>
      <Navbar lang={lang} settings={settings} />
      <Breadcrumb lang={lang} />
      <SettingsProvider settings={settings}>
        <main>{children}</main>
      </SettingsProvider>
      <Footer lang={lang} settings={settings} />
    </div>
  );
}

