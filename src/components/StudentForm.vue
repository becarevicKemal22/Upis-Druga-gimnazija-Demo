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

function updateSmjer(izbori) {
  smjer.value = izbori;
}

function updateVJDKR(izbor) {
  vjDKR.value = izbor;
}

const errors = reactive({});

const clearErrors = () => {
  for (const err in errors) {
    errors[err] = null;
  }
}

function filled(ref) {
  return !(ref.value === '' || !ref.value);
}

function filledVal(value){
  return !(value === '' || !value);
}

function validateSmjer(smjerovi){
  const values = Object.values(smjerovi.value);
  const uniqueValues = new Set(values);
  return values.length === uniqueValues.size;
}

function validateJezici(jezici){
  const uniqueValues = new Set(jezici.value);
  return jezici.value.length === uniqueValues.size;
}

function validateForm() {
  const requiredMessage = 'Polje mora biti popunjeno.';
  clearErrors();
  let formIsValid = true;

  if (!filled(imeUcenika)) {
    errors.imeUcenika = requiredMessage;
    formIsValid = false;
  }
  if (!filled(imeRoditelja1)) {
    errors.imeRoditelja1 = requiredMessage;
    formIsValid = false;
  }
  if (!filled(imeRoditelja2)) {
    errors.imeRoditelja2 = requiredMessage;
    formIsValid = false;
  }
  if(!filledVal(datum.dan) || !filledVal(datum.mjesec) || !filledVal(datum.godina)){
    errors.datum = requiredMessage;
    formIsValid = false;
  }
  if(!filled(program)){
    errors.program = requiredMessage;
    formIsValid = false;
  }
  if(program.value === 'Gimnazijski program'){
    if(!filled(smjer)){
      errors.smjer = 'Morate odabrati 3 smjera';
      formIsValid = false;
    }else if(!validateSmjer(smjer)){
      errors.smjer = 'Odabir se ne smije ponavljati';
      formIsValid = false;
    }
  }
  if(!filled(vjDKR)){
    errors.vjDKR = 'Polje / polja moraju biti popunjena';
    formIsValid = false;
  }
  if(jezici.value.length < 2 || jezici.value[0] === '' || jezici.value[1] === ''){
    if(program.value === 'IB program'){
      errors.jezici = 'Morate odabrati drugi strani jezik';
    }else{
      errors.jezici = 'Morate odabrati strane jezike';
    }
    formIsValid = false;
  }else if(!validateJezici(jezici)){
    errors.jezici = 'Morate odabrati 2 različita jezika';
    formIsValid = false;
  }
  console.log(jezici.value);
  return formIsValid;
}

const submitForm = async () => {
  if (!validateForm()) {
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
    ]
  }).download();

}

</script>

<template>
  <form @submit.prevent class="flex flex-col gap-4">
    <base-input v-model="imeUcenika" :error="errors.imeUcenika">Ime i prezime učenika</base-input>
    <base-input v-model="imeRoditelja1" :error="errors.imeRoditelja1">Ime i prezime roditelja/staratelja</base-input>
    <base-input v-model="imeRoditelja2" :error="errors.imeRoditelja2">Ime i prezime roditelja/staratelja</base-input>
    <date-picker @update-date="updateDate" :error="errors.datum">Datum rođenja</date-picker>
    <multiple-choice v-model="program" :error="errors.program" :values="['Gimnazijski program', 'IB program', 'IT program']">
      Izaberite program
      <template #description>Izaberite program na koji ste se upisali putem EMIS-a</template>
    </multiple-choice>
    <nacionalni-smjer-selector :error="errors.smjer" v-if="program === 'Gimnazijski program'"
                               @update="updateSmjer"></nacionalni-smjer-selector>
    <vj-d-k-r-selector :error="errors.vjDKR" @update="updateVJDKR"></vj-d-k-r-selector>
    <jezik-selector :isIB="program === 'IB program'" :error="errors.jezici" v-model="jezici"></jezik-selector>
    <div class="flex flex-col gap-3 font-open-sans text-gray-500">
      <p>DSD Program</p>
      <base-checkbox :model-value="dsd">Odaberite ovu opciju ukoliko želite pohađati DSD program.</base-checkbox>
    </div>

    <base-button @click="submitForm">Prijava</base-button>
  </form>
</template>

<style scoped>

</style>