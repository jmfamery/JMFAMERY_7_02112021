<template>
  <div class="fondpage">
    <div class="container-fluid">
      <div class="row">
        <nav class="navbar navbar-expand-md navbar-dark">
          <div class="navbar-brand" style="height:85px">
            <img src="../assets/images/icon-left-font-monochrome-white-v2.svg" alt="logo" />
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
                <button class="nav-link text-white fw-bold border-0 fondpage" @click="suppression()">Suppression profil</button>
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
    profil () {
      this.$router.push('/Profil')
    },

    suppression () {
      this.$router.push('/SuppressionProfil')
    },

    deconnexion () {
      this.$router.push('/Deconnexion'),
      localStorage.clear()
    }
  }
}   
</script>

<style scoped src="../assets/css/fondPage.css">
</style>