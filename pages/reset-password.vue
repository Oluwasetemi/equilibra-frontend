<template>
  <div>
    <div class="card-container pt-3" v-if="!ResendPasswordEmail">
      <div class="card border-0 mt-4">
        <div class="header border-bottom px-4 pt-3">
          <h4 class="px-3">Reset your Password</h4>
          <p class="instructions px-3">laboris nisi ut aliquip ex ea commodo consequat</p>
        </div>
        <div class="px-4 pt-2 pb-4">
          <form class="px-3">
            <div class="form-input mb-2">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter a new password"
                class="form-control"
              />
            </div>
            <div class="form-input my-2">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Confirm your new password"
                class="form-control"
              />
            </div>
            <button class="sign-up w-100 mt-2 auth" @click="ResendPasswordEmail = true">REQUEST PASSWORD RESET</button>
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
import ResendPasswordEmail from "~/components/Authentication/confirm-email";
export default {
  layout: "authentication2",
  components: {
    ResendPasswordEmail
  },
  data() {
    return {
      ResendPasswordEmail: false,
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
    border-color: #EAEAEA;
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
