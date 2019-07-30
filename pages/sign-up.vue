<template>
  <div>
    <div class="card-container pt-1" v-if="!ConfirmEmailCard">
      <div class="card border-0 mt-5">
        <div class="header border-bottom px-4 pt-3">
          <h4 class="px-3">Sign Up</h4>
          <p class="instructions px-3">Kindly fill in the following to get you using Equilibra.</p>
        </div>
        <div class="p-4">
          <div class="social-media-login px-3">
            <button class="d-block w-100 google py-2 px-4 border-0">
              <img src="~/assets/icons/google-icon.svg" alt class="float-left" />
              <span>Use Google Account</span>
            </button>
            <button class="d-block w-100 facebook py-2 px-4 border-0">
              <img src="~assets/icons/facebook-icon.svg" alt class="float-left" />
              <span>Use Facebook Account</span>
            </button>
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
          <form class="px-3">
            <div class="form-input my-2">
              <input type="text" name="name" id="name" placeholder="Full Name" class="form-control" />
            </div>
            <div class="form-input my-2">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                class="form-control"
                v-model="payload.email"
              />
            </div>
            <div class="form-input my-2">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                class="form-control"
                v-model="payload.password"
              />
            </div>
            <div class="form-input my-2">
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="Confirm Password"
                class="form-control"
              />
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
                    <select name id class="form-control mt-0" v-model="month">
                      <option value>Month</option>
                      <option :value="month" v-for="(month, i) in months" :key="i">{{ month }}</option>
                    </select>
                    <img
                      src="~/assets/icons/downward-arrow.svg"
                      alt
                      class="position-absolute down-arrow"
                    />
                  </div>
                </div>

                <div class="col-3 px-0">
                  <div class="form-input position-relative">
                    <select name id class="form-control mt-0" v-model="year">
                      <option value>Year</option>
                      <option :year="year" v-for="(year, i) in years" :key="i">{{ year }}</option>
                    </select>
                    <img
                      src="~/assets/icons/downward-arrow.svg"
                      alt
                      class="position-absolute down-arrow"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button class="sign-up w-100 mt-2 auth" @click="ConfirmEmailCard = true">SIGN UP</button>
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

import ConfirmEmailCard from "~/components/Authentication/confirm-email";
export default {
  layout: "authentication",
  components: {
    ConfirmEmailCard
  },
  data() {
    return {
      ConfirmEmailCard: false,
      month: "",
      year: "",
      payload: {
        email: "",
        password: ""
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
      ]
    };
  },
  computed: {
    years() {
      let currentYear = new Date().getFullYear();
      let years = [];
      for (let i = 1940; i <= currentYear; i++) {
        years.push(i);
      }
      return years;
    },
    getDateString() {
      return new Date(`${this.month}-${1}-${this.year}`).toISOString();
    }
  },
  methods: {
    createAccount() {
      this.payload.dob = this.getDateString();
    }
  },
  mounted() {
    console.log(this.$glogin);
  },
  head() {
    return {
      meta: [
        {
          name: "google-signin-client_id",
          content:
            "769165313432-rq98o9410ntrgg2obvkhl86k82bueoq0.apps.googleusercontent.com"
        }
      ],
      script: [
        {
          src: "https://apis.google.com/js/platform.js"
        },
      ],
    };
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
