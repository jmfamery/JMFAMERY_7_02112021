<template>
  <Entete />
  <Utilisateur />

  <div class="container text-center">
    <h1 class="text-decoration-underline fw-bold fs-2 my-4">Création d'un article</h1>
  </div>

  <CreationArticle />

  <div class="container d-flex justify-content-center my-5">
    <div class="row">
      <div class="fondpage">
        <div class="col text-center my-2">
          <button class="btn fondpageClaire fw-bold mx-0 fs-5" @click="retour()">Retour à la liste des articles</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Entete from "../components/Entete.vue"
import Utilisateur from "../components/Utilisateur.vue"
import CreationArticle from "../components/CreationArticle.vue"

export default {
  name: "CreerArticles",
  components: { 
    Entete,
    Utilisateur,
    CreationArticle 
  },

  methods: {
    retour() {
      this.$router.push("/Articles")
    }
  },
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>