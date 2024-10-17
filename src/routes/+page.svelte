<script lang="ts">
  import { t } from '$lib/i18n';
  import Dashboard from '@/components/organisms/Dashboard.svelte';

  let hasBets = false;
</script>

<div class="p-4 lg:p-6 text-neutral200">
  <div class="flex justify-between items-center">
    <h1 class="text-neutral150 text-xl">
      {$t('menu-dashboard')}
    </h1>
    <button
      class="rounded-lg border border-primary100 text-primary100 text-sm py-2 px-3 hover:text-neutral0 hover:bg-primary100 button-primary-transition"
      >{$t('add-bet')}</button
    >
  </div>
  <p class="pt-4 text-sm text-neutral150">
    {$t('dashboard-description', { values: { hasBets: hasBets.toString() } })}
  </p>
  <div class="pt-4">
    <Dashboard />
  </div>
</div>
