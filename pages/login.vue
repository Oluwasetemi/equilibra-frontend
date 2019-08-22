<template>
  <div>
    <div class="card-container pt-1" v-if="!ConfirmEmailCard">
      <div class="card border-0 mt-5">
        <div class="header border-bottom px-4 pt-3">
          <h4 class="px-3">Welcome Back</h4>
          <p class="instructions px-3">Kindly fill in the following to get you using Equilibra.</p>
        </div>
        <div class="p-4">
          <div class="social-media-login px-3">
            <googleButton @loggedInWithGoogle="authenticateGoogleUser" :disabled="loading" />
            <facebookButton @loggedInWithFacebook="authenticateFacebookUser" :disabled="loading" />
          </div>
          <div class="separator text-center w-100">
            <div class="d-inline-block line"></div>
            <span
              class="d-inline-block font-weight-bold px-2"
              style="color: #002A25; font-size: 12px"
            >OR</span>
            <div class="d-inline-block line"></div>
          </div>
          <p
            v-if="errorMessage"
            class="invalid px-3"
            style="font-size: 14px !important; font-weight: 400; "
          >{{errorMessage}}</p>
          <form class="px-3"  autocomplete="off" @submit.prevent="authenticateUser">
            <div class="form-input my-2">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username or Email"
                class="form-control"
                @focus="errorMessage=''"
                :class="{invalid: $v.payload.username.$error || errorMessage}"
                @blur="$v.payload.username.$touch()"
                v-model="payload.username"
              />
              <template v-if="$v.payload.username.$dirty">
                <p v-if="!$v.payload.username.required" class="invalid">This field is required</p>
                <p
                  v-else-if="!$v.payload.username.minLength"
                  class="invalid"
                >Username should not be less than 2 characters</p>
              </template>
            </div>
            <div class="form-input my-2">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                class="form-control"
                @focus="errorMessage=''"
                :class="{invalid: $v.payload.password.$error || errorMessage}"
                @blur="$v.payload.password.$touch()"
                v-model="payload.password"
              />
              <template v-if="$v.payload.password.$dirty">
                <p v-if="!$v.payload.password.required" class="invalid">This field is required</p>
                <p
                  v-else-if="!$v.payload.password.minLength"
                  class="invalid"
                >Password should not be less than 6 characters</p>
              </template>
            </div>
            <div class="row">
              <div class="col-12">
                <nuxt-link
                  to="/forgot-password"
                  style="font-size: 11px; color: #168A59"
                >Forgot my password?</nuxt-link>
              </div>
            </div>

            <button
              class="sign-up w-100 mt-2 auth d-flex justify-content-center align-items-center"
              type="submit"
              :disabled="loading"
            >
              <div class="spinner-grow text-success" role="status" v-if="loading">
                <span class="sr-only">Loading...</span>
              </div>
              <span>LOGIN</span>
            </button>
          </form>
          <div class="text-center mt-2 pt-1" style="font-size: 11px; color: #091F0E;">
            <span>Don't have an account?</span>
            <nuxt-link to="/sign-up" class="font-weight-bold login ml-1">Create One</nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <ConfirmEmailCard v-if="ConfirmEmailCard" :unverifiedUserLogin="true" :user="payload.username"/>
  </div>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import googleButton from "~/components/Shared/googleButton";
import facebookButton from "~/components/Shared/facebookButton";
import { mapActions, mapGetters } from "vuex";
import ConfirmEmailCard from "~/components/Authentication/confirm-email";
export default {
  layout: "authentication2",
  components: {
    ConfirmEmailCard,
    googleButton,
    facebookButton
  },
  data() {
    return {
      ConfirmEmailCard: false,
      loading: false,
      payload: {
        username: "",
        password: ""
      },
      errorMessage: ""
    };
  },
  validations: {
    payload: {
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
    ...mapActions("auth", ["login", "loginWIthGoogle", "loginWIthFacebook"]),
    checkUser(user) {
      if (!user.isVerified) {
        this.ConfirmEmailCard = true;
        this.loading = false;
        return;
      } else if (!user.signupStatus) {
        this.$router.push("/continue-sign-up");
        this.loading = false;
        return;
      }
      this.$toast.success("You are now logged in!");
      this.$router.push("/forums");
      this.loading = false;
    },
    authenticateUser() {
      this.loading = true;
      this.login(this.payload)
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
    authenticateGoogleUser(token) {
      this.loading = true;
      const self = this;
      this.loginWIthGoogle({ accessToken: token })
        .then(user => {
          if (user.graphQLErrors) {
            this.errorMessage = user.graphQLErrors[0].message;
            this.loading = false;
            return;
          }
          self.checkUser(user);
        })
        .catch(err => {
          self.loading = false;
        });
    },
    authenticateFacebookUser(token) {
      const self = this;
      self.loading = true;
      this.loginWIthFacebook({ accessToken: token })
        .then(user => {
          if (user.graphQLErrors) {
            this.errorMessage = user.graphQLErrors[0].message;
            this.loading = false;
            return;
          }
          self.checkUser(user);
        })
        .catch(err => {
          self.loading = false;
        });
    }
  },
  computed: {
    ...mapGetters("auth", ["getToken"]),
    ...mapGetters("user", ["getUser"])
  }
};
</script>


<style scoped>
h4 {
  font-size: 18px;
  line-height: 22px;
  font-weight: 600;
  color: #000000;
}
p {
  font-size: 12px;
}
.facebook {
  background: #3b5998;
  border-radius: 4px;
  color: white;
  margin-bottom: 1rem;
  margin-top: 1rem;
  font-weight: 100;
}
.google {
  color: #464646;
  background: #fefefe;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  font-weight: 100;
}

.card {
  z-index: 3;
}

.card-container {
  background-image: url("~assets/images/card-shadow.svg");
  background-repeat: no-repeat;
  background-size: cover;
  left: 97px;
  position: relative;
}

.sign-up {
  background: #168a59;
  border: none;
  letter-spacing: 0.8px;
  font-size: 14px;
  height: 40px;
  color: white;
}

.line {
  content: "";
  display: inline-block;
  height: 1px;
  width: 30%;
  position: relative;
  background: #a8d3c1;
  top: -4px;
}

.login {
  color: inherit;
  text-decoration: underline;
}

.down-arrow {
  bottom: 15px;
  right: 15px;
  pointer-events: none;
}

.border-bottom {
  border-color: #eaeaea;
}

button.auth {
  background: #168a59;
  border: none;
  height: 40px;
  color: white;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.8px;
}

@media screen and (max-width: 767px) {
  .card-container {
    position: unset;
  }
}
</style>
