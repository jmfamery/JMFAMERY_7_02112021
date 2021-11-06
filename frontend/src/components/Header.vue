<template>
  <div class="container-fluid bg-primary">
    <div class="row">
      <nav class="navbar navbar-expand-sm navbar-dark">
        <div class="navbar-brand">
          <img src="../assets/icon-left-font-monochrome-white.svg" alt="logo" />
        </div>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div id="navbarContent" class="collapse navbar-collapse justify-content-end">
          <ul class="navbar-nav fs-5">
            <li class="nav-item">
              <a class="nav-link text-white" href="#">Connection</a>
            </li>

            <li class="nav-item">
              <a class="nav-link text-white" href="#">Déconnection</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Header'
}   
</script>