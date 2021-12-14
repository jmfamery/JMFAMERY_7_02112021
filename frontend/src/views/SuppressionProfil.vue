<template>
  <Logo />
  <Utilisateur />
  <div class="container-fluid text-center">
    <h1 class="fw-bold fs-3 py-5">Suppression du Profil</h1>
  </div>

  <div class="container d-flex justify-content-center">
    <div class="card border border-2 rounded-3 " style="width: 30rem">
      <div class="fondpage">
        <div class="card-header text-center text-white">
          <div class="row">
            <div class="col">
              <div class="card-tilte">
                <p class="fs-5">Veuillez confirmer la clôture de votre profil</p>
              </div>
            </div>
          </div>
        </div>
  
        <div class="card-footer pb-4">
          <div class="row">
            <div class="col text-center">
              <a class="btn fondpageClaire fw-bold fs-4"  @click="suppressionProfil()">Suppression profil</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

    <div class="container d-flex justify-content-center my-5">
    <div class="card border border-2 rounded-3" style="width: 20rem">
      <div class="fondpage">
        <div class="row">
          <div class="col-sm-12 text-center my-3">
            <button class="btn fondpageClaire fw-bold fs-5" @click="retour()">Retour à la liste des articles</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Logo from "../components/Logo.vue";
import Utilisateur from "../components/Utilisateur.vue"

export default {
  name: "Suppression",
  components: { 
    Logo,
    Utilisateur
  },
  data: () => {
    return {
      id: "",
    }
  },

methods: {
  // Suppression du profil
  suppressionProfil() {
    console.log("Suppression")
    const utilisateur = JSON.parse(localStorage.getItem("Utilisateur"))
    axios
      .delete("/utilisateur/suppression/" + utilisateur.id,
        {headers: {Authorization: utilisateur.token}}        
      )
      .then((resultat) => {
        localStorage.clear()
        alert("Votre compte  a été supprimé")
        this.$router.push('/Deconnexion')        
        console.log(resultat.data)
      })
      .catch((error) => {
        alert(error)
      })
    },

  retour() {
    this.$router.push("/Articles")
  }    
  }
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>