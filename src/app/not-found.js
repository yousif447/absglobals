import Link from "next/link";

export default function NotFound({ lang = "en" }) {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 py-20 md:py-0 overflow-hidden relative">

      {/* Background decorative blobs */}
      <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px]
        rounded-full bg-[rgba(55,118,189,0.07)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-60px] left-[-60px] w-[300px] h-[300px]
        rounded-full bg-[rgba(55,118,189,0.05)] blur-2xl pointer-events-none" />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg w-full">

        {/* Big 404 */}
        <div className="relative mb-6 select-none">
          <span
            className="font-display text-[clamp(7rem,20vw,11rem)] font-bold leading-none
              text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, var(--primary-color) 0%, #93c5fd 100%)",
            }}
          >
            404
          </span>

          {/* Floating checkmark dot — top right of 404 */}
          <div className="absolute -top-3 -right-3 w-[32px] h-[32px] bg-[var(--primary-color)]
            rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(55,118,189,0.4)]
            animate-bounce">
            <svg viewBox="0 0 12 10" fill="none" className="w-[14px] h-[14px]">
              <polyline points="1,5 4.5,8.5 11,1" stroke="#fff" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Badge */}
        <span className={`${lang === "ar" ? "font-heading" : "font-display"} inline-block text-[0.75rem] font-bold tracking-[0.1em] uppercase
          text-[var(--primary-color)] bg-[rgba(55,118,189,0.08)] px-4 py-[0.35rem] rounded-full mb-5`}>
            {lang === "ar" ? "الصفحة غير موجودة" : "Page Not Found"}
        </span>

        {/* Heading */}
        <h1 className={`${lang === "ar" ? "font-heading" : "font-display"} text-[clamp(1.5rem,4vw,2rem)] font-bold text-[#0f172a]
          leading-[1.25] mb-4`}>
          {lang === "ar" ? "يبدو أن هذه الصفحة غير موجودة" : "Looks like this page doesn't exist"}
        </h1>

        {/* Body */}
        <p className="text-[#64748b] text-[1rem] leading-[1.8] mb-10 max-w-sm">
          {lang === "ar" ? "قد تكون الصفحة التي تبحث عنها قد تم نقلها أو إعادة تسميتها أو لم تكن موجودة أبدًا." : "The page you're looking for may have been moved, renamed, or never existed."}
          <br />
          {lang === "ar" ? "لنعدك إلى المسار الصحيح." : "Let's get you back on track."}
        </p>

        {/* Cards row — quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-10">
          {[
            { label: lang === "ar" ? "الصفحة الرئيسية" : "Home", href: "/", desc: lang === "ar" ? "الصفحة الرئيسية" : "Back to main page" },
            { label: lang === "ar" ? "الخدمات" : "Services", href: "/services", desc: lang === "ar" ? "الخدمات" : "What we offer" },
            { label: lang === "ar" ? "اتصل بنا" : "Contact Us", href: "/contact-us", desc: lang === "ar" ? "اتصل بنا" : "Get in touch" },
          ].map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative flex flex-col items-start bg-white border border-[#e2e8f0]
                rounded-xl px-4 py-4 shadow-sm overflow-hidden
                hover:shadow-[0_8px_24px_rgba(55,118,189,0.15)]
                hover:border-[var(--primary-color)]
                transition-all duration-300"
            >
              {/* Accent number */}
              <span className="text-[1.6rem] font-bold text-[rgba(55,118,189,0.15)] leading-none mb-2 select-none">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={`${lang === "ar" ? "font-heading" : "font-display"} text-[0.95rem] font-semibold text-[#0f172a]`}>
                {link.label}
              </span>
              <span className="text-[0.8rem] text-[#94a3b8] mt-0.5">{link.desc}</span>

              {/* Bottom bar on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--primary-color)]
                scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </Link>
          ))}
        </div>

        <Link
          href={`/${lang}`}
          className={`inline-flex items-center gap-2 bg-[var(--primary-color)] text-white
            ${lang === "ar" ? "font-heading" : "font-display"} font-semibold text-[0.95rem] px-7 py-3 rounded-[var(--radius-lg)]
            shadow-[0_4px_14px_rgba(55,118,189,0.35)]
            hover:brightness-110 hover:shadow-[0_6px_20px_rgba(55,118,189,0.45)]
            transition-all duration-200`}
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {lang === "ar" ? "الذهاب إلى الصفحة الرئيسية" : "Go back home"}
        </Link>

      </div>
    </div>
  );
}