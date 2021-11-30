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
                <p class="text-decoration-underline fs-4">{{article.titre}}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card-body py-0 mx-2">
          <div class="row gx-2">
            <div class="col-sm-3 border border-2 border-dark bg-white" style="height: 20rem">
              <p class="img-fluid"><img :src="article.image" :alt="article.image"></p>
            </div>

            <div class="col-sm-9 border border-2 border-dark bg-white" style="height: 20rem">
              <p class="overflow-auto fs-4">{{article.contenue}}</p>
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
// import axios from "axios"
import Entete from "../components/Entete.vue"

export default {
  name: "Accueil",
  components: { Entete },

  data: () => {
    return {  
      article: []
    }
  },

  created() {
    const articles = JSON.parse(localStorage.getItem("article"))
    this.article = articles  
    },

  methods: {
    commentaire() {

    },
    retour() {
      localStorage.removeItem("article")
      this.$router.push("/Articles")
    }
  },
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>