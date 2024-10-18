<script lang="ts">
  import Icon from '@iconify/svelte';

  import { t } from '$lib/i18n';
  import type { BetDefault } from '$lib/types';

  import FormField from '@/components/atoms/FormField.svelte';

  export let bet: BetDefault;

  let showMoreOptions = false;
</script>

<div class="text-sm text-neutral200">
  <button
    class="flex items-center"
    type="button"
    on:click={() => (showMoreOptions = !showMoreOptions)}
  >
    <span class="mr-2">{$t('bet-modal-more-options')}</span>
    <span class="text-primary100 text-xl">
      <Icon icon={!showMoreOptions ? 'oui:arrow-down' : 'oui:arrow-up'} />
    </span>
  </button>
  {#if showMoreOptions}
    <div class="mt-4">
      <input
        id="hasCashout"
        name="hasCashout"
        type="checkbox"
        bind:checked={bet.cashout}
        class="cursor-pointer accent-primary100 mr-1.5"
      />
      <label class="text-sm text-neutral200" for="hasCashout">{$t('bet-modal-has-cashout')}</label>
      {#if bet.cashout}
        <div class="flex flex-col mt-3">
          <FormField
            bind:value={bet.cashoutPrice}
            {...{
              id: 'cashoutPrice',
              label: 'bet-modal-cashout',
              name: 'cashoutPrice',
              type: 'text'
            }}
          />
        </div>
      {/if}
    </div>
    <div class="mt-4">
      <input
        id="isLive"
        name="isLive"
        type="checkbox"
        bind:checked={bet.isLive}
        class="cursor-pointer accent-primary100 mr-1.5"
      />
      <label class="text-sm text-neutral200" for="isLive">{$t('bet-modal-isLive')}</label>
    </div>
    <div class="mt-4">
      <input
        id="isBonus"
        name="isBonus"
        type="checkbox"
        bind:checked={bet.isBonus}
        class="cursor-pointer accent-primary100 mr-1.5"
      />
      <label class="text-sm text-neutral200" for="isBonus">{$t('bet-modal-isBonus')}</label>
    </div>
  {/if}
</div>
