<script lang="ts">
  import { paths } from '@/lib/constants';
  import Icon from '@iconify/svelte';

  export let isPrincipalMenuOpen: boolean;
  export let pagePath: string;
  let isHovering = false;

  const handleMouseEnter = () => {
    isHovering = true;
  };

  const handleMouseLeave = () => {
    isHovering = false;
  };
</script>

<div>
  <aside
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    class={`p-3 fixed top-0 bg-neutral0 h-screen transition-transform duration-300 lg:transition-all lg:duration-300  
    ${
      isPrincipalMenuOpen || isHovering
        ? 'translate-x-0 w-[260px] border-r border-cardBorderLight z-50 overflow-y-auto'
        : '-translate-x-[300px] lg:translate-x-0 lg:w-[80px] lg:border-r lg:border-cardBorderLight lg:z-50 lg:overflow-y-auto'
    }`}
  >
    <div class={`mt-1 ml-2.5 mb-8 ${isPrincipalMenuOpen || isHovering ? '' : 'lg:hidden'}`}>
      <img src="/logo.svg" alt="logo" class="w-[160px] h-[55px]" />
    </div>
    <div
      class={`${isPrincipalMenuOpen || isHovering ? 'hidden' : 'hidden lg:block lg:flex lg:justify-center lg:mt-4 lg:mb-8'}`}
    >
      <img src="/logo-without-text.png" alt="logo" class="w-[30px] h-[31px]" />
    </div>
    <ul>
      <li
        class={`mb-1 ${pagePath === paths.home ? 'text-primary100 bg-primary50' : 'text-neutral100'} hover:text-primary100 hover:bg-primary50`}
      >
        <button
          class={`py-1.5 px-2.5 flex items-center w-full ${!isPrincipalMenuOpen && !isHovering ? 'lg: justify-center' : ''}`}
          disabled={pagePath === paths.home}
          ><Icon
            class={`${isPrincipalMenuOpen || isHovering ? 'mr-3' : ''} text-2xl`}
            icon="ph:house-line"
          /><span class={!isPrincipalMenuOpen && !isHovering ? 'hidden' : ''}>Dashboard</span
          ></button
        >
      </li>
      <li
        class={`mb-1 ${pagePath === paths.bets ? 'text-primary100 bg-primary50' : 'text-neutral100'} hover:text-primary100 hover:bg-primary50`}
      >
        <button
          class={`py-1.5 px-2.5 flex items-center w-full ${!isPrincipalMenuOpen && !isHovering ? 'lg: justify-center' : ''}`}
          disabled={pagePath === paths.bets}
          ><Icon
            class={`${isPrincipalMenuOpen || isHovering ? 'mr-3' : ''} text-2xl`}
            icon="ph:money-wavy"
          /><span class={!isPrincipalMenuOpen && !isHovering ? 'hidden' : ''}>Apuestas</span></button
        >
      </li>
      <li
        class={`mb-1 ${pagePath === paths.bookies ? 'text-primary100 bg-primary50' : 'text-neutral100'} hover:text-primary100 hover:bg-primary50`}
      >
        <button
          class={`py-1.5 px-2.5 flex items-center w-full ${!isPrincipalMenuOpen && !isHovering ? 'lg: justify-center' : ''}`}
          disabled={pagePath === paths.bookies}
          ><Icon
            class={`${isPrincipalMenuOpen || isHovering ? 'mr-3' : ''} text-2xl`}
            icon="ph:bank"
          /><span class={!isPrincipalMenuOpen && !isHovering ? 'hidden' : ''}>Bookies</span></button
        >
      </li>
      <li
        class={`mb-1 ${pagePath === paths.tipsters ? 'text-primary100 bg-primary50' : 'text-neutral100'} hover:text-primary100 hover:bg-primary50`}
      >
        <button
          class={`py-1.5 px-2.5 flex items-center w-full ${!isPrincipalMenuOpen && !isHovering ? 'lg: justify-center' : ''}`}
          disabled={pagePath === paths.tipsters}
          ><Icon
            class={`${isPrincipalMenuOpen || isHovering ? 'mr-3' : ''} text-2xl`}
            icon="icon-park-outline:user-business"
          /><span class={!isPrincipalMenuOpen && !isHovering ? 'hidden' : ''}>Tipsters</span></button
        >
      </li>
    </ul>
  </aside>

  <button
    class={`lg:hidden fixed inset-0 bg-neutral200 transition-opacity duration-300 z-40 
    ${isPrincipalMenuOpen ? 'opacity-60' : 'opacity-0 pointer-events-none'}`}
    on:click={() => (isPrincipalMenuOpen = false)}
  ></button>
</div>
