<script lang="ts">
  import ProfileConfig from '@/components/organisms/ProfileConfig.svelte';

  import type { PageData } from './$types';
  import type { Bookie, Tipster } from '$lib/dbModelTypes';
  import type { ObjectId } from 'mongodb';

  export let data: PageData;

  const bookies = data.bookies as Bookie[];
  let bookiesSelected = data.bookiesSelected as ObjectId[];
  let tipsters = data.tipsters as Tipster[];
  const userId = data.userId as string;
  const sessionToken = data.sessionToken as string;
</script>

<div>
  <ProfileConfig {...{ bookies, userId, sessionToken }} bind:tipsters bind:bookiesSelected />
</div>
