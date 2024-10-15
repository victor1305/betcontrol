<script lang="ts">
  import type { PageData } from './$types';
  import type { User } from '$lib/dbModelTypes';

  import ProfileHeader from '@/components/atoms/ProfileHeader.svelte';
  import ProfileAccount from '@/components/organisms/ProfileAccount.svelte';

  export let data: PageData;

  const user = data.user as User;
  const path = data.path as string;
  const initials = data.initials as string;
</script>

<div class="mx-5 mt-5 mb-8">
  <ProfileHeader {...{ path, user, initials }} />
</div>
<ProfileAccount {...{ user }} />
