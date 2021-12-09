<template>
  <Logo />
  <div class="container-fluid text-center">
    <p class="fs-3 my-5">Merci de votre visite sur le site intranet</p>
  </div>

  <div div class="container d-flex justify-content-center">
    <div class="card border border-2 rounded-3 " style="width: 30rem">
      <div class="fondpage">
        <div class="card-header text-center text-white">
          <div class="row">
            <div class="col">
              <div class="card-tilte">
                <p class="fs-4">Pour revenir à la page de connexion</p>
                <p class="fs-5">cliquer sur retour</p>
              </div>
            </div>
          </div>
        </div>
  
        <div class="card-footer pb-4">
          <div class="row">
            <div class="col text-center">
              <button class="btn fondpageClaire fw-bold fs-5" @click="retour()">Retour</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "../components/Logo.vue";

export default {
  name: "Deconnexion",
  components: { Logo },
  methods: {
    retour () {
      this.$router.push('/')
    }
  } 
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>