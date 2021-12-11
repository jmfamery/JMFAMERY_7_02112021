<template>
  <div class="container d-flex justify-content-center my-3" v-if="base === 'vide'">
    <div class="card">
      <div class="fondpage">
        <div class="row gx-2">
          <div class="col text-center">        
            <p class="text-white mb-1 mx-2 fs-5">Pas de commentaire enregisté</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container my-2" v-for="commentaire in commentaires" :key="commentaire.id">
    <div class="card">
      <div class="fondpage">
        <div class="card-header text-start text-white">
          <div class="row gx-2">
            <div class="col text-start">
              <p class="mb-0">{{commentaire.prenom}} {{commentaire.nom}} du {{commentaire.date_creation}}</p>
            </div>
            <div class="col text-end" v-if="(personne.id === commentaire.id_createur) || (personne.moderateur === 1)">
              <button class="btn fondpageClaire pt-0 fw-bold" @click="supprimerCommentaire(commentaire.id)">Supprimer le commentaire</button>
            </div>
          </div>
        </div>

        <div class="card-body py-0">
          <div class="row gx-2">
            <div class="col bg-white">
              <p class="overflow-auto mb-1 fs-5">{{commentaire.contenue}}</p>
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

  data: () => {
    return {  
      commentaires: [],
      base: "plein"
    }
  },

  created() {
    const utilisateur = JSON.parse(localStorage.getItem("Utilisateur"))
    this.personne = utilisateur
    const articles = JSON.parse(localStorage.getItem("article"))
    this.article = articles    
    axios
      .get("/commentaire/envoiCommentaireUnArticle/" + this.article.id,
      { headers: {Authorization: utilisateur.token} }
      )
      .then((resultat) => {            
        this.commentaires=resultat.data
        console.log(resultat.data)
      })
      .catch(() => {
        this.base = "vide"
      });      
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