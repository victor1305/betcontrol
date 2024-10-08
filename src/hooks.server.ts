import { type Handle } from '@sveltejs/kit';
import { jwtDecode } from 'jwt-decode';
import { locale } from 'svelte-i18n';

import { checkLoginPage } from '$lib/helpers';
import type { MyLocals } from '$lib/types';

interface TokenExtendedProps {
  [key: string]: string;
}

const validateToken = (cookieSessionToken: string) => {
  const tokenDecoded = jwtDecode(cookieSessionToken);
  const { exp } = tokenDecoded;
  const now = Math.floor(Date.now() / 1000);

  return exp ? now < exp : false;
};

const getTokenData = (cookieSessionToken: string, field: string) => {
  const tokenDecoded: TokenExtendedProps = jwtDecode(cookieSessionToken);
  return tokenDecoded[field] as string;
};

export const handle: Handle = async ({ event, resolve }) => {
  const pathname = event.url.pathname;
  const cookieSessionToken = event.cookies.get('sessionToken');
  const isValidToken = cookieSessionToken
    ? validateToken(cookieSessionToken)
    : false;

  event.locals = {
    ...(event.locals || {}),
    pathname: pathname
  } as MyLocals;

  if (!checkLoginPage(pathname)) {
    event.locals = {
      ...(event.locals || {}),
      previousPathname: pathname
    } as MyLocals;
  }
  if (isValidToken) {
    event.locals = {
      ...(event.locals || {}),
      sessionToken: cookieSessionToken,
      userId: getTokenData(cookieSessionToken as string, 'userId'),
      email: getTokenData(cookieSessionToken as string, 'email')
    } as MyLocals;
  }

  const lang = event.request.headers.get('accept-language')?.split(',')[0];
  if (lang) {
    locale.set(lang);
  }
  return resolve(event);
};