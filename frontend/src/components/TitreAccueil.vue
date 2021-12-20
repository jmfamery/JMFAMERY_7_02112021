<template>
  <div v-if="accueil === 'connexion'">
    <div class="card-header text-center text-white">
      <div class="row">
        <div class="col">
          <div class="card-tilte">
            <h1>Connexion à Groupomania</h1>
          </div>
        </div>
      </div>
    </div>

    <div class="card-header text-center text-white">
      <div class="row">
        <div class="col">
          <div class="card-tilte">
            <p class="fs-5">
              Vous n'avez pas encore de compte ?
              <button class="text-decoration-underline text-white fondpage border-0" @click="inscription()">Inscription</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="accueil === 'inscription'">
    <div class="card-header text-center text-white">
      <div class="row">
        <div class="col">
          <div class="card-tilte">
            <h1>Inscription à Groupomania</h1>
          </div>
        </div>
      </div>
    </div>

    <div class="card-header text-center text-white">
      <div class="row">
        <div class="col">
          <div class="card-tilte">
            <p class="fs-5">
              Vous avez déjà un compte ?
              <button class="text-decoration-underline text-white fondpage border-0" @click="connexion()">Connexion</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TitreAccueil",
  props: ["accueil"],

  emits: ["selection"],

  // Envoi du choix du titre d'accueil
  methods: {
    inscription() {
      this.$emit("selection", "inscription")
    },

    connexion() {
      this.$emit("selection", "connexion")
    }
  }
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>