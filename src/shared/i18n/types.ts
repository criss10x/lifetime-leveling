export const LOCALES = ['id', 'en'] as const;

export type Locale = (typeof LOCALES)[number];
