<script lang="ts">
  import Icon from '@iconify/svelte';
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';

  export let isProfilePage: boolean;
  export let pagePath: string;

  let isLoading = false;
  let isMenuOpen = false;
  let isMenuPageOpen = false;

  const logout = async () => {
    await fetch('/api/logout', {
      method: 'POST'
    });

    location.reload();
  };

  const goToProfilePath = async (path: string) => {
    isLoading = true;
    isMenuOpen = false;
    await goto(path);
    isLoading = false;
  };

  const handleMenuOpen = () => {
    if (isMenuOpen) {
      handleMenuClose();
    } else {
      isMenuOpen = true;
      document.body.addEventListener('click', handleMenuClose);
    }
  };

  const handleMenuClose = () => {
    isMenuOpen = false;
    document.body.removeEventListener('click', handleMenuClose);
  };

  const handleMenuPageOpen = () => {
    if (isMenuPageOpen) {
      handleMenuPageClose();
    } else {
      isMenuPageOpen = true;
      document.body.addEventListener('click', handleMenuPageClose);
    }
  };

  const handleMenuPageClose = () => {
    isMenuPageOpen = false;
    document.body.removeEventListener('click', handleMenuPageClose);
  };
</script>

<div class="h-[65px] w-full bg-secondary0 flex justify-between items-center px-5 text-primary100">
  <div class="flex items-center">
    <button on:click|stopPropagation={handleMenuPageOpen} class="text-neutral150 relative text-xl cursor-pointer"
      ><Icon icon="fa6-solid:bars" /></button
    >
    <h1 class="pl-4 text-3xl">
      <button on:click={() => goToProfilePath('/')}>BETCONTROL</button>
    </h1>
  </div>
  <button on:click|stopPropagation={handleMenuOpen} class="text-neutral150 relative text-xl cursor-pointer"
    ><Icon icon="fa6-solid:user" /></button
  >
</div>
