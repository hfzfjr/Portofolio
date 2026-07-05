import { defaultLocale, type Locale } from './config';

export async function getDictionary(locale: string = defaultLocale) {
  try {
    const dictionary = await import(`./dictionaries/${locale}.json`);
    return dictionary.default;
  } catch (error) {
    console.error(`Dictionary for locale "${locale}" not found, falling back to "${defaultLocale}"`);
    const fallbackDictionary = await import(`./dictionaries/${defaultLocale}.json`);
    return fallbackDictionary.default;
  }
}
