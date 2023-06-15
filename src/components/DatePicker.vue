<script setup>
import {ref} from "vue";

defineProps(['required']);

const emit = defineEmits(['updateDate']);

const updateDate = () => {
  const date = {
    dan: dan.value.value,
    mjesec: mjesec.value.value,
    godina: godina.value.value
  };
  emit('updateDate', date);
}

const handleBackspace = (event) => {
  if (event.target.id === 'mjesec') {
    if (mjesec.value.value.length !== 0) {
      return;
    }
    dan.value.focus();
  }
  if (event.target.id === 'godina') {
    if (godina.value.value.length !== 0) {
      return;
    }
    mjesec.value.focus();
  }
}

const dan = ref(0);
const mjesec = ref(0);
const godina = ref(0);

</script>

<template>
  <div class="font-open-sans flex flex-col w-fit gap-1">
    <span class="text-gray-500 flex align-center gap-0.5">
      <slot></slot>
      <p v-if="required" class="text-red-500 text-sm">*</p>
    </span>
    <div class="flex outline outline-1 outline-gray-400 items-center rounded-sm w-fit">
      <input type="text" ref="dan" @blur="updateDate" maxlength="2"
             class="p-1 text-sm w-10 text-center text-gray-600 appearance-none rounded-sm focus:outline-none"
             placeholder="dd">
      <span class="text-teal-500">/</span>
      <input type="text" ref="mjesec" id="mjesec" @blur="updateDate" @keyup.delete="handleBackspace" maxlength="2"
             class="p-1 text-sm w-10 text-center text-gray-600 appearance-none rounded-sm focus:outline-none"
             placeholder="mm">
      <span class="text-teal-500">/</span>
      <input type="text" ref="godina" id="godina" @blur="updateDate" @keyup.delete="handleBackspace" maxlength="4"
             class="p-1 text-sm w-14 text-center text-gray-600 appearance-none rounded-sm focus:outline-none"
             placeholder="gggg">
    </div>
  </div>
</template>

<style scoped>

</style>