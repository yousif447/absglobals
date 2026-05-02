import { Inter, Asul, Noto_Sans_Arabic, Rubik } from "next/font/google";
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
      className={`${inter.variable} ${asul.variable} ${ notoSansArabic.variable} ${rubik.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* <BreadCrumb/> */}
        {children}
      </body>
    </html>
  );
}
