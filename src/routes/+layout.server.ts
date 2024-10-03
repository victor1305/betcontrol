//import { redirect } from '@sveltejs/kit';

import type { MyLocals } from '$lib/types';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => {
  // if (
  //   !(locals as MyLocals).sessionToken &&
  //   !checkLoginPage((locals as MyLocals).pathname)
  // ) {
  //   redirect(307, `/login?previous=${(locals as MyLocals).previousPathname}`);
  // }
  // if (
  //   (locals as MyLocals).sessionToken &&
  //   checkLoginPage((locals as MyLocals).pathname)
  // ) {
  //   redirect(307, '/');
  // }
  const userId = (locals as MyLocals).user;
  return { userId };
};
