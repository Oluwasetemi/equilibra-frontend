<template>
  <div>
    <div class="mx-md-3 pb-2">
      <div class="card px-3 pt-3 pb-4 mx-md-4">
        <div class="px-3">
          <div class="heading pb-2">
            <img src="~/assets/icons/placeholder-icon.svg" alt class="mr-2" />
            <h6 class="subheading d-inline-block">PERSONAL INFORMATION</h6>
          </div>
          <p
            style="color: #091F0E; font-size: 15px"
          >Use this page to update your contact information and change password.</p>
          <div class="change-photo d-md-flex">
            <label for="profile-pic" style="cursor: pointer">
              <img
                :src="userDetail.image || avatar"
                alt
                class="rounded-circle"
                height="100px"
                ref="avatar"
                style="object-fit: cover;width: 100px;"
              />
            </label>
            <div class="ml-md-3 d-md-flex flex-column justify-content-center">
              <div class="d-flex flex-column justify-content-center">
                <label for="profile-pic" style="cursor: pointer">
                  <a
                    href="#"
                    class="py-2"
                    style="letter-spacing: 0; pointer-events: none;"
                  >Upload a new profile image</a>
                </label>
                <input
                  type="file"
                  name="profile-pic"
                  id="profile-pic"
                  hidden
                  accept="image/*"
                  @change="previewImage()"
                />

                <p class="py-1 m-0">Maximum size allowed is 600kb of PNG, JPEG ,JPG.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-10">
            <form class="mt-3 px-3 mr-md-4" @submit.prevent="updateUserProfile">
              <div class="row">
                <div class="col-lg-4 col-md-6 px-2">
                  <div class="form-input my-2">
                    <label for="email2">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      name="email2"
                      id="email2"
                      class="form-control mt-0"
                      disabled
                      :class="{invalid: $v.userDetail.email.$error}"
                      @blur="$v.userDetail.email.$touch()"
                      v-model="userDetail.email"
                    />
                    <template v-if="$v.userDetail.email.$dirty">
                      <p v-if="!$v.userDetail.email.required" class="invalid">This field is required</p>
                      <p
                        v-else-if="!$v.userDetail.email.email"
                        class="invalid"
                      >Please provide a valid email address</p>
                    </template>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-4 col-md-6 px-2">
                  <div class="form-input my-2">
                    <label for="name2">FULL NAME</label>
                    <input
                      type="text"
                      name="name2"
                      id="name2"
                      class="form-control mt-0"
                      v-model="userDetail.fullName"
                    />
                    <template v-if="$v.userDetail.fullName.$dirty">
                      <p
                        v-if="!$v.userDetail.fullName.required"
                        class="invalid"
                      >This field is required</p>
                      <p
                        v-else-if="!$v.userDetail.fullName.minLength"
                        class="invalid"
                      >Name should not be less than 2 characters</p>
                    </template>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 px-2">
                  <div class="form-input my-2">
                    <label for="username2">USER NAME</label>
                    <input
                      type="text"
                      name="username2"
                      id="username2"
                      class="form-control mt-0"
                      v-model="userDetail.username"
                    />
                    <template v-if="$v.userDetail.username.$dirty">
                      <p
                        v-if="!$v.userDetail.username.required"
                        class="invalid"
                      >This field is required</p>
                      <p
                        v-else-if="!$v.userDetail.username.minLength"
                        class="invalid"
                      >Username should not be less than 6 characters</p>
                    </template>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 px-2">
                  <div class="form-input my-2">
                    <label for="dob2">BIRTH DATE</label>
                    <input
                      type="date"
                      name="dob2"
                      id="dob2"
                      class="form-control mt-0"
                      disabled
                      :value="userDetail.dob | formatDate"
                      @input="value=>userDetail.dob=value"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 px-2">
                  <button
                    class="green-btn mt-2 d-flex justify-content-center align-items-center"
                    type="submit"
                    :disabled="loading.profile"
                  >
                    <div class="spinner-grow text-success" role="status" v-if="loading.profile">
                      <span class="sr-only">Loading...</span>
                    </div>
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <hr class="mx-2 mt-4" />
        <div class="row">
          <div class="col-md-10">
            <p
              v-if="errorMessage"
              class="invalid px-2"
              style="font-size: 14px !important; font-weight: 400; "
            >{{errorMessage}}</p>
            <form class="px-3 mr-md-4" @submit.prevent="updateUserPassword">
              <div class="row">
                <div class="col-lg-4 col-md-6 my-2 px-2">
                  <div class="form-input">
                    <label for="password2">CURRENT PASSWORD</label>
                    <input
                      type="password"
                      name="password2"
                      id="password2"
                      class="form-control mt-0"
                      @focus="errorMessage = ''"
                      :class="{invalid: $v.payload.currentPassword.$error || errorMessage}"
                      @blur="$v.payload.currentPassword.$touch()"
                      v-model="payload.currentPassword"
                    />
                    <template v-if="$v.payload.currentPassword.$dirty">
                      <p
                        v-if="!$v.payload.currentPassword.required"
                        class="invalid"
                      >This field is required</p>
                      <p
                        v-else-if="!$v.payload.currentPassword.minLength"
                        class="invalid"
                      >Password should not be less than 6 characters</p>
                    </template>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 my-2 px-2">
                  <div class="form-input">
                    <label for="new-password2">NEW PASSWORD</label>
                    <input
                      type="password"
                      name="new-password2"
                      id="new-password2"
                      class="form-control mt-0"
                      @focus="errorMessage = ''"
                      :class="{invalid: $v.payload.newPassword.$error || errorMessage}"
                      @blur="$v.payload.newPassword.$touch()"
                      v-model="payload.newPassword"
                    />
                    <template v-if="$v.payload.newPassword.$dirty">
                      <p
                        v-if="!$v.payload.newPassword.required"
                        class="invalid"
                      >This field is required</p>
                      <p
                        v-else-if="!$v.payload.newPassword.minLength"
                        class="invalid"
                      >Password should not be less than 6 characters</p>
                    </template>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 my-2 px-2">
                  <div class="form-input">
                    <label for="confirm-password2">CONFIRM NEW PASSWORD</label>
                    <input
                      type="password"
                      name="confirm-password2"
                      id="confirm-password2"
                      class="form-control mt-0"
                      @focus="errorMessage = ''"
                      :class="{invalid: $v.confirmPassword.$error || errorMessage}"
                      @blur="$v.confirmPassword.$touch()"
                      v-model="confirmPassword"
                    />
                    <template v-if="$v.confirmPassword.$dirty">
                      <p v-if="!$v.confirmPassword.required" class="invalid">This field is required</p>
                      <p
                        v-else-if="!$v.confirmPassword.minLength"
                        class="invalid"
                      >Password should not be less than 6 characters</p>
                      <p
                        v-else-if="$v.confirmPassword.$error"
                        class="invalid"
                      >Passwords do not match</p>
                    </template>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 px-2">
                  <button
                    class="green-btn mt-2 d-flex justify-content-center align-items-center"
                    :disabled="loading.password"
                  >
                    <div class="spinner-grow text-success" role="status" v-if="loading.password">
                      <span class="sr-only">Loading...</span>
                    </div>
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import avatar from "~/assets/images/avatar.png";
import {
  required,
  minLength,
  maxLength,
  email,
  sameAs
} from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      avatar,
      file: "",
      errorMessage: "",
      loading: {
        password: false,
        profile: false
      },
      confirmPassword: "",
      payload: {
        newPassword: "",
        currentPassword: ""
      }
    };
  },
  validations: {
    payload: {
      newPassword: {
        required,
        minLength: minLength(6)
      },
      currentPassword: {
        required,
        minLength: minLength(6)
      }
    },
    confirmPassword: {
      required,
      minLength: minLength(6),
      sameAs: sameAs(vm => {
        return vm.payload.newPassword;
      })
    },
    userDetail: {
      fullName: {
        required,
        minLength: minLength(2)
      },
      email: {
        email,
        required
      },
      username: {
        required,
        minLength: minLength(6)
      }
    }
  },
  computed: {
    ...mapGetters("user", ["getUser"]),
    userDetail() {
      return JSON.parse(JSON.stringify(this.getUser));
    }
  },
  filters: {
    formatDate(val) {
      const date = new Date(val);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let dt = date.getDate();

      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }
      return year + "-" + month + "-" + dt;
    }
  },
  methods: {
    ...mapActions("user", ["changePassword", "updateProfile"]),
    previewImage() {
      this.file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = e => {
        this.$refs.avatar.src = e.target.result;
      };
    },
    updateUserPassword() {
      const self = this;
      this.loading.password = true;
      this.changePassword(this.payload)
        .then(data => {
          if (data.graphQLErrors) {
            self.errorMessage = data.graphQLErrors[0].message;
            self.$toast.error(data.graphQLErrors[0].message);
            this.loading.password = false;
            return;
          }
          this.loading.password = false;
          self.$toast.success(data.successMessage);
          this.resetPasswordForm();
          return;
        })
        .catch(err => {
          this.loading.password = false;
        });
    },
    updateUserProfile() {
      this.loading.profile = true;
      const payload = {
        fullName: this.userDetail.fullName,
        username: this.userDetail.username
      };
      if (this.file) payload.file = this.file;
      const self = this;
      this.updateProfile(payload)
        .then(data => {
          if (data.graphQLErrors) {
            self.errorMessage = data.graphQLErrors[0].message;
            self.$toast.error(data.graphQLErrors[0].message);
            this.loading.profile = false;
            return;
          }
          this.loading.profile = false;
          self.$toast.success("Your profile has been updated!");
          this.resetProfileForm();
          return;
        })
        .catch(err => {
          this.loading.profile = false;
        });
    },
    resetPasswordForm() {
      this.confirmPassword = "";
      this.payload = {
        newPassword: "",
        currentPassword: ""
      };
      this.$v.confirmPassword.$reset();
      this.$v.payload.$reset();
    }
  }
};
</script>


