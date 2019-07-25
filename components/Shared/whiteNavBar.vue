<template>
  <nav class="navbar navbar-expand-lg navbar-light d-flex justify-space-between mx-4 pt-3">
    <div class="container">
    <nuxt-link to="/" class="navbar-brand">
      <img src="~/assets/icons/green-logo.svg" alt />
    </nuxt-link>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div
      class="collapse navbar-collapse d-lg-flex justify-content-md-end"
      id="navbarSupportedContent"
    >
      <ul class="navbar-nav">
        <li class="nav-item">
          <nuxt-link to="/" class="nav-link">Home</nuxt-link>
          <!-- <a class="" href="#"></a> -->
        </li>
        <li class="nav-item">
          <nuxt-link to="/forums" class="nav-link">Forums</nuxt-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Blog</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Contact Us</a>
        </li>
        <li class="nav-item ml-lg-4">
          <nuxt-link to="/sign-up" tag="button" class="btn">Join Us</nuxt-link>
        </li>
      </ul>
    </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-light .nav-item a,
.navbar-light .navbar-nav .active > .nav-link,
.navbar-light .navbar-nav .nav-link:hover,
.navbar-light .navbar-nav .nav-link:focus {
  color: var(--black-text);
}

.btn {
  background: #fdfdfd;
  border: solid 2px #07834e;
}

.btn:hover {
  color: #07834e;
  font-weight: 600;
}
@media (min-width: 1200px){
.container{
    max-width: 1400px !important;
}}
</style>

