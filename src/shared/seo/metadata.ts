import { SURFACES, type SurfaceName } from '../config/surfaces';
import { localePath } from '../i18n/routes';
import type { Locale } from '../i18n/types';

export { localePath } from '../i18n/routes';

export function canonicalUrl(surface: SurfaceName, locale: Locale, path = '/'): string {
  return new URL(localePath(locale, path), `${SURFACES[surface].site}/`).toString();
}
