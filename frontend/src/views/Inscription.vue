<template>
  <Logo />
  <div class="container-fluid text-center">
    <h1 class="fw-bold fs-1 pt-5 mb-2">Groupomania</h1>
    <p class="fw-bold fs-2 mb-5">Bienvenue sur le site Intranet</p>
  </div>

  <div class="container d-flex justify-content-center">
    <div class="card border border-2 rounded-3 " style="width: 50rem">
      <div class="fondpage">
        <div class="card-header text-center text-white">
          <div class="row">
            <div class="col">
              <div class="card-tilte">
                <h2>Inscription au site</h2>
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

        <div class="card-body py-2 mx-2">
          <div class="row">
            <div class="col-sm-6 pt-3">
              <input
                class="form-control"
                type="text"
                placeholder="Votre nom"
                id="nom"
                required
                maxlength="30"
                aria-label="Entrez votre nom"
                v-model="nom"
              />
            </div>


            <div class="col-sm-6 pt-3">
              <input
                class="form-control"
                type="text"
                placeholder="Votre prénom"
                id="prenom"
                required
                maxlength="30"
                aria-label="Entrez votre prénom"
                v-model="prenom"
              />
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
    };
  },

  methods: {
    // envoi des données pour la création du profil
    creerCompte() {  
      console.log("Création du compte");
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
  },
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>