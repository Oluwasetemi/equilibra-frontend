<template>
  <div id="gSignInWrapper">
    <button class="d-block w-100 google py-2 px-4 border-0" ref="googleBtn">
      <img src="~/assets/icons/google-icon.svg" alt class="float-left" />
      <span ref="googleTxt">Use Google Account</span>
    </button>
  </div>
</template>


<script>
var googleUser = {};
import { mapActions, mapGetters } from "vuex";
export default {
  mounted() {
    this.startApp();
  },
  methods: {
    ...mapActions("auth", ["loginWIthGoogle"]),
    attachSignin(element, auth2) {
      const self = this;
      auth2.attachClickHandler(
        element,
        {},
        function(googleUser) {
          self.$refs.googleTxt.innerText =
            "Signed in: " + googleUser.getBasicProfile().getName();
          self.$emit("loggedInWithGoogle", googleUser.Zi.access_token);
          // self.$emit('loggedInWithGoogle', googleUser.getAuthResponse().id_token)
        },
        function(error) {
          alert(JSON.stringify(error, undefined, 2));
        }
      );
    },
    startApp() {
    this.$refs.googleBtn;
      const self = this;
      gapi.load("auth2", function() {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        const auth2 = gapi.auth2.init({
          client_id: process.env.googleClientID,
          cookiepolicy: "single_host_origin"
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });
        self.attachSignin(self.$refs.googleBtn, auth2);
      });
    }
  },
  head() {
    return {
      meta: [
        {
          name: "google-signin-client_id",
          content: process.env.googleClientID
        }
      ],
      script: [
        {
          src: "https://apis.google.com/js/platform.js"
        }
      ]
    };
  }
};
</script>


<style scoped>
.google {
  color: #464646;
  background: #fefefe;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  font-weight: 100;
}
</style>
