<template>
  <div class="card-container pt-1">
    <div class="card border-0 mt-5">
      <div class="header border-bottom px-4 pt-3">
        <h4 class="px-3">Tell us where you are from (Origin)</h4>
        <p class="instructions px-3">Let’s get you all setup.</p>
      </div>
      <div class="p-4">
        <form class="px-3">
          <div class="form-input">
            <div class="row">
              <div class="col-12">
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
            </div>
          </div>
          <div class="form-input">
            <div class="row">
              <div class="col-12">
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
            </div>
          </div>
          <div class="form-input">
            <div class="row">
              <div class="col-12">
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
            </div>
          </div>
          <div class="form-input">
            <div class="row">
              <div class="col-12">
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
  border-color: #eaeaea;
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
