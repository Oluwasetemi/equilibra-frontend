<template>
  <button class="d-block w-100 facebook py-2 px-4 border-0" @click="checkFBLoginStatus">
    <img src="~assets/icons/facebook-icon.svg" alt class="float-left" />
    <span>Use Facebook Account</span>
  </button>
</template>

<script>
window.fbAsyncInit = function() {
  FB.init({
    appId: process.env.facebookAppID,
    cookie: true,
    xfbml: true,
    version: "v2.9"
  });

  FB.AppEvents.logPageView();
};

(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");
</script>
<script>
export default {
  methods: {
    checkFBLoginStatus() {
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

