import { redirect } from '@sveltejs/kit';

import { paths } from '$lib/constants';
import type { Bookie, Tipster, User } from '$lib/dbModelTypes';
import type { MyLocals } from '$lib/types';

import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ url, locals }) => {
  const { userId, sessionToken } = locals as MyLocals;
  const userData = (await fetch(`${url.origin}/api/user?userId=${userId}`).then((res) =>
    res.json()
  )) as User;
  const bookiesResponse = (await fetch(`${url.origin}/api/bookies`).then((res) =>
    res.json()
  )) as Bookie[];
  const bookies = bookiesResponse.sort((a, b) => a.name.localeCompare(b.name));
  const bookiesSelected = userData.bookiesSelected || [];
  const tipstersResponse = (await fetch(`${url.origin}/api/tipsters?userId=${userId}`).then((res) =>
    res.json()
  )) as Tipster[];
  const tipsters = tipstersResponse.sort((a, b) => a.name.localeCompare(b.name));

  const initials =
    userData.name && userData.lastname
      ? `${userData.name.charAt(0).toUpperCase()}${userData.lastname.charAt(0).toUpperCase()}`
      : userData.name
        ? userData.name.slice(0, 2).toUpperCase()
        : userData.email.slice(0, 2).toUpperCase();

  return {
    initials,
    path: url.pathname,
    sessionToken,
    bookies,
    bookiesSelected,
    tipsters,
    userId,
    user: userData
  };
};

export const actions = {
  saveBookies: async ({ url, request, locals }) => {
    const { userId, sessionToken } = locals as MyLocals;
    const formData = await request.formData();
    const bookiesSelected = formData.getAll('bookiesSelected') as string[];

    if (!userId) {
      throw new Error('Invalid user or no bookies selected');
    }

    const response = await fetch(`${url.origin}/api/user?userId=${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionToken}`
      },
      body: JSON.stringify({ bookiesSelected })
    });

    if (!response.ok) {
      throw new Error('Failed to update bookies');
    }

    throw redirect(303, paths.profileConfig);
  },
  createTipster: async ({ request, locals, url }) => {
    const { userId, sessionToken } = locals as MyLocals;
    const formData = await request.formData();
    const price = formData.get('price') as string;
    const tipsterId = formData.get('tipsterId') as string;
    const isEdit = formData.get('isEdit') === 'true';

    const tipsterData = {
      name: formData.get('name'),
      userId,
      ...(price ? { price: parseFloat(price) } : {})
    };

    const response = await fetch(
      `${url.origin}/api/tipsters?userId=${userId}${tipsterId !== 'undefined' ? `&tipsterId=${tipsterId}` : ''}`,
      {
        method: isEdit ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionToken}`
        },
        body: JSON.stringify(tipsterData)
      }
    );

    if (!response.ok) {
      return { error: `Failed ${isEdit ? 'to update' : 'to create'} tipster` };
    }

    throw redirect(303, paths.profileConfig);
  }
} satisfies Actions;
