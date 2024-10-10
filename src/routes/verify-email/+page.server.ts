import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { paths } from '$lib/constants';

export const load: PageServerLoad = async ({ url }) => {
  const token = url.searchParams.get('token');

  await fetch(`${url.origin}/api/auth?token=${token}`);

  throw redirect(303, paths.profile);
};
