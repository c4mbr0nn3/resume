import en from './en.json'
import it from './it.json'

const translations = { en, it }

export function useTranslations(locale: 'en' | 'it') {
  return translations[locale] ?? translations.en
}
