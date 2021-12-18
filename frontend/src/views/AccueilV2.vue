<template>
  <Logo />
  
  <div class="container-fluid text-center">
    <p class="fw-bold fs-2 my-5">Bienvenue sur le site Intranet</p>
  </div>



  <div class="container d-flex justify-content-center">
    <div class="card" style="width: 50rem">
      <div class="fondpage">
          <TitreAccueil 
          v-bind="titreAccueil[0]" 
          @selection="choix"
          />

        <div v-if="titreAccueil[0].accueil === 'connexion'">
          <Connexion />
        </div>
        
        <div v-if="titreAccueil[0].accueil === 'inscription'">
          <Inscription />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "../components/Logo.vue"
import TitreAccueil from "../components/TitreAccueil.vue"
import Connexion from "../components/Connexion.vue"
import Inscription from "../components/Inscription.vue"

export default {
  name: "Accueil",
  props: ['id'],
  components: { 
    Logo,
    TitreAccueil,
    Connexion,
    Inscription
  },

  data: () => {
    return {
      titreAccueil: [{
        accueil: "connexion"
      }]
    }
  },

  methods: {
    choix(selection) {
      this.titreAccueil[0].accueil = selection
      console.log(selection)
    }
  }
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>