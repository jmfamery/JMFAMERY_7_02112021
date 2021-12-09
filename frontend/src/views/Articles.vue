<template>
  <Entete />
  <Utilisateur />
  <div class="container-fluid text-center">    
    <h1 class="fw-bold fs-2 my-4">Liste des articles</h1>    
  </div>

  <div class="container d-flex justify-content-center py-2" v-for="article in articles" :key="article.id">
    <div class="card border border-2 rounded-3" style="width: 50rem">
      <div class="fondpage">
        <div class="card-header text-center text-white pt-2 pb-0">
          <div class="row">
            <div class="col">
              <div class="card-tilte">
                <p class="text-decoration-underline text-white fs-5">{{article.titre}} de {{article.prenom}} {{article.nom}} du {{article.date_creation}}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card-body py-0 mx-2">
          <div class="row gx-2">
            <div class="col-sm-3 border border-2 border-dark bg-white" style="height: 5rem">
              <img class="img-fluid" :src="article.image" :alt="article.image">
            </div>

            <div class="col-sm-9 border border-2 border-dark bg-white" style="height: 5rem">
              <p class="overflow-auto">{{article.contenue}}</p>
            </div>
          </div>
        </div>
  
        <div class="card-footer py-2">
          <div class="row">
            <div class="col text-center">
              <button class="btn fondpageClaire fw-bold fs-5" @click="consulter(article)">consulter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container my-5" style="width: 12rem">
    <div class="row">
      <div class="fondpage">
        <div class="col text-center my-3">
          <button class="btn fondpageClaire fw-bold fs-5" @click="creer()">créer un article</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import Entete from "../components/Entete.vue"
import Utilisateur from "../components/Utilisateur.vue"

export default {
  name: "Articles",
  components: { 
    Entete,
    Utilisateur 
  },

  data: () => {
    return {
      articles: []
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
        this.$router.push("/CreerArticles")
      });   
    },

  methods: {
    consulter(article) {
      console.log(article.id)
      localStorage.setItem("article", JSON.stringify(article))
      this.$router.push("/ConsultationArticles")
    },
    creer() {
      this.$router.push("/CreerArticles")
    }
  },
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>