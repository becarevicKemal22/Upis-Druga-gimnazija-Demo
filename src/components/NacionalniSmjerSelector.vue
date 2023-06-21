<script setup>

import MultipleChoice from "@/components/UI/MultipleChoice.vue";
import {reactive, watch} from "vue";

const emit = defineEmits(['update']);
defineProps(['error'])

const inputs = reactive([]);

const options = [
    'Matematičko-informatički smjer',
    'Jezičko područje',
    'Prirodno područje',
    'Društveno područje',
    'Opća gimnazija',
    'Dvojezično/bilingualno područje'
]

watch(inputs, () => {
  const vals = {
    prvi: inputs[0],
    drugi: inputs[1],
    treci: inputs[2],
  }
  emit('update', vals);
})
</script>

<template>
  <div class="flex flex-col gap-3 font-open-sans text-gray-500">
    <p>Izaberite svoja 3 izbora za smjer na gimnazijskom programu</p>
    <multiple-choice :values="options" v-model="inputs[0]">
      <template #description>1. izbor</template>
    </multiple-choice>
    <multiple-choice :values="options" v-model="inputs[1]">
      <template #description>2. izbor</template>
    </multiple-choice>
    <multiple-choice :values="options" v-model="inputs[2]">
      <template #description>3. izbor</template>
    </multiple-choice>
    <p v-if="error" class="text-sm font-open-sans font-light text-red-500">{{error}}</p>
  </div>
</template>

<style scoped>

</style>