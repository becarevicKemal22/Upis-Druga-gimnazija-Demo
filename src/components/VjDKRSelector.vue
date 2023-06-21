<script setup>

import MultipleChoice from "@/components/UI/MultipleChoice.vue";
import {ref, watch} from "vue";

const emit = defineEmits(['update']);
defineProps(['error']);

const izbor = ref('');
const izborVjeronauke = ref('');

const opcijeVjeronauka = ['Islamska vjeronauka', 'Katolički vjeronauk', 'Pravoslavna vjeronauka', 'Jevrejska vjeronauka']

watch(izbor, () => {
  if(izbor.value === 'DKR') {
    emit('update', izbor.value);
  }
})

watch(izborVjeronauke, () => {
  emit('update', izborVjeronauke.value);
})
</script>

<template>
  <div class="flex flex-col gap-3 font-open-sans text-gray-500">
    <p>Odaberite da li želite da pohađate vjeronauku ili DKR</p>
    <multiple-choice v-model="izbor" :values="['Vjeronauka', 'DKR']">
      <template #description>Ukoliko odaberete vjeronauku, biće vam ponuđene dalje opcije</template>
    </multiple-choice>
    <multiple-choice v-if="izbor === 'Vjeronauka'" v-model="izborVjeronauke" :values="opcijeVjeronauka">
      <template #description>Odaberite koju vjeronauku želite da pohađate</template>
    </multiple-choice>
    <p v-if="error" class="text-sm font-open-sans font-light text-red-500">{{error}}</p>
  </div>
</template>

<style scoped>

</style>