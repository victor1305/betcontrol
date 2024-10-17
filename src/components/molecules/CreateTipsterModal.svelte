<script lang="ts">
  import Icon from '@iconify/svelte';

  import { t } from '$lib/i18n';
  import type { Tipster } from '$lib/dbModelTypes';
  import BasicModal from '../atoms/BasicModal.svelte';

  export let show: boolean;
  export let isEditTipster: boolean;
  export let tipsterToRemoveOrEdit: Tipster | null | undefined = null;

  let name = tipsterToRemoveOrEdit?.name || ('' as string);
  let price = tipsterToRemoveOrEdit?.price || (null as number | null);

  const closeModal = () => {
    name = '';
    price = null;
    show = false;
    isEditTipster = false;
    tipsterToRemoveOrEdit = null;
  };

  $: showError = false;

  $: isDisabled =
    !name.length ||
    (tipsterToRemoveOrEdit?.name === name && tipsterToRemoveOrEdit?.price === price);
</script>

<BasicModal {...{ show, closeModal }}>
  <h1 class="text-lg text-neutral150 pb-5">
    {$t('create-tipster-modal-title', { values: { isCreate: !isEditTipster } })}
  </h1>
  <form method="POST" action="?/createTipster">
    <input type="hidden" name="tipsterId" value={tipsterToRemoveOrEdit?._id} />
    <input type="hidden" name="isEdit" value={isEditTipster} />
    <div class="flex flex-col mb-4">
      <label class="text-sm text-neutral200" for="name">{$t('create-tipster-modal-name')}</label>
      <input
        class="text-neutral150 mt-2 border border-neutral50 rounded-md py-1.5 px-2.5 focus:outline-primary100"
        type="text"
        id="name"
        name="name"
        on:input={() => (showError = false)}
        bind:value={name}
      />
    </div>
    <div class="flex flex-col mb-6">
      <label class="text-sm text-neutral200" for="price">{$t('create-tipster-modal-price')}</label>
      <input
        class="text-neutral150 mt-2 border border-neutral50 rounded-md py-1.5 px-2.5 focus:outline-primary100"
        type="number"
        id="price"
        name="price"
        bind:value={price}
      />
    </div>
    {#if showError && isDisabled}
      <p class="text-sm text-red-500 mb-5">{$t('create-tipster-modal-error')}</p>
    {/if}
    <div class="flex justify-center">
      <button
        type={isDisabled ? 'button' : 'submit'}
        on:click={() => (showError = true)}
        class={`rounded-lg border text-sm py-2 px-3 button-primary-transition 
          ${
            isDisabled
              ? 'border-neutral100 text-neutral100'
              : 'border-primary100 text-primary100 hover:text-neutral0 hover:bg-primary100'
          }`}>{$t('create-tipster-modal-create', { values: { isCreate: !isEditTipster } })}</button
      >
    </div>
  </form>
</BasicModal>
