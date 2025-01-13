<script lang="ts">
  import Icon from '@iconify/svelte';

  import { t } from '$lib/i18n';

  import { betSports, statusList } from '$lib/constants';
  import type { BetDefault } from '@/lib/types';

  import FormField from '@/components/atoms/FormField.svelte';
  import FormSelect from '@/components/atoms/FormSelectString.svelte';

  export let betEvent: BetDefault['event'];

  const addEvent = () => {
    betEvent = [
      ...betEvent,
      { sport: null, name: null, odd: null, status: 'pending', isLive: false }
    ];
  };

  const removeEvent = (index: number) => {
    betEvent = betEvent.filter((_, i) => i !== index);
  };
</script>

<div>
  {#each betEvent as event, index}
    {#if betEvent.length > 1}
      <div class="flex justify-between items-baseline">
        <p class="text-sm text-primary100 font-semibold pb-3">
          {$t('bet-modal-event')}
          {betEvent.indexOf(event) + 1}
        </p>
        <button
          class="ml-1.5 text-base"
          type="button"
          on:click={() => removeEvent(betEvent.indexOf(event))}
          ><Icon icon="line-md:remove" color="red" /></button
        >
      </div>
    {/if}
    <div class="flex flex-col pb-4">
      <FormSelect
        bind:value={event.sport}
        {...{
          id: `sport-${betEvent.indexOf(event)}`,
          label: 'bet-modal-sport',
          name: `event[${index}][sport]`,
          formArr: betSports
        }}
      />
    </div>
    <div class="flex flex-col pb-4">
      <FormField
        bind:value={event.name}
        {...{
          id: `name-${betEvent.indexOf(event)}`,
          label: 'bet-modal-name',
          name: `event[${index}][name]`,
          type: 'text'
        }}
      />
    </div>
    <div class="flex flex-col pb-4">
      <FormField
        bind:value={event.odd}
        {...{
          id: `odd-${betEvent.indexOf(event)}`,
          label: 'bet-modal-odd',
          name: `event[${index}][odd]`,
          type: 'number'
        }}
      />
    </div>
    <div class="flex flex-col pb-4">
      <FormSelect
        bind:value={event.status}
        {...{
          id: `status-${betEvent.indexOf(event)}`,
          label: 'bet-modal-status',
          name: `event[${index}][status]`,
          formArr: statusList
        }}
      />
    </div>
    {#if betEvent.length > 1 && betEvent.indexOf(event) + 1 !== betEvent.length}
      <hr class="mb-4" />
    {/if}
  {/each}
  <div class="flex pb-2">
    <button
      on:click={addEvent}
      type="button"
      class="flex items-center border-primary100 text-primary100 text-sm"
      ><span class="font-semibold">{$t('bet-modal-add-event')}</span><span class="ml-1"
        ><Icon icon="mdi:swiss-cross" /></span
      ></button
    >
  </div>
</div>
