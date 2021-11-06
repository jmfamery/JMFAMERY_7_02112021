<template>
  <div>
    <Header/>
    <Accueil/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Accueil from './components/Accueil.vue'

export default {
  name: 'Application',
  components: {
    Header,
    Accueil
  }
}
</script>