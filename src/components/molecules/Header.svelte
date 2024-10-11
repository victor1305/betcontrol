<script lang="ts">
  import Icon from '@iconify/svelte';

  import { goto } from '$app/navigation';

  import PrincipalMenu from '@/components/atoms/PrincipalMenu.svelte';
  import UserMenu from '@/components/atoms/UserMenu.svelte';

  export let pagePath: string;
  export let isPrincipalMenuOpen: boolean;

  let isProfileMenuOpen = false;

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
        location.reload();
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const goToPath = async (path: string) => {
    isProfileMenuOpen = false;
    isPrincipalMenuOpen = false;
    await goto(path);
  };

  const handleMenuClose = () => {
    isProfileMenuOpen = false;
    document.body.removeEventListener('click', handleMenuClose);
  };

  const handleMenuOpen = () => {
    if (isProfileMenuOpen) {
      handleMenuClose();
    } else {
      isProfileMenuOpen = true;
      document.body.addEventListener('click', handleMenuClose);
    }
  };

  const handleMenuPageClose = () => {
    isPrincipalMenuOpen = false;
    document.body.removeEventListener('click', handleMenuPageClose);
  };

  const handleMenuPageOpen = () => {
    isPrincipalMenuOpen = !isPrincipalMenuOpen;
  };
</script>

<div
  class={`${isPrincipalMenuOpen ? 'lg:ml-[260px] lg:header-width-max' : 'lg:ml-[80px] lg:header-width-min'} 
    transition-all duration-300 h-[65px] bg-secondary0 flex justify-between items-center px-5 text-primary100`}
>
  <button
    on:click|stopPropagation={handleMenuPageOpen}
    class="text-neutral150 relative text-xl cursor-pointer"><Icon icon="fa6-solid:bars" /></button
  >
  <button
    on:click|stopPropagation={handleMenuOpen}
    class="text-neutral150 relative text-xl cursor-pointer"><Icon icon="fa6-solid:user" /></button
  >
</div>

{#if isProfileMenuOpen}
  <UserMenu {...{ logout, goToPath, pagePath }} />
{/if}

<PrincipalMenu bind:isPrincipalMenuOpen {...{ goToPath, pagePath }} />
