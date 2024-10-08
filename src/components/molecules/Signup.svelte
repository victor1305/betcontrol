<script lang="ts">
  import { t } from '$lib/i18n';
  import Icon from '@iconify/svelte';

  export let errorMessage: string;

  let passwordVisible = false;
  let passwordRepeatVisible = false;
  let email = '';
  let password = '';
  let passwordRepeat = '';

  const handleUpdateInput = (event: Event, field: 'email' | 'password' | 'passwordRepeat') => {
    const target = event.target as HTMLInputElement;
    if (field === 'email') {
      email = target.value;
    } else if (field === 'password') {
      password = target.value;
    } else if (field === 'passwordRepeat') {
      passwordRepeat = target.value;
    }
  };

  $: isBtnDisabled =
    !password.length || !email.length || !passwordRepeat.length;
</script>

<form method="POST" action="?/login">
  <input class="hidden" id="action" name="action" type="text" value="signup" />
  <div class="flex flex-col pb-6">
    <label for="email">{$t('email')}</label>
    <input
      class="text-neutral150 mt-2 border border-neutral50 rounded-md py-1.5 px-2.5 focus:outline-primary100"
      id="email"
      name="email"
      type="email"
      autocomplete="email"
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
      autocomplete="new-password"
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
  <div class="relative flex flex-col pb-6">
    <label for="repeat-password">{$t('repeat-password')}</label>
    <input
      class="relative text-neutral150 mt-2 border border-neutral50 rounded-md py-1.5 px-2.5 focus:outline-primary100"
      id="repeat-password"
      name="repeat-password"
      type={passwordRepeatVisible ? 'text' : 'password'}
      autocomplete="new-password"
      on:input={(e) => handleUpdateInput(e, 'passwordRepeat')}
    />
    {#if passwordRepeat.length > 0}
      <button
        class="absolute right-3 bottom-[35px] text-neutral150 hover:text-neutral0 focus:outline-primary100"
        type="button"
        on:click={() => (passwordRepeatVisible = !passwordRepeatVisible)}
      >
        <Icon
          icon={passwordRepeatVisible ? 'fa6-solid:eye-slash' : 'fa6-solid:eye'}
          class="w-4 h-4"
          style="color:#5F5F5F"
        />
      </button>
    {/if}
  </div>
  {#if password !== passwordRepeat && passwordRepeat.length > 0 && password.length > 0}
    <div class="mt-2 text-sm text-red-500">
      {$t('passwords-do-not-match')}
    </div>
  {/if}
  {#if errorMessage && (!password.length || !email.length || !passwordRepeat.length)}
    <div class="mt-2 text-sm text-red-500">{errorMessage}</div>
  {/if}
  <div class="mt-5 flex justify-center">
    <button
      disabled={isBtnDisabled}
      class={`rounded-lg border py-2 px-3 button-primary-transition ${
        isBtnDisabled
          ? 'text-gray-500'
          : 'border-primary100 text-primary100 hover:text-neutral0 hover:bg-primary100'
      }`}>{$t('sign-up')}</button
    >
  </div>
</form>
