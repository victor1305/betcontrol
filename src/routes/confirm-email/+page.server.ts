import { redirect } from '@sveltejs/kit';

import { paths } from '$lib/constants';

import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const userId = url.searchParams.get('userId');
  const response = await fetch(`${url.origin}/api/user?userId=${userId}`);

  if (!response.ok) {
    throw redirect(303, paths.profile);
  }

  const userData = await response.json();

  return {
    userData
  };
};

export const actions = {
  resendEmail: async ({ url, request }) => {
    const formData = await request.formData();
    const email = formData.get('email');
    const userId = formData.get('userId');

    const response = await fetch(`${url.origin}/api/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, email, action: 'resend-email' })
    });

    if (!response.ok) {
      return {
        status: 401,
        errors: {
          message: 'Error resending email'
        }
      };
    }

    throw redirect(303, `${paths.confirmEmail}?userId=${userId}`);
  }
} satisfies Actions;
