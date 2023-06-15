<script setup>

import BaseInput from "@/components/BaseInput.vue";
import DatePicker from "@/components/DatePicker.vue";
</script>

<template>
  <form @submit.prevent class="flex flex-col gap-4">
    <base-input required>Ime</base-input>
    <base-input required>Prezime</base-input>
    <date-picker @update-date="console.log('Radi')">Datum rođenja</date-picker>
  </form>
</template>

<style scoped>

</style>