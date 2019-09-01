<template>
  <div>
    <div class="mx-md-3 mt-5">
      <div class="card px-3 pt-3 pb-4 mx-md-4">
        <div class="px-3">
          <div class="heading pb-2">
            <img src="~/assets/icons/placeholder-icon.svg" alt class="mr-2" />
            <h6 class="subheading d-inline-block">CHANGE STATE OF RESIDENCE</h6>
          </div>
          <p
            class="m-0"
            style="color: #091F0E"
          >Use this page to update your contact information and change password.</p>
        </div>
        <div class="row">
          <div class="col-md-10">
            <form class="mt-3 px-4 mr-md-4" @submit.prevent="updateUserResidence">
              <div class="row">
                <div class="col-lg-4 col-md-6 px-2">
                  <div class="form-input mb-2">
                    <label for="current-state">CURRENT STATE</label>
                    <input
                      type="text"
                      name="current-state"
                      id="current-state"
                      class="form-control mt-0"
                      disabled
                      :value="(stateOfResidence && stateOfResidence.name ? stateOfResidence.name  : '') | formatStateName"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-4 col-md-6 px-2">
                  <div class="form-input my-2">
                    <label for="new-state">NEW STATE OF RESIDENCE</label>
                    <div class="select-box position-relative">
                      <select
                        name="new-state"
                        id="new-state"
                        class="form-control mt-0"
                        v-model="payload.stateOfResidence"
                      >
                        <option></option>
                        <option
                          v-for="(govt, i) in governments"
                          :key="i"
                          :value="govt.id"
                        >{{govt.name | formatStateName}}</option>
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
                    <label for="lga">WHAT LGA DO YOU LIVE IN?</label>
                    <div class="select-box position-relative">
                      <select
                        name="lga"
                        id="lga"
                        class="form-control mt-0"
                        v-model="payload.localGovtResidence"
                      >
                        <option value></option>
                        <option
                          v-for="(govt, i) in localGovernments"
                          :key="i"
                          :value="govt.id"
                        >{{govt.name}}</option>
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
                    <label for="fed-constituencies">FEDERAL CONSTITUENCIES</label>
                    <div class="select-box position-relative">
                      <select
                        name="fed-constituencies"
                        id="fed-constituencies"
                        class="form-control mt-0"
                        v-model="payload.residenceFederalConstituency"
                      >
                        <option value></option>
                        <option
                          v-for="(govt, i) in fedConstituencies"
                          :key="i"
                          :value="govt._id"
                        >{{govt.name | formatStateName}}</option>
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
                      <select
                        name="senatorialDistrict"
                        id="senatorialDistrict"
                        class="form-control mt-0"
                        v-model="payload.stateOfResidenceSenatorialDistrict"
                      >
                        <option value></option>
                        <option
                          v-for="(govt, i) in senatorialDistricts"
                          :key="i"
                          :value="govt._id"
                        >{{govt.name }}</option>
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
                      <select
                        name="stateConstituency"
                        id="stateConstituency"
                        class="form-control mt-0"
                        v-model="payload.residenceStateConstituency"
                      >
                        <option value></option>
                        <option
                          v-for="(govt, i) in stateConstituencies"
                          :key="i"
                          :value="govt._id"
                        >{{govt.name }}</option>
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
                  <button
                    class="green-btn mt-2 d-flex align-items-center justify-content-center"
                    type="submit"
                    :disabled="loading"
                  >
                    <div class="spinner-grow text-success" role="status" v-if="loading">
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
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      loading: false,
      localGovernments: [],
      fedConstituencies: [],
      stateConstituencies: [],
      senatorialDistricts: [],
      payload: {
        localGovtResidence: "",
        stateOfResidence: "",
        residenceStateConstituency: "",
        residenceFederalConstituency: "",
        stateOfResidenceSenatorialDistrict: ""
      }
    };
  },
  computed: {
    ...mapGetters("user", ["getUser"]),
    stateOfResidence() {
      const self = this;
      return this.$store.getters["home/governments"].filter(
        govt => self.getUser.stateOfResidence == govt.id
      )[0];
    },
    governments() {
      return this.$store.getters["home/governments"];
    }
  },
  filters: {
    formatStateName(str) {
      return str
        ? `${str
            .split(" ")[0]
            .charAt(0)
            .toUpperCase()}${str.split(" ")[0].slice(1)}`
        : "";
    }
  },
  watch: {
    "payload.stateOfResidence"(val) {
      if (val) {
        this.fetchLGAs();
        this.fetchFedConstituencies();
        this.fetchStateConstituencies();
        this.fetchSenatorialDistricts();
      }
    }
  },
  mounted(){this.nuxtServerInit();},
  methods: {
    ...mapActions("user", ["updateResidence"]),
    ...mapActions('home', ['nuxtServerInit']),
    updateUserResidence() {
      this.loading = true;
      const self = this;
      this.updateResidence(this.payload)
        .then(data => {
          if (data.graphQLErrors) {
            self.errorMessage = data.graphQLErrors[0].message;
            self.$toast.error(data.graphQLErrors[0].message);
            this.loading = false;
            return;
          }
          this.loading = false;
          self.$toast.success(data.successMessage);
          this.resetForm();
          return;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    fetchFedConstituencies() {
      const self = this;
      this.$store
        .dispatch("home/fetchConstituency", {
          stateGovernmentID: self.payload.stateOfResidence,
          roomType: "HOUSE_OF_REPRESENTATIVE"
        })
        .then(data => {
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            return;
          }
          this.fedConstituencies = data;
        })
        .catch(err => {});
    },
    fetchSenatorialDistricts() {
      const self = this;
      this.$store
        .dispatch("home/fetchConstituency", {
          stateGovernmentID: self.payload.stateOfResidence,
          roomType: "SENATE"
        })
        .then(data => {
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            return;
          }
          this.senatorialDistricts = data;
          // this.loadingLGA = false;
        })
        .catch(err => {
          // this.loadingLGA = false;
        });
    },
    fetchStateConstituencies() {
      // this.loadingLGA = true;
      const self = this;
      this.$store
        .dispatch("home/fetchConstituency", {
          stateGovernmentID: self.payload.stateOfResidence,
          roomType: "HOUSE_OF_ASSEMBLY"
        })
        .then(data => {
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            // this.loadingLGA = false;
            return;
          }
          this.stateConstituencies = data;
          // this.loadingLGA = false;
        })
        .catch(err => {
          // this.loadingLGA = false;
        });
    },
    fetchLGAs() {
      // this.loadingLGA = true;
      const self = this;
      this.$store
        .dispatch("home/localGovernments", {
          stateGovernmentID: self.payload.stateOfResidence
        })
        .then(data => {
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            // this.loadingLGA = false;
            return;
          }
          this.localGovernments = data;
          // this.loadingLGA = false;
        })
        .catch(err => {
          // this.loadingLGA = false;
        });
    },
    resetForm() {
      this.payload = {
        localGovtResidence: "",
        stateOfResidence: "",
        stateOfResidenceConstituency: "",
        stateOfResidenceFedConstituency: "",
        stateOfResidenceSenatorialDistrict: ""
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
  font-size: 24px;
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
</style>
