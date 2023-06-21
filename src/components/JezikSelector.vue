<script setup>

import MultipleChoice from "@/components/UI/MultipleChoice.vue";
import {reactive, watch} from "vue";


const jezici = [
    'Engleski',
    'Njemački',
    'Turski',
    'Talijanski',
    'Francuski',
    'Arapski',
]

defineProps(['modelValue', 'error'])
const emit = defineEmits(['update:modelValue'])
const inputs = reactive(['', '']);

watch(inputs, () => {
  emit('update:modelValue', inputs);
})

</script>

<template>
  <div class="flex flex-col gap-3 font-open-sans text-gray-500">
    <p>Odaberite prvi i drugi strani jezik</p>
    <multiple-choice v-model="inputs[0]" :values="jezici">
      <template #description>Prvi strani jezik</template>
    </multiple-choice>
    <multiple-choice v-model="inputs[1]" :values="jezici">
      <template #description>Drugi strani jezik</template>
    </multiple-choice>
    <p v-if="error" class="text-sm font-open-sans font-light text-red-500">{{error}}</p>
  </div>
</template>

<style scoped>

</style>