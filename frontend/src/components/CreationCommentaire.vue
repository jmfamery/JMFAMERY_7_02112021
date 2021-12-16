<template>
  <div class="container my-4">
    <div class="card">
      <div class="fondpage">
        <div class="card-header text-white">
          <div class="row gx-2">
            <div class="col text-start">
              <p class="mb-0 fs-4">Saisir un commentaire</p>
            </div>
            <div class="col text-end">
              <button class="btn fondpageClaire pt-0 fw-bold" @click="valideCommentaire()">valider le commentaire</button>
            </div>
          </div>
        </div>

        <div class="card-body py-0">
          <div class="row gx-2">
            <div class="col px-0">
              <textarea
                class="form-control my-0"
                type="text"
                placeholder="Commentaire de l'article"
                id="text"
                required
                maxlength="250"
                aria-label="Entrez votre texte de l'article"
                v-model="contenue">
              </textarea>
              <div class="col text-center bg-white rounded mt-1" v-if="this.entreeContenue === false">
                <p class="text-danger mx-1"><strong>Veuillez saisir votre commentaire</strong></p>
              </div>  
            </div>
          </div>
        </div>
        
        <div class="card-footer py-2">
          <div class="row">
          </div>
        </div>        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreationCommentaire",

  data: () => {
    return {  
      contenue: "",
      entreeContenue: true
    }
  },

  methods: {
    valideCommentaire() {
      this.entreeContenue=Boolean(this.contenue)
      if (this.contenue) {
        this.$emit("envoiCommentaire", this.contenue)
      }
    }
  },
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>