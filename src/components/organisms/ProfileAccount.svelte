<script lang="ts">
  import { t } from '$lib/i18n';
  import type { User } from '$lib/dbModelTypes';

  export let user: User;

  let name: string = user.name || '';
  let lastname: string = user.lastname || '';
  let email: string = user.email;
</script>

<div class="p-4 lg:p-6 text-neutral200">
  <h1 class="text-neutral150 text-xl">
    <span class="pr-2">{$t('profile')}</span><span class="border-l border-neutral50 pl-2 text-base"
      >{$t('profile-account')}</span
    >
  </h1>
  <p class="pt-3 text-sm text-neutral150">{$t('profile-account-description')}</p>
  <div class="max-w-[500px] my-5">
    <form method="POST" action="?/updateUser">
      <div class="flex flex-col mb-4">
        <label class="text-sm text-neutral200" for="name">{$t('user-form-name')}</label>
        <input
          class="text-neutral150 mt-2 border border-neutral50 rounded-md py-1.5 px-2.5 focus:outline-primary100"
          type="text"
          id="name"
          name="name"
          bind:value={name}
        />
      </div>
      <div class="flex flex-col mb-4">
        <label class="text-sm text-neutral200" for="lastname">{$t('user-form-lastname')}</label>
        <input
          class="text-neutral150 mt-2 border border-neutral50 rounded-md py-1.5 px-2.5 focus:outline-primary100"
          type="text"
          id="lastname"
          name="lastname"
          bind:value={lastname}
        />
      </div>
      <div class="flex flex-col mb-10">
        <label class="text-sm text-neutral200" for="email">{$t('email')}</label>
        <input
          class="text-neutral100 mt-2 border border-neutral50 rounded-md py-1.5 px-2.5 focus:outline-primary100"
          type="email"
          id="email"
          name="email"
          disabled
          bind:value={email}
        />
      </div>
      <div class="flex justify-center">
        <button
          disabled={!name.length || (user?.name === name && user?.lastname === lastname)}
          class="rounded-lg border border-primary100 text-primary100 text-sm py-2 px-3 hover:text-neutral0 hover:bg-primary100 button-primary-transition"
          >{$t('save-changes')}</button
        >
      </div>
    </form>
  </div>
</div>
