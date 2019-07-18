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
              />
            </div>
            <div class="form-input my-2">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                class="form-control"
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
            <div class="form-input">
              <div class="row">
                <div class="col-12">
                  <span style="font-size: 11px; color: #168A59">Verify you are older than 16 years</span>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="form-input position-relative">
                    <select name id class="form-control mt-0">
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
                    <select name id class="form-control mt-0">
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
import ConfirmEmailCard from "~/components/Authentication/confirm-email";
export default {
  layout: "authentication",
  components: {
    ConfirmEmailCard
  },
  data() {
    return {
      ConfirmEmailCard: false,
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
  font-size: 12px;
}
.facebook {
  background: #3b5998;
  border-radius: 4px;
  color: white;
  margin-bottom: 1rem;
  margin-top: 1rem;
}
.google {
  color: #464646;
  background: #fefefe;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
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
  font-size: 12px;
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
    border-color: #EAEAEA;
}

button.auth {
  background: #168a59;
  border: none;
  height: 40px;
  color: white;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.8px;
}

@media screen and (max-width: 767px) {
  .card-container {
    position: unset;
  }
}
</style>
