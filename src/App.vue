<template>
  <div id="app">
    <Home msg="bienvenue"/>
    
    <Footer msg="hello"/>
  </div>
</template>

<script>
import Home from './components/Home.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Home,
    Footer,
  },
  
}
</script>

<style>

</style>
