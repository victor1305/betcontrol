import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const token = url.searchParams.get('token');

  const tokenVerification = await fetch(`${url.origin}/api/auth?token=${token}`);

  console.log(tokenVerification);
};
