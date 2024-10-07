import type { Actions } from './$types';

export const actions = {
  login: async ({ request }) => {
    const formData = await request.formData();
    const loginData = {
      email: formData.get('email'),
      password: formData.get('password')
    };

    console.warn(loginData);
  }
} satisfies Actions;
