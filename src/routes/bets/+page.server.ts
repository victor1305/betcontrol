import { redirect } from '@sveltejs/kit';

import { paths } from '$lib/constants';
import type { Bookie, Tipster, User } from '$lib/dbModelTypes';
import type { MyLocals, BetEvent, BetDefault } from '$lib/types';

import type { PageServerLoad, Actions } from './$types';
import { getProfit } from '@/lib/utils';

export const load: PageServerLoad = async ({ url, locals }) => {
  const { userId } = locals as MyLocals;
  const userBookiesResponse = (await fetch(
    `${url.origin}/api/bookies?userId=${userId}&type=user-bookies-selected`
  ).then((res) => res.json())) as { user: User; bookies: Bookie[] };

  const tipstersResponse = (await fetch(`${url.origin}/api/tipsters?userId=${userId}`).then((res) =>
    res.json()
  )) as Tipster[];
  const tipsters = tipstersResponse.sort((a, b) => a.name.localeCompare(b.name));

  //console.log(userBookiesResponse)
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
      amount: parseFloat(formData.get('amount') as string) || null,
      isBonus: formData.get('isBonus') === 'on',
      hasTipster: formData.get('hasTipster') === 'on',
      tipster: formData.get('tipster') as string,
      cashout: formData.get('hasCashout') === 'on',
      cashoutPrice: parseFloat(formData.get('cashoutPrice') as string) || null
    };

    const events: BetEvent[] = [];
    const keys = Array.from(formData.keys()).filter((key) => key.startsWith('event['));

    const groupedEvents: Record<number, Partial<BetEvent>> = {};
    keys.forEach((key) => {
      const match = key.match(/event\[(\d+)]\[(\w+)]/);
      if (match) {
        const [, index, field] = match;
        const eventIndex = parseInt(index, 10);
        if (!groupedEvents[eventIndex]) {
          groupedEvents[eventIndex] = {};
        }
        const value = formData.get(key);
        if (value !== null) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          groupedEvents[eventIndex][field as keyof BetEvent] = value as any;
        } else {
          groupedEvents[eventIndex][field as keyof BetEvent] = undefined;
        }
      }
    });

    Object.values(groupedEvents).forEach((event) => {
      events.push({
        sport: (event.sport as string) || null,
        name: (event.name as string) || null,
        odd: parseFloat(event.odd as string) || null,
        status: event.status as 'won' | 'lost' | 'pending' | 'void',
        isLive: event.isLive || false
      });
    });

    const systemBets = {
      trixie: parseFloat(formData.get('system-trixie') as string) || null,
      yankie: parseFloat(formData.get('system-yankie') as string) || null,
      superyankie: parseFloat(formData.get('system-superyankie') as string) || null,
      heinz: parseFloat(formData.get('system-heinz') as string) || null,
      superheinz: parseFloat(formData.get('system-superheinz') as string) || null,
      goliat: parseFloat(formData.get('system-goliat') as string) || null,
      block: parseFloat(formData.get('system-block') as string) || null,
      doubles: parseFloat(formData.get('system-doubles') as string) || null,
      triples: parseFloat(formData.get('system-triples') as string) || null,
      fours: parseFloat(formData.get('system-fours') as string) || null,
      fives: parseFloat(formData.get('system-fives') as string) || null,
      sixes: parseFloat(formData.get('system-sixes') as string) || null,
      sevens: parseFloat(formData.get('system-sevens') as string) || null,
      eights: parseFloat(formData.get('system-eights') as string) || null,
    };

    const betWithEvents: BetDefault = {
      ...betData,
      ...systemBets,
      systemOptions: ((formData.get('system-options') as string) === 'true') as boolean,
      event: events
    };

    const profit =  getProfit(betWithEvents);

    const betWithProfit = {
      ...betWithEvents,
      profit
    };
    
    const response = await fetch(`${url.origin}/api/bets?userId=${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionToken}`
      },
      body: JSON.stringify(betWithProfit)
    });

    if (!response.ok) {
      return { error: 'Failed to create bet' };
    }

    throw redirect(303, paths.bets);
  }
} satisfies Actions;
