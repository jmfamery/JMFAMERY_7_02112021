<template>
  <Logo />
  <div class="container-fluid text-center">
    <h1 class="fw-bold fs-1 pt-5 mb-2">Groupomania</h1>
    <p class="fw-bold fs-2 mb-5">Bienvenue sur le site Intranet</p>
  </div>

  <div class="container d-flex justify-content-center">
    <div class="card border border-2 rounded-3 " style="width: 50rem">
      <div class="fondpage">
        <div class="card-header text-center text-white">
          <div class="row">
            <div class="col">
              <div class="card-tilte">
                <h2>Connexion au site</h2>
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
                  <router-link class="text-white" to="/Inscription">Inscription</router-link>
                </p>
              </div>
            </div>
          </div>
        </div>


        <div class="card-body py-0 mx-2">
          <div class="row">
            <div class="col-sm-6 pt-3">
              <Email/>
            </div>

            <div class="col-sm-6 pt-3">
              <MotPasse/>
            </div>
          </div>
        </div>
       
        <div class="card-footer py-4">
          <div class="row">
            <div class="col text-center">
              <button class="btn fondpageClaire fw-bold fs-4"           
                :disabled="isSignupButtonDisabled"
                @click="loginButtonPressed">
                Se connecter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import axios from "axios";
import Logo from "../components/Logo.vue";
import Email from "./Email.vue"
import MotPasse from "./MotPasse.vue"

import useFormValidation from "../modules/useFormValidation";
import useSubmitButtonState from "../modules/useSubmitButtonState";

export default {
  name: "Connexion",
  components: {
    Logo,
    Email,
    MotPasse
  },

  data: () => {
    return {
      email: "",
      mot_passe: "",
      nom: "",
      prenom: "",
      moderateur: false,
    };
  },

  setup() {
    let user = reactive({
      email: "",
      password: "",
    });

    const { error } = useFormValidation();
    const { isSignupButtonDisabled } = useSubmitButtonState(user, error);

    const loginButtonPressed = () => {
      console.log(user);
    };
    console.log(user);
    return {
      user,
      isSignupButtonDisabled,
      loginButtonPressed,
    };
  },

  methods: {
    // envoi des données pour la connexion du profil
    connexion() {       
      console.log("Connexion");
      console.log("email : ",this.email)
      axios
        .post("/utilisateur/connexion", {
          email: this.email,
          mot_passe: this.mot_passe
        })
        .then((resultat) => {
          localStorage.setItem("Utilisateur", JSON.stringify(resultat.data)),
          console.log(resultat.data),
          this.$router.push("/Articles")
        })
        .catch((error) => {
          alert(error)
        });
    }
  },
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>