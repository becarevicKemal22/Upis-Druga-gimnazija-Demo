<script setup>
import {ref, watch} from "vue";

const props = defineProps({
  modelValue: Boolean,
  link: {},
});

const emit = defineEmits(['update:modelValue']);

function update(event) {
  emit('update:modelValue', event.target.checked);
}

const checked = ref(false);

watch(() => props.modelValue, (value) => {
  checked.value = value;
})


</script>

<template>
  <div class="checkbox flex gap-2 items-center font-open-sans text-sm text-gray-600">
    <input type="checkbox" v-model="checked" @change="update"
           class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded transition">
    <a :href="link" v-if="link && link !== '#'" target="_blank" class="text-blue-800 underline underline-offset-1"><slot></slot></a>
    <slot v-else></slot>
  </div>
</template>

<style scoped>

</style>