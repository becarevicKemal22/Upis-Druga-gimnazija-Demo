<script setup>

import MultipleChoice from "@/components/UI/MultipleChoice.vue";
import {computed, reactive, watch} from "vue";

const props = defineProps(['modelValue', 'error', 'isIB'])
const emit = defineEmits(['update:modelValue'])
const inputs = reactive(['', '']);

const compInputs = computed(() => {
  if(props.isIB){
    let arr = [...inputs];
    arr[0] = 'Engleski';
    return arr;
  }
  return inputs;
})

watch(() => props.isIB, (value, oldValue) => {
  if(value !== oldValue){
    inputs[0] = '';
    inputs[1] = '';
  }
})

const jezici = computed(() => {
  if(!props.isIB){
    return [
      'English',
      'German',
      'Turkish',
      'Italian',
      'French',
    ]
  }else{
    return [
      'German',
      'Italian',
      'French',
    ]
  }
})

watch(inputs, () => {
  emit('update:modelValue', [...compInputs.value]);
})

</script>

<template>
  <div class="flex flex-col gap-3 font-open-sans text-gray-500">
    <p>Choose the {{ isIB ? '' : 'first and' }} second foreign language {{ isIB ? '(the one you studied in elementary school)' : '(the ones you studied in elementary school)' }}</p>
    <multiple-choice v-if="!isIB" v-model="inputs[0]" :values="jezici">
      <template #description>First foreign language</template>
    </multiple-choice>
    <multiple-choice v-model="inputs[1]" :values="jezici">
      <template #description>Second foreign language</template>
    </multiple-choice>
    <p v-if="error" class="text-sm font-open-sans font-light text-red-500">{{error}}</p>
  </div>
</template>

<style scoped>

</style>