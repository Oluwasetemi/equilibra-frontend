const vue_glogin = {};
const auth2;
const googleUser; // The current user

gapi.load('auth2', function(){
    auth2 = gapi.auth2.init({
        client_id: '769165313432-rq98o9410ntrgg2obvkhl86k82bueoq0.apps.googleusercontent.com'
    });
    auth2.attachClickHandler('signin-button', {}, onSuccess, onFailure);

    auth2.isSignedIn.listen(signinChanged);
    auth2.currentUser.listen(userChanged); // This is what you use to listen for user changes
});  

vue_glogin.signinChanged = function (val) {
    console.log('Signin state changed to ', val);
};

vue_glogin.onSuccess = function(user) {
    console.log('Signed in as ' + user.getBasicProfile().getName());
    // Redirect somewhere
};

vue_glogin.onFailure = function(error) {
    console.log(error);
};

vue_glogin.signOut = function() {
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}        

vue_glogin.userChanged = function (user) {
    if(user.getId()){
      // Do something here
    }
};

export default ({ app }, inject) => {
    inject('vue_login', vue_glogin)
  }