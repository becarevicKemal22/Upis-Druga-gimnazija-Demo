<script setup>

import BaseCheckbox from "@/components/UI/BaseCheckbox.vue";
import {reactive, watch} from "vue";

const props = defineProps(['values', 'description']);
const emit = defineEmits(['update:modelValue']);

const inputs = reactive([]);
const len = () => props.values.length;
for(let i = 0; i < len; i++){
  inputs.push(false);
}

let selectedOption = null;
let triggeredByOwn = false;
const values = ['Gimnazijski program', 'IB program', 'IT program'];

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
  <div class="flex flex-col gap-1 font-open-sans text-gray-500">
    <slot></slot>
    <p class="text-sm text-gray-400 mb-1.5"><slot name="description"></slot></p>
    <base-checkbox v-for="(value, index) in values" :key="value" v-model="inputs[index]">{{ value }}</base-checkbox>
  </div>
</template>

<style scoped>

</style>