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
                <nuxt-link to="/contact-us" class="nav-link">Contact Us</nuxt-link>
              </li>
              <li class="nav-item ml-lg-4">
                <div class="dropdown" style="background: white;" v-if="isAuthenticated">
                  <a
                    href="#"
                    class="dropdown-toggle d-flex align-items-center m-0"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img :src="getUser.image || avatar"  alt height="38px" class="mr-1 avatar" />
                    <div
                      class="inline-block px-2 user-name"
                      style="color: black"
                    >{{ getUser.username || getUser.fullName }}</div>
                    <img
                      src="~assets/icons/thin-downward-arrow.svg"
                      alt
                      class="position-relative"
                      style="left: 8px;"
                    />
                  </a>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <nuxt-link class="dropdown-item" to="account-settings">Account Settings</nuxt-link>
                    <a class="dropdown-item" href="#">Feedback</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#" @click.stop="logoutUser()">Logout</a>
                  </div>
                </div>
                <nuxt-link to="/sign-up" tag="button" class="btn" v-else>Join Us</nuxt-link>
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


<script>
import avatar from "~/assets/images/avatar.svg";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      avatar
    }
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
    ...mapGetters("user", ["getUser"])
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    logoutUser() {
      this.logout();
    }
  }
};
</script>

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
