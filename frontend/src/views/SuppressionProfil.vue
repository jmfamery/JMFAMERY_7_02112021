<template>
  <Logo />
  <div class="container-fluid text-center">
    <h1 class="fw-bold fs-1 py-5">Groupomania</h1>
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
</template>

<script>
import axios from "axios";
import Logo from "../components/Logo.vue";

export default {
  name: "Suppression",
  components: { Logo },
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
    console.log(utilisateur.id)
    axios
      .delete("/utilisateur/suppression", {
      id: utilisateur.id
      })
      .then(function (result) {
        this.$router.push('/Deconnexion'),
        console.log(result.data)
      })
      .catch(function (error) {
        alert(error)
      })
    }
  }
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>