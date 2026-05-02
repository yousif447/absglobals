const translation = {
  en: {
    
  },
  ar: {
    
  },
}

export function t(lang) {
  return translation[lang] ?? translation.en
}