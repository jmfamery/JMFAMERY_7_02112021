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
                <h2 class="fs-3" v-if="mode == 'connexion'">
                  Connexion au site
                </h2>
                <h2 class="fs-3" v-else>
                  Inscription au site
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div class="card-header text-center text-white">
          <div class="row">
            <div class="col">
              <div class="card-tilte">
                <p class="fs-5" v-if="mode == 'connexion'">
                  Vous n'avez pas encore de compte ?
                  <button class="btn fondpageClaire fw-bold mx-2" @click="creercompte()">
                    Ouvrir un compte
                  </button>
                </p>
                <p class="fs-5" v-else>
                  Vous avez déjà un compte ?
                  <button class="btn fondpageClaire fw-bold mx-2" @click="accescompte()">
                    Se connecter
                  </button>
                </p>
              </div>
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

        <div class="card-body pt-3 pb-0 mx-2">
          <div class="row">
            <div class="col text-center text-white">
              <p>Mot de passe : 1 majuscule, 1 minuscule et 1 chiffre (8 caractères minimum)</p>
            </div>
          </div>
        </div>

        <div v-if="mode == 'creation'">
          <div class="card-body py-0 mx-2">
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
        </div>
        
        <div class="card-footer pb-4">
          <div class="row">
            <div class="col text-center">
              <div v-if="mode == 'connexion'">
                <button class="btn fondpageClaire fw-bold fs-4" @click="connexion()">Se connecter</button>
              </div>
              <div v-else>
                <button class="btn fondpageClaire fw-bold fs-4" @click="connexion()">Créer un compte</button>
              </div>
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
      mode: "connexion",
      email: "",
      mot_passe: "",
      nom: "",
      prenom: "",
      moderateur: false,
    };
  },

  methods: {
    creercompte() {
      this.mode = "creation";
    },
    accescompte() {
      this.mode = "connexion";
    },
    // envoi des données pour la création ou la connexion du profil
    connexion() {       
      if ((/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(this.mot_passe)) == true) {
        console.log("Ok")
      }
      if (this.mode == "creation") {
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
            this.$router.push("/Articles")
          })
          .catch((error) => {
            alert(error);
            console.log(error);
          });          
      }
      if (this.mode == "connexion") {
        console.log("Connexion");
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
            alert(error)
          });
      }
    }
  },
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>