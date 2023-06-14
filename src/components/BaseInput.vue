<script setup>
defineProps({
  required: Boolean,
  modelValue: String,
});

defineEmits(['update:modelValue']);
</script>

<template>
  <div class="font-open-sans flex flex-col w-fit">
    <span class="text-gray-500 flex align-center gap-0.5">
      <slot></slot>
      <p v-if="required" class="text-red-500 text-sm">*</p>
    </span>
    <input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" class="p-1 text-sm text-gray-600 appearance-none outline outline-1 outline-gray-400 rounded-sm focus:ring-teal-500 focus:ring-opacity-70 focus:ring-2 focus:ring-offset-2 focus:outline-none transition-all">
  </div>
</template>

<style scoped>

</style>