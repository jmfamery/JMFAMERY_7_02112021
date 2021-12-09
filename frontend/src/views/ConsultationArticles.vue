<template>
  <Entete />
  <Utilisateur />
  <div class="container text-center">
    <p class="text-decoration-underline fw-bold fs-2 my-4">Consultation de l'article :</p>
  </div>

    <div div class="container justify-content-center">
    <div class="card">
      <div class="fondpage">
        <div class="card-header text-center text-white pt-0">
          <div class="row">
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
              <p class="overflow-auto mb-1 fs-4">{{article.contenue}}</p>
            </div>
          </div>
        </div>
  
        <div class="card-footer pt-1 pb-0">
          <div class="row">
            <div class="col text-start text-white">
              <p class="pb-0">Auteur : {{article.prenom}} {{article.nom}} du {{article.date_creation}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container justify-content-center my-3" v-if="base === 'vide'">
    <div class="card">
      <div class="fondpage">
        <div class="row">
          <div class="col text-center">        
            <p class="text-white mb-1 fs-5">Pas de commentaire enregisté</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container my-1" v-for="commentaire in commentaires" :key="commentaire.id">
    <div class="card">
      <div class="fondpage">
        <div class="card-header text-start text-white">
          <div class="row">
            <div class="col">
              <div class="card-tilte">
                <p class="mb-0 fs-5">{{commentaire.prenom}} {{commentaire.nom}} du {{commentaire.date_creation}}</p>
              </div>
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
        
        <div class="card-footer py-2">
          <div class="row">
            <div class="col text-center" v-if="(personne.id === commentaire.id_createur) || (personne.moderateur === 1)">
              <button class="btn fondpageClaire pt-0 fw-bold fs-5" @click="supprimerCommentaire(commentaire.id)">Supprimer le commentaire</button>
            </div>
          </div>
        </div>        
      </div>
    </div>
  </div>

  <div class="container justify-content-center my-5">
    <div class="card">
      <div class="fondpage">
        <div class="card-header text-center text-white">
          <div class="row">
            <div class="col">
              <div class="card-tilte">
                <p class="mb-0 fs-4">Saisir un commentaires</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card-body py-0">
          <div class="row">
            <div class="col">
              <input
                class="form-control my-0"
                type="text"
                placeholder="Commentaire de l'article"
                id="text"
                required
                maxlength="250"
                aria-label="Entrez votre texte de l'article"
                v-model="contenue"
              />
              <div class="col text-center bg-white rounded mt-1" v-if="this.entreeContenue === false">
                <p class="text-danger mx-1"><strong>Veuillez saisir votre commentaire</strong></p>
              </div>  
            </div>
          </div>
        </div>
        
        <div class="card-footer py-2">
          <div class="row">
            <div class="col text-center">
              <button class="btn fondpageClaire pt-0 fw-bold fs-5" @click="valideCommentaire()">valider le commentaire</button>
            </div>
          </div>
        </div>        
      </div>
    </div>
  </div>

  <div class="container justify-content-center my-5">
    <div class="card">
      <div class="fondpage">
        <div class="row" v-if="(personne.id === article.id_createur) || (personne.moderateur === 1)">
          <div class="col-sm-6 text-center my-1" >        
            <button class="btn fondpageClaire fw-bold fs-5" @click="supprimerTous()">Supprimer l'article</button>
          </div>

          <div class="col-sm-6 text-center my-1">
            <button class="btn fondpageClaire fw-bold fs-5" @click="retour()">Retour à la liste des articles</button>
          </div>
        </div>
        <div class="row" v-else>
          <div class="col text-center my-1">
            <button class="btn fondpageClaire fw-bold fs-5" @click="retour()">Retour à la liste des articles</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Entete from "../components/Entete.vue"
import Utilisateur from "../components/Utilisateur.vue"

export default {
  name: "ConsultationArticles",
  components: { 
    Entete,
    Utilisateur 
  },

  data: () => {
    return {  
      commentaires: [],
      contenue: "",
      base: "plein",
      entreeContenue: true
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
    valideCommentaire() {
      console.log("Création d'un commentaire")
      const utilisateur = JSON.parse(localStorage.getItem("Utilisateur"))
      this.entreeContenue=Boolean(this.contenue)
      if (this.contenue) {
        axios
          .post("/commentaire/creationCommentaire", {
            id_article: this.article.id,
            contenue: this.contenue          
          },
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

    supprimerTous() {
      console.log("Suppression d'un article et des commentaires");
      const utilisateur = JSON.parse(localStorage.getItem("Utilisateur"))
      if (this.base === 'plein') {
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
      }
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
    },

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