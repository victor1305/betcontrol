<script lang="ts">
  import type { ObjectId } from 'mongodb';
  
  import { t } from '$lib/i18n';
  import type { Bookie } from '$lib/dbModelTypes';

  export let bookies: Bookie[];
  export let bookiesSelected: ObjectId[];
</script>

<h4 class="text-base">{$t('select-bookies')}</h4>
<div class="mt-2">
  <p class="text-sm text-neutral150">{$t('select-bookies-description')}</p>
  {#if bookies.length > 0}
    <form method="POST" action="?/saveBookies">
      <div class="mt-4 grid grid-cols-[repeat(auto-fill,minmax(125px,1fr))] gap-y-1 gap-x-8 mb-8">
        {#each bookies as bookie}
          {#if bookie._id}
            <div
              class={`flex items-center text-sm ${bookiesSelected.includes(bookie._id) ? 'text-neutral200' : 'text-neutral100'}`}
            >
              <input
                class="cursor-pointer accent-primary100 mr-1.5"
                name="bookiesSelected"
                id={`bookiesSelected-${bookie._id}`}
                type="checkbox"
                bind:group={bookiesSelected}
                on:click|stopPropagation={() => {}}
                value={bookie._id}
              />
              <label for={`bookiesSelected-${bookie._id}`}>{bookie.name}</label>
            </div>
          {/if}
        {/each}
      </div>
      <div class="flex justify-center items-center">
        <button
          class="rounded-lg border border-primary100 text-primary100 text-sm py-2 px-3 hover:text-neutral0 hover:bg-primary100 button-primary-transition"
          >{$t('save-changes')}</button
        >
      </div>
    </form>
  {/if}
</div>
