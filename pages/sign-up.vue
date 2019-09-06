<template>
  <div>
    <!-- <transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft" appear> -->
    <div class="card-container pt-1" v-if="!ConfirmEmailCard">
      <div class="card border-0 mt-5">
        <div class="header border-bottom px-4 pt-3">
          <h4 class="px-3">Sign Up</h4>
          <p class="instructions px-3">Kindly fill in the following to get you using Equilibra.</p>
        </div>
        <div class="p-4">
          <div class="social-media-login px-3">
            <googleButton @loggedInWithGoogle="authenticateGoogleUser" :disabled="loading"/>
            <facebookButton @loggedInWithFacebook="authenticateFacebookUser" :disabled="loading" />
          </div>
          <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
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

          <form @submit.prevent="createAccount" class="px-3">
            <div class="form-input my-3">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                class="form-control m-0"
                :class="{invalid: $v.payload.fullName.$error}"
                @blur="$v.payload.fullName.$touch()"
                v-model="payload.fullName"
              />
              <template v-if="$v.payload.fullName.$dirty">
                <p v-if="!$v.payload.fullName.required" class="invalid">This field is required</p>
                <p
                  v-else-if="!$v.payload.fullName.minLength"
                  class="invalid"
                >Name should not be less than 2 characters</p>
              </template>
            </div>
            <div class="form-input my-3">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                class="form-control m-0"
                :class="{invalid: $v.payload.username.$error}"
                @blur="$v.payload.username.$touch()"
                v-model="payload.username"
              />
              <template v-if="$v.payload.username.$dirty">
                <p v-if="!$v.payload.username.required" class="invalid">This field is required</p>
                <p
                  v-else-if="!$v.payload.username.minLength"
                  class="invalid"
                >Username should not be less than 6 characters</p>
              </template>
            </div>
            <div class="form-input my-3">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                class="form-control m-0"
                :class="{invalid: $v.payload.email.$error}"
                @blur="$v.payload.email.$touch()"
                v-model="payload.email"
              />
              <template v-if="$v.payload.email.$dirty">
                <p v-if="!$v.payload.email.required" class="invalid">This field is required</p>
                <p
                  v-else-if="!$v.payload.email.email"
                  class="invalid"
                >Please provide a valid email address</p>
              </template>
            </div>
            <div class="form-input my-3">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                class="form-control m-0"
                :class="{invalid: $v.payload.password.$error}"
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
            <div class="form-input my-3">
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="Confirm Password"
                class="form-control m-0"
                :class="{invalid: $v.confirmPassword.$error}"
                v-model="confirmPassword"
                @blur="$v.confirmPassword.$touch()"
              />
              <template v-if="$v.confirmPassword.$dirty">
                <p v-if="!$v.confirmPassword.required" class="invalid">This field is required</p>
                <p
                  v-else-if="!$v.confirmPassword.minLength"
                  class="invalid"
                >Password should not be less than 6 characters</p>
                <p v-else-if="$v.confirmPassword.$error" class="invalid">Passwords do not match</p>
              </template>
            </div>
            <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
            <div class="form-input">
              <div class="row">
                <div class="col-12">
                  <span style="font-size: 11px; color: #168A59">Verify you are older than 16 years</span>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="form-input position-relative">
                    <select
                      name="month"
                      id="month"
                      class="form-control m-0 mt-0"
                      v-model="month"
                      :class="{invalid: $v.month.$error}"
                    >
                      <option value>Month</option>
                      <option :value="month" v-for="(month, i) in months" :key="i">{{ month }}</option>
                    </select>
                    <img
                      src="~/assets/icons/downward-arrow.svg"
                      alt
                      class="position-absolute down-arrow"
                    />
                  </div>
                  <template v-if="$v.month.$dirty">
                    <p v-if="!$v.month.required" class="invalid">This field is required</p>
                  </template>
                </div>

                <div class="col-3 px-0">
                  <div class="form-input position-relative">
                    <select
                      name="year"
                      id="year"
                      class="form-control m-0 mt-0"
                      v-model="year"
                      :class="{invalid: $v.year.$error}"
                    >
                      <option value>Year</option>
                      <option :year="year" v-for="(year, i) in years" :key="i">{{ year }}</option>
                    </select>
                    <img
                      src="~/assets/icons/downward-arrow.svg"
                      alt
                      class="position-absolute down-arrow"
                    />
                  </div>
                  <template v-if="$v.year.$dirty">
                    <p v-if="!$v.year.required" class="invalid">This field is required</p>
                  </template>
                </div>
                <div class="col-12">
                  <p
                    v-if="!$v.year.hasValidAge"
                    class="invalid"
                  >You must be older than 16 to use this platform</p>
                </div>
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
              <span>SIGN UP</span>
            </button>
          </form>
          <div class="text-center mt-2 pt-1" style="font-size: 11px; color: #091F0E;">
            <span>Already have an account?</span>
            <nuxt-link to="/login" class="font-weight-bold login ml-1">Login here</nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <ConfirmEmailCard v-if="ConfirmEmailCard" />
  </div>
