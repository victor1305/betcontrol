import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { paths } from '$lib/constants';

export const load: PageServerLoad = async ({ url, cookies }) => {
  const token = url.searchParams.get('token');

  const response = await fetch(`${url.origin}/api/auth?token=${token}`);

  if (!response.ok) {
    throw redirect(303, paths.confirmEmail);
  }

  const responseParsed = await response.json();

  if (responseParsed.token) {
    const expirationDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    cookies.set('sessionToken', responseParsed.token, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      expires: expirationDate
    });
    throw redirect(303, paths.profile);
  }
  throw redirect(303, paths.confirmEmail);
};
