<template>
  <div class="container-fluid">
    
    <!-- Mes article -->
    <div class="container-fluid">
        <Articles />
    </div>
  </div>
</template>

<script>

//import componante
  import Articles from './Articles'

  export default {
    name: 'Home',
    components: {
      Articles
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
