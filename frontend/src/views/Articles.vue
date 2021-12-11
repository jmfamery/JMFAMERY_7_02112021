<template>
  <Entete />  
  <Utilisateur />

  <div class="container mt-4 mb-0" style="width: 12rem">
    <div class="row">
      <div class="fondpage">
        <div class="col text-center my-0">
          <button class="btn fondpageClaire my-2 fw-bold fs-5" @click="creer()">créer un article</button>
        </div>
      </div>
    </div>
  </div>

  <div class="container text-center">    
    <h1 class="text-decoration-underline fw-bold fs-2 my-4">Liste des articles :</h1>    
  </div>
  
  <AffichageTousArticles />
  
</template>

<script>
import Entete from "../components/Entete.vue"
import Utilisateur from "../components/Utilisateur.vue"
import AffichageTousArticles from "../components/AffichageTousArticles.vue"

export default {
  name: "Articles",
  components: { 
    Entete,
    Utilisateur,
    AffichageTousArticles
  },

  methods: {
    creer() {
      this.$router.push("/CreerArticles")
    }
  },
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>