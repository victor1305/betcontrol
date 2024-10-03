<script lang="ts">
  import '@/app.css';
  import { page } from '$app/stores';

  const notHeader = /^\/login.*/.test($page.url.pathname);
  $: isProfilePage = $page.url.pathname.startsWith('/profile');
  $: pagePath = $page.url.pathname;
</script>

<div class={`min-h-screen flex flex-col font-themeFont`}>
  {#if !notHeader}
    <!-- <Header
      title={companyName}
      subtitle="Herramienta Smart Data Telco"
      {...{ isProfilePage, pagePath }}
    /> -->
  {/if}
  <div class="flex-1">
    <slot />
  </div>
  {#if !notHeader}
    <!-- <Footer {...{ userId }} /> -->
  {/if}
</div>
