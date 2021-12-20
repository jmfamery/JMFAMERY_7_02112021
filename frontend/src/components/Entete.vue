<template>
  <div class="fondpage">
    <div class="container-fluid">
      <div class="row">
        <nav class="navbar navbar-expand-md navbar-dark">
          <div class="navbar-brand" style="height:85px">
            <img src="../assets/images/icon-left-font-monochrome-white.svg" alt="logo de Groupomania" />
          </div>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div id="navbarContent" class="collapse navbar-collapse justify-content-end">
            <ul class="navbar-nav my-1">
              <li class="nav-item">
                <button class="nav-link text-white fw-bold border-0 fondpage" @click="profil()">Profil</button>
              </li>

              <li class="nav-item">
                <button class="nav-link text-white fw-bold border-0 fondpage" @click="deconnexion()">Déconnexion</button>
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
  name: 'Entete',

  methods: {
    // Passage au views Profil
    profil () {
      this.$router.push('/Profil')
    },

    // Passage au viewx Deconnexion et la suppression localStorage
    deconnexion () {
      this.$router.push('/Deconnexion'),
      localStorage.clear()
    }
  }
}   
</script>

<style scoped src="../assets/css/fondPage.css">
</style>