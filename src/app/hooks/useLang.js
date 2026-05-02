"use client";

import { usePathname } from "next/navigation";

const SUPPORTED_LANGS = ["en", "ar"];

export default function useLang() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const lang = segments[0];
  return SUPPORTED_LANGS.includes(lang) ? lang : "en";
}
