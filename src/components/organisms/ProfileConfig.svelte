<script lang="ts">
  import type { ObjectId } from 'mongodb';
  import Icon from '@iconify/svelte';

  import { t } from '$lib/i18n';
  import type { Bookie, Tipster } from '$lib/dbModelTypes';

  import ConfirmModal from '@/components/atoms/ConfirmModal.svelte';
  import CreateTipsterModal from '@/components/molecules/CreateTipsterModal.svelte';

  export let bookies: Bookie[];
  export let tipsters: Tipster[];
  export let bookiesSelected: ObjectId[];
  export let userId: string;
  export let sessionToken: string;

  let showCreateTipsterModal = false;
  let showConfirmModal = false;
  let isEditTipster = false;
  let tipsterToRemoveOrEdit: Tipster | null | undefined = null;

  const selectTipsterToRemoveOrEdit = (id: ObjectId | undefined, type: 'remove' | 'edit') => {
    tipsterToRemoveOrEdit = tipsters.find((tipster) => tipster._id === id);

    if (type === 'remove') {
      showConfirmModal = true;
    } else {
      isEditTipster = true;
      showCreateTipsterModal = true;
    }
  };

  // TODO: EDIT TIPSTER

  const removeTipster = async () => {
    if (!tipsterToRemoveOrEdit) {
      return;
    }
    showConfirmModal = false;

    try {
      const response = await fetch(
        `/api/tipsters?tipsterId=${tipsterToRemoveOrEdit._id}&userId=${userId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionToken}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to remove tipster');
      }
      tipsters = tipsters.filter((tipster) => tipster._id !== tipsterToRemoveOrEdit?._id);
      tipsterToRemoveOrEdit = null;
    } catch (error) {
      console.error('Error removing tipster:', error);
    }
  };
</script>

<div class="p-4 lg:p-6 text-neutral200">
  <h1 class="text-neutral150 text-xl">
    <span class="pr-2">{$t('profile')}</span><span class="border-l border-neutral50 pl-2 text-base"
      >{$t('configuration')}</span
    >
  </h1>
  <div class="my-5 p-4 rounded-xl border border-cardBorderLight shadow-cardShadow">
    <h4 class="text-base">{$t('select-bookies')}</h4>
    <div class="mt-2">
      <p class="text-sm text-neutral150">{$t('select-bookies-description')}</p>
      {#if bookies.length > 0}
        <form method="POST" action="?/saveBookies">
          <div
            class="mt-4 grid grid-cols-[repeat(auto-fill,minmax(125px,1fr))] gap-y-1 gap-x-8 mb-8"
          >
            {#each bookies as bookie}
              {#if bookie._id}
                <div
                  class={`flex items-center text-sm ${bookiesSelected.includes(bookie._id) ? 'text-neutral200' : 'text-neutral100'}`}
                >
                  <input
                    class="cursor-pointer accent-primary100 mr-1.5"
                    name="bookiesSelected"
                    id={`bookiesSelected-${bookie._id}`}
                    type="checkbox"
                    bind:group={bookiesSelected}
                    on:click|stopPropagation={() => {}}
                    value={bookie._id}
                  />
                  <label for={`bookiesSelected-${bookie._id}`}>{bookie.name}</label>
                </div>
              {/if}
            {/each}
          </div>
          <div class="flex justify-center items-center">
            <button
              class="rounded-lg border border-primary100 text-primary100 text-sm py-2 px-3 hover:text-neutral0 hover:bg-primary100 button-primary-transition"
              >{$t('save-changes')}</button
            >
          </div>
        </form>
      {/if}
    </div>
  </div>
  <div class="my-5 p-4 rounded-xl border border-cardBorderLight shadow-cardShadow">
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
  </div>
</div>

{#if showCreateTipsterModal}
  <CreateTipsterModal
    bind:show={showCreateTipsterModal}
    bind:isEditTipster
    bind:tipsterToRemoveOrEdit
  />
{/if}

{#if showConfirmModal}
  <ConfirmModal
    bind:show={showConfirmModal}
    modalTitle={$t('remove-tipster-title')}
    modalText={$t('remove-tipster-text', { values: { name: tipsterToRemoveOrEdit?.name } })}
    modalConfirmText={$t('remove-tipster-confirm')}
    modalCancelText={$t('remove-tipster-cancel')}
    onConfirm={removeTipster}
    onCancel={() => (showConfirmModal = false)}
  />
{/if}
