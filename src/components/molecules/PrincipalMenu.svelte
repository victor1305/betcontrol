<script lang="ts">
  import Icon from '@iconify/svelte';

  import { paths } from '$lib/constants';
  import { t } from '$lib/i18n';
  import PrincipalMenuItem from '../atoms/PrincipalMenuItem.svelte';

  export let isPrincipalMenuOpen: boolean;
  export let pagePath: string;
  export let goToPath: (path: string) => void;

  let isHovering = false;

  const handleMouse = (open: boolean) => {
    if (window.innerWidth >= 1024) {
      isHovering = open;
    }
  };
</script>

<div>
  <aside
    on:mouseenter={() => handleMouse(true)}
    on:mouseleave={() => handleMouse(false)}
    class={`p-3 fixed top-0 bg-neutral0 h-screen transition-transform duration-300 lg:transition-all lg:duration-300  
    ${
      isPrincipalMenuOpen || isHovering
        ? 'translate-x-0 w-[260px] border-r border-cardBorderLight z-50 overflow-y-auto'
        : '-translate-x-[300px] lg:translate-x-0 lg:w-[80px] lg:border-r lg:border-cardBorderLight lg:z-50 lg:overflow-y-auto'
    }`}
  >
    <div
      class={`mt-1 ml-2.5 mb-8 transition-all duration-300 ${isPrincipalMenuOpen || isHovering ? '' : 'lg:hidden'}`}
    >
      <img src="/logo.svg" alt="logo" class="w-[160px] h-[55px]" />
    </div>
    <div
      class={`transition-all duration-300 ${isPrincipalMenuOpen || isHovering ? 'hidden' : 'hidden lg:block lg:flex lg:justify-center lg:mt-4 lg:mb-8'}`}
    >
      <img src="/logo-without-text.png" alt="logo" class="w-[30px] h-[31px]" />
    </div>
    <ul>
      <PrincipalMenuItem
        {...{ isHovering, isPrincipalMenuOpen, goToPath, pagePath, destinationPath: paths.home }}
      />

      <PrincipalMenuItem
        {...{ isHovering, isPrincipalMenuOpen, goToPath, pagePath, destinationPath: paths.bets }}
      />
      <PrincipalMenuItem
        {...{ isHovering, isPrincipalMenuOpen, goToPath, pagePath, destinationPath: paths.bookies }}
      />
      <PrincipalMenuItem
        {...{
          isHovering,
          isPrincipalMenuOpen,
          goToPath,
          pagePath,
          destinationPath: paths.tipsters
        }}
      />
    </ul>
  </aside>

  <button
    class={`lg:hidden fixed inset-0 bg-neutral200 transition-opacity duration-300 z-40 
    ${isPrincipalMenuOpen ? 'opacity-60' : 'opacity-0 pointer-events-none'}`}
    on:click={() => (isPrincipalMenuOpen = false)}
  ></button>
</div>
