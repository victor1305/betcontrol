<script lang="ts">
  import '@/app.css';
  import { beforeNavigate, afterNavigate } from '$app/navigation';
  import { page } from '$app/stores';

  import { checkConfirmEmailPage, checkLoginPage, checkVerifyTokenPage } from '$lib/helpers';
  import { isLoading } from '$lib/stores/loading';

  import Header from '@/components/molecules/Header.svelte';

  beforeNavigate(() => {
    isLoading.set(true);
  });

  afterNavigate(() => {
    isLoading.set(false);
  });

  const notHeader =
    checkConfirmEmailPage($page.url.pathname) ||
    checkVerifyTokenPage($page.url.pathname) ||
    checkLoginPage($page.url.pathname);

  $: pagePath = $page.url.pathname;
</script>

<div class={`min-h-screen flex flex-col font-themeFont`}>
  {#if !notHeader}
    <Header {...{ pagePath }} />
  {/if}
  <div class="flex-1">
    <slot />
  </div>
  {#if !notHeader}
    <!-- <Footer {...{ userId }} /> -->
  {/if}
</div>
