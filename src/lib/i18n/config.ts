export const defaultLocale = 'id';
export const locales = ['id', 'en'] as const;
export type Locale = (typeof locales)[number];
