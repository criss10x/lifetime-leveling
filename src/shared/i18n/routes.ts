import type { Locale } from './types';

export function localePath(locale: Locale, path = '/'): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return locale === 'id' ? normalized : `/en${normalized}`;
}
