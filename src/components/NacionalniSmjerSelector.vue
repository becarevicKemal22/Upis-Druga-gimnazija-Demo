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
  'Dvojezično/bilingvalno područje'
]

const links = [
  'https://drive.google.com/file/d/1DQ0hXvmC4T8jvh9Ff_IjVIPaEhuJ_cN-/view?usp=sharing',
  'https://drive.google.com/file/d/1bktnvHDpdXou413Xr40prJu1XB2nUj9B/view?usp=sharing',
  'https://drive.google.com/file/d/1dcTfHPHSeuDiVY5BgFWMwyX4kih0ZfF5/view?usp=sharing',
  'https://drive.google.com/file/d/17ZUWBq5eGyW65XdV563tBX2dbZf1NccL/view?usp=sharing',
  'https://drive.google.com/file/d/1yP8oBUiv_B7jcOFmvwj7OshfO8F_peQ2/view?usp=sharing',
  'https://drive.google.com/file/d/1Yu4uq71e1fO1e0n8Q3m8jsRH5LjszXSi/view?usp=sharing',
]

watch(inputs, () => {
  const vals = {
    prvi: inputs[0],
    drugi: inputs[1],
  }
  emit('update', vals);
})
</script>

<template>
  <div class="flex flex-col gap-3 font-open-sans text-gray-500">
    <p>Izaberite svoja 2 izbora za smjer na gimnazijskom programu</p>
    <p class="text-sm text-gray-400">Klikom na bilo koji od ponuđenih područja će Vam dati više informacija o tom području -
      <a href="https://drive.google.com/file/d/1_gnlYni4DSu_6Exa1uzy0qPj_QdCUCjG/view?usp=sharing" class="text-blue-800 underline underline-offset-1"> NPP</a></p>
    <multiple-choice :values="options" :links="links" v-model="inputs[0]" >
      <template #description>1. izbor</template>
    </multiple-choice>
    <multiple-choice :values="options" :links="links" v-model="inputs[1]" >
      <template #description>2. izbor</template>
    </multiple-choice>
    <p v-if="error" class="text-sm font-open-sans font-light text-red-500">{{ error }}</p>
  </div>
</template>

<style scoped>

</style>