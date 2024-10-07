<script lang="ts">
  import { t } from '$lib/i18n';
  import Icon from '@iconify/svelte';

  let passwordVisible = false;
  let email = '';
  let password = '';

  const handleUpdateInput = (event: Event, field: 'email' | 'password') => {
    const target = event.target as HTMLInputElement;
    if (field === 'email') {
      email = target.value;
    } else if (field === 'password') {
      password = target.value;
    }
  };

  $: isBtnDisabled = !password.length || !email.length;
</script>

<form method="POST" action="?/login">
  <div class="flex flex-col pb-6">
    <label for="email">{$t('email')}</label>
    <input
      class="text-neutral150 mt-2 border border-neutral50 rounded-md py-1.5 px-2.5 focus:outline-primary100"
      id="email"
      name="email"
      type="email"
      on:input={(e) => handleUpdateInput(e, 'email')}
    />
  </div>
  <div class="relative flex flex-col pb-6">
    <label for="password">{$t('password')}</label>
    <input
      class="relative text-neutral150 mt-2 border border-neutral50 rounded-md py-1.5 px-2.5 focus:outline-primary100"
      id="password"
      name="password"
      type={passwordVisible ? 'text' : 'password'}
      on:input={(e) => handleUpdateInput(e, 'password')}
    />
    {#if password.length > 0}
      <button
        class="absolute right-3 bottom-[35px] text-neutral150 hover:text-neutral0 focus:outline-primary100"
        type="button"
        on:click={() => (passwordVisible = !passwordVisible)}
      >
        <Icon
          icon={passwordVisible ? 'fa6-solid:eye-slash' : 'fa6-solid:eye'}
          class="w-4 h-4"
          style="color:#5F5F5F"
        />
      </button>
    {/if}
  </div>
  <div class="mt-5 flex justify-center">
    <button
      disabled={isBtnDisabled}
      class="rounded-lg border border-primary100 text-primary100 py-2 px-3 hover:text-neutral0 hover:bg-primary100 button-primary-transition"
      >{$t('login')}</button
    >
  </div>
</form>
