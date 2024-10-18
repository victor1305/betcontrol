<script lang="ts">
  import { t } from '$lib/i18n';

  import Dashboard from '@/components/organisms/Dashboard.svelte';

  let hasBets = false;
</script>

<div class="p-4 lg:p-6 text-neutral200">
  <h1 class="text-neutral150 text-xl">
    {$t('menu-dashboard')}
  </h1>

  <p class="pt-4 text-sm text-neutral150 max-w-[600px]">
    {$t('dashboard-description', { values: { hasBets: hasBets.toString() } })}
  </p>
  <div class="pt-4">
    <Dashboard />
  </div>
</div>
