<template>
  <div
    ref="modal"
    class="modal fade"
    id="signUpModal"
    role="dialog"
    aria-labelledby="signUpLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="title border-bottom">
          <h4 class="text-left px-4 py-3 m-0">Sign Up</h4>
        </div>
        <div class="p-3">
          <div class="social-media-login px-2">
            <button class="d-block w-100 google py-2 px-4 border-0">
              <img src="~/assets/icons/google-icon.svg" alt class="float-left" />
              <span>Use Google Account</span>
            </button>
            <button class="d-block w-100 facebook py-2 px-4 border-0">
              <img src="~assets/icons/facebook-icon.svg" alt class="float-left" />
              <span>Use Facebook Account</span>
            </button>
            <button class="email py-2 px-4 w-100 d-block">Sign up using email address</button>
            <div class="separator text-center w-100">
              <div class="d-inline-block line"></div>
              <span
                class="d-inline-block px-2"
                style="color: #002A25; font-size: 14px; font-weight: 500"
              >OR</span>
              <div class="d-inline-block line"></div>
            </div>
            <button class="login py-2 px-4 w-100 d-block" @click="goToPath('/login')">Existing user? Click here to log in</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToPath(path) {
      $('#signUpModal').modal('hide');
      this.$router.push(path)
    }
  }
}
</script>



<style scoped>
.modal-content {
  max-width: 482px;
  width: 100%;
  background: #fafafa;
  border-radius: 8px;
  border: 0;
}

form {
  font-weight: 100;
}

input.form-control {
  height: 54px;
  font-size: 16px;
  line-height: 18px;
  color: #666666;
  font-weight: 100;
}

h4 {
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  color: #07834e;
  font-weight: 700;
}

p.current-topic {
  font-size: 12px;
  color: #434343;
}

textarea {
  height: 160px;
  border: 1px solid #dadada;
  box-sizing: border-box;
  border-radius: 2px;
  font-size: 16px;
  line-height: 18px;
  color: #666666;
  font-weight: 100;
  resize: none;
}

.green-btn {
  background: #07834e;
  box-shadow: 2.7px 5.5px 13.8px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  height: 64px;
  border: none;
}

button.close {
  position: absolute;
  right: 0;
  background: #dceee6;
  border-radius: 0px 4px 0px 0px;
  height: 34px;
  width: 40px;
}

button {
  font-weight: 100;
}

.close span {
  color: #07834e;
  font-weight: 100;
}

.facebook {
  background: #3b5998;
  border: 1px solid #3b5998;
  border-radius: 4px;
  color: white;
  margin-bottom: 1rem;
  margin-top: 1rem;
}
.google {
  color: #464646;
  border: 1px solid #fefefe;
  background: #fefefe;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
}

.email {
  background: #fefefe;
  border: 1px solid #07834e;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  margin-bottom: 1rem;
  margin-top: 1rem;
  color: #464646;
}

.login {
  background: #07834e;
  border: 1px solid #07834e;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  margin-bottom: 1rem;
  margin-top: 1rem;
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
</style>
