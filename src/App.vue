<template>
  <div class="p-5 md:p-10">
    <TheHeader></TheHeader>
    <main class="mt-10 md:mt-16">
      <StudentForm></StudentForm>
    </main>
  </div>
</template>

<script>

import TheHeader from "@/components/Layout/TheHeader.vue";
import StudentForm from "@/components/StudentForm.vue";

export default {
  name: 'App',
  components: {StudentForm, TheHeader},
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
