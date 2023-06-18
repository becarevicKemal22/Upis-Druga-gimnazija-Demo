<script setup>

import BaseInput from "@/components/UI/BaseInput.vue";
import DatePicker from "@/components/UI/DatePicker.vue";
import BaseButton from "@/components/UI/BaseButton.vue";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import {ref, reactive} from "vue";

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

function validateForm() {
  clearErrors();
  let isValid = true;
  if (ime.value.length === 0) {
    errors.ime = "Ime mora biti popunjeno!";
    isValid = false;
  }
  if (prezime.value.length === 0) {
    errors.prezime = "Prezime mora biti popunjeno!";
    isValid = false;
  }
  if (datum.dan !== null && datum.mjesec !== null && datum.godina !== null) {
    if (datum.dan < 1 || datum.dan > 31 || datum.mjesec < 1 || datum.mjesec > 12 || datum.godina.length !== 4) {
      errors.datum = "Unesite validan datum rođenja!"
      isValid = false;
    }
  } else {
    errors.datum = "Datum rođenja mora biti popunjen!";
    isValid = false;
  }
  return isValid;
}

const submitForm = async () => {
  if(!validateForm()){
    return;
  }
  // const formattedDate = datum.dan + '. ' + datum.mjesec + '. ' + datum.godina + '.';
  // const data = {
  //   ime: ime.value,
  //   prezime: prezime.value,
  //   datumRodjenja: formattedDate,
  // }
  pdfMake.createPdf({
    content: [
      'First paragraph',
      'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
    ]}).download();

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