<script lang="ts">
  import Icon from '@iconify/svelte';
  import { t } from '$lib/i18n';
  import type { BetDefault, SystemOptionField } from '$lib/types';
  import FormField from '@/components/atoms/FormField.svelte';

  export let bet: BetDefault;

  let showSystemOptions = false;

  const systemOptions: { length: number; field: SystemOptionField; label: string }[] = [
    { length: 3, field: 'trixie', label: 'system-trixie' },
    { length: 4, field: 'yankie', label: 'system-yankie' },
    { length: 5, field: 'superyankie', label: 'system-superyankie' },
    { length: 6, field: 'heinz', label: 'system-heinz' },
    { length: 7, field: 'superheinz', label: 'system-superheinz' },
    { length: 8, field: 'goliat', label: 'system-goliat' },
    { length: 9, field: 'block', label: 'system-block' }
  ];

  const multipleOptions: { minLength: number; field: SystemOptionField; label: string }[] = [
    { minLength: 3, field: 'doubles', label: 'system-doubles' },
    { minLength: 4, field: 'triples', label: 'system-triples' },
    { minLength: 5, field: 'fours', label: 'system-fours' },
    { minLength: 6, field: 'fives', label: 'system-fives' },
    { minLength: 7, field: 'sixes', label: 'system-sixes' },
    { minLength: 8, field: 'sevens', label: 'system-sevens' },
    { minLength: 9, field: 'eights', label: 'system-eights' }
  ];
</script>

<div class="text-sm text-neutral200">
  <button
    class="flex items-center"
    type="button"
    on:click={() => (showSystemOptions = !showSystemOptions)}
  >
    <span class="mr-2">{$t('bet-modal-system-options')}</span>
    <span class="text-primary100 text-xl">
      <Icon icon={!showSystemOptions ? 'oui:arrow-down' : 'oui:arrow-up'} />
    </span>
  </button>

  {#if showSystemOptions}
    <input type="hidden" name="system-options" value={showSystemOptions} />
    <div class="mt-4">
      {#each multipleOptions as option}
        {#if bet.event.length >= option.minLength}
          <div class="flex flex-col pb-4">
            <FormField
              bind:value={bet[option.field]}
              {...{
                id: `system-${option.field}`,
                label: option.label,
                name: `system-${option.field}`,
                type: 'number'
              }}
            />
          </div>
        {/if}
      {/each}

      {#each systemOptions as option}
        {#if bet.event.length === option.length}
          <div class="flex flex-col pb-4">
            <FormField
              bind:value={bet[option.field]}
              {...{
                id: `system-${option.field}`,
                label: option.label,
                name: `system-${option.field}`,
                type: 'number'
              }}
            />
          </div>
        {/if}
      {/each}
    </div>
  {/if}
</div>
