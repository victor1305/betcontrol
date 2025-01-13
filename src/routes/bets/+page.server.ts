import { redirect } from '@sveltejs/kit';

import { paths } from '$lib/constants';
import type { Bookie, Tipster, User } from '$lib/dbModelTypes';
import type { MyLocals, BetEvent, BetDefault } from '$lib/types';

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
        odd: (event.odd as number) || null,
        status: event.status as 'won' | 'lost' | 'pending' | 'canceled',
        isLive: event.isLive || false
      });
    });

    const betWithEvents: BetDefault = {
      ...betData,
      event: events,
      trixie: null,
      yankie: null,
      superyankie: null,
      heinz: null,
      superheinz: null,
      goliat: null,
      block: null,
      doubles: null,
      triples: null,
      fours: null,
      fives: null,
      sixes: null,
      sevens: null,
      eights: null
    };

    console.log('BET WITH EVENTS', betWithEvents);
  }
} satisfies Actions;
