<script lang="ts">
  import { t } from '$lib/i18n';

  export let id: string;
  export let label: string;
  export let name: string;
  export let formArr: string[];
  export let value: string | null;
</script>

<label class="text-sm text-neutral200" for={id}>{$t(label)}</label>
<select
  bind:value
  {id}
  {name}
  class="text-neutral150 h-[38px] mt-1 border border-neutral50 rounded-md py-1.5 px-2.5 focus:outline-primary100"
>
  {#each formArr as item}
    <option value={item}>{$t(item)}</option>
  {/each}
</select>
