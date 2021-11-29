<template>
  <Entete />
  <div class="container-fluid text-center">
    <h1 class="fw-bold fs-1 pt-5">Groupomania</h1>
    <p class="fw-bold fs-3 mb-5">Consultation d'un article</p>
  </div>

    <div div class="container d-flex justify-content-center">
    <div class="card border border-2 rounded-3" style="width: 80rem">
      <div class="fondpage">
        <div class="card-header text-center text-white pt-4">
          <div class="row">
            <div class="col">
              <div class="card-tilte">
                <p class="text-decoration-underline fs-4">Titre</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card-body py-0 mx-2">
          <div class="row gx-2">
            <div class="col-sm-3 border border-2 border-dark bg-white" style="height: 20rem">
              <p class="img-fluid fs-4">Image</p>
            </div>

            <div class="col-sm-9 border border-2 border-dark bg-white" style="height: 20rem">
              <p class="overflow-auto fs-4">Texte</p>
            </div>
          </div>
        </div>
  
        <div class="card-footer py-4">
          <div class="row">
            <div class="col text-center">
              <button class="btn fondpageClaire fw-bold fs-5" @click="commentaire()">consulter les commentaires</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container my-5" style="width: 20rem">
    <div class="row">
      <div class="fondpage">
        <div class="col text-center my-3">
          <button class="btn fondpageClaire fw-bold fs-5" @click="retour()">Retour à la liste des articles</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Entete from "../components/Entete.vue"

export default {
  name: "Accueil",
  components: { Entete },

  data: () => {
    return {

    }
  },

  methods: {
    consulter() {

    },
    retour() {
      this.$router.push("/Articles")
    }
  },
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>