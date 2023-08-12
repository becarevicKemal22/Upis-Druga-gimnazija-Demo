<script setup>

import BaseInput from "@/components/UI/BaseInput.vue";
import DatePicker from "@/components/UI/DatePicker.vue";
import BaseButton from "@/components/UI/BaseButton.vue";

import generatePDF from "@/helpers/generatePDF";

import {saveData} from "@/helpers/saveData";

import {ref, reactive} from "vue";
import MultipleChoice from "@/components/UI/MultipleChoice.vue";
import NacionalniSmjerSelector from "@/components/NacionalniSmjerSelector.vue";
import VjDKRSelector from "@/components/VjDKRSelector.vue";
import JezikSelector from "@/components/JezikSelector.vue";
import BaseCheckbox from "@/components/UI/BaseCheckbox.vue";
import BaseToast from "@/components/UI/BaseToast.vue";

const imeUcenika = ref('');
const brojTelefona1 = ref('');
const imeRoditelja1 = ref('');
const brojTelefona2 = ref('');
const imeRoditelja2 = ref('');
const brojTelefona3 = ref('');
const datum = reactive({
  dan: null,
  mjesec: null,
  godina: null,
});
const program = ref('');
const smjer = ref(null);
const vjDKR = ref(null);
const jezici = ref([]);
const dsd = ref(false);

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

const showToast = ref(false);
const toastTitle = ref('');
const toastDescription = ref('');
const toastVariant = ref('');

const submitForm = async () => {

  if (!validateForm()) {
    toastTitle.value = "Error!";
    toastDescription.value = "Please correct the data.";
    toastVariant.value = "error";
    showToast.value = true;
    return;
  }
  const formattedDate = datum.dan + '. ' + datum.mjesec + '. ' + datum.godina + '.';
  let data = {
    "Ime i prezime": imeUcenika.value,
    "Tel ucenika": brojTelefona1.value,
    "Ime roditelja 1": imeRoditelja1.value,
    "Tel roditelja 1": brojTelefona2.value,
    "Ime roditelja 2": imeRoditelja2.value,
    "Tel roditelja 2": brojTelefona3.value,
    "Datum rođenja": formattedDate,
    "Program": program.value,
    "Vjeronauka ili DKR": vjDKR.value,
    "Prvi strani jezik": jezici.value[0],
    "Drugi strani jezik": jezici.value[1],
  }
  if (dsd.value) {
    data = {
      ...data,
      "DSD": "DA",
    }
  }
  if (program.value === 'Gymnasium program') {
    data = {
      ...data,
      "Prvi izbor": smjer.value.prvi,
      "Drugi izbor": smjer.value.drugi,
    }
  }
  saveData(data);
  generatePDF(data);
  toastTitle.value = "Welcome!";
  toastDescription.value = "You enrolled successfully.";
  toastVariant.value = "success";
  showToast.value = true;

}

//Errors and validation
const errors = reactive({});

const clearErrors = () => {
  for (const err in errors) {
    errors[err] = null;
  }
}

function filled(ref) {
  return !(ref.value === '' || !ref.value);
}

function filledVal(value) {
  return !(value === '' || !value);
}

function validateSmjer(smjerovi) {
  const values = Object.values(smjerovi.value);
  const uniqueValues = new Set(values);
  return values.length === uniqueValues.size;
}

function validateJezici(jezici) {
  const uniqueValues = new Set(jezici.value);
  return jezici.value.length === uniqueValues.size;
}

