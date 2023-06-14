<template>
  <TheHeader></TheHeader>
  <base-input required v-model="test">Ime</base-input>
</template>

<script>

import TheHeader from "@/components/TheHeader.vue";
import BaseInput from "@/components/BaseInput.vue";

export default {
  name: 'App',
  components: {BaseInput, TheHeader},
  data(){
    return {
      test: '',
    }
  },
  watch: {
    test(){
      console.log(this.test);
    }
  }
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
