<script lang="ts">
  import { betDefault, betSports, statusList } from '$lib/constants';
  import { t } from '$lib/i18n';
  import type { Bookie, Tipster } from '$lib/dbModelTypes';
  import type { BetDefault } from '$lib/types';

  import BetFormMoreOptions from '@/components/atoms/BetFormMoreOptions.svelte';
  import BetFormTipsterOption from '@/components/atoms/BetFormTipsterOption.svelte';
  import FormField from '@/components/atoms/FormField.svelte';
  import FormSelect from '@/components/atoms/FormSelectString.svelte';

  export let betType: 'create' | 'edit' = 'create';
  export let bookies: Bookie[];
  export let tipsters: Tipster[];
  export let isEditBet: boolean = false;
  export let bet: BetDefault;
  export let hasTipster = false;
  export let showError = false;
  export let isDisabled: boolean;
</script>

<form method="POST" action="?/createBet">
  <input class="hidden" id="action" name="action" type="text" value={betType} />
  <div class="flex flex-col pb-4">
    <label class="text-sm text-neutral200" for="bookie">{$t('bet-modal-bookie')}</label>
    <select
      bind:value={bet.bookie}
      id="bookie"
      name="bookie"
      class="text-neutral150 h-[38px] mt-1 border border-neutral50 rounded-md py-1.5 px-2.5 focus:outline-primary100"
    >
      {#each bookies as bookie}
        <option value={bookie._id}>{bookie.name}</option>
      {/each}
    </select>
  </div>
  <div class="flex flex-col pb-5">
    <FormField
      bind:value={bet.date}
      {...{ id: 'date', label: 'bet-modal-date', name: 'date', type: 'date' }}
    />
  </div>
  <hr class="mb-4" />
  <div class="flex flex-col pb-4">
    <FormSelect
      bind:value={bet.sport}
      {...{ id: 'sport', label: 'bet-modal-sport', name: 'sport', formArr: betSports }}
    />
  </div>
  <div class="flex flex-col pb-4">
    <FormField
      bind:value={bet.bet}
      {...{ id: 'bet', label: 'bet-modal-name', name: 'bet', type: 'text' }}
    />
  </div>
  <div class="flex flex-col pb-4">
    <FormField
      bind:value={bet.odd}
      {...{ id: 'odd', label: 'bet-modal-odd', name: 'odd', type: 'text' }}
    />
  </div>
  <div class="flex flex-col pb-4">
    <FormField
      bind:value={bet.amount}
      {...{ id: 'amount', label: 'bet-modal-amount', name: 'amount', type: 'text' }}
    />
  </div>
  <div class="pb-4">
    <BetFormTipsterOption bind:bet bind:hasTipster {...{ tipsters }} />
  </div>
  <div class="flex flex-col pb-4">
    <FormSelect
      bind:value={bet.status}
      {...{ id: 'status', label: 'bet-modal-status', name: 'status', formArr: statusList }}
    />
  </div>
  <hr class="mb-4" />
  <div class="flex flex-col pb-4">
    <BetFormMoreOptions bind:bet />
  </div>
  {#if showError && isDisabled}
    <p class="text-sm text-center text-red-500 mb-5">{$t('bet-modal-error')}</p>
  {/if}
  <div class="mt-5 flex justify-center">
    <button
      type={isDisabled ? 'button' : 'submit'}
      on:click={() => (showError = true)}
      class={`rounded-lg border text-sm py-2 px-3 button-primary-transition 
        ${
          isDisabled
            ? 'border-neutral100 text-neutral100'
            : 'border-primary100 text-primary100 hover:text-neutral0 hover:bg-primary100'
        }`}>{$t('bet-modal-create', { values: { isCreate: !isEditBet } })}</button
    >
  </div>
</form>
