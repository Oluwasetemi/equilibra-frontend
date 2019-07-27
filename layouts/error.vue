<template>
  <div class="container-fluid">
    <div class="container">
      <header class="pt-3">
        <nav class="navbar navbar-expand-lg navbar-light d-flex justify-space-between px-md-0">
          <nuxt-link to="/" class="navbar-brand">
            <img src="~/assets/icons/logo.svg" alt />
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
        </nav>
      </header>
      <div
        class="text-center d-flex flex-column justify-content-center"
        style="height: calc(100vh - 150px)"
      >
        <div>
          <div class="img mb-4">
            <img src="~/assets/images/404-text.svg" alt />
          </div>

          <p>Don’t freak out. It's just a 404 page!</p>
          <p>What you’re looking for may have been misplaced in Long Term Memory.</p>
          <nuxt-link tag="button" to="/" class="white-btn mt-4">Take me Home!!</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar-light .nav-item a,
.navbar-light .navbar-nav .active > .nav-link,
.navbar-light .navbar-nav .nav-link:hover,
.navbar-light .navbar-nav .nav-link:focus {
  color: white;
}
.container-fluid {
  background-image: url("~assets/images/404-BG.png");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  color: white;
  font-weight: 100;
}

.white-btn {
  width: 220px;
}

nav button.btn {
    background: transparent;
    color: white;
}

p {
  line-height: 1em;
}
</style>
