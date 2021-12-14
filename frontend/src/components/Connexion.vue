<template>
  <div class="card-body py-0 mx-4">
    <div class="row">
      <div class="col text-center bg-white rounded pt-2" v-if="this.entree === 'vide'">
        <p class="text-danger fs-5"><strong>Veuillez entrer votre mail et ou votre mot de passe</strong></p>
      </div>
      <div class="col text-center bg-white rounded pt-2" v-if="this.entree === '401'">
        <p class="text-danger fs-5"><strong>Votre mail et ou votre mot de passe ne sont pas correctes</strong></p>
      </div>
      <div class="col text-center bg-white rounded pt-2" v-if="this.entree === '429'">
        <p class="text-danger fs-5"><strong>E-mail bloqué suite à plus de 3 tentatives de connections</strong></p>
      </div>
    </div>
  </div>

  <div class="card-body py-0 mx-2">
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
      </div>
    </div>
  </div>
  
  <div class="card-footer py-4">
    <div class="row">
      <div class="col text-center">
        <button class="btn fondpageClaire fw-bold fs-4" @click="connexion()">Se connecter</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "Connexion",

  data: () => {
    return {
      email: "",
      mot_passe: "",
      entree: "Ok"
    };
  },

  methods: {
    // envoi des données pour la connexion du profil
    connexion() {       
      console.log("Connexion");
      if (this.email && this.mot_passe) {
        axios
          .post("/utilisateur/connexion", {
            email: this.email,
            mot_passe: this.mot_passe
          })
          .then((resultat) => {
            localStorage.setItem("Utilisateur", JSON.stringify(resultat.data)),
            console.log(resultat.data),
            this.$router.push("/Articles")
          })
          .catch((error) => {
            if (JSON.stringify(error.response.status) === "401") {
              this.entree="401"
            } else {
              if (JSON.stringify(error.response.status) === "429") {
                this.entree="429"
              } else {
                alert(error)
              }
            }
          });
          this.entree="Ok"
      } else {
        this.entree="vide"
      }
    }
  },
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>