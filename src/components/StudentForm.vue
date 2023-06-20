<script setup>

import BaseInput from "@/components/UI/BaseInput.vue";
import DatePicker from "@/components/UI/DatePicker.vue";
import BaseButton from "@/components/UI/BaseButton.vue";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import {ref, reactive} from "vue";
import MultipleChoice from "@/components/UI/MultipleChoice.vue";
import NacionalniSmjerSelector from "@/components/NacionalniSmjerSelector.vue";
import VjDKRSelector from "@/components/VjDKRSelector.vue";
import JezikSelector from "@/components/JezikSelector.vue";
import BaseCheckbox from "@/components/UI/BaseCheckbox.vue";

const imeUcenika = ref('');
const imeRoditelja1 = ref('');
const imeRoditelja2 = ref('');
const datum = reactive({
  dan: null,
  mjesec: null,
  godina: null,
});
const program = ref('');
const smjer = ref(null);
const vjDKR = ref(null);
const jezici = ref([]);
const dsd = ref();

const updateDate = (date) => {
  datum.dan = date.dan;
  datum.mjesec = date.mjesec;
  datum.godina = date.godina;
}

function updateSmjer(izbori){
  smjer.value = izbori;
}

function updateVJDKR(izbor){
  vjDKR.value = izbor;
}

const errors = reactive({
  ime: null,
  prezime: null,
  datum: null
})

const clearErrors = () => {
  errors.ime = null;
  errors.prezime = null;
  errors.datum = null;
}

function validateForm() {
  clearErrors();
  let isValid = true;
  if (imeUcenika.value.length === 0) {
    errors.imeUcenika = "Ime mora biti popunjeno!";
    isValid = false;
  }
  if (imeRoditelja1.value.length === 0) {
    errors.imeRoditelja1 = "Ime mora biti popunjeno!";
    isValid = false;
  }
  if (imeRoditelja2.value.length === 0) {
    errors.imeRoditelja2 = "Ime mora biti popunjeno!";
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
    <base-input :error="errors.imeUcenika" v-model="imeUcenika">Ime i prezime učenika</base-input>
    <base-input :error="errors.imeRoditelja1" v-model="imeRoditelja1">Ime i prezime roditelja/staratelja</base-input>
    <base-input :error="errors.imeRoditelja2" v-model="imeRoditelja2">Ime i prezime roditelja/staratelja</base-input>
    <date-picker @update-date="updateDate" :error="errors.datum">Datum rođenja</date-picker>
    <multiple-choice v-model="program" :values="['Gimnazijski program', 'IB program', 'IT program']">
      Izaberite program
      <template #description>Izaberite program na koji ste se upisali putem EMIS-a</template>
    </multiple-choice>
    <nacionalni-smjer-selector v-if="program === 'Gimnazijski program'" @update="updateSmjer"></nacionalni-smjer-selector>
    <vj-d-k-r-selector @update="updateVJDKR"></vj-d-k-r-selector>
    <jezik-selector v-model="jezici"></jezik-selector>
    <div class="flex flex-col gap-3 font-open-sans text-gray-500">
      <p>DSD Program</p>
      <base-checkbox :model-value="dsd">Odaberite ovu opciju ukoliko želite pohađati DSD program</base-checkbox>
    </div>

    <base-button @click="submitForm">Prijava</base-button>
  </form>
</template>

<style scoped>

</style>