import { redirect } from '@sveltejs/kit';

import { paths } from '$lib/constants';
import { checkConfirmEmailPage, checkLoginPage, checkVerifyTokenPage } from '$lib/helpers';
import type { MyLocals } from '$lib/types';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => {
  const myLocals = locals as MyLocals;
  if (
    !myLocals.sessionToken &&
    !checkLoginPage(myLocals.pathname) &&
    !checkConfirmEmailPage(myLocals.pathname) &&
    !checkVerifyTokenPage(myLocals.pathname)
  ) {
    throw redirect(303, `${paths.login}?previous=${myLocals.previousPathname}`);
  }
  if (
    myLocals.sessionToken &&
    (checkLoginPage(myLocals.pathname) ||
      checkVerifyTokenPage(myLocals.pathname) ||
      checkConfirmEmailPage(myLocals.pathname))
  ) {
    throw redirect(307, paths.home);
  }
  const userId = myLocals.userId;
  return { userId };
};
