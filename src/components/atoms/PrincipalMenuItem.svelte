<script lang="ts">
  import Icon from '@iconify/svelte';

  import { t } from '$lib/i18n';

  export let isHovering: boolean;
  export let isPrincipalMenuOpen: boolean;
  export let goToPath: (path: string) => void;
  export let pagePath: string;
  export let destinationPath: string;
  export let icon: string;
  export let text: string;
</script>

<li
  class={`mb-1 ${pagePath === destinationPath ? 'text-primary100 bg-primary50' : 'text-neutral100'} lg:hover:text-primary100 lg:hover:bg-primary50`}
>
  <button
    class={`py-1.5 px-2.5 flex items-center w-full ${!isPrincipalMenuOpen && !isHovering ? 'lg: justify-center' : ''}`}
    disabled={pagePath === destinationPath}
    on:click={() => goToPath(destinationPath)}
    ><Icon class={`${isPrincipalMenuOpen || isHovering ? 'mr-3' : ''} text-2xl`} {icon} /><span
      class={!isPrincipalMenuOpen && !isHovering ? 'hidden' : ''}>{$t(text)}</span
    ></button
  >
</li>
