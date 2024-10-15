import { redirect } from '@sveltejs/kit';

import { paths } from '$lib/constants';
import type { User } from '$lib/dbModelTypes';
import type { MyLocals } from '$lib/types';

import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ url, locals }) => {
  const { userId } = locals as MyLocals;
  const userData = (await fetch(`${url.origin}/api/user?userId=${userId}`).then((res) =>
    res.json()
  )) as User;

  const initials =
    userData.name && userData.lastname
      ? `${userData.name.charAt(0).toUpperCase()}${userData.lastname.charAt(0).toUpperCase()}`
      : userData.name
        ? userData.name.slice(0, 2).toUpperCase()
        : userData.email.slice(0, 2).toUpperCase();

  return {
    initials,
    path: url.pathname,
    user: userData
  };
};

export const actions = {
  updateUser: async ({ request, locals, url }) => {
    const { userId, sessionToken } = locals as MyLocals;
    const formData = await request.formData();

    const userData = {
      name: formData.get('name'),
      lastname: formData.get('lastname')
    };

    const response = await fetch(`${url.origin}/api/user?userId=${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionToken}`
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      return { error: 'Failed to update user' };
    }

    throw redirect(303, paths.profile);
  }
} satisfies Actions;
