<template>
  <Logo />
  <div class="container-fluid text-center">
    <p class="fw-bold fs-2 my-5">Bienvenue sur le site Intranet</p>
  </div>

  <div class="container d-flex justify-content-center">
    <div class="card" style="width: 50rem">
      <div class="fondpage">
        <div class="card-header text-center text-white">
          <div class="row">
            <div class="col">
              <div class="card-tilte">
                <h1>Inscription à Groupomania</h1>
              </div>
            </div>
          </div>
        </div>

        <div class="card-header text-center text-white">
          <div class="row">
            <div class="col">
              <div class="card-tilte">
                  Vous avez déjà un compte ?
                  <router-link class="text-white" to="/">Connexion</router-link>
              </div>
            </div>
          </div>
        </div>
  
        <div class="card-body py-2 mx-2">
          <div class="row">
            <div class="col-sm-6 pt-3">
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
              <div class="col text-center bg-white rounded mt-1" v-if="this.entreeEmail === false">
                <p class="text-danger mx-1"><strong>Votre mail n'est pas correctes</strong></p>
            </div>
            </div>

            <div class="col-sm-6 pt-3">
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
              <div class="col text-center bg-white rounded mt-1" v-if="this.entreeMotPasse === false">
                <p class="text-danger mx-1"><strong>Veuillez entrer un mot de passe avec 8 caractéres dont une lettre majuscule et un chiffre</strong></p>
              </div>              
            </div>
          </div>
        </div>

        <div class="card-body py-2 mx-2">
          <div class="row">
            <div class="col-sm-6 pt-3">
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
              <div class="col text-center bg-white rounded mt-1" v-if="this.entreeNom === false">
                <p class="text-danger mx-1"><strong>Votre nom doit avoir entre 2 et 30 caractéres</strong></p>
              </div>
            </div>


            <div class="col-sm-6 pt-3">
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
              <div class="col text-center bg-white rounded mt-1" v-if="this.entreePrenom === false">
                <p class="text-danger mx-1"><strong>Votre prénom doit avoir entre 2 et 30 caractéres</strong></p>
              </div>              
            </div>
          </div>
        </div>

        <div class="card-body py-3 mx-2">
          <div class="row">
            <div class="col text-white" id="v-model-checkbox">
              <input
                class="form-check-input"
                type="checkbox"
                value
                id="moderateur"
                v-model="moderateur"
              />
              <label class="form-check-label" for="moderateur">
                <p class="mx-2">Cocher la case si vous êtes modérateur</p>
              </label>
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
      nom: "",
      prenom: "",
      moderateur: false,
      entreeEmail: true,
      entreeMotPasse: true,
      entreeNom: true,
      entreePrenom: true,
    };
  },

  methods: {
    // envoi des données pour la création du profil
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
            this.$router.push("/")
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