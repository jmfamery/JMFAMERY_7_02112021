<template>
	<div div class="container pt-4 pb-0">
    <div class="card border">
      <div class="fondpage">
        <div class="card-header text-white">
          <div class="row gx-2">
            <div class="col text-start pt-1">
              <p class="pt-1 mb-0 fs-4">Veuillez saisir votre article</p>
            </div>
            <div class="col text-end pt-2">
              <button class="btn fondpageClaire pt-1 mb-0 fw-bold" @click="creation()">Validation de l'article</button>
            </div>
          </div>
        </div>

        <div class="card-body py-0">
          <div class="row gx-2">
            <div class="col-sm-12">
              <input
                class="form-control my-2"
                type="text"
                placeholder="Titre de l'article"
                id="titre"
                required
                maxlength="100"
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
             <textarea
                class="form-control my-2"
                type="text"
                placeholder="Texte de l'article"
                id="texte"
                required
                maxlength="1000"
                aria-label="Entrez votre texte de l'article"
                v-model="contenue">
              </textarea>
              <div class="col text-center bg-white rounded mt-1" v-if="this.entreeContenue === false">
                <p class="text-danger mx-1"><strong>Veuillez saisir votre article</strong></p>
              </div>              
            </div>
          </div>
        </div>
  
        <div class="card-footer py-2">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreationArticles",

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
            location.reload()
            
          })
          .catch((error) => {
            alert(error);
          }); 
      }  
    }
  },
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>