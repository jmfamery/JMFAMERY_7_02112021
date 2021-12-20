<template>
  <Entete />
  <Utilisateur />

  <div class="container text-center">
    <h1 class="text-decoration-underline fw-bold fs-2 my-4">Création d'un article</h1>
  </div>

  <CreationArticle @creationArticle="nouveauArticle"/>

  <RetourArticles />
</template>

<script>
import axios from "axios"
import Entete from "../components/Entete.vue"
import Utilisateur from "../components/Utilisateur.vue"
import CreationArticle from "../components/CreationArticle.vue"
import RetourArticles from "../components/RetourArticles.vue"

export default {
  name: "CreerArticles",
  components: { 
    Entete,
    Utilisateur,
    CreationArticle,
    RetourArticles 
  },

  // Creation d'un nouveau article
  methods: {
    nouveauArticle(titre, image, contenue) {
      const utilisateur = JSON.parse(localStorage.getItem("Utilisateur"))
      const articleDonnees = new FormData()
      articleDonnees.append("titre", titre)
      articleDonnees.append("image", image)
      articleDonnees.append("contenue", contenue)
      axios
        .post("/article/creationArticle", articleDonnees,
          { headers: {Authorization: utilisateur.token}}
        )
        .then((resultat) => {            
          console.log(resultat.data),
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