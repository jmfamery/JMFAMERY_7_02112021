<template>
  <Entete />
  <Utilisateur />

  <div class="container text-center">
    <p class="text-decoration-underline fw-bold fs-2 my-4">Consultation de l'article :</p>
  </div>

  <AffichageUnArticle />
  <AffichageCommentaires />
  <CreationCommentaire />

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
import AffichageUnArticle from "../components/AffichageUnArticle.vue"
import AffichageCommentaires from "../components/AffichageCommentaires.vue"
import CreationCommentaire from "../components/CreationCommentaire.vue"

export default {
  name: "ConsultationArticles",
  components: { 
    Entete,
    Utilisateur,
    AffichageUnArticle,
    AffichageCommentaires,
    CreationCommentaire 
  },

  methods: {   
    retour() {
      localStorage.removeItem("article")
      this.$router.push("/Articles")
    }
  },
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>