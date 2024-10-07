<script lang="ts">
  import { t } from '$lib/i18n';
  import Login from '@/components/molecules/Login.svelte';
  import Signup from '@/components/molecules/Signup.svelte';

  $: isLogin = true;
</script>

<div class="flex justify-center">
  <img src="/logo.svg" alt="logo" class="w-[300px] h-[300px]" />
</div>

<div class="flex flex-col items-center justify-center login-box">
  <div
    class="min-w-[300px] md:min-w-[400px] max-w-[500px] mx-5 p-5 md:p-8 rounded-xl border border-cardBorderLight shadow-cardShadow"
  >
    <div class="flex justify-center mb-8">
      <button
        class={`mr-3 font-regular text-xl flex flex-col items-center ${isLogin ? 'text-neutral200' : 'text-neutral50'}`}
        disabled={isLogin}
        on:click={() => (isLogin = true)}
        ><span>{$t('login')}</span>
        <div class={`rounded ${isLogin ? 'w-[60px] h-[4px] bg-primary100' : 'hidden'}`} /></button
      >
      <button
        class={`ml-3 font-regular text-xl flex flex-col items-center ${!isLogin ? 'text-neutral200' : 'text-neutral50'}`}
        disabled={!isLogin}
        on:click={() => (isLogin = false)}
        ><span>{$t('sign-up')}</span>
        <div class={`rounded ${!isLogin ? 'w-[60px] h-[4px] bg-primary100' : 'hidden'}`} /></button
      >
    </div>
    {#if isLogin}
      <Login />
    {:else}
      <Signup />
    {/if}
  </div>
</div>
