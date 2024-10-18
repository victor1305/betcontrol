<script lang="ts">
  import { t } from '$lib/i18n';
  import type { Bookie, Tipster } from '$lib/dbModelTypes';

  import CreateBetModal from '@/components/organisms/CreateBetModal.svelte';

  import type { PageData } from './$types';

  export let data: PageData;

  const bookies = data.userBookies as Bookie[];
  const tipsters = data.tipsters as Tipster[];

  let hasBets = false;
  let showCreateBetModal = false;

  const closeModal = () => {
    showCreateBetModal = false;
  };
</script>

<div class="p-4 lg:p-6 text-neutral200">
  <div class="flex justify-between items-center">
    <h1 class="text-neutral150 text-xl">
      {$t('menu-bets')}
    </h1>
    <button
      class="rounded-lg border border-primary100 text-primary100 text-sm py-2 px-3 hover:text-neutral0 hover:bg-primary100 button-primary-transition"
      on:click={() => (showCreateBetModal = true)}>{$t('add-bet')}</button
    >
  </div>
  <p class="pt-4 text-sm text-neutral150 max-w-[600px]">
    {$t('bets-description', { values: { hasBets: hasBets.toString() } })}
  </p>
  <div class="pt-4"></div>
</div>

{#if showCreateBetModal}
  <CreateBetModal {...{ show: showCreateBetModal, closeModal, tipsters, bookies }} />
{/if}
