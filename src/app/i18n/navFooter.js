const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      contact: "Contact",
      services: "Services",
      blogs: "Blogs",
      faq: "FAQ",
      industriesServed: "Industries Served",
      ourPartners: "Our Partners",
      resources: "Resources",
      validation: "Validation",
      getInTouch: "Get in Touch",
    },
    footer: {
      brandDesc:
        "ABS Global is a leading provider of ISO certification and management consulting services, helping organizations achieve excellence and compliance worldwide.",
      quickLinksTitle: "Quick Links",
      resourcesTitle: "Resources",
      getInTouchTitle: "Get in Touch",
      home: "Home",
      aboutUs: "About Us",
      services: "Services",
      contactUs: "Contact",
      blog: "Blog",
      faq: "FAQ",
      resources: "Resources",
      ourPartners: "Our Partners",
      industriesServed: "Industries Served",
      headOffice: "Head office: Hadayeq Alahram, Giza, Egypt",
      maadiOffice:
        "Maadi Office: Tower 3B, Engineers Towers, 18th floor, Cornich Al Maadi, Cairo, Egypt.",
      newsletterLabel: "Subscribe to our newsletter",
      emailPlaceholder: "Your email address",
      subscribe: "Subscribe",
      copyright: "ABS Global. All rights reserved.",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      about: "عن الشركة",
      contact: "تواصل معنا",
      services: "خدماتنا",
      blogs: "المدونة",
      faq: "الأسئلة الشائعة",
      industriesServed: "الصناعات التي نخدمها",
      ourPartners: "شركاؤنا",
      resources: "الموارد",
      validation: "التحقق",
      getInTouch: "تواصل معنا",
    },
    footer: {
      brandDesc:
        "ABS Global هي شركة رائدة في تقديم خدمات شهادات الأيزو والاستشارات الإدارية، تساعد المؤسسات على تحقيق التميز والامتثال حول العالم.",
      quickLinksTitle: "روابط سريعة",
      resourcesTitle: "الموارد",
      getInTouchTitle: "تواصل معنا",
      home: "الرئيسية",
      aboutUs: "من نحن",
      services: "خدماتنا",
      contactUs: "تواصل معنا",
      blog: "المدونة",
      faq: "الأسئلة الشائعة",
      resources: "الموارد",
      ourPartners: "شركاؤنا",
      industriesServed: "الصناعات التي نخدمها",
      headOffice: "المقر الرئيسي: حدائق الأهرام، الجيزة، مصر",
      maadiOffice:
        "مكتب المعادي: برج 3B، أبراج المهندسين، الدور 18، كورنيش المعادي، القاهرة، مصر.",
      newsletterLabel: "اشترك في نشرتنا الإخبارية",
      emailPlaceholder: "بريدك الإلكتروني",
      subscribe: "اشترك",
      copyright: "ABS Global. جميع الحقوق محفوظة.",
      privacyPolicy: "سياسة الخصوصية",
      termsOfService: "شروط الخدمة",
    },
  },
};

export function t(lang, section) {
  const langData = translations[lang] || translations.en;
  return langData[section] || translations.en[section];
}

export default translations;
