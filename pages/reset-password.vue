<template>
  <div>
    <div class="card-container pt-3" v-if="!ResendPasswordEmail">
      <div class="card border-0 mt-4">
        <div class="header border-bottom px-4 pt-3">
          <h4 class="px-3">Reset your Password</h4>
          <p class="instructions px-3">laboris nisi ut aliquip ex ea commodo consequat</p>
        </div>
        <div class="px-4 pt-2 pb-4">
          <form class="px-3" @submit.prevent="resetUserPassword">
            <div class="form-input mb-2">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter a new password"
                class="form-control"
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
            <div class="form-input my-2">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Confirm your new password"
                class="form-control"
                :class="{invalid: $v.confirmPassword.$error}"
                @blur="$v.confirmPassword.$touch()"
                v-model="confirmPassword"
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
            <button class="sign-up w-100 mt-2 auth" type="submit" :disabled="loading">
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
    <ResendPasswordEmail v-if="ResendPasswordEmail" />
  </div>
</template>

<script>
import googleButton from "~/components/Shared/googleButton";
import { mapActions, mapGetters } from "vuex";
import { required, minLength, sameAs } from "vuelidate/lib/validators";
import ResendPasswordEmail from "~/components/Authentication/confirm-email";
export default {
  layout: "authentication2",
  components: {
    ResendPasswordEmail
  },
  validate({ query, store }) {
    if (query.token) {
      return true;
    }
  },
  data() {
    return {
      loading: false,
      ResendPasswordEmail: false,
      confirmPassword: "",
      payload: {
        password: ""
      }
    };
  },
  validations: {
    payload: {
      password: {
        required,
        minLength: minLength(6)
      }
    },
    confirmPassword: {
      required,
      minLength: minLength(6),
      sameAs: sameAs(vm => {
        return vm.payload.password;
      })
    }
  },
  methods: {
    ...mapActions("auth", ["resetPassword"]),
    resetUserPassword() {
      this.$v.$touch();
      if (this.$v.$error === true) {
        return;
      }
      this.payload.token = this.$route.query.token;
      this.loading = true;
      this.resetPassword(this.payload)
        .then(data => {
          if (data) {
            this.$toast.success(data);
            this.$router.push("/login");
          }
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

.border-bottom {
  border-color: #eaeaea;
}

.down-arrow {
  bottom: 15px;
  right: 15px;
  pointer-events: none;
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
