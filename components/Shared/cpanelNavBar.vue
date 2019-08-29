<template>
  <section>
    <nav class="navbar navbar-light navbar-expand-lg d-flex justify-content-md-between align-items-center px-md-5 mb-0">
      <div style="width: 190px">
        <nuxt-link to="/" class="navbar-brand">
          <!-- <img src="~assets/images/myinshora-logo.svg" alt height="50px" /> -->
        </nuxt-link>
      </div>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse d-lg-flex justify-content-md-end" id="navbarText">
        <ul class="navbar-nav" v-if="isAuthenticated">
          <nuxt-link tag="li" to="/control-panel/dash" class="nav-item d-flex flex-column align-items-lg-center justify-content-lg-center mx-2 py-lg-0 py-2">
            <a class="nav-link py-0" href="#">
              Dashboard
              <span class="sr-only">(current)</span>
            </a>
            <div class="underline"></div>
          </nuxt-link>
          <nuxt-link tag="li" to="/control-panel/topics" class="nav-item d-flex flex-column align-items-lg-center justify-content-lg-center mx-2 py-lg-0 py-2">
            <a class="nav-link py-0" href="#">
              Topics
              <span class="sr-only">(current)</span>
            </a>
            <div class="underline"></div>
          </nuxt-link>
          <nuxt-link tag="li" to="/control-panel/admins" class="nav-item d-flex flex-column align-items-lg-center justify-content-lg-center mx-2 py-lg-0 py-2">
            <a class="nav-link py-0" href="#">
                Admins
                <span class="sr-only">(current)</span>
            </a>
            <div class="underline"></div>
          </nuxt-link>
          <nuxt-link tag="li" to="/control-panel/reports" class="nav-item d-flex flex-column align-items-lg-center justify-content-lg-center mx-2 py-lg-0 py-2">
            <a class="nav-link py-0" href="#">
                Reports
                <span class="sr-only">(current)</span>
            </a>
            <div class="underline"></div>
          </nuxt-link>
          <nuxt-link tag="li" to="/control-panel/data" class="nav-item d-flex flex-column align-items-lg-center justify-content-lg-center mx-2 py-lg-0 py-2">
            <a class="nav-link py-0" href="#">
                Data
                <span class="sr-only">(current)</span>
            </a>
            <div class="underline"></div>
          </nuxt-link>
          <li class="nav-item dropdown d-flex flex-column align-items-lg-center mx-2 py-lg-0 py-2"
          v-if="isAuthenticated">
            <a class="nav-link py-0 dropdown-toggle d-flex align-items-center justify-content-center" 
            href="#" id="navbarDropdown" aria-haspopup="true" aria-expanded="false" data-toggle="dropdown">
              <div class="inline-block avatar-wrapper d-flex align-items-center mr-2 justify-content-center">
                <span>Admin</span>
              </div>
              <span></span>
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <nuxt-link :to="'/control-panel/dash'" class="dropdown-item" href="#">Dashboard</nuxt-link>
              <a @click.prevent="logout_user()" class="dropdown-item" href="#">Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </section>
</template>
<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      show: false,
    }
  },
  methods: {
    ...mapMutations('admin', ['logout','resetState']),
    away: function() {
      this.show = false;
    },
    logout_user() {
      this.logout();
      this.resetState();
      this.$router.push('/control-panel');
    }
  },
  computed: {
    ...mapGetters('admin', ['user', 'isAuthenticated','token']),
    current() {
      return this.$route.name;
    },
  }
}

</script>
<style scoped>
.avatar-wrapper {
  background-image: url("~assets/images/avatar-bg.svg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 40px;
  width: 70px;
  color: white;
}

.dropdown-menu {
  font-size: 14px;
}

nav {
  min-height: 80px;
  background: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  color: #373737;
}

nav a:not(.dropdown-item) {
  color: #373737;
  font-weight: 500;
  position: relative;
}

nav a:hover {
  color: #373737;
}

div.underline {
  width: 50px;
  left: calc(50% - 50px);
  height: 3px;
  background: #f58634;
  bottom: 5px;
  visibility: hidden;
}

.nuxt-link-exact-active div.underline {
  visibility: visible;
}

.nav-item div .nuxt-link-exact-active~.nav-item div.underline {
  visibility: visible;
}

.nuxt-link-exact-active a {
  color: rgba(0, 0, 0, 0.7) !important;
  font-weight: 600 !important;
}

.search {
  border-radius: 10px;
  height: 20px;
  padding: 10px;
  width: 190px;
  border: 1px solid rgb(214, 215, 218);
  font-size: 12px;
}

input:focus {
  border: 1px solid #89006e;
  outline: 0;
  box-shadow: none;
}

.visible {
  visibility: visible;
  color: rgba(0, 0, 0, 0.7) !important;
  font-weight: 600 !important;
}

.search::placeholder {
  color: rgb(215, 217, 219);
}

.navbar-toggler {
  border: none;
}

.navbar-toggler:focus {
  outline: 0;
  box-shadow: none;
}

.dropdown-item.active,
.dropdown-item:active {
  background-color: unset;
}

</style>
