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
              <img class="img-fluid" :src="article.image" :alt="article.image">
            </div>

            <div class="col-sm-9 border border-2 border-dark bg-white" style="height: 20rem">
              <p class="overflow-auto fs-4">{{article.contenue}}</p>
            </div>
          </div>
        </div>
  
        <div class="card-footer py-4">
          <div class="row">
            <div class="col text-center">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container d-flex justify-content-center my-5" v-if="message !== ''">
    <div class="card border border-2 rounded-3" style="width: 80rem">
      <div class="fondpage">
        <div class="row">
          <div class="col-sm-12 text-center my-3">        
            <p class="text-white fs-4">{{message}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container d-flex justify-content-center my-5" v-for="commentaire in commentaires" :key="commentaire.id">
    <div class="card border border-2 rounded-3" style="width: 80rem">
      <div class="fondpage">
        <div class="card-header text-center text-white pt-4">
          <div class="row">
            <div class="col">
              <div class="card-tilte">
                <p class="text-decoration-underline fs-4">Commentaires</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card-body py-0 mx-2">
          <div class="row gx-2">
            <div class="col border border-2 border-dark bg-white">
              <p class="overflow-auto fs-4">{{commentaire.contenue}}</p>
            </div>
          </div>
        </div>
        
        <div class="card-footer py-4">
          <div class="row">
            <div class="col text-center">
            </div>
          </div>
        </div>        
      </div>
    </div>
  </div>

  <div class="container d-flex justify-content-center my-5">
    <div class="card border border-2 rounded-3" style="width: 80rem">
      <div class="fondpage">
        <div class="card-header text-center text-white pt-4">
          <div class="row">
            <div class="col">
              <div class="card-tilte">
                <p class="text-decoration-underline fs-4">Commentaires</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card-body py-0 mx-2">
          <div class="row gx-2">
            <div class="col">
              <input
                class="form-control my-2"
                type="text"
                placeholder="Commentaire de l'article"
                id="text"
                required
                maxlength="250"
                aria-label="Entrez votre texte de l'article"
                v-model="contenue"
              />
            </div>
          </div>
        </div>
        
        <div class="card-footer py-4">
          <div class="row">
            <div class="col text-center">
              <button class="btn fondpageClaire fw-bold fs-5" @click="valideCommentaire()">valider le commentaire</button>
            </div>
          </div>
        </div>        
      </div>
    </div>
  </div>

  <div class="container d-flex justify-content-center my-5">
    <div class="card border border-2 rounded-3" style="width: 80rem">
      <div class="fondpage">
        <div class="row">
          <div class="col-sm-6 text-center my-3">        
            <button class="btn fondpageClaire fw-bold fs-5" @click="supprimer()">Supprimer l'article</button>
          </div>

          <div class="col-sm-6 text-center my-3">
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

export default {
  name: "ConsultationArticles",
  components: { Entete },

  data: () => {
    return {  
      commentaires: [],
      contenue: "",
      message: ""
    }
  },

  created() {
    const articles = JSON.parse(localStorage.getItem("article"))
    this.article = articles
    const utilisateur = JSON.parse(localStorage.getItem("Utilisateur"))
    axios
      .get("/commentaire/envoiCommentaireUnArticle/" + this.article.id,
      { headers: {Authorization: utilisateur.token} }
      )
      .then((resultat) => {            
        this.commentaires=resultat.data
        console.log(resultat.data)
      })
      .catch(() => {
        this.message = "Pas de commentaire"
      });   
  },

  methods: {
    valideCommentaire() {
      console.log("Création d'un commentaire")
      const utilisateur = JSON.parse(localStorage.getItem("Utilisateur"))
      const date = new Date()
      const date_creation = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
      axios
        .post("/commentaire/creationCommentaire", {
          id_article: this.article.id,
          id_createur: utilisateur.id,
          date_creation: date_creation,
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
    },

    supprimer() {
      console.log("Suppression d'un article");
      const utilisateur = JSON.parse(localStorage.getItem("Utilisateur"))
      console.log("article id : ",this.article.id)
      // if (this.message !== '') {
        axios
          .delete("/commentaire/supressionCommentaire/" + this.article.id,
          { headers: {Authorization: utilisateur.token}}
          )
          .then((resultat) => {            
            console.log(resultat.data),
            location.reload()
          })
          .catch((error) => {
            alert(error);
          });
      // }
      // axios
      //   .delete("/article/suppressionArticle/" + this.article.id,
      //     { headers: {Authorization: utilisateur.token}}
      //   )
      //   .then((resultat) => {            
      //     console.log(resultat.data),
      //     localStorage.removeItem("article"),
      //     this.$router.push("/Articles")
      //   })
      //   .catch((error) => {
      //     alert(error);
      //   });
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