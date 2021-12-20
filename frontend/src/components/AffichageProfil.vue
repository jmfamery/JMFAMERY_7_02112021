<template> 
  <div class="card-body py-0 mx-2">
    <div class="row">
      <div class="col-sm-6 pt-3">
        <span class="input-group-text py-0 px-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-file-person" viewBox="-5 0 25 15">
            <path d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"/>
            <path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
          </svg>
          <p class="bg-white rounded my-0 px-2 fw-bold fS-4">{{this.personne.nom}}</p>
        </span>
      </div>

      <div class="col-sm-6 pt-3">
        <span class="input-group-text py-0 px-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-file-person" viewBox="-5 0 25 15">
            <path d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"/>
            <path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
          </svg>
          <p class="bg-white rounded my-0 px-2 fw-bold fS-4">{{this.personne.prenom}}</p>
        </span>
      </div>
    </div>
  </div>

  <div class="card-body pt-0 pb-3 mx-2">
    <div class="row">
      <div class="col-sm-6 pt-3">
        <span class="input-group-text py-0 px-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-info-square-fill" viewBox="-5 0 25 15">
            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.93 4.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
          </svg>
          <p class="bg-white rounded my-0 px-2 fw-bold fS-4" v-if="this.personne.moderateur == '0'">Pas modérateur</p>
          <p class="bg-white rounded my-0 px-2 fw-bold fS-4" v-if="this.personne.moderateur == '1'">Modérateur</p>
        </span>      
      </div>

      <div class="col-sm-6 pt-3">
        <span class="input-group-text py-0 px-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-envelope-fill" viewBox="-5 0 25 15">
            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
          </svg>        
          <p class="bg-white rounded my-0 px-2 fw-bold fS-4">{{this.personne.email}}</p>
        </span>          
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

  // récupération des données d'un utilisateur
  created() {
    const utilisateur = JSON.parse(localStorage.getItem("Utilisateur"))
    this.personne = utilisateur
    this.moderateur = utilisateur.moderateur
    console.log(this.personne)
  },

  methods: {
    // modification du profil moderateur sur le partie modérateur
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
      if (confirm("Vous allez supprimer votre profil")) {
        axios
          .delete("/utilisateur/suppression/" + utilisateur.id,
            {headers: {Authorization: utilisateur.token}}        
          )
          .then((resultat) => {
            localStorage.clear()
            alert("Votre compte a été supprimé")
            this.$router.push('/Deconnexion')        
            console.log(resultat.data)
          })
          .catch((error) => {
            alert(error)
          })
      }
    }
  }
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>