</template>

<script>
var auth2;
var googleUser; // The current user
import {
  required,
  minLength,
  maxLength,
  email,
  sameAs
} from "vuelidate/lib/validators";
import googleButton from "~/components/Shared/googleButton";
import facebookButton from "~/components/Shared/facebookButton";
import { mapActions, mapGetters } from "vuex";
import ConfirmEmailCard from "~/components/Authentication/confirm-email";
export default {
  layout: "authentication",
  components: {
    ConfirmEmailCard,
    googleButton,
    facebookButton
  },
  data() {
    return {
      ConfirmEmailCard: false,
      month: "",
      year: "",
      confirmPassword: "",
      payload: {
        email: "",
        password: "",
        fullName: "",
        username: ""
      },
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      errorMessage: "",
      loading: false
    };
  },
  validations: {
    month: {
      required
    },
    year: {
      required,
      hasValidAge(value) {
        if (new Date().getFullYear() - value >= 16) {
          return true;
        }
        return false;
      }
    },
    confirmPassword: {
      required,
      minLength: minLength(6),
      sameAs: sameAs(vm => {
        return vm.payload.password;
      })
    },
    payload: {
      fullName: {
        required,
        minLength: minLength(2)
      },
      email: {
        email,
        required
      },
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
  computed: {
    years() {
      let currentYear = new Date().getFullYear();
      let years = [];
      for (let i = currentYear; i >= 1940; i--) {
        years.push(i);
      }
      return years;
    }
  },
  methods: {
    ...mapActions("auth", [
      "signUp",
      "verifyEmail",
      "loginWIthGoogle",
      "loginWIthFacebook"
    ]),
    getDateString() {
      return new Date(`${this.month}-${1}-${this.year}`).toISOString();
    },
    createAccount() {
      this.$v.$touch();
      if (this.$v.$error === true) {
        return;
      }
      this.payload.dob = this.getDateString();
      this.loading = true;
      this.signUp(this.payload)
        .then(data => {
          if (data.graphQLErrors) {
            this.errorMessage = data.graphQLErrors[0].message;
            this.loading = false;
            return;
          }
          this.ConfirmEmailCard = true;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    authenticateGoogleUser(token) {
      this.loading = false;
      this.loginWIthGoogle({ accessToken: token })
        .then(user => {
          if (user.graphQLErrors) {
            this.errorMessage = user.graphQLErrors[0].message;
            this.loading = false;
            return;
          }
          if (!user.signupStatus) {
            this.$router.push("/continue-sign-up");
            return;
          }
          this.$router.push("/forums");
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    authenticateFacebookUser(token) {
      this.loading = true;
      this.loginWIthFacebook({ accessToken: token })
        .then(user => {
          if (user.graphQLErrors) {
            this.errorMessage = user.graphQLErrors[0].message;
            this.loading = false;
            return;
          }
          if (!user.signupStatus) {
            this.$router.push("/continue-sign-up");
            return;
          }
          this.$router.push("/forums");
          this.loading = false;
        })
        .catch(err => {
          self.loading = false;
        });
    }
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
  font-size: 14px;
  font-weight: 100;
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

::placeholder {
  font-weight: 100;
}

@media screen and (max-width: 767px) {
  .card-container {
    position: unset;
  }
}
</style>
