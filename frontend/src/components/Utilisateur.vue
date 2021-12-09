<template>
  <div class="fondpageClaire">
    <div class="container-fluid">
      <div class="row">
        <div class="text-center">
          <p class="fw-bold fs-2 my-0">{{personne.prenom}} {{personne.nom}} </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Utilisateur",

  created() {
    const utilisateur = JSON.parse(localStorage.getItem("Utilisateur"))
    this.personne = utilisateur
    }
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>