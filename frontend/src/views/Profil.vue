<template>
  <Entete />  
  <Utilisateur />

  <div class="container-fluid text-center">
    <h1 class="fw-bold fs-3 py-5">Consultation du profil</h1>
  </div>

  <div class="container d-flex justify-content-center">
    <div class="card" style="width: 50rem">
      <div class="fondpage">
        <div class="card-header text-center text-white">
          <div class="row">
            <div class="col">
              <div class="card-tilte">
                <h1>Profil</h1>
              </div>
            </div>
          </div>
        </div>

        <AffichageProfil />

        </div>
    </div>
  </div>

  <div class="container d-flex justify-content-center my-5">
    <div class="card">
      <div class="fondpage">
        <div class="row">
          <div class="col text-center my-2">
            <button class="btn fondpageClaire fw-bold mx-2 mt-0 fs-5" @click="retour()">Retour à la liste des articles</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Entete from "../components/Entete.vue"
import Utilisateur from "../components/Utilisateur.vue"
import AffichageProfil from "../components/AffichageProfil.vue"

export default {
  name: "Profil",
  components: { 
    Entete,
    Utilisateur,
    AffichageProfil
  },

  methods: {
    retout() {
      this.$router.push("/Articles")
    }
  },
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>