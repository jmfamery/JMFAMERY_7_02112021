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
        <p class="bg-white rounded px-2" v-if="this.personne.moderateur == '0'">Pas modérateur</p>
        <p class="bg-white rounded px-2" v-if="this.personne.moderateur == '1'">Modérateur</p>
      </div>

      <div class="col-sm-6 pt-3">
        <p class="bg-white rounded px-2">{{this.personne.email}}</p>
      </div>
    </div>
  </div>
  
  <div class="card-footer">
    <div class="row">
      <div class="col-sm-6 text-center pb-3">
        <div v-if="this.personne.moderateur == '0'">
          <button class="btn fondpageClaire fw-bold fs-5" @click="modifierModerateur()">Devenir moderateur</button>
        </div>
        <div v-if="this.personne.moderateur == '1'">
          <button class="btn fondpageClaire fw-bold fs-5" @click="modifierModerateur()">Retirer moderateur</button>
        </div>
      </div>

      <div class="col-sm-6 text-center pb-3">
        <button class="btn fondpageClaire fw-bold fs-5"  @click="suppressionProfil()">Suppression du profil</button>
      </div>      
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AffichageProfile",

  data: () => {
    return {
      moderateur: 0
    };
  },

created() {
  const utilisateur = JSON.parse(localStorage.getItem("Utilisateur"))
  this.personne = utilisateur
  this.moderateur = utilisateur.moderateur
  console.log(this.personne)
},

methods: {
  // modification du profil moderateur
  modifierModerateur() {  
    console.log("Modification de modérateur")
    const utilisateur = JSON.parse(localStorage.getItem("Utilisateur"))
    if (this.moderateur === 0) {this.moderateur = 1} else {this.moderateur = 0}     
    axios
      .put("/utilisateur/modification/" + this.personne.id,
        { moderateur: this.moderateur }, 
        { headers: {Authorization: utilisateur.token}}        
      )
      .then((resultat) => {            
        console.log(resultat.data)
        if (this.moderateur === 1) {
          alert("Votre profil a été modifier, vous est modérateur \nVous devez vous reconnecter pour activer la modification")
        } else {
          alert("Votre profil a été modifier, vous n'est plus modérateur \nVous devez vous reconnecter pour activer la modification")
        }
        this.$router.push('/')
        localStorage.clear()
      })
      .catch((error) => {
        alert(error);
      });  
  },

  // Suppression du profil
  suppressionProfil() {
    console.log("Suppression")
    const utilisateur = JSON.parse(localStorage.getItem("Utilisateur"))
    axios
      .delete("/utilisateur/suppression/" + utilisateur.id,
        {headers: {Authorization: utilisateur.token}}        
      )
      .then((resultat) => {
        localStorage.clear()
        alert("Votre compte  a été supprimé")
        this.$router.push('/Deconnexion')        
        console.log(resultat.data)
      })
      .catch((error) => {
        alert(error)
      })
    }
}
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>