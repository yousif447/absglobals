"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const INITIAL_COUNT = 6;

export default function CertificatesGrid({ items, lang }) {
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? items : items.slice(0, INITIAL_COUNT);
  const hasMore = items.length > INITIAL_COUNT;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visible.map((item) => (
          <Link href={`/${lang}/our-service/${item.slug}`} className="cursor-pointer" key={item.id}>
            <div
              key={item.id}
              className="group relative grid grid-cols-[130px_auto] items-center gap-4 bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm overflow-hidden hover:shadow-[0_8px_24px_rgba(55,118,189,0.15)] hover:border-[var(--primary-color)] transition-all duration-300 cursor-pointer"
            >
              <img
                src="/iso9001.jpg"
                alt={item.name}
                width={120}
                height={120}
              />
              {/* <Image
                src={item.image}
                alt={item.name}
                fill
                priority
                width={120}
                height={120}
              /> */}
              <div>
                <h5 className="font-display text-[1.1rem] font-semibold text-[#0f172a] mb-2 leading-snug">
                  {item.name}
                </h5>
                <p className="text-[#64748b] text-[0.95rem] leading-[1.7]">
                  {item.description.replace(/<[^>]*>/g, "")}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAll(prev => !prev)}
            className="px-6 py-[0.5rem] text-[var(--primary-color)] font-bold border-2 border-[var(--primary-color)] rounded-full cursor-pointer hover:bg-[var(--primary-color)] hover:text-white transition-all duration-300"
          >
            {showAll ? "View Less" : "View More..."}
          </button>
        </div>
      )}
    </>
  );
}
