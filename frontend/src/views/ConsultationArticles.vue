<template> <!--  v-bind:key="rafraichir" -->
  <Entete />
  <Utilisateur />

  <div class="container text-center">
    <p class="text-decoration-underline fw-bold fs-2 my-4">Consultation de l'article :</p>
  </div>

  <AffichageUnArticle 
    v-bind="article[0]"
    @effacerArticle="suppressionArticle"
  />

  <div v-if="base === 'vide'">
    <CommentaireVide />
  </div>

  <AffichageCommentaires
    v-for="commentaire in commentaires" :key="commentaire.id" 
    v-bind="commentaire"
    @effacerCommentaire="suppressionCommentaire"
  />

  <CreationCommentaire @envoiCommentaire="nouveauCommentaire"/>

  <RetourArticles />
</template>

<script>
import axios from "axios";
import Entete from "../components/Entete.vue"
import Utilisateur from "../components/Utilisateur.vue"
import AffichageUnArticle from "../components/AffichageUnArticle.vue"
import CommentaireVide from "../components/CommentaireVide.vue"
import AffichageCommentaires from "../components/AffichageCommentaires.vue"
import CreationCommentaire from "../components/CreationCommentaire.vue"
import RetourArticles from "../components/RetourArticles.vue"

export default {
  name: "ConsultationArticles",
  props: ['id'],
  // emits: ['rafraichir'],
  components: { 
    Entete,
    Utilisateur,
    AffichageUnArticle,
    CommentaireVide,
    AffichageCommentaires,
    CreationCommentaire,
    RetourArticles 
  },

  data() {
    return {
      article: "",
      commentaires: [],
      base: "plein"
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
        console.log(resultat.data)
      })
      .catch((error) => {
        alert(error);
      })
    axios
      .get("/commentaire/envoiCommentaireUnArticle/" + this.id,
      { headers: {Authorization: utilisateur.token} }
      )
      .then((resultat) => {            
        this.commentaires = resultat.data
        console.log(resultat.data)
      })
      .catch(() => {
        this.base = "vide"
      })
  },

  methods: {
    suppressionArticle() {
      console.log("Suppression d'un article et des commentaires");
      const utilisateur = JSON.parse(localStorage.getItem("Utilisateur"))
      axios
        .delete("/commentaire/supressionTousCommentaires/" + this.id,
        { headers: {Authorization: utilisateur.token}}
        )
        .then((resultat) => {            
          console.log(resultat.data)
        })
        .catch((error) => {
          alert(error);
        });
      axios
        .delete("/article/suppressionArticle/" + this.id,
          { headers: {Authorization: utilisateur.token}}
        )
        .then((resultat) => {            
          console.log(resultat.data)
          this.$router.push("/Articles")
        })
        .catch((error) => {
          alert(error)
        });        
    },

    suppressionCommentaire(suppressionId) {
      console.log("Suppression des commentaires");
      const utilisateur = JSON.parse(localStorage.getItem("Utilisateur"))
      axios
        .delete("/commentaire/supressionUnCommentaire/" + suppressionId,
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

    nouveauCommentaire(nouveauContenue) {
      console.log("Création d'un commentaire")
      const utilisateur = JSON.parse(localStorage.getItem("Utilisateur"))
      axios
        .post("/commentaire/creationCommentaire", {
          id_article: this.id,
          contenue: nouveauContenue          
        },
          { headers: {Authorization: utilisateur.token}}
        )
        .then((resultat) => {            
          console.log(resultat.data)
          // this.$emit("rafraichir")
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