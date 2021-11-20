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
      // if (this.email && this.mot_passe && this.nom && this.prenom) {
        const axios = require('axios').default
        axios.post('http://localhost:3000/api/utilisateur/inscrire', {
          email: this.email,
          mot_passe: this.mot_passe,
          nom: this.nom,
          prenom: this.prenom,
          moderateur: this.moderateur
        })
          .then(function (reponse) {
            console.log(reponse)
            //this.$router.push('/Articles');
          })
          .catch(function (error) {
            alert(error);
            console.log(error)
          });
      // } { if (!this.email) {
      //       alert("Veuillez saisir votre mail")
      //     } { if (!this.mot_passe)
      //           alert("Veuillez saisir le mot de passe")
      //         } { if (!this.mot_nom)
      //             alert("Veuillez saisir votre nom")
      //           } { if (!this.mot_prenom)
      //               alert("Veuillez saisir votre prenom")
      //             }
      //   }
    }
  }
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>