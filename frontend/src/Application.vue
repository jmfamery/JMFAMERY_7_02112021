<template>
  <div>
    <Entete/>
    <Accueil/>
  </div>
</template>

<script>
import Entete from './components/Entete.vue'
import Accueil from './components/Accueil.vue'

export default {
  name: 'Application',
  components: {
    Entete,
    Accueil
  }
}
</script>