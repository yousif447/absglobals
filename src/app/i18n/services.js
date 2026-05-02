const translations = {
  en: {
    heroHeader: "Certification We Offer",
    heroSubtitle: "Explore Our Comprehensive Range of Certification Services",

    processTitle: "How It Works",
    processSubtitle: "Your Path to Certification",
    processDescription:
      "A transparent, step-by-step journey to achieving internationally recognized ISO certification with ABS Global.",

    lifecycleHeader: "Certification Lifecycle",
    lifecycleTitle: "Certification Processes for Every Stage",
    lifecycleDescription:
      "From granting to withdrawing — understand every phase of the certification lifecycle.",

    previous: "Previous",
    next: "Next",
    step: "Step",
    of: "of",
  },

  ar: {
    heroHeader: "الشهادات التي نقدمها",
    heroSubtitle: "اكتشف مجموعتنا الشاملة من خدمات الاعتماد",

    processTitle: "كيف نعمل",
    processSubtitle: "طريقك إلى الاعتماد",
    processDescription:
      "رحلة واضحة وخطوة بخطوة لتحقيق شهادة ISO معترف بها دوليًا مع ABS Global.",

    lifecycleHeader: "دورة الشهادة",
    lifecycleTitle: "عمليات الشهادة لكل مرحلة",
    lifecycleDescription:
      "من المنح إلى السحب — تعرّف على كل مراحل دورة الشهادة.",

    previous: "السابق",
    next: "التالي",
    step: "الخطوة",
    of: "من",
  },
};

export function t(lang) {
  return translations[lang] || translations.en;
}