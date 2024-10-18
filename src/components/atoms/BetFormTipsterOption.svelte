<script lang="ts">
  import { t } from '$lib/i18n';
  import type { Tipster } from '$lib/dbModelTypes';
  import type { BetDefault } from '$lib/types';

  export let tipsters: Tipster[];
  export let bet: BetDefault;
  export let hasTipster: boolean = false;
</script>

<div>
  <input
    id="hasTipster"
    name="hasTipster"
    type="checkbox"
    bind:checked={hasTipster}
    class="cursor-pointer accent-primary100 mr-1.5"
  />
  <label class="text-sm text-neutral200" for="hasTipster">{$t('bet-modal-has-tipster')}</label>
  {#if hasTipster}
    <div class="flex flex-col mt-3">
      <label class="text-sm text-neutral200" for="tipster">{$t('bet-modal-tipster')}</label>
      <select
        bind:value={bet.tipster}
        name="tipster"
        id="tipster"
        class="text-neutral150 mt-2 border border-neutral50 rounded-md py-1.5 px-2.5 focus:outline-primary100"
      >
        {#each tipsters as tipster}
          <option value={tipster._id}>{tipster.name}</option>
        {/each}
      </select>
    </div>
  {/if}
</div>
