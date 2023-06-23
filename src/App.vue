<template>
  <div class="lg:bg-gray-50">
    <div class="lg:grid lg:grid-cols-1 lg:max-w-5xl lg:justify-items-stretch lg:mx-auto">
      <TheHeader></TheHeader>
      <main class="mt-10 md:mt-16 bg-white lg:rounded-xl">
        <StudentForm></StudentForm>
      </main>
    </div>
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
body{
  margin: 0;
  padding: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
