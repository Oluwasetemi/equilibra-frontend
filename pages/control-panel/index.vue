<template>
  <section class="">
    <div class="col-12 text-center pt-3 mt-4">
      <img src="@/assets/images/logo-dark.png">
    </div>
    <div class="col-lg-4 col-md-8 col-10 mt-5 py-5 offset-lg-4 offset-1 offset-md-2 text-center login-pad">
      <h3 class="title">
        Admin Panel
      </h3>
      <div class="form text-left px-3 mt-3">
          <p
            v-if="errorMessage"
            class="invalid"
            style="font-size: 14px !important; font-weight: 400; "
          >{{errorMessage}}</p>
        <form @submit.prevent="loginBtn">
          <div class="form-group pt-3">
            <input type="email" @focus="errorMessage=''"
                :class="{invalid: $v.credentials.username.$error || errorMessage}"
                @blur="$v.credentials.username.$touch()"
                class="form-control" 
                id="exampleInputEmail1" 
                v-model="credentials.username" 
                placeholder="Enter email" />
            <template v-if="$v.credentials.username.$dirty">
                <p v-if="!$v.credentials.username.required" class="invalid">This field is required</p>
                <p
                  v-else-if="!$v.credentials.username.minLength"
                  class="invalid"
                >Username should not be less than 2 characters</p>
            </template>
            <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
          </div>
          <div class="form-group pt-2">
            <input type="password" @focus="errorMessage=''"
                :class="{invalid: $v.credentials.password.$error || errorMessage}"
                @blur="$v.credentials.password.$touch()"
                class="form-control" 
                id="exampleInputPassword1" 
                v-model="credentials.password" placeholder="Password" />
            <template v-if="$v.credentials.password.$dirty">
                <p v-if="!$v.credentials.password.required" class="invalid">This field is required</p>
                <p
                  v-else-if="!$v.credentials.password.minLength"
                  class="invalid"
                >Password should not be less than 6 characters</p>
            </template>
          </div>
          <button type="submit" class="btn btn-login" :disabled="loading">
              <div class="spinner-grow text-success" role="status" v-if="loading">
                <span class="sr-only">Loading...</span>
              </div>
              <span v-else>Login to dashboard</span>
          </button>
        </form>
        <div class="form-group text-center pt-2">
          <router-link to="/reset-password">Forgot Password?</router-link>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import gql from 'graphql-tag'
import { required, minLength, email } from "vuelidate/lib/validators";
import { mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  layout: "controlPanelLayout",
  components: {

  },
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      },
      loading: false,
      errorMessage: ""
    }
  },
  validations: {
    credentials: {
      username: {
        required,
        minLength: minLength(6)
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },
  methods: {
    ...mapActions("admin", ["login"]),
    closeUp() {
      this.alert = false
    },
    checkUser(user) {
      this.$toast.success("You are now logged in!");
      this.$router.push("/control-panel/dash");
      this.loading = false;
    },
    loginBtn() {
      this.loading = true;
      this.login(this.credentials)
        .then(user => {
          if (user.graphQLErrors) {
            this.errorMessage = user.graphQLErrors[0].message;
            this.loading = false;
            return;
          }
          this.checkUser(user);
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
  },
  mounted() {

  }
}

</script>
<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 500;
  font-size: 35px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.login-pad {
  min-height: 400px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, .12);
}

.btn-login {
  background-color: #168A59;
  border-color: #168A59;
  color: #fff;
  width: 100%;
  border-radius: 0px;
}

.btn-login:hover, .btn-login:active {
    color: #fff;
}

</style>
