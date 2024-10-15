<script lang="ts">
  import { goto } from '$app/navigation';

  import { t } from '$lib/i18n';
  import type { User } from '$lib/dbModelTypes';
  import { paths } from '@/lib/constants';

  export let path: string;
  export let user: User;
  export let initials: string;
</script>

<div class="flex items-center">
  <div class="w-16 h-16 md:w-24 md:h-24 rounded-full bg-primary100 flex items-center justify-center">
    <span class="text-4xl md:text-5xl text-neutral0">{initials}</span>
  </div>
  <div class="pl-3 md:pl-5 text-sm md:text-base">
    {#if user.name}
      <p>{`${user.name} ${user.lastname || ''}`}</p>
    {/if}
    <p>{user.email}</p>
    <p class="text-sm text-neutral150">{$t('profile-user', { values: { userType: user.role } })}</p>
  </div>
</div>
<div class="mt-8 max-w-[500px] border-b border-cardBorderLight">
  <ul class="flex">
    <li
      class={`text-sm text-neutral150 mr-8 ${
        path === paths.profile ? 'border-b-2 border-primary100' : ''
      }`}
    >
      <button disabled={path === paths.profile} on:click={() => goto(paths.profile)}
        >{$t('profile-account')}</button
      >
    </li>
    <li
      class={`text-sm text-neutral150 ${
        path === paths.profileConfig ? 'border-b-2 border-primary100' : ''
      }`}
    >
      <button disabled={path === paths.profileConfig} on:click={() => goto(paths.profileConfig)}
        >{$t('profile-configuration')}</button
      >
    </li>
  </ul>
</div>
