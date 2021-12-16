<template>
  <div class="col-lg-4 col-sm-6"> 
    <div class="card">
      <div class="fondpage">
        <div class="card-header text-center text-white pt-0">
          <div class="row">
            <div class="col">
              <div class="card-tilte">
                <p class="text-decoration-underline text-white fs-4 mb-0">{{titre}}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card-body py-0">
          <div class="row gx-2" >
            <div class="col-sm-3 bg-white border-end border border-dark">
              <img class="img-fluid" :src="image" :alt="image">
            </div>

            <div class="col-sm-9 bg-white border-start border border-dark" >
              <p class="overflow-hidden mb-1" style="max-height: 8rem">{{contenue}}</p>
            </div>
          </div>
        </div>
  
        <div class="card-footer pb-0">
          <div class="row">
            <div class="col text-start text-white">
              <p class="pb-0">Auteur : {{prenom}} {{nom}} du {{date_creation}}</p>
            </div>
            <div class="col text-end">
              <button class="btn fondpageClaire fw-bold py-0" @click="consulter(id)">consulter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>   
</template>

<script>
// import axios from "axios"

export default {
  name: "AffichageTousArticles",
  props: [
    "id",
    "titre",
    "image",
    "contenue",
    "id_createur",
    "date_creation",
    "nom",
    "prenom"
  ],

  data: () => {
    return {
      articles: [],
      base: "plein"
    }
  },

  methods: {
    consulter(id) {
      console.log(id)      
      this.$router.push("/ConsultationArticles/" + id)
    }
  },
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>