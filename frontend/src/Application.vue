<template>
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

<!-- <div id="nav">
  <router-link to="/">Home</router-link> |
  <router-link to="/about">About</router-link>
</div> -->