<script lang="ts">
  import { betDefault } from '$lib/constants';
  import { t } from '$lib/i18n';
  import type { Bookie, Tipster } from '$lib/dbModelTypes';

  import BasicModal from '@/components/atoms/BasicModal.svelte';
  import CreateBetForm from '@/components/molecules/CreateBetForm.svelte';

  export let show: boolean;
  export let closeModal: () => void;
  export let tipsters: Tipster[];
  export let bookies: Bookie[];

  let isEditBet = false;
  let bet = structuredClone(betDefault);
  let hasTipster = false;
  let showError = false;

  const resetForm = () => {
    closeModal();
    bet = structuredClone(betDefault);
    hasTipster = false;
    showError = false;
  };

  $: isDisabled =
    !bet.bookie ||
    !bet.date ||
    !bet.sport ||
    !bet.bet ||
    !bet.odd ||
    !bet.amount ||
    (hasTipster && !bet.tipster);
</script>

<BasicModal {...{ show, closeModal: resetForm }}>
  <h1 class="text-lg text-neutral150 pb-5">
    {$t('create-bet-modal-title', { values: { isCreate: !isEditBet } })}
  </h1>
  <CreateBetForm
    bind:bet
    bind:hasTipster
    {...{ bookies, tipsters, showError, isEditBet, isDisabled }}
  />
</BasicModal>
