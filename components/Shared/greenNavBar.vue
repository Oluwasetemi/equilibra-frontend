<template>
  <nav class="navbar navbar-expand-lg navbar-light d-flex justify-space-between px-lg-4">
    <signUpModal />
    <div class="container">
      <nuxt-link to="/" class="navbar-brand ml-lg-2">
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
            <div class="dropdown" style="background: white;" v-if="isAuthenticated">
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
                <nuxt-link class="dropdown-item" to="/account-settings">Account Settings</nuxt-link>
                <a class="dropdown-item" href="#">Feedback</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" @click.stop="logoutUser()">Logout</a>
              </div>
            </div>
            <button class="btn" data-toggle="modal" data-target="#signUpModal" v-else>Join Us</button>
            <!-- <nuxt-link to="/sign-up" tag="button" class="btn"></nuxt-link> -->
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script>
import avatar from "~/assets/images/avatar.png";
import { mapActions, mapGetters } from "vuex";
import signUpModal from "~/components/Authentication/sign-up";
export default {
  data() {
    return {
      avatar
    }
  },
  components: {
    signUpModal
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
  font-weight: 100;
}

.navbar-collapse {
  z-index: 4;
  background: rgb(7, 131, 78);
}

nav {
  background: #07834e;
  height: 70px;
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

