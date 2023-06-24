<template>
  <div class="lg:bg-gray-50">
    <div class="lg:grid lg:grid-cols-1 lg:max-w-5xl lg:justify-items-stretch lg:mx-auto">
      <RouterView></RouterView>
    </div>
  </div>

</template>

<script>

export default {
  name: 'App',
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
