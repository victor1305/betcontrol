<script lang="ts">
  import Icon from '@iconify/svelte';

  import { goto } from '$app/navigation';

  import { appName, paths } from '$lib/constants';

  import UserMenu from '@/components/atoms/UserMenu.svelte';

  export let pagePath: string;

  let isUserMenuOpen = false;
  let isMenuPageOpen = false;

  const logout = async () => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'logout' })
      });
      if (response.ok) {
        await goto(paths.login);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const goToPath = async (path: string) => {
    isUserMenuOpen = false;
    isMenuPageOpen = false;
    await goto(path);
  };

  const handleMenuOpen = () => {
    if (isUserMenuOpen) {
      handleMenuClose();
    } else {
      isUserMenuOpen = true;
      document.body.addEventListener('click', handleMenuClose);
    }
  };

  const handleMenuClose = () => {
    isUserMenuOpen = false;
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
    <button
      on:click|stopPropagation={handleMenuPageOpen}
      class="text-neutral150 relative text-xl cursor-pointer"><Icon icon="fa6-solid:bars" /></button
    >
    <h1 class="pl-4 text-3xl">
      <button on:click={() => goToPath(paths.home)}>{appName}</button>
    </h1>
  </div>
  <button
    on:click|stopPropagation={handleMenuOpen}
    class="text-neutral150 relative text-xl cursor-pointer"><Icon icon="fa6-solid:user" /></button
  >
</div>

{#if isUserMenuOpen}
  <UserMenu {...{ logout, goToPath, pagePath }} />
{/if}
