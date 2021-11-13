<template>
  <div class="container-fluid text-center">
    <h1 class="fw-bold fs-1 py-5">Groupomania - Intranet</h1>    
  </div>

  <div class="container d-flex justify-content-center">
    <div class="card border border-2 rounded-3 " style="width: 40rem">
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
                v-on:input="envoyerDonnees"
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
                v-on:input="envoyerDonnees"
              />
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
                v-on:input="envoyerDonnees"
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
                v-on:input="envoyerDonnees"
              />
            </div>
          </div>
        </div>

        <div class="card-body py-3 mx-2">
          <div class="row"> 
            <div class="col text-white">
              <input class="form-check-input" type="checkbox" value="" id="moderateur">
              <label class="form-check-label" for="moderateur">
                ° Cocher la case si vous êtes modérateur
              </label>
            </div>
          </div>
        </div>

        <div class="card-footer pb-4">
          <div class="row">
            <div class="col text-center">
              <a class="btn fondpageClaire fw-bold fs-4" href="#">Créer profil</a>
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
  donnees: () => {
    return {
      email: "",
      mot_passe: "",
      nom: "",
      prenom: "",
      moderateur: ""
    }
  },
  methods: {
    // envoi des données
    envoyerDonnees() {
      const emailValider = document.getElementById("email").checkValidity();
      const mot_passeValider = document.getElementById("mot_passe").checkValidity();
      const nomValider = document.getElementById("nom").checkValidity();
      const prenomValider = document.getElementById("prenom").checkValidity();
      if (emailValider && mot_passeValider && nomValider && prenomValider) {
        this.$emit("donnees-envoyees", this.$donnees);
      } 
    }
  }
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>