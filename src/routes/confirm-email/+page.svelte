<script lang="ts">
  import { t } from '$lib/i18n';

  import type { User } from '$lib/dbModelTypes';

  import type { PageData } from './$types';

  export let data: PageData;
  export let form;

  const errorMessage = form?.errors?.message;

  const userData: User = data.userData;
</script>

<div class="h-screen p-5 flex flex-col justify-center items-center pb-[25%]">
  <h1 class="text-center text-2xl text-primary100 font-light pb-8">{$t('confirm-email-title')}</h1>
  <div
    class="border border-cardBorderLight shadow-cardShadow p-4 rounded-xl text-neutral200 text-sm lg:text-base"
  >
    <p class="pb-4">{$t('confirm-email-text', { values: { email: userData.email } })}</p>
    <p class="pb-5">{$t('confirm-email-resend-text')}</p>
    <p class="text-xs">{$t('confirm-email-spam-text')}</p>
    {#if errorMessage}
      <div class="mt-4 text-sm text-red-500">{errorMessage}</div>
    {/if}
    <form class="mt-5 flex justify-center" method="POST" action="?/resendEmail">
      <input class="hidden" id="userId" name="userId" type="text" value={userData._id} />
      <input class="hidden" id="email" name="email" type="text" value={userData.email} />
      <button
        type="submit"
        class="rounded-lg border border-primary100 text-primary100 py-2 px-3 hover:text-neutral0 hover:bg-primary100 button-primary-transition"
        >{$t('confirm-email-resend-email-btn')}</button
      >
    </form>
  </div>
</div>
