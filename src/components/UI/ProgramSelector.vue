<script setup>

import BaseCheckbox from "@/components/UI/BaseCheckbox.vue";
import {reactive, watch} from "vue";

const emit = defineEmits(['update:modelValue']);

const inputs = reactive([false, false, false]);
let selectedOption = null;
let triggeredByOwn = false;
const values = ['Gimnazijski program', 'IB program', 'IT program'];

watch(inputs, () => {
  if(selectedOption === null){
    selectedOption = inputs.findIndex(input => input === true);
    emit("update:modelValue", values[selectedOption]);
    return;
  }
  if(triggeredByOwn === true){
    triggeredByOwn = false;
    return;
  }
  let index = null;
  let counter = 0;
  for(const input of inputs){
    if(input === true && counter !== selectedOption){
      index = counter;
      break;
    }
    counter++;
  }
  inputs[selectedOption] = false;
  selectedOption = index;
  triggeredByOwn = true;
  emit("update:modelValue", values[selectedOption]);
})

function update(){
  inputs[0] = false;
}

</script>

<template>
  <div class="flex flex-col gap-0.5 font-open-sans text-gray-500">
    <slot></slot>
    <p class="text-sm text-gray-400">Izaberite jednu opciju</p>

    <base-checkbox v-model="inputs[0]">Gimnazijski program</base-checkbox>
    <base-checkbox v-model="inputs[1]">IB program</base-checkbox>
    <base-checkbox v-model="inputs[2]">IT program</base-checkbox>
    <button @click="update">Test</button>
  </div>
</template>

<style scoped>

</style>