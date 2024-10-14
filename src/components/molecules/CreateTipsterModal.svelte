<script lang="ts">
  import { t } from '$lib/i18n';
  import Icon from '@iconify/svelte';

  export let show: boolean;

  let name = '' as string;
  let price = null as number | null;

  const closeModal = () => {
    name = '';
    price = null;
    show = false;
  };
</script>

<div
  class={`w-screen h-screen fixed top-0 justify-center items-center z-[150] left-0 bg-modal  ${
    show ? 'flex' : 'hidden'
  }`}
>
  <div class="relative bg-neutral0 w-[300px] py-8 px-6 rounded-lg">
    <button type="button" on:click={closeModal} class="absolute right-3 top-3"
      ><Icon icon="fa6-solid:xmark" /></button
    >
    <h1 class="text-lg text-neutral150 pb-5">
      {$t('create-tipster-modal-title', { values: { isCreate: true } })}
    </h1>
    <form method="POST" action="?/createTipster">
      <div class="flex flex-col mb-4">
        <label class="text-sm text-neutral200" for="name">{$t('create-tipster-modal-name')}</label>
        <input
          class="text-neutral150 mt-2 border border-neutral50 rounded-md py-1.5 px-2.5 focus:outline-primary100"
          type="text"
          id="name"
          name="name"
          bind:value={name}
        />
      </div>
      <div class="flex flex-col mb-6">
        <label class="text-sm text-neutral200" for="price">{$t('create-tipster-modal-price')}</label
        >
        <input
          class="text-neutral150 mt-2 border border-neutral50 rounded-md py-1.5 px-2.5 focus:outline-primary100"
          type="number"
          id="price"
          name="price"
          bind:value={price}
        />
      </div>
      <div class="flex justify-center">
        <button
          disabled={!name.length}
          class="rounded-lg border border-primary100 text-primary100 text-sm py-2 px-3 hover:text-neutral0 hover:bg-primary100 button-primary-transition"
          >{$t('create-tipster-modal-create', { values: { isCreate: true } })}</button
        >
      </div>
    </form>
  </div>
</div>
