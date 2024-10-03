import '@/lib/i18n'; // Import to initialize. Important :)
import { locale, waitLocale } from 'svelte-i18n';

import { browser } from '$app/environment';

import type { LayoutLoad } from './$types';

interface LayoutData {
  userId: string;
}

export const load: LayoutLoad = async ({ data }: { data: LayoutData }) => {
  if (browser) {
    locale.set(window.navigator.language);
  }
  await waitLocale();

  const userId = (data as LayoutData).userId;

  return {
    userId
  };
};
