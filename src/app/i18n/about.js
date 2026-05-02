const translations = {
  en: {
    milestones: "Milestones",
    corporateIdentity: "Our Corporate Identity",
    whyChooseUs: "Why Choose Us",
    difference: "The ABS Global Difference",
  },
  ar: {
    milestones: "الإنجازات",
    corporateIdentity: "هويتنا المؤسسية",
    whyChooseUs: "لماذا تختارنا",
    difference: "ما يميز ABS Global",
  },
};

export function t(lang) {
  return translations[lang] || translations.en;
}