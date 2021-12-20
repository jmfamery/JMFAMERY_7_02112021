<template>
  <div class="container d-flex justify-content-center my-5">
    <div class="card">
      <div class="fondpage">
        <div class="row">
          <div class="col text-center my-2">
            <button class="btn fondpageClaire fw-bold mx-2 mt-0 fs-5" @click="retour()">Retour à la liste des articles</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RetourArticles",

  // Passage au Views Articles
  methods: {
    retour() {
      this.$router.push("/Articles")
    }
  }
}
</script>

<style scoped src="../assets/css/fondPage.css">
</style>