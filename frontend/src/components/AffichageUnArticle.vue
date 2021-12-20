<template>
  <div div class="container">
    <div class="card">
      <div class="fondpage">
        <div class="card-header text-center text-white pt-0">
          <div class="row gx-2">
            <div class="col">
              <div class="card-tilte">
                <h2 class="text-decoration-underline fs-4 mb-0">{{titre}}</h2>
              </div>
            </div>
          </div>
        </div>

        <div class="card-body py-0">
          <div class="row gx-2">
            <div class="col-sm-3 bg-white border-end border border-dark">
              <img class="img-fluid" :src="image" :alt="'image lier au poste'+ titre">
            </div>

            <div class="col-sm-9 bg-white border-start border border-dark">
              <p class="overflow-auto mb-1">{{contenue}}</p>
            </div>
          </div>
        </div>
  
        <div class="card-footer pb-1">
          <div class="row gx-2">
            <div class="col text-start text-white">
              <p class="pb-0">Auteur : {{prenom}} {{nom}} du {{date_creation}}</p>
            </div>
            <div class="col text-end" v-if="(personne.id === id_createur) || (personne.moderateur === 1)">
              <button class="btn fondpageClaire pt-0 fw-bold" @click="supprimerTous()">Supprimer l'article</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AffichageUnArticle",
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

  data() {
    return {
      personne: ""
    }
  },

  // récupération du localStorage des données de l'utilisateur pour le contrôle de la suppression de l'article
  created() {
    const utilisateur = JSON.parse(localStorage.getItem("Utilisateur"))
    this.personne = utilisateur       
  },

  // envoi pour la suppression de l'article
  methods: {
    supprimerTous() {
      this.$emit("effacerArticle")
    }
  },
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>