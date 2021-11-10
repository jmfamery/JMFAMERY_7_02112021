<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <div class="fondpage">
    <div class="container-fluid">
      <div class="row">
        <nav class="navbar navbar-dark">
          <div class="navbar-brand" style="height:85px">
            <router-link to="/">
              <img src="../assets/images/icon-left-font-monochrome-white-v2.svg" alt="logo" />
            </router-link>
          </div>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div id="navbarContent" class="collapse navbar-collapse">
            <ul class="navbar-nav text-end">
              <li class="nav-item">
                <router-link class="nav-link text-white fw-bold" to="/Connexion">Connexion</router-link>
              </li>
              
              <li class="nav-item">
                <router-link class="nav-link text-white fw-bold" to="/creationProfil">Création profil</router-link>
              </li>

              <li class="nav-item">
                <router-link class="nav-link text-white fw-bold" to="/SuppressionProfil">Suppression profil</router-link>
              </li>

              <li class="nav-item">
                <router-link class="nav-link text-white fw-bold" to="/Deconnexion">Déconnexion</router-link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Entete'
}   
</script>

<style scoped src="../assets/css/fondPage.css">
</style>