function validateForm() {
  const requiredMessage = 'Field must be filled.';
  clearErrors();
  let formIsValid = true;

  if (!filled(imeUcenika)) {
    errors.imeUcenika = requiredMessage;
    formIsValid = false;
  }
  if (!filled(brojTelefona1)) {
    errors.brojTelefona1 = requiredMessage;
    formIsValid = false;
  }
  if (!filled(imeRoditelja1)) {
    errors.imeRoditelja1 = requiredMessage;
    formIsValid = false;
  }
  if (!filled(brojTelefona2)) {
    errors.brojTelefona2 = requiredMessage;
    formIsValid = false;
  }
  if (!filled(imeRoditelja2)) {
    errors.imeRoditelja2 = requiredMessage;
    formIsValid = false;
  }
  if (!filled(brojTelefona3)) {
    errors.brojTelefona3 = requiredMessage;
    formIsValid = false;
  }
  if (!filledVal(datum.dan) || !filledVal(datum.mjesec) || !filledVal(datum.godina)) {
    errors.datum = requiredMessage;
    formIsValid = false;
  }
  if (!filled(program)) {
    errors.program = requiredMessage;
    formIsValid = false;
  }
  if (program.value === 'Gymnasium program') {
    if (!filled(smjer)) {
      errors.smjer = 'You have to choose 2 departments';
      formIsValid = false;
    } else if (!validateSmjer(smjer)) {
      errors.smjer = 'You cannot choose the same department twice';
      formIsValid = false;
    }
  }
  if (!filled(vjDKR)) {
    errors.vjDKR = 'Field / fields must be filled';
    formIsValid = false;
  }
  if (jezici.value.length < 2 || jezici.value[0] === '' || jezici.value[1] === '') {
    if (program.value === 'IB program') {
      errors.jezici = 'You have to choose the second foreign language';
    } else {
      errors.jezici = 'You have to choose 2 foreign languages';
    }
    formIsValid = false;
  } else if (!validateJezici(jezici)) {
    errors.jezici = 'You have to choose 2 different foreign languages';
    formIsValid = false;
  }
  return formIsValid;
}

</script>

<template>
  <div class="lg:shadow-xl lg:p-10 lg:pb-8 mb-5 lg:rounded-xl lg:overflow-hidden">
    <form @submit.prevent class="flex flex-col gap-4 p-5">
      <base-input v-model="imeUcenika" :error="errors.imeUcenika">Student's name and surname</base-input>
      <base-input v-model="brojTelefona1" :error="errors.brojTelefona1">Student's phone number</base-input>
      <base-input v-model="imeRoditelja1" :error="errors.imeRoditelja1">Parent's name and surname (1)
      </base-input>
      <base-input v-model="brojTelefona2" :error="errors.brojTelefona2">Parent's phone number (1)
      </base-input>
      <base-input v-model="imeRoditelja2" :error="errors.imeRoditelja2">Parent's name and surname (2)
      </base-input>
      <base-input v-model="brojTelefona3" :error="errors.brojTelefona3">Parent's phone number (2)
      </base-input>
      <date-picker @update-date="updateDate" :error="errors.datum">Student's date of birth</date-picker>
      <multiple-choice v-model="program" :error="errors.program"
                       :values="['Gymnasium program', 'IB MYP program', 'IT program']">
        Choose a program
        <template #description>Choose the program you have been accepted into using the "EMIS" platform</template>
      </multiple-choice>
      <nacionalni-smjer-selector :error="errors.smjer" v-if="program === 'Gymnasium program'"
                                 @update="updateSmjer"></nacionalni-smjer-selector>
      <vj-d-k-r-selector :error="errors.vjDKR" @update="updateVJDKR"></vj-d-k-r-selector>
      <jezik-selector :isIB="program === 'IB MYP program'" :error="errors.jezici" v-model="jezici"></jezik-selector>
      <div class="flex flex-col gap-3 font-open-sans text-gray-500">
        <p>DSD Program</p>
        <base-checkbox v-model="dsd"><p>Choose this option if you want to attend the <a
            href="https://www.2gimnazija.edu.ba/en/nacionalni-program/dsd-program-en" class="text-blue-800 underline underline-offset-1">DSD</a> program (with this choice you qualify to attend the entrance exam for DSD program in September). </p>
        </base-checkbox>
      </div>

      <base-button @click="submitForm" class="mt-5">Enroll</base-button>
      <base-toast :show="showToast" @close="showToast = false" :variant="toastVariant">
        {{ toastTitle }}
        <template #description>{{ toastDescription }}</template>
      </base-toast>
    </form>
  </div>
</template>