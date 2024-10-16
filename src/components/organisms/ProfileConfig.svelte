<script lang="ts">
  import type { ObjectId } from 'mongodb';

  import { t } from '$lib/i18n';
  import type { Bookie, Tipster } from '$lib/dbModelTypes';

  import ConfirmModal from '@/components/atoms/ConfirmModal.svelte';
  import ConfigurateBookies from '@/components/molecules/ConfigurateBookies.svelte';
  import CreateTipsterModal from '@/components/molecules/CreateTipsterModal.svelte';
  import ManageTipsters from '@/components/molecules/ManageTipsters.svelte';

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
    <span class="pr-2">{$t('profile')}</span>
    <span class="border-l border-neutral50 pl-2 text-base">{$t('configuration')}</span>
  </h1>
  <div class="my-5 p-4 rounded-xl border border-cardBorderLight shadow-cardShadow">
    <ConfigurateBookies {...{ bookies, bookiesSelected }} />
  </div>
  <div class="my-5 p-4 rounded-xl border border-cardBorderLight shadow-cardShadow">
    <ManageTipsters bind:showCreateTipsterModal {...{ tipsters, selectTipsterToRemoveOrEdit }} />
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
