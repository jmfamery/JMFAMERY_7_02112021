<template>
  <Entete />
  <Utilisateur />

  <div class="container text-center">
    <p class="text-decoration-underline fw-bold fs-2 my-4">Consultation de l'article :</p>
  </div>

  <AffichageUnArticle v-bind="article[0]"/>
  <AffichageCommentaires 
    v-for="commentaire in commentaires" :key="commentaire.id" 
    v-bind="commentaire"
  />
  <CreationCommentaire v-bind="articleId[0]"/>

  <div class="container d-flex justify-content-center my-5">
    <div class="card">
      <div class="fondpage">
        <div class="row">
          <div class="col text-center my-2">
            <button class="btn fondpageClaire fw-bold mx-2 mt-0 fs-5" @click="retour()">Retour à la liste des articles</button>
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
import AffichageUnArticle from "../components/AffichageUnArticle.vue"
import AffichageCommentaires from "../components/AffichageCommentaires.vue"
import CreationCommentaire from "../components/CreationCommentaire.vue"

export default {
  name: "ConsultationArticles",
  props:['id'],
  components: { 
    Entete,
    Utilisateur,
    AffichageUnArticle,
    AffichageCommentaires,
    CreationCommentaire 
  },

  data() {
    return {
      article: "",
      articleId: "",
      commentaires: []
    }
  },

  created() {
    const utilisateur = JSON.parse(localStorage.getItem("Utilisateur"))
    console.log(this.id)
    axios
      .get("/article/envoiUnArticle/" + this.id,
      { headers: {Authorization: utilisateur.token}}
      )
      .then((resultat) => {            
        this.article = resultat.data
        this.articleId = resultat.data
        console.log(resultat.data)
      })
      .catch((error) => {
        alert(error);
      });
    axios
      .get("/commentaire/envoiCommentaireUnArticle/" + this.id,
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
    retour() {
      this.$router.push("/Articles")
    }
  },
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>