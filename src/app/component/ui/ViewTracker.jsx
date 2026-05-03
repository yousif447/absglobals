"use client";

import { useEffect } from "react";

export default function ViewTracker({ slug, lang }) {
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}/view`, {
      method: "POST",
      headers: { lang },
    }).catch(() => {});
  }, [slug]);

  return null;
}