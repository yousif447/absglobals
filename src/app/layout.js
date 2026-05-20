import { Inter, Asul, Noto_Sans_Arabic, Rubik } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import BreadCrumb from "./component/ui/BreadCrumb";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-primary",
});

const asul = Asul({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-display",
});

const rubik = Rubik({
  subsets: ["arabic", "latin"],
  variable: "--font-heading",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
});

export const metadata = {
  title: "ABS Global",
  description: "ISO Certification Services",
};

export default function RootLayout({ children }) {
  return (
    <html
      className={`${inter.variable} ${asul.variable} ${notoSansArabic.variable} ${rubik.variable} h-full antialiased`}
    >
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),
              dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MRZHWVS6');
          `}
        </Script>
      </head>

      <body className="min-h-full flex flex-col">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MRZHWVS6"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>

        {children}
      </body>
    </html>
  );
}