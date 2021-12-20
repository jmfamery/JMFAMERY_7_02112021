<template> 
  <div class="card-body py-2 mx-2">
    <div class="row">
      <div class="col-sm-6 pt-3">
        <span class="input-group-text py-0 px-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-envelope-fill" viewBox="-5 0 25 15">
            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
          </svg> 
          <input
            class="form-control"
            type="email"
            placeholder="Votre email"
            id="email"
            required
            maxlength="60"
            aria-label="Entrez votre E-mail"
            v-model="email"
          />
        </span>
        <div class="col text-center bg-white rounded mt-1" v-if="this.entreeEmail === false">
          <p class="text-danger mx-1"><strong>Votre mail n'est pas correctes</strong></p>
      </div>
      </div>

      <div class="col-sm-6 pt-3">
        <span class="input-group-text py-0 px-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-lock-fill" viewBox="-5 0 25 15">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
          </svg>
          <input
            class="form-control"
            type="password"
            placeholder="Votre mot de passe"
            id="mot_passe"
            required
            maxlength="100"
            aria-label="Entrez votre mot de passe"
            v-model="mot_passe"
          />
        </span>
        <div class="col text-center bg-white rounded mt-1" v-if="this.entreeMotPasse === false">
          <p class="text-danger mx-1"><strong>Veuillez entrer un mot de passe avec 8 caractéres dont une lettre majuscule et un chiffre</strong></p>
        </div>              
      </div>
    </div>
  </div>

  <div class="card-body py-2 mx-2">
    <div class="row">
      <div class="col-sm-6 pt-3">
        <span class="input-group-text py-0 px-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-file-person" viewBox="-5 0 25 15">
            <path d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"/>
            <path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
          </svg>
          <input
            class="form-control"
            type="text"
            placeholder="Votre nom"
            id="nom"
            required
            maxlength="60"
            aria-label="Entrez votre nom"
            v-model="nom"
          />
        </span>

        <div class="col text-center bg-white rounded mt-1" v-if="this.entreeNom === false">
          <p class="text-danger mx-1"><strong>Votre nom doit avoir entre 2 et 30 caractéres</strong></p>
        </div>
      </div>


      <div class="col-sm-6 pt-3">
        <span class="input-group-text py-0 px-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-file-person" viewBox="-5 0 25 15">
            <path d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"/>
            <path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
          </svg>
          <input
            class="form-control"
            type="text"
            placeholder="Votre prénom"
            id="prenom"
            required
            maxlength="60"
            aria-label="Entrez votre prénom"
            v-model="prenom"
          />
        </span>
        <div class="col text-center bg-white rounded mt-1" v-if="this.entreePrenom === false">
          <p class="text-danger mx-1"><strong>Votre prénom doit avoir entre 2 et 30 caractéres</strong></p>
        </div>              
      </div>
    </div>
  </div>
  
  <div class="card-footer pb-4">
    <div class="row">
      <div class="col text-center">
        <button class="btn fondpageClaire fw-bold fs-4" @click="creerCompte()">Créer un compte</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Inscritpion",

  data: () => {
    return {
      email: "",
      mot_passe: "",
      nom: "",
      prenom: "",
      moderateur: false,
      entreeEmail: true,
      entreeMotPasse: true,
      entreeNom: true,
      entreePrenom: true,
    };
  },

  // Contrôle et envoi des données pour la création du profil
  methods: {
    creerCompte() {  
      console.log("Création du compte");
      const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
      const motPasseRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
      const nomRegex = /[a-zA-Z-'`]+[ a-zA-Z-'`]{1,30}$/
      this.entreeEmail = emailRegex.test(this.email)
      this.entreeMotPasse = motPasseRegex.test(this.mot_passe)
      this.entreeNom = nomRegex.test(this.nom)
      this.entreePrenom = nomRegex.test(this.prenom)
      console.log("mail ",this.entreeEmail," mot de passe ",this.entreeMotPasse," nom ",this.entreeNom," prenom ",this.entreePrenom)      
      if (this.entreeEmail && this.entreeMotPasse && this.entreeNom && this.entreePrenom) {
        axios
          .post("/utilisateur/inscrire", {
            email: this.email,
            mot_passe: this.mot_passe,
            nom: this.nom,
            prenom: this.prenom,
            moderateur: this.moderateur
          })
          .then((resultat) => {            
            localStorage.setItem("Utilisateur", JSON.stringify(resultat.data)),
            console.log(resultat.data),
            alert("Votre compte a été créé")
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