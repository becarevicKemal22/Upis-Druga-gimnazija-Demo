<template>
  <div class="p-5 md:p-10">
    <TheHeader></TheHeader>
    <main class="mt-10 md:mt-16">
      <base-input required>Ime</base-input>
    </main>
  </div>
</template>

<script>

import TheHeader from "@/components/TheHeader.vue";
import BaseInput from "@/components/BaseInput.vue";

export default {
  name: 'App',
  components: {BaseInput, TheHeader},
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
