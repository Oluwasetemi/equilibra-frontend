<template>
  <div>
    <div class="card-container pt-3" v-if="!ResendPasswordEmail">
      <div class="card border-0 mt-4">
        <div class="header border-bottom px-4 pt-3">
          <h4 class="px-3">Recover your Password</h4>
          <p class="instructions px-3">Please enter the email registered on your account</p>
        </div>
        <div class="p-4">
          <p class="instructions px-3">We’ll Email you a link to change your password</p>
          <form class="px-3" @submit.prevent="submitForm">
            <div class="form-input my-2">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                class="form-control"
                :class="{invalid: $v.email.$error}"
                @blur="$v.email.$touch()"
                v-model="email"
              />
              <template v-if="$v.email.$dirty">
                <p v-if="!$v.email.required" class="invalid">This field is required</p>
                <p v-else-if="!$v.email.email" class="invalid">Please provide a valid email address</p>
              </template>
            </div>
            <button
              class="sign-up w-100 mt-2 auth d-flex align-items-center justify-content-center"
              type="submit"
              :disabled="loading"
            >
              <div class="spinner-grow text-success" role="status" v-if="loading">
                <span class="sr-only">Loading...</span>
              </div>
              <span>REQUEST PASSWORD RESET</span>
            </button>
          </form>
          <div class="text-center mt-2 pt-1" style="font-size: 11px; color: #091F0E;">
            <span>Remember your password?</span>
            <nuxt-link to="/login" class="font-weight-bold login ml-1">Login here</nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <ResendPasswordEmail v-if="ResendPasswordEmail" :email="email" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { required, email } from "vuelidate/lib/validators";
import ResendPasswordEmail from "~/components/Authentication/reset-password";
export default {
  layout: "authentication2",
  components: {
    ResendPasswordEmail
  },
  data() {
    return {
      ResendPasswordEmail: false,
      email: "",
      loading: false
    };
  },
  validations: {
    email: {
      email,
      required
    }
  },
  computed: {},
  methods: {
    ...mapActions("auth", ["forgotPassword"]),
    submitForm() {
      this.loading = true;
      this.forgotPassword(this.email)
        .then(data => {
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            this.loading = false;
            return;
          }
          this.loading = false;
          this.ResendPasswordEmail = true;
        })
        .catch(err => {
          this.loading = false;
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
