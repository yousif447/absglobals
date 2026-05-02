const translations = {
  en: {
    header: "Check the Authenticity of Your Certificate",
    title: "Certificate Validation",
    subtitle: "Please Enter a Valid Certificate Code",
    description: "Enter your certificate code below to verify its authenticity and view the details",
    search:"Search Now",
    inputPlaceholder: "Certificate Code"
  },
  ar: {
    header: "تحقق من صحة شهادتك",
    title: "التحقق من الشهادة",
    subtitle: "يرجى إدخال رمز شهادة صالح",
    description: "أدخل رمز الشهادة أدناه للتحقق من صحتها وعرض التفاصيل",
    search:"ابحث الآن",
    inputPlaceholder: "رمز الشهادة"
  },
};

export function t(lang, section) {
  const langData = translations[lang] || translations.en;
  return langData[section] || translations.en[section];
}

export default translations;
