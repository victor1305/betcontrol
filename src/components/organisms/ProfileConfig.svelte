<script lang="ts">
  import { t } from '$lib/i18n';
</script>

<div class="p-4 lg:p-6 text-neutral200">
  <h1 class="text-neutral150 text-xl">
    <span class="pr-2">{$t('profile')}</span><span class="border-l border-neutral50 pl-2 text-base"
      >{$t('configuration')}</span
    >
  </h1>
  <div class="my-5 p-4 rounded-xl border border-cardBorderLight shadow-cardShadow">
    <h4 class="text-base">{$t('select-bookies')}</h4>
    <div></div>
  </div>
  <div class="my-5 p-4 rounded-xl border border-cardBorderLight shadow-cardShadow">
    <div class="flex justify-between items-center">
      <h4>{$t('select-tipster')}</h4>
      <button
        class="rounded-lg border border-primary100 text-primary100 py-2 px-3 hover:text-neutral0 hover:bg-primary100 button-primary-transition"
        >{$t('add-tipster')}</button
      >
    </div>
    <div></div>
  </div>
</div>
