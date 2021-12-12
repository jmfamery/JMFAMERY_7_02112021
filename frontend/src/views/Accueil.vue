<template>
  <Logo />
  <div class="container-fluid text-center">
    <p class="fw-bold fs-2 my-5">Bienvenue sur le site Intranet</p>
  </div>

  <div v-if="accueil === 'connexion'">
    <div class="container d-flex justify-content-center">
      <div class="card" style="width: 50rem">
        <div class="fondpage">
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

          <Connexion />
        </div>
      </div>
    </div>
  </div>

  <div v-if="accueil === 'inscription'">
    <div class="container d-flex justify-content-center">
      <div class="card" style="width: 50rem">
        <div class="fondpage">
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

          <Inscription />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "../components/Logo.vue"
import Connexion from "../components/Connexion.vue"
import Inscription from "../components/Inscription.vue"

export default {
  name: "Accueil",
  components: { 
    Logo,
    Connexion,
    Inscription
  },

  data: () => {
    return {
      accueil: "connexion"
    };
  },

  methods: {
    inscription() {
      this.accueil = "inscription"
      // location.reload()
    },

    connexion() {
      this.accueil = "connexion"
      // location.reload()
    }
  },
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>