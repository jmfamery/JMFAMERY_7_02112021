<template>
  <div div class="container">
    <div class="card">
      <div class="fondpage">
        <div class="card-header text-center text-white pt-0">
          <div class="row gx-2">
            <div class="col">
              <div class="card-tilte">
                <p class="text-decoration-underline fs-4 mb-0">{{article.titre}}</p>
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
              <p class="overflow-auto mb-1">{{article.contenue}}</p>
            </div>
          </div>
        </div>
  
        <div class="card-footer pb-1">
          <div class="row gx-2">
            <div class="col text-start text-white">
              <p class="pb-0">Auteur : {{article.prenom}} {{article.nom}} du {{article.date_creation}}</p>
            </div>
            <div class="col text-end" v-if="(personne.id === article.id_createur) || (personne.moderateur === 1)">
              <button class="btn fondpageClaire pt-0 fw-bold" @click="supprimerTous()">Supprimer l'article</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AffichageUnArticle",

  created() {
    const utilisateur = JSON.parse(localStorage.getItem("Utilisateur"))
    this.personne = utilisateur
    const articles = JSON.parse(localStorage.getItem("article"))
    this.article = articles         
  },

  methods: {
    supprimerTous() {
      console.log("Suppression d'un article et des commentaires");
      const utilisateur = JSON.parse(localStorage.getItem("Utilisateur"))
      axios
        .delete("/commentaire/supressionTousCommentaires/" + this.article.id,
        { headers: {Authorization: utilisateur.token}}
        )
        .then((resultat) => {            
          console.log(resultat.data)
        })
        .catch((error) => {
          alert(error);
        });
      axios
        .delete("/article/suppressionArticle/" + this.article.id,
          { headers: {Authorization: utilisateur.token}}
        )
        .then((resultat) => {            
          console.log(resultat.data),
          localStorage.removeItem("article"),
          this.$router.push("/Articles")
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