<script setup>

import MultipleChoice from "@/components/UI/MultipleChoice.vue";
import {ref, watch} from "vue";

const emit = defineEmits(['update']);
defineProps(['error']);

const izbor = ref('');
const izborVjeronauke = ref('');

const opcijeVjeronauka = ['Islamska vjeronauka', 'Katolički vjeronauk', 'Pravoslavna vjeronauka', 'Jevrejski vjeronauk']

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
    <p>Odaberite da li želite da pohađate predmet Vjeronauka ili Društvo/kultura/religija</p>
    <multiple-choice v-model="izbor" :values="['Vjeronauka', 'Društvo/kultura/religija']">
      <template #description>Ukoliko odaberete vjeronauku, bit će Vam ponuđene dalje opcije</template>
    </multiple-choice>
    <multiple-choice v-if="izbor === 'Vjeronauka'" v-model="izborVjeronauke" :values="opcijeVjeronauka">
      <template #description>Odaberite koju vjeronauku želite da pohađate</template>
    </multiple-choice>
    <p v-if="error" class="text-sm font-open-sans font-light text-red-500">{{error}}</p>
  </div>
</template>

<style scoped>

</style>