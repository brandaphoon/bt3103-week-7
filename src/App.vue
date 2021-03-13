<template>
  <div id="app">
    <h1 id="header">Branda's Zi Char</h1>
    <br>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>

#header {
  text-align: center;
  color: white;
  background-color: darkslateblue;
}

</style>
