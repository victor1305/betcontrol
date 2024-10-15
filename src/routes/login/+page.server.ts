import { redirect } from '@sveltejs/kit';

import { paths } from '$lib/constants';

import type { Actions } from './$types';

export const actions = {
  login: async ({ request, url, cookies }) => {
    const formData = await request.formData();
    const action = formData.get('action');
    const password = formData.get('password');
    const repeatPassword = formData.get('repeat-password');

    if (action === 'signup' && password !== repeatPassword) {
      return {
        status: 400,
        errors: {
          message: 'Passwords do not match'
        }
      };
    }
    const loginData = {
      email: formData.get('email'),
      password,
      action
    };

    const response = await fetch(`${url.origin}/api/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });

    if (response.ok) {
      const result = await response.json();

      if (result.token && result.isVerified) {
        const expirationDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
        cookies.set('sessionToken', result.token, {
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          expires: expirationDate
        });
        const previousPage = url.searchParams.get('previous');
        throw redirect(303, previousPage || paths.home);
      } else {
        throw redirect(303, `${paths.confirmEmail}?userId=${result.userId}`);
      }
    } else {
      const errorResponse = await response.json();
      return {
        status: 401,
        errors: {
          message: errorResponse.message || 'Invalid email or password'
        }
      };
    }
  }
} satisfies Actions;
