import { init, register, getLocaleFromNavigator, locale, t, waitLocale } from 'svelte-i18n';

register('en', () => import('@/lib/locales/en.json'));
register('es', () => import('@/lib/locales/es.json'));

const defaultLocale = 'es';

init({
  fallbackLocale: 'es',
  initialLocale: getLocaleFromNavigator() || defaultLocale
});

export { t, locale, waitLocale };
