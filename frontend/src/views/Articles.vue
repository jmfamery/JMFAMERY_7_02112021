<template>
  <Entete />  
  <Utilisateur />

  <div class="container text-center">    
    <h1 class="text-decoration-underline fw-bold fs-2 my-4">Liste des articles :</h1>    
  </div>

  <AffichageTousArticles />
  <CreationArticle />
</template>

<script>
import Entete from "../components/Entete.vue"
import Utilisateur from "../components/Utilisateur.vue"
import AffichageTousArticles from "../components/AffichageTousArticles.vue"
import CreationArticle from "../components/CreationArticle.vue"

export default {
  name: "Articles",
  components: { 
    Entete,
    Utilisateur,
    AffichageTousArticles,
    CreationArticle 
  }
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>