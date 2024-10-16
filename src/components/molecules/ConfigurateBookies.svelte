<script lang="ts">
  import type { ObjectId } from 'mongodb';

  import { t } from '$lib/i18n';
  import type { Bookie } from '$lib/dbModelTypes';
    import { arraysAreEqual } from '@/lib/utils';

  export let bookies: Bookie[];
  export let bookiesSelected: ObjectId[];

  let bookiesSelectedModified = bookiesSelected;

  $: isBtnDisabled = arraysAreEqual(bookiesSelected, bookiesSelectedModified);
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
              class={`flex items-center text-sm 
              ${
                bookiesSelectedModified.includes(bookie._id) ? 'text-neutral200' : 'text-neutral100'
              }`}
            >
              <input
                class="cursor-pointer accent-primary100 mr-1.5"
                name="bookiesSelected"
                id={`bookiesSelected-${bookie._id}`}
                type="checkbox"
                bind:group={bookiesSelectedModified}
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
          disabled={isBtnDisabled}
          class={`rounded-lg border text-sm py-2 px-3 button-primary-transition 
            ${
              isBtnDisabled
                ? 'border-neutral100 text-neutral100'
                : 'border-primary100 text-primary100 hover:text-neutral0 hover:bg-primary100'
            }`}
          >{$t('save-changes')}
        </button>
      </div>
    </form>
  {/if}
</div>
