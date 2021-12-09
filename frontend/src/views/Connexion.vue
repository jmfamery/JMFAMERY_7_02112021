<template>
  <Logo />
  <div class="container-fluid text-center">
    <p class="fw-bold fs-2 my-5">Bienvenue sur le site Intranet</p>
  </div>

  <div class="container d-flex justify-content-center">
    <div class="card border border-2 rounded-3" style="width: 50rem">
      <div class="fondpage">
        <div class="card-header text-center text-white">
          <div class="row">
            <div class="col">
              <div class="card-tilte">
                <h1>Connexion à Groupomania</h1>
              </div>
            </div>
          </div>
        </div>

        <div class="card-header text-center text-white">
          <div class="row">
            <div class="col">
              <div class="card-tilte">
                <p class="fs-5">
                  Vous n'avez pas encore de compte ?
                  <router-link class="text-white" to="/Inscription">Inscription</router-link>
                </p>
              </div>
            </div>
          </div>
        </div>

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
              <input
                class="form-control"
                type="email"
                placeholder="Votre email"
                id="email"
                required
                maxlength="30"
                aria-label="Entrez votre E-mail"
                v-model="email"
              />
            </div>

            <div class="col-sm-6 pt-3">
              <input
                class="form-control"
                type="password"
                placeholder="Votre mot de passe"
                id="mot_passe"
                required
                maxlength="30"
                aria-label="Entrez votre mot de passe"
                v-model="mot_passe"
              />
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Logo from "../components/Logo.vue";

export default {
  name: "Connexion",
  components: { Logo },

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