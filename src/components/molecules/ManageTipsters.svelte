<script lang="ts">
  import type { ObjectId } from 'mongodb';
  import Icon from '@iconify/svelte';

  import { t } from '$lib/i18n';
  import type { Tipster } from '$lib/dbModelTypes';

  export let tipsters: Tipster[];
  export let showCreateTipsterModal: boolean;
  export let selectTipsterToRemoveOrEdit: (id: ObjectId | undefined, type: 'remove' | 'edit') => void;
</script>

<h4 class="text-base">{$t('select-tipster')}</h4>
<div class="mt-2">
  {#if tipsters.length > 0}
    <p class="text-sm text-neutral150">{$t('select-tipsters-description')}</p>
    <div class="mt-4 mb-8">
      {#each tipsters as tipster}
        <div>
          <p class="text-sm flex items-center">
            <span>- {tipster.name}</span>
            <button
              class="ml-2 text-base"
              type="button"
              on:click={() => selectTipsterToRemoveOrEdit(tipster._id, 'edit')}
              ><Icon icon="mage:edit" color="#923EB9" /></button
            >
            <button
              class="ml-1.5 text-base"
              type="button"
              on:click={() => selectTipsterToRemoveOrEdit(tipster._id, 'remove')}
              ><Icon icon="line-md:remove" color="red" /></button
            >
          </p>
        </div>
      {/each}
    </div>
  {:else}
    <p class="text-sm text-neutral150">{$t('select-tipsters-empty')}</p>
  {/if}
</div>
<div class="flex justify-center mt-8">
  <button
    type="button"
    on:click={() => (showCreateTipsterModal = true)}
    class="rounded-lg border border-primary100 text-primary100 text-sm py-2 px-3 hover:text-neutral0 hover:bg-primary100 button-primary-transition"
    >{$t('add-tipster')}</button
  >
</div>
