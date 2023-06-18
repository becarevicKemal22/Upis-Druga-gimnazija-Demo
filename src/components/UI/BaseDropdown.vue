<script setup>
defineProps(['required', 'options']);
</script>

<template>
  <div class="font-open-sans flex flex-col w-fit">
    <span class="text-gray-500 flex align-center gap-0.5">
      <slot></slot>
      <p v-if="required" class="text-red-500 text-sm">*</p>
    </span>
    <select class="p-1 appearance-none text-gray-600 outline outline-1 outline-gray-400">
      <option v-for="option in options" :value="option" :key="option" class="">{{ option }}</option>
    </select>
  </div>

</template>

<style scoped>

</style>