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
            style="color: #091F0E"
          >Use this page to update your contact information and change password.</p>
          <div class="change-photo d-md-flex">
            <label for="profile-pic" style="cursor: pointer">
              <img
                src="~/assets/images/avatar.png"
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
            <form class="mt-3 px-3 mr-md-4">
              <div class="row">
                <div class="col-md-4 px-2">
                  <div class="form-input my-2">
                    <label for="email2">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      name="email2"
                      id="email2"
                      class="form-control mt-0"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 px-2">
                  <div class="form-input my-2">
                    <label for="name2">FULL NAME</label>
                    <input type="text" name="name2" id="name2" class="form-control mt-0" />
                  </div>
                </div>
                <div class="col-md-4 px-2">
                  <div class="form-input my-2">
                    <label for="username2">USER NAME</label>
                    <input type="text" name="username2" id="username2" class="form-control mt-0" />
                  </div>
                </div>
                <div class="col-md-4 px-2">
                  <div class="form-input my-2">
                    <label for="dob2">BIRTH DATE</label>
                    <input type="date" name="dob2" id="dob2" class="form-control mt-0" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 my-2 px-2">
                  <div class="form-input">
                    <label for="password2">CURRENT PASSWORD</label>
                    <input
                      type="password"
                      name="password2"
                      id="password2"
                      class="form-control mt-0"
                    />
                  </div>
                </div>
                <div class="col-md-4 my-2 px-2">
                  <div class="form-input">
                    <label for="new-password2">NEW PASSWORD</label>
                    <input
                      type="password"
                      name="new-password2"
                      id="new-password2"
                      class="form-control mt-0"
                    />
                  </div>
                </div>
                <div class="col-md-4 my-2 px-2">
                  <div class="form-input">
                    <label for="confirm-password2">CONFIRM NEW PASSWORD</label>
                    <input
                      type="password"
                      name="confirm-password2"
                      id="confirm-password2"
                      class="form-control mt-0"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <button class="green-btn mt-2">Save Changes</button>
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
export default {
  methods: {
    previewImage() {
      const avatar = event.target.files[0];
      // this.formData.append("photo", avatar);
      const reader = new FileReader();
      reader.readAsDataURL(avatar);
      reader.onload = e => {
        this.$refs.avatar.src = e.target.result;
      };
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
  font-size: 11px;
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
  font-size: 12px;
}
.change-photo p {
  color: #666666;
  font-size: 11px;
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
</style>

</style>
