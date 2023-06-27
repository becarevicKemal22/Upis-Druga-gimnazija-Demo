<script setup>

import BaseCheckbox from "@/components/UI/BaseCheckbox.vue";
import {reactive, watch} from "vue";

const props = defineProps(['values', 'program', 'error', 'links']);
const emit = defineEmits(['update:modelValue']);

let finalLinks = [];
if (typeof props.links === 'undefined' || props.links.length < props.values.length) {
  finalLinks.forEach(() => {
    finalLinks.push(null);
  })
} else {
  // eslint-disable-next-line vue/no-setup-props-destructure
  finalLinks = props.links;
}

const inputs = reactive([]);
const len = () => props.values.length;
for (let i = 0; i < len; i++) {
  inputs.push(false);
}

let selectedOption = null;
let triggeredByOwn = false;

watch(inputs, () => {
  if (selectedOption === null) {
    selectedOption = inputs.findIndex(input => input === true);
    emit("update:modelValue", props.values[selectedOption]);
    return;
  }

  // Because changing the inputs[selectedoption] to false triggers the watcher
  // Can be set to just false because only one change of the options is done through the watcher
  if (triggeredByOwn === true) {
    triggeredByOwn = false;
    return;
  }

  let index = inputs.findIndex((value, index) => {
    return value === true && index !== selectedOption;
  })
  if (index === -1) {
    selectedOption = null;
    return;
  }

  inputs[selectedOption] = false;
  selectedOption = index;
  triggeredByOwn = true;
  emit("update:modelValue", props.values[selectedOption]);
})

</script>

<template>
  <div class="flex flex-col gap-1 font-open-sans text-gray-500">
    <slot></slot>
    <p class="text-sm text-gray-400 mb-1.5">
      <slot name="description"></slot>
    </p>
    <base-checkbox v-for="(value, index) in values" :key="value" v-model="inputs[index]" :link="finalLinks[index]">
      {{ value }}
    </base-checkbox>
    <p v-if="error" class="text-sm font-open-sans font-light text-red-500">{{ error }}</p>
  </div>
</template>

<style scoped>

</style>