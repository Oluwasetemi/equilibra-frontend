<template>
  <div class="card-container pt-3" :key="reRender">
    <div class="card border-0 mt-4 px-3 py-4">
      <p
        v-if="unverifiedUserLogin && !successMessage"
        class="text-danger text-center"
        style="font-size: 16px; font-weight: 600"
      >
        An unverified user
        <span style="color: #212529">{{user}}</span> already exists!
      </p>
      <p
        class="text-success text-center"
        style="font-size: 16px; font-weight: 600"
        v-else-if="unverifiedUserLogin && successMessage"
      >A verification email has been sent to {{$store.getters['user/getUser'].email}}</p>
      <div class="p-4 text-center">
        <transition
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          appear
        >
          <img src="~assets/icons/confirm-email-icon.svg" alt height="280px" />
        </transition>
        <p class="text-center pt-3" v-if="!unverifiedUserLogin">
          A verification email has been sent to your email.
          <br />Click the button below if you not receive an email.
        </p>
        <p class="text-center pt-3" v-if="unverifiedUserLogin">
          Please verify your email by following
          the link in the email previously sent to you, or
          click the button below if you did not receive an email.
        </p>
        <button
          class="w-100 mt-2 d-flex justify-content-center align-items-center"
          @click="resendVerificationEmail()"
          :disabled="loading"
        >
          <div class="spinner-grow text-success" role="status" v-if="loading">
            <span class="sr-only">Loading...</span>
          </div>
          <span>RESEND EMAIL CONFIRMATION</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["unverifiedUserLogin", "user"],
  layout: "authentication",
  data() {
    return {
      unverifiedUser: false,
      loading: false,
      successMessage: false,
      reRender: false,
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
  },
  methods: {
    ...mapActions("auth", ["resendEmail"]),
    resendVerificationEmail() {
      this.loading = true;
      this.resendEmail()
        .then(data => {
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            this.loading = false;
            return;
          }
          this.loading = false;
          this.successMessage = true;
          this.reRender = true;
          this.$toast.success("A verification email has been sent!");
        })
        .catch(err => {
          this.loading = false;
        });
    }
  }
};
</script>


<style scoped>
p {
  font-size: 12px;
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

button {
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
