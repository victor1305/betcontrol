<script lang="ts">
  import Icon from '@iconify/svelte';
  import { t } from 'svelte-i18n';

  import { paths } from '$lib/constants';

  export let logout: () => void;
  export let pagePath: string;
  export let goToPath: (path: string) => void;
</script>

<div
  class="absolute border bg-neutral0 w-fit right-2 top-[55px] z-50 p-4 border-cardBorderLight shadow-cardShadow rounded-lg"
>
  <ul class="text-neutral200 text-sm">
    <li class="pb-3">
      <button
        disabled={pagePath === paths.profile}
        class={`${pagePath === paths.profile ? 'text-primary100 underline underline-offset-2' : ''} hover:text-primary100 hover:underline hover:underline-offset-2`}
        on:click={() => goToPath(paths.profile)}>{$t('my-account')}</button
      >
    </li>
    <li class="pb-14">
      <button
        disabled={pagePath === paths.profileConfig}
        class={`${pagePath === paths.profileConfig ? 'text-primary100 underline underline-offset-2' : ''} hover:text-primary100 hover:underline hover:underline-offset-2`}
        on:click={() => goToPath(paths.profileConfig)}>{$t('configuration')}</button
      >
    </li>
    <hr />
    <li class="pt-2">
      <button
        class="flex items-center hover:text-primary100 hover:underline hover:underline-offset-2"
        on:click={logout}
        ><span>{$t('logout')}</span>
        <Icon class="ml-6" icon="fa6-solid:right-from-bracket" /></button
      >
    </li>
  </ul>
</div>
