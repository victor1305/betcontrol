<script lang="ts">
  import { t } from '$lib/i18n';

  export let id: string;
  export let label: string;
  export let name: string;
  export let type: 'text' | 'date' = 'text';
  export let value: string | null;
</script>

<label class="text-sm text-neutral200" for={id}>{$t(label)}</label>
{#if type === 'date'}
  <input
    class="text-neutral150 mt-1 h-[38px] border border-neutral50 rounded-md py-1.5 px-2.5 focus:outline-primary100"
    {id}
    {name}
    type="date"
    bind:value
  />
{:else}
  <input
    class="text-neutral150 mt-1 border border-neutral50 rounded-md py-1.5 px-2.5 focus:outline-primary100"
    {id}
    {name}
    type="text"
    bind:value
  />
{/if}
