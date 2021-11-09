<template>
  <div class="entete">
    <div class="container-fluid">
      <div class="row">
        <nav class="navbar navbar-dark">
          <div class="navbar-brand" style="height:85px">
            <img src="../assets/icon-left-font-monochrome-white-v2.svg" alt="logo" />
          </div>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div id="navbarContent" class="collapse navbar-collapse">
            <ul class="navbar-nav text-end">
              <li class="nav-item">
                <a class="nav-link text-white" href="#">Connection</a>
              </li>
              
              <li class="nav-item">
                <a class="nav-link text-white" href="#">Création profil</a>
              </li>

              <li class="nav-item">
                <a class="nav-link text-white" href="#">Suppression profil</a>
              </li>

              <li class="nav-item">
                <a class="nav-link text-white" href="#">Déconnection</a>
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

<style>
.entete {background-color: #122442}
</style>