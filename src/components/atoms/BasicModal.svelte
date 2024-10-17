<script lang="ts">
  import Icon from '@iconify/svelte';

  export let show: boolean;
  export let hasCloseButton: boolean = true;
  export let closeModal: () => void;
</script>

<div
  class={`w-screen h-screen fixed top-0 justify-center items-center z-[150] left-0 bg-modal ${
    show ? 'flex' : 'hidden'
  }`}
>
  <div class="relative bg-neutral0 w-[300px] md:w-[400px] lg:w-[500px] py-8 px-6 rounded-lg">
    {#if hasCloseButton}
      <button type="button" on:click={closeModal} class="absolute right-3 top-3">
        <Icon icon="fa6-solid:xmark" />
      </button>
    {/if}

    <slot />
  </div>
</div>
