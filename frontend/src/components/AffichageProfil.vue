<template> 
  <div class="card-body py-2 mx-2">
    <div class="row">
      <div class="col-sm-6 pt-3">
        <p class="bg-white rounded px-2">{{this.personne.nom}}</p>
      </div>

      <div class="col-sm-6 pt-3">
        <p class="bg-white rounded px-2">{{this.personne.prenom}}</p>
      </div>
    </div>
  </div>

  <div class="card-body py-3 mx-2">
    <div class="row">
      <div class="col-sm-6 pt-3">
        <p class="bg-white rounded px-2">{{this.personne.email}}</p>
      </div>

      <div class="col-sm-6 pt-3">
        <p class="bg-white rounded px-2" v-if="this.personne.moderateur == '0'">Pas modérateur</p>
        <p class="bg-white rounded px-2" v-if="this.personne.moderateur == '1'">Modérateur</p>
      </div>
    </div>
  </div>
  
  <div class="card-footer pb-4">
    <div class="row">
      <div class="col text-center">
        <button class="btn fondpageClaire fw-bold fs-4" @click="modifierProfil()">Modication du profil</button>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "AffichageProfile",

  data: () => {
    return {
      nom: "",
      prenom: "",
      moderateur: false,
      entreeNom: true,
      entreePrenom: true,
    };
  },

created() {
  const utilisateur = JSON.parse(localStorage.getItem("Utilisateur"))
  this.personne = utilisateur
  console.log(this.personne)
},

  methods: {
    modifierProfil() {  
      console.log("Création du compte");
      const nomRegex = /[a-zA-Z-'`]+[ a-zA-Z-'`]{1,30}$/
      this.entreeNom = nomRegex.test(this.nom)
      this.entreePrenom = nomRegex.test(this.prenom)
      console.log(this.entreeNom," prenom ",this.entreePrenom)      
      if (this.entreeNom && this.entreePrenom) {
    //     axios
    //       .post("/utilisateur/inscrire", {
    //         email: this.email,
    //         mot_passe: this.mot_passe,
    //         nom: this.nom,
    //         prenom: this.prenom,
    //         moderateur: this.moderateur
    //       })
    //       .then((resultat) => {            
    //         localStorage.setItem("Utilisateur", JSON.stringify(resultat.data)),
    //         console.log(resultat.data),
    //         alert("Votre compte a été créé")
    //         location.reload()
    //       })
    //       .catch((error) => {
    //         alert(error);
    //       });  
      } 
    }
  },
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>