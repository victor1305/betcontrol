import { type Handle } from '@sveltejs/kit';
import { locale } from 'svelte-i18n';

import type { MyLocals } from '$lib/types';

export const handle: Handle = async ({ event, resolve }) => {
  const pathname = event.url.pathname;
  // const cookieSessionToken = event.cookies.get('sessionToken');
  // const isValidToken = cookieSessionToken
  //   ? validateToken(cookieSessionToken)
  //   : false;

  event.locals = {
    ...(event.locals || {}),
    pathname: pathname
  } as MyLocals;

  // if (!checkLoginPage(pathname)) {
  //   event.locals = {
  //     ...(event.locals || {}),
  //     previousPathname: pathname
  //   } as MyLocals;
  // }
  // if (isValidToken) {
  //   event.locals = {
  //     ...(event.locals || {}),
  //     sessionToken: cookieSessionToken,
  //     company: getTokenData(cookieSessionToken as string, 'company'),
  //     user: getTokenData(cookieSessionToken as string, 'user_id'),
  //     companyName: getTokenData(cookieSessionToken as string, 'company_name')
  //   } as MyLocals;
  // }

  const lang = event.request.headers.get('accept-language')?.split(',')[0];
  if (lang) {
    locale.set(lang);
  }
  return resolve(event);
};