import i18n from 'i18n-js'
import * as Localization from 'expo-localization'

import de from './locales/de.json'
import en from './locales/en.json'

i18n.defaultLocale = 'en'
i18n.locale = Localization.locale
console.log(Localization.locale)
i18n.fallbacks = true
i18n.translations = {
  de: de,
  en: en,
}

export default i18n
