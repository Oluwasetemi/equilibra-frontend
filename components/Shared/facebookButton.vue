<template>
  <button class="d-block w-100 facebook py-2 px-4 border-0" @click="checkFBLoginStatus">
    <img src="~assets/icons/facebook-icon.svg" alt class="float-left" />
    <span>Use Facebook Account</span>
  </button>
</template>

<script>
export default {
  methods: {
    checkFBLoginStatus() {
      // this.$auth.loginWith('facebook')
      const self = this;
      FB.login(
        function(response) {
          if (response.status === "connected") {
            self.$emit(
              "loggedInWithFacebook",
              response.authResponse.accessToken
            );
            // Logged into your app and Facebook.
          } else {
            self.$emit("facebookError", response);
          }
        },
        {
          scope: "email, user_birthday"
        }
      );
    }
  },
  created(){
    
  },
  head() {
    return {
      script: [
        {
          src: "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v4.0",
          crossorigin: "anonymous",
          async: true,
          defer: true
        }
      ]
    };
  }
};
</script>

<style scoped>
.facebook {
  background: #3b5998;
  border-radius: 4px;
  color: white;
  margin-bottom: 1rem;
  margin-top: 1rem;
  font-weight: 100;
}
</style>

