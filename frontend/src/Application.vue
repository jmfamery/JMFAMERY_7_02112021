<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <Entete/>
  <router-view/>
</template>

<script>
import Entete from './components/Entete.vue'

export default {
  name: 'Application',
  components: {
    Entete
  }
}
</script>