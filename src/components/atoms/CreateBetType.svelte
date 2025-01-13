<script lang="ts">
  import { t } from '$lib/i18n';

  export let betType: 'simple' | 'multiple' | 'system';
</script>

<p class="text-sm text-neutral200 pb-2">{$t('create-bet-modal-type')}</p>
<div class="flex">
  <button
    class={`mr-5 font-regular text-sm flex flex-col items-center ${betType === 'simple' ? 'text-neutral200' : 'text-neutral50'}`}
    disabled={betType === 'simple'}
    on:click={() => (betType = 'simple')}
    ><span>{$t('create-bet-modal-type-simple')}</span>
    <div
      class={`rounded ${betType === 'simple' ? 'w-[40px] h-[2px] bg-primary100' : 'hidden'}`}
    /></button
  >
  <button
    class={`mr-5 font-regular text-sm flex flex-col items-center ${betType === 'multiple' ? 'text-neutral200' : 'text-neutral50'}`}
    disabled={betType === 'multiple'}
    on:click={() => (betType = 'multiple')}
    ><span>{$t('create-bet-modal-type-multiple')}</span>
    <div
      class={`rounded ${betType === 'multiple' ? 'w-[40px] h-[2px] bg-primary100' : 'hidden'}`}
    /></button
  >
  <button
    class={`font-regular text-sm flex flex-col items-center ${betType === 'system' ? 'text-neutral200' : 'text-neutral50'}`}
    disabled={betType === 'system'}
    on:click={() => (betType = 'system')}
    ><span>{$t('create-bet-modal-type-system')}</span>
    <div
      class={`rounded ${betType === 'system' ? 'w-[40px] h-[2px] bg-primary100' : 'hidden'}`}
    /></button
  >
</div>
