<template>
  <Entete />  
  <Utilisateur />

  <div v-if="base === 'vide'">
    <ArticlesVide />
  </div>

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
  
  <div class="container" >
    <div class="row gy-3">
      <AffichageTousArticles
        v-for="article in articles" :key="article.id"
        v-bind="article" 
      />
    </div>
  </div>  
</template>

<script>
import axios from "axios"
import Entete from "../components/Entete.vue"
import Utilisateur from "../components/Utilisateur.vue"
import ArticlesVide from "../components/ArticlesVide.vue"
import AffichageTousArticles from "../components/AffichageTousArticles.vue"

export default {
  name: "Articles",
  props:['id'],
  components: { 
    Entete,
    Utilisateur,
    ArticlesVide,
    AffichageTousArticles
  },

  data() {
    return {
      articles: [],
      base: "plein"
    }
  },

  created() {
    const utilisateur = JSON.parse(localStorage.getItem("Utilisateur"))
    axios
      .get("/article/envoiTousArticles", 
      { headers: {Authorization: utilisateur.token} }
      )
      .then((resultat) => {            
        this.articles=resultat.data
        console.log(resultat.data)
      })
      .catch(() => {
        this.base = "vide"
      });   
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