import type { MyLocals } from '$lib/types';

import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ url, locals }) => {
  const { user } = locals as MyLocals;
  //const userData = await fetch(`${url.origin}/api/user`).then((res) => res.json());
  // const bookiesList = await fetch('/api/bookies').then((res) => res.json());
  // const tipsterList = await fetch('/api/tipsters').then((res) => res.json());

  return {
    path: url.pathname,
    user
  };
};

export const actions = {} satisfies Actions;
