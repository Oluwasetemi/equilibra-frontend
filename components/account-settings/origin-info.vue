<template>
  <div>
    <div class="mx-md-3 mt-5">
      <div class="card px-3 pt-3 pb-4 mx-md-4">
        <div class="px-3">
          <div class="heading pb-2">
            <img src="~/assets/icons/placeholder-icon.svg" alt class="mr-2" />
            <h6 class="subheading d-inline-block">CHANGE OF DIASPORA</h6>
          </div>
          <p
            style="color: #091F0E"
          >Use this page to update your contact information and change password.</p>
        </div>
        <div class="row">
          <div class="col-md-10">
            <form class="mt-3 px-4 mr-md-4">
              <div class="row">
                <div class="col-lg-4 col-md-6 px-2">
                  <div class="form-input my-2">
                    <label for="current-country">CURRENT COUNTRY</label>
                    <input
                      type="text"
                      name="current-country"
                      id="current-country"
                      class="form-control mt-0"
                      disabled
                    />
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 px-2">
                  <div class="form-input my-2">
                    <label for="new-country">NEW COUNTRY OF RESIDENCE</label>
                    <div class="select-box position-relative">
                      <select name="new-country" id="new-country" class="form-control mt-0">
                        <option value></option>
                      </select>
                      <img
                        src="~/assets/icons/thin-downward-arrow.svg"
                        alt
                        class="position-absolute down-arrow"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 px-2">
                  <button class="green-btn mt-2">Save Changes</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <hr class="mx-3 mt-4" />
        <div class="row">
          <div class="col-md-10">
            <div class="px-3">
              <p style="color: #091F0E">This section is for citizens returning to Nigeria</p>
            </div>
            <form class="mt-3 px-4 mr-md-4">
              <div class="row">
                <div class="col-lg-4 col-md-6 px-2">
                  <div class="form-input my-2">
                    <label for="current-country">CURRENT COUNTRY</label>
                    <div class="select-box position-relative">
                      <select name="current-country" id="current-country" class="form-control mt-0">
                        <option value></option>
                      </select>
                      <img
                        src="~/assets/icons/thin-downward-arrow.svg"
                        alt
                        class="position-absolute down-arrow"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 px-2">
                  <div class="form-input my-2">
                    <label for="new-residence">NEW COUNTRY OF RESIDENCE</label>
                    <div class="select-box position-relative">
                      <select name="new-residence" id="new-residence" class="form-control mt-0">
                        <option value></option>
                      </select>
                      <img
                        src="~/assets/icons/thin-downward-arrow.svg"
                        alt
                        class="position-absolute down-arrow"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-4 col-md-6 px-2">
                  <div class="form-input my-2">
                    <label for="new-state">NEW COUNTRY OF RESIDENCE</label>
                    <div class="select-box position-relative">
                      <select name id class="form-control mt-0">
                        <option value></option>
                      </select>
                      <img
                        src="~/assets/icons/thin-downward-arrow.svg"
                        alt
                        class="position-absolute down-arrow"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 px-2">
                  <div class="form-input my-2">
                    <label for="new-state">WHAT LGA DO YOU LIVE IN?</label>
                    <div class="select-box position-relative">
                      <select name id class="form-control mt-0">
                        <option value></option>
                      </select>
                      <img
                        src="~/assets/icons/thin-downward-arrow.svg"
                        alt
                        class="position-absolute down-arrow"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 px-2">
                  <div class="form-input my-2">
                    <label for="new-state">FEDERAL CONSTITUENCIES</label>
                    <div class="select-box position-relative">
                      <select name id class="form-control mt-0">
                        <option value></option>
                      </select>
                      <img
                        src="~/assets/icons/thin-downward-arrow.svg"
                        alt
                        class="position-absolute down-arrow"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-4 col-md-6 px-2">
                  <div class="form-input my-2">
                    <label for="new-state">SENATORIAL DISTRICT</label>
                    <div class="select-box position-relative">
                      <select name id class="form-control mt-0">
                        <option value></option>
                      </select>
                      <img
                        src="~/assets/icons/thin-downward-arrow.svg"
                        alt
                        class="position-absolute down-arrow"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 px-2">
                  <div class="form-input my-2">
                    <label for="new-state">STATE CONSTITUENCIES</label>
                    <div class="select-box position-relative">
                      <select name id class="form-control mt-0">
                        <option value></option>
                      </select>
                      <img
                        src="~/assets/icons/thin-downward-arrow.svg"
                        alt
                        class="position-absolute down-arrow"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 px-2">
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
import {mapGetters, mapActions} from 'vuex'
export default {
  computed: {
    ...mapGetters('user',['getUser'])
  }
}
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

p {
  font-size: 14px;
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

input,
select {
  background: rgba(198, 226, 215, 0.2);
  border: 1px solid #c6e2d7;
  box-sizing: border-box;
  border-radius: 4px;
  height: 35px;
  -webkit-appearance: none;
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

.down-arrow {
  top: 15px;
  right: 15px;
  pointer-events: none;
}

hr {
    background: rgba(7, 131, 78, 0.2);
}
</style>
