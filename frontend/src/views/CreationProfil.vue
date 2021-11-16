<template>
  <div class="container-fluid text-center">
    <h1 class="fw-bold fs-1 py-5">Groupomania - Intranet</h1>
  </div>

  <div class="container d-flex justify-content-center">
    <div class="card border border-2 rounded-3" style="width: 40rem">
      <div class="fondpage">
        <div class="card-header text-center text-white">
          <div class="row">
            <div class="col">
              <div class="card-tilte">
                <p class="fs-5">Veuillez saisir les informations ci-dessous pour créer votre profil</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card-body py-0 mx-2">
          <div class="row">
            <div class="col-sm-6 pt-3">
              <input
                class="form-control"
                type="text"
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
                type="text"
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
                <!-- {{ moderateur }} -->
                ' Cocher la case si vous êtes modérateur
              </label>
            </div>
          </div>
        </div>

        <div class="card-footer pb-4">
          <div class="row">
            <div class="col text-center">
              <button class="btn fondpageClaire fw-bold fs-4" @click="nouveauProfil()">Créer profil</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreationProfil",
  data: () => {
    return {
      email: "",
      mot_passe: "",
      nom: "",
      prenom: "",
      moderateur: false,
    }
  },

  methods: {
    // envoi des données pour la création du profil
    nouveauProfil() {
      console.log("Valider")
      // const emailValider = document.getElementById("email").checkValidity();
      // const mot_passeValider = document.getElementById("mot_passe").checkValidity();
      // const nomValider = document.getElementById("nom").checkValidity();
      // const prenomValider = document.getElementById("prenom").checkValidity();
      // const moderateurvalider = document.getElementById("moderateur");
      // if (emailValider && mot_passeValider && nomValider && prenomValider && moderateurvalider) {
      //   this.$emit("donnees-envoyees", this.$data);
      // } 
      const axios = require('axios').default
      axios.post('http://localhost:3000/api/auth/inscrire', {
        email: this.email,
        mot_passe: this.mot_passe,
        nom: this.nom,
        prenom: this.prenom,
        moderateur: this.moderateur
      })
        .then(function () {
          this.$router.push('/Connexion');
        })
        .catch(function (error) {
          alert(error);
        });
    }
  }
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>