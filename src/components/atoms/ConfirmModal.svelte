<script lang="ts">
  import Icon from '@iconify/svelte';

  export let show: boolean;
  export let modalWidth: string = '300px';
  export let modalTitle: string = '';
  export let modalText: string = '';
  export let modalConfirmText: string = '';
  export let modalCancelText: string = '';
  export let onConfirm: (() => void) | null = null;;
  export let onCancel: (() => void) | null = null;;

  const closeModal = () => {
    show = false;
  };
</script>

<div
  class={`w-screen h-screen fixed top-0 justify-center items-center z-[150] left-0 bg-modal  ${
    show ? 'flex' : 'hidden'
  }`}
>
  <div class="relative bg-neutral0 py-8 px-6 rounded-lg" style={`width: ${modalWidth};`}>
    <button type="button" on:click={closeModal} class="absolute right-3 top-3"
      ><Icon icon="fa6-solid:xmark" /></button
    >
    {#if modalTitle}
      <h1 class="text-lg text-neutral150 pb-5">{modalTitle}</h1>
    {/if}
    {#if modalText}
      <p class="text-sm text-neutral200">{modalText}</p>
    {/if}
    <div class={`flex justify-center mt-8`}>
      {#if modalCancelText && onCancel}
        <button
          type="button"
          on:click={onCancel}
          class="mr-10 rounded-lg border border-neutral100 text-neutral100 text-sm py-2 px-3 hover:text-neutral0 hover:bg-neutral100 button-primary-transition"
          >{modalCancelText}</button
        >
      {/if}
      {#if modalConfirmText && onConfirm}
        <button
          type="button"
          on:click={onConfirm}
          class="rounded-lg border border-primary100 text-primary100 text-sm py-2 px-3 hover:text-neutral0 hover:bg-primary100 button-primary-transition"
          >{modalConfirmText}</button
        >
      {/if}
    </div>
  </div>
</div>
