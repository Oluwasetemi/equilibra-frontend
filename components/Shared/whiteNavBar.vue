<template>
  <nav class="navbar navbar-expand-lg navbar-light d-flex justify-space-between mx-lg-4 pt-3">
    <div class="container h-100">
      <nuxt-link to="/" class="navbar-brand h-100">
        <img src="~/assets/icons/green-logo.svg" alt class="h-100" />
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
          <no-ssr>
            <li class="nav-item ml-lg-4">
              <div class="dropdown" style="background: white;" v-if="isAuth">
                <a
                  href="#"
                  class="dropdown-toggle d-flex align-items-center m-0"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img :src="getUser.image || avatar" alt height="38px" class="mr-1 avatar" />
                  <div
                    class="inline-block px-2 user-name"
                    style="color: black"
                  >{{ getUser.username || getUser.fullName}}</div>
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
          </no-ssr>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import Cookie from 'js-cookie'
import avatar from "~/assets/images/avatar.svg";
import { mapActions, mapGetters } from "vuex";
export default {
  // asyncData() {
  //   return {userAuth: Cookie.get('EQUI_AUTH')}
  // },
  data() {
    return {
      avatar,
      Cookie
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "user"]),
    ...mapGetters("user", ["getUser"]),
    isAuth() {
      return Cookie.get('EQUI_AUTH') ? true : false
    }
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
@media (min-width: 1200px) {
  .container {
    max-width: 1400px !important;
  }
}
</style>

