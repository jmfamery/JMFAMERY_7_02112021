<template>
  <div class="container d-flex justify-content-center my-3" v-if="base === 'vide'">
    <div class="card">
      <div class="fondpage">
        <div class="row gx-2">
          <div class="col text-center">        
            <p class="text-white mb-1 mx-2 fs-5">Pas d'article enregisté</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container" >
    <div class="row gy-3">
      <div class="col-lg-4 col-sm-6" v-for="article in articles" :key="article.id">
        <div class="card">
          <div class="fondpage">
            <div class="card-header text-center text-white pt-0">
              <div class="row">
                <div class="col">
                  <div class="card-tilte">
                    <p class="text-decoration-underline text-white fs-4 mb-0">{{article.titre}}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-body py-0">
              <div class="row gx-2" >
                <div class="col-sm-3 bg-white border-end border border-dark">
                  <img class="img-fluid" :src="article.image" :alt="article.image">
                </div>

                <div class="col-sm-9 bg-white border-start border border-dark" >
                  <p class="overflow-hidden mb-1" style="max-height: 8rem">{{article.contenue}}</p>
                </div>
              </div>
            </div>
      
            <div class="card-footer pb-0">
              <div class="row">
                <div class="col text-start text-white">
                  <p class="pb-0">Auteur : {{article.prenom}} {{article.nom}} du {{article.date_creation}}</p>
                </div>
                <div class="col text-end">
                  <button class="btn fondpageClaire fw-bold py-0" @click="consulter(article)">consulter</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>    
    </div>
  </div>

  <!-- <div class="container py-1" v-for="article in articles" :key="article.id">
    <div class="card">
      <div class="fondpage">
        <div class="card-header text-center text-white pt-0">
          <div class="row">
            <div class="col">
              <div class="card-tilte">
                <p class="text-decoration-underline text-white fs-4 mb-0">{{article.titre}}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card-body py-0">
          <div class="row gx-2">
            <div class="col-sm-3 bg-white border-end border border-dark">
              <img class="img-fluid" :src="article.image" :alt="article.image">
            </div>

            <div class="col-sm-9 bg-white border-start border border-dark">
              <p class="overflow-auto mb-1 fs-4">{{article.contenue}}</p>
            </div>
          </div>
        </div>
  
        <div class="card-footer pb-0">
          <div class="row">
            <div class="col text-start text-white">
              <p class="pb-0">Auteur : {{article.prenom}} {{article.nom}} du {{article.date_creation}}</p>
            </div>
            <div class="col text-end">
              <button class="btn fondpageClaire fw-bold py-0" @click="consulter(article)">consulter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
import axios from "axios"

export default {
  name: "AffichageTousArticles",

  data: () => {
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
    consulter(article) {
      console.log(article.id)
      localStorage.setItem("article", JSON.stringify(article))
      this.$router.push("/ConsultationArticles")
    }
  },
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>