import { type Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import { locale } from 'svelte-i18n';
import { env } from '$env/dynamic/private';

import { checkLoginPage } from '$lib/helpers';
import type { MyLocals } from '$lib/types';

const validateToken = (cookieSessionToken: string): JwtPayload | false => {
  try {
    const decoded = jwt.verify(cookieSessionToken, env.JWT_SECRET as string);
    if (typeof decoded === 'object' && decoded !== null) {
      return decoded as JwtPayload;
    }
    return false;
  } catch (err) {
    console.error('Token no válido o ha expirado', err);
    return false;
  }
};

export const handle: Handle = async ({ event, resolve }) => {
  const pathname = event.url.pathname;
  const cookieSessionToken = event.cookies.get('sessionToken');
  let isValidToken = false;
  let decodedToken;

  if (cookieSessionToken) {
    decodedToken = validateToken(cookieSessionToken);
    isValidToken = !!decodedToken;
  }

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
  if (isValidToken && typeof decodedToken === 'object') {
    event.locals = {
      ...(event.locals || {}),
      sessionToken: cookieSessionToken,
      userId: decodedToken?.userId,
      email: decodedToken?.email as string
    } as MyLocals;
  }

  const lang = event.request.headers.get('accept-language')?.split(',')[0];
  if (lang) {
    locale.set(lang);
  }
  return resolve(event);
};
