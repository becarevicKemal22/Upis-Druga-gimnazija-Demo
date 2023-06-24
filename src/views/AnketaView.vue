<script setup>

import AnketaHeader from "@/components/Layout/AnketaHeader.vue";
import {ref} from "vue";
import BaseButton from "@/components/UI/BaseButton.vue";
import generatePDF from "@/helpers/generatePDF";

const enteredJSON = ref('');

function generateNewPDF(){
  const json = JSON.parse(enteredJSON.value);
  generatePDF(json);
}

</script>

<template>
  <AnketaHeader></AnketaHeader>
  <div class="lg:shadow-xl lg:p-10 lg:pb-8 mb-5 lg:rounded-xl lg:overflow-hidden bg-white mt-12 flex flex-col gap-5">
    <p class="font-open-sans font-bold text-gray-600">Ispod zalijepite kopirane podatke</p>
    <textarea rows="15" cols="50" v-model="enteredJSON"></textarea>
    <base-button @click="generateNewPDF">Generiši</base-button>
    <base-button><router-link to="/">Nazad na formular</router-link></base-button>
  </div>
</template>

<style scoped>

</style>