<script setup>

import BaseInput from "@/components/BaseInput.vue";
import DatePicker from "@/components/DatePicker.vue";
import BaseButton from "@/components/BaseButton.vue";

import {ref,reactive} from "vue";

const ime = ref('');
const prezime = ref('');
const datum = reactive({
  dan: null,
  mjesec: null,
  godina: null,
});

const errors = reactive({
  ime: null,
  prezime: null,
  datum: null
})

const updateDate = (date) => {
  datum.dan = date.dan;
  datum.mjesec = date.mjesec;
  datum.godina = date.godina;
}

const clearErrors = () => {
  errors.ime = null;
  errors.prezime = null;
  errors.datum = null;
}

const submitForm = () => {
  clearErrors();
  if(ime.value.length === 0){
    errors.ime = "Ime mora biti popunjeno!";
  }
  if(prezime.value.length === 0){
    errors.prezime = "Prezime mora biti popunjeno!";
  }
  if(datum.dan !== null && datum.mjesec !== null && datum.godina !== null){
    if(datum.dan < 1 || datum.dan > 31 || datum.mjesec < 1 || datum.mjesec > 12 || datum.godina.length !== 4){
      errors.datum = "Unesite validan datum rođenja!"
    }
  }else{
    errors.datum = "Datum rođenja mora biti popunjen!";
  }
}

</script>

<template>
  <form @submit.prevent class="flex flex-col gap-4">
    <base-input required :error="errors.ime" v-model="ime">Ime</base-input>
    <base-input required :error="errors.prezime" v-model="prezime">Prezime</base-input>
    <date-picker @update-date="updateDate" :error="errors.datum">Datum rođenja</date-picker>
    <base-button @click="submitForm">Prijava</base-button>
  </form>
</template>

<style scoped>

</style>