<style scoped>
.container-fluid {
  background-image: url("~assets/images/account-settings-BG.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #f9fdfa;
}
h4 {
  color: #091f0e;
  font-size: 22px;
  letter-spacing: 1.15px;
}
.card {
  background: #ffffff;
  border: 1px solid rgba(7, 131, 78, 0.2);
  box-sizing: border-box;
  border-radius: 1px;
  box-shadow: 12px 10px 20px rgba(46, 91, 255, 0.07);
}

label {
  color: #2c7742;
  font-size: 12px;
  letter-spacing: 1.25px;
  /* font-weight: 600; */
}

input {
  background: rgba(198, 226, 215, 0.2);
  border: 1px solid #c6e2d7;
  box-sizing: border-box;
  border-radius: 4px;
  height: 35px;
}

h6 {
  color: #2c7742;
  font-size: 13px;
  letter-spacing: 1.25px;
}

.change-photo a {
  text-decoration-line: underline;
  color: #009966;
  font-size: 13px;
}
.change-photo p {
  color: #666666;
  font-size: 12px;
}
.green-btn {
  width: 200px;
  height: 52px;
  padding: 0 5px;
  border: none;
  /* border: 1px solid #FFFFFF; */
  border-radius: 2px;
  background: #07834e;
  color: white;
}

input.form-control:disabled {
  background: #e7e7e7;
  border: 1px solid #d3d3d3;
  box-sizing: border-box;
  border-radius: 4px;
}

hr {
  background: rgba(7, 131, 78, 0.2);
}
</style>
