<script lang="ts">
  import ProfileHeader from '@/components/atoms/ProfileHeader.svelte';
  import ProfileConfig from '@/components/organisms/ProfileConfig.svelte';

  import type { PageData } from './$types';
  import type { Bookie, Tipster, User } from '$lib/dbModelTypes';
  import type { ObjectId } from 'mongodb';

  export let data: PageData;

  const bookies = data.bookies as Bookie[];
  const bookiesSelected = data.bookiesSelected as ObjectId[];
  let tipsters = data.tipsters as Tipster[];
  const userId = data.userId as string;
  const user = data.user as User;
  const sessionToken = data.sessionToken as string;
  const path = data.path as string;
  const initials = data.initials as string;
</script>

<div class="mx-5 mt-5 mb-8">
  <ProfileHeader {...{ path, user, initials }} />
</div>

<ProfileConfig {...{ bookies, userId, sessionToken, bookiesSelected }} bind:tipsters />
