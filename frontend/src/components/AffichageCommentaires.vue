<template>
  <div class="container my-2">
    <div class="card">
      <div class="fondpage">
        <div class="card-header text-start text-white">
          <div class="row gx-2">
            <div class="col text-start">
              <p class="mb-0">{{prenom}} {{nom}} du {{date_creation}}</p>
            </div>
            <div class="col text-end" v-if="(personne.id === id_createur) || (personne.moderateur === 1)">
              <button class="btn fondpageClaire pt-0 fw-bold" @click="supprimerCommentaire(id)">Supprimer le commentaire</button>
            </div>
          </div>
        </div>

        <div class="card-body py-0">
          <div class="row gx-2">
            <div class="col bg-white">
              <p class="overflow-auto mb-1">{{contenue}}</p>
            </div>
          </div>
        </div>
        
        <div class="card-footer py-1">
          <div class="row">
          </div>
        </div>        
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AffichageCommentaires",

  props: [
    "id",
    "id_article",
    "id_createur",
    "date_creation",
    "contenue",
    "nom",
    "prenom"
  ],

  created() {
    const utilisateur = JSON.parse(localStorage.getItem("Utilisateur"))
    this.personne = utilisateur
  },

  methods: {
    supprimerCommentaire(id) {
      console.log("Suppression des commentaires");
      console.log(id)
      const utilisateur = JSON.parse(localStorage.getItem("Utilisateur"))
      axios
        .delete("/commentaire/supressionUnCommentaire/" + id,
        { headers: {Authorization: utilisateur.token}}
        )
        .then((resultat) => {            
          console.log(resultat.data),
          location.reload()
        })
        .catch((error) => {
          alert(error);
        });     
    }
  },
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>