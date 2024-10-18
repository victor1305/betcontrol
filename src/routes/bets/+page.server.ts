import { redirect } from '@sveltejs/kit';

import { paths } from '$lib/constants';
import type { Bookie, Tipster, User } from '$lib/dbModelTypes';
import type { MyLocals } from '$lib/types';

import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ url, locals }) => {
  const { userId } = locals as MyLocals;
  const userBookiesResponse = (await fetch(
    `${url.origin}/api/bookies?userId=${userId}&type=user-bookies-selected`
  ).then((res) => res.json())) as { user: User; bookies: Bookie[] };

  const tipstersResponse = (await fetch(`${url.origin}/api/tipsters?userId=${userId}`).then((res) =>
    res.json()
  )) as Tipster[];
  const tipsters = tipstersResponse.sort((a, b) => a.name.localeCompare(b.name));

  return {
    tipsters,
    userBookies: userBookiesResponse.bookies
  };
};

export const actions = {
  createBet: async ({ request, url, locals }) => {
    const { userId, sessionToken } = locals as MyLocals;
    const formData = await request.formData();
    const betData = {
      bookie: formData.get('bookie') as string,
      date: formData.get('date') as string,
      sport: formData.get('sport') as string,
      bet: formData.get('bet') as string,
      odd: formData.get('odd') as string,
      amount: formData.get('amount') as string,
      status: formData.get('status') as string,
      hasTipster: formData.get('hasTipster') === 'on',
      tipster: formData.get('tipster') as string,
      isLive: formData.get('isLive') === 'on',
      isBonus: formData.get('isBonus') === 'on',
      cashout: formData.get('hasCashout') === 'on',
      cashoutPrice: formData.get('cashoutPrice') as string
    };
    console.log(betData);
  }
} satisfies Actions;
