<script setup>

import BaseCheckbox from "@/components/UI/BaseCheckbox.vue";
import {reactive, watch} from "vue";

const emit = defineEmits(['update:modelValue']);

const inputs = reactive([false, false, false]);
let selectedOption = null;
let triggeredByOwn = false;
const values = ['Gimnazijski program', 'IB MYP program', 'IT program'];

watch(inputs, () => {
  if(selectedOption === null){
    selectedOption = inputs.findIndex(input => input === true);
    emit("update:modelValue", values[selectedOption]);
    return;
  }

  // Because changing the inputs[selectedoption] to false triggers the watcher
  // Can be set to just false because only one change of the options is done through the watcher
  if(triggeredByOwn === true){
    triggeredByOwn = false;
    return;
  }

  let index = inputs.findIndex((value, index) => {
    return value === true && index !== selectedOption;
  })
  if(index === -1){
    selectedOption = null;
    return;
  }

  inputs[selectedOption] = false;
  selectedOption = index;
  triggeredByOwn = true;
  emit("update:modelValue", values[selectedOption]);
})

</script>

<template>
  <div class="flex flex-col gap-0.5 font-open-sans text-gray-500">
    <slot></slot>
    <p class="text-sm text-gray-400">Izaberite jednu opciju</p>
    <base-checkbox v-for="(value, index) in values" :key="value" v-model="inputs[index]">{{ value + ' ' + index }}</base-checkbox>
    <base-checkbox v-model="inputs[0]">Gimnazijski program</base-checkbox>
    <base-checkbox v-model="inputs[1]">IB MYP program</base-checkbox>
    <base-checkbox v-model="inputs[2]">IT program</base-checkbox>
  </div>
</template>

<style scoped>

</style>