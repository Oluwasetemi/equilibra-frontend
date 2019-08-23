<template>
  <div class="card-container pt-3" :key="reRender">
    <div class="card border-0 mt-4 px-3 py-4">
      <div class="p-4 text-center">
        <transition
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          appear
        >
          <img src="~assets/icons/confirm-email-icon.svg" alt height="280px" />
        </transition>
        <p
          class="text-center pt-3"
        >A Password reset email has been sent to your email .Click the button below if you didn’t receive email.</p>
        <button
          class="w-100 mt-2 auth d-flex justify-content-center align-items-center"
          :disabled="loading"
          @click="resendEmail()"
        >
          <div class="spinner-grow text-success" role="status" v-if="loading">
            <span class="sr-only">Loading...</span>
          </div>
          <span>RESEND PASSWORD RESET EMAIL</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  layout: "authentication",
  props: ["email"],
  data() {
    return {
      loading: false,
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
    ...mapActions("auth", ["forgotPassword"]),
    resendEmail() {
      this.loading = true;
      this.forgotPassword(this.email)
        .then(data => {
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            this.loading = false;
            return;
          }
          this.reRender = true;
          this.$toast.success('A reset password email has been sent!')
          this.loading = false;
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
