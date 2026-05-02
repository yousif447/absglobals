const translations = {
  en: {
    partnersHeader: "Our Partners",
    partnersTitle: "Trusted By Leading Organizations",
    partnersDescription:
      "We collaborate with world-class organizations to deliver excellence in certification and quality management.",
    label1: "Customer Satisfaction",
    label2: "Daily Data Input",
    label3: "Years Experience",
  },

  ar: {
    partnersHeader: "شركاؤنا",
    partnersTitle: "موثوق بنا من قبل كبرى المؤسسات",
    partnersDescription:
      "نتعاون مع منظمات عالمية لتقديم التميز في الاعتماد وإدارة الجودة.",
    label1: "رضا العملاء",
    label2: "إدخال البيانات اليومي",
    label3: "سنوات الخبرة",
  },
};

export function t(lang) {
  return translations[lang] || translations.en;
}