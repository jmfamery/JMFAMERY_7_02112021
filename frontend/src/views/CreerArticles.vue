<template>
  <Entete />
  <div class="container-fluid text-center">
    <h1 class="fw-bold fs-1 py-5">Groupomania</h1>
  </div>

    <div div class="container d-flex justify-content-center">
    <div class="card border" style="width: 80rem">
      <div class="fondpage">
        <div class="card-header">
          <div class="row">
            <p class="text-center text-white fs-3 mb-0">Création d'un article</p>
          </div>
        </div>

        <div class="card-body py-0 mx-2">
          <div class="row gx-2">
            <div class="col-sm-12">
              <input
                class="form-control my-2"
                type="text"
                placeholder="Titre de l'article"
                id="titre"
                required
                maxlength="30"
                aria-label="Entrez votre titre de l'article"
                v-model="titre"
              />
              <div class="col text-center bg-white rounded mt-1" v-if="this.entreeTitre === false">
                <p class="text-danger mx-1"><strong>Veuillez entrer un titre</strong></p>
              </div>
            </div>

            <div class="col-sm-12">
             <input
                class="form-control my-2"
                type="file"
                id="image"
                required
                v-on:change="imageBrut($event)"
              />
              <div class="col text-center bg-white rounded mt-1" v-if="this.entreeImage === false">
                 <p class="text-danger mx-1"><strong>Veuillez selectionner un fichier type png, jpeg, jpg ou gif</strong></p>
               </div>
            </div>

            <div class="col-sm-12">
             <input
                class="form-control my-2"
                type="text"
                placeholder="Texte de l'article"
                id="texte"
                required
                maxlength="250"
                aria-label="Entrez votre texte de l'article"
                v-model="contenue"
              />
              <div class="col text-center bg-white rounded mt-1" v-if="this.entreeContenue === false">
                <p class="text-danger mx-1"><strong>Veuillez saisir votre article</strong></p>
              </div>              
            </div>
          </div>
        </div>
  
        <div class="card-footer py-4">
          <div class="row">
            <div class="col text-center">
              <button class="btn fondpageClaire fw-bold fs-5" @click="creation()">Validation de l'article</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container my-5" style="width: 20rem">
    <div class="row">
      <div class="fondpage">
        <div class="col text-center my-3">
          <button class="btn fondpageClaire fw-bold fs-5" @click="retour()">Retour à la liste des articles</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Entete from "../components/Entete.vue"

export default {
  name: "CreerArticles",
  components: { Entete },

  data: () => {
    return {
      titre: "",
      image: "",
      contenue: "",
      entreeTitre: true,
      entreeImage: true,
      entreeContenue: true
    }
  },

  methods: {
    imageBrut(event) {
      this.image = event.target.files[0]
    },
    creation() {
      console.log("Création d'un article")
      this.entreeTitre=Boolean(this.titre)
      const typeFormat = {
        'image/jpg': 'jpg',
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif'
      }
      this.entreeImage =Boolean(typeFormat[this.image.type])
      this.entreeContenue=Boolean(this.contenue)    
      console.log("Titre ",this.entreeTitre,"image ",this.entreeImage,"contenue ",this.entreeContenue)
      if (this.entreeTitre && this.entreeImage && this.entreeContenue) {
        const utilisateur = JSON.parse(localStorage.getItem("Utilisateur"))
        const articleDonnees = new FormData()
        articleDonnees.append("titre", this.titre)
        articleDonnees.append("image", this.image)
        articleDonnees.append("contenue", this.contenue)
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

    retour() {
      this.$router.push("/Articles")
    }
  },
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>