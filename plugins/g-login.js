var script = document.createElement('script'); //Make a script DOM node
script.src = 'https://apis.google.com/js/platform.js'; //Set it's src to the provided URL
document.head.appendChild(script); //Add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)

var auth2;

gapi.load('auth2', function() {
  auth2 = gapi.auth2.init({
    client_id:
      '769165313432-rq98o9410ntrgg2obvkhl86k82bueoq0.apps.googleusercontent.com'
  });
  auth2.attachClickHandler('signin-button', {}, onSuccess, onFailure);

  auth2.isSignedIn.listen(signinChanged);
  auth2.currentUser.listen(userChanged); // This is what you use to listen for user changes
});

var signinChanged = function(val) {
  console.log('Signin state changed to ', val);
};

var onSuccess = function(user) {
  console.log('Signed in as ' + user.getBasicProfile().getName());
  // Redirect somewhere
};

var onFailure = function(error) {
  console.log(error);
};
var signOut = function() {
  auth2.signOut().then(function() {
    console.log('User signed out.');
  });
};

var userChanged = function(user) {
  if (user.getId()) {
    // Do something here
  }
};

const vue_glogin = {
  signinChanged,
  onSuccess,
  onFailure,
  signOut,
  userChanged
};
import Vue from 'vue';
// if (process.client) {
Vue.use(vue_glogin);

export default ({ app }, inject) => {
  inject('glogin', vue_glogin);
};
