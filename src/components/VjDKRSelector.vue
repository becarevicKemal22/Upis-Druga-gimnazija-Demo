<script setup>

import MultipleChoice from "@/components/UI/MultipleChoice.vue";
import {ref, watch} from "vue";

const emit = defineEmits(['update']);
defineProps(['error']);

const izbor = ref('');
const izborVjeronauke = ref('');

const opcijeVjeronauka = ['Islamic classes', 'Catholic classes', 'Orthodox classes', 'Jewish classes'];

watch(izbor, () => {
  if(izbor.value === 'Društvo/kultura/religija') {
    emit('update', izbor.value);
  }
})

watch(izborVjeronauke, () => {
  emit('update', izborVjeronauke.value);
})
</script>

<template>
  <div class="flex flex-col gap-3 font-open-sans text-gray-500">
    <p>Choose if you want to attend religion classes or "Društvo/kultura/religija"</p>
    <multiple-choice v-model="izbor" :values="['Religion classes', 'Društvo/kultura/religija']">
      <template #description>If you choose religion classes, you will be given more options.</template>
    </multiple-choice>
    <multiple-choice v-if="izbor === 'Religion classes'" v-model="izborVjeronauke" :values="opcijeVjeronauka">
      <template #description>Choose which religion classes you wish to attend</template>
    </multiple-choice>
    <p v-if="error" class="text-sm font-open-sans font-light text-red-500">{{error}}</p>
  </div>
</template>

<style scoped>

</style>