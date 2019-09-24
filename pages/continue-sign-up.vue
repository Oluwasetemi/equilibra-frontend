<template>
  <div class="card-container pt-1">
    <div class="card border-0 mt-5">
      <div class="header border-bottom px-4 pt-3">
        <h4 class="px-3" v-if="origin">Tell us where you are from (Origin)</h4>
        <h4 class="px-3" v-else>Tell us where you live (Residence)</h4>
        <!-- <transition>
           <h4 class="px-3" v-if="">Tell us where you are from ({{origin ? 'Origin' : 'Residence'}})</h4>
        </transition>-->
        <p class="instructions px-3">Let’s get you all setup.</p>
      </div>
      <div class="p-4">
        <form class="px-3" @submit.prevent="origin ? completeUserSignUp(): continueSignUp()">
          <div class="form-input">
            <div class="row">
              <div class="col-12">
                <div class="form-input position-relative">
                  <select
                    name="state"
                    id="state"
                    class="form-control mt-0"
                    @blur="$v.userDetails.state.$touch()"
                    :class="{invalid: $v.userDetails.state.$error}"
                    v-model="userDetails.state"
                  >
                    <option value v-if="origin">What state are you from?</option>
                    <option value v-else>What state do you live in?</option>
                    <option
                      v-for="(govt, i) in governments"
                      :key="i"
                      :value="govt.id"
                    >{{govt.name | formatStateName}}</option>
                  </select>
                  <img
                    src="~/assets/icons/downward-arrow.svg"
                    alt
                    class="position-absolute down-arrow"
                  />
                </div>
                <template v-if="$v.userDetails.state.$dirty">
                  <p v-if="!$v.userDetails.state.required" class="invalid">This field is required</p>
                </template>
              </div>
            </div>
          </div>
          <div class="form-input">
            <div class="row">
              <div class="col-12">
                <div class="form-input position-relative">
                  <select
                    name="lga"
                    id="lga"
                    class="form-control mt-0"
                    v-model="userDetails.LGA"
                    @blur="$v.userDetails.LGA.$touch()"
                    :class="{invalid: $v.userDetails.LGA.$error}"
                  >
                    <option value v-if="origin">What LGA are you from?</option>
                    <option value v-else>What LGA do you live in?</option>
                    <option
                      v-for="(govt, i) in localGovernments"
                      :key="i"
                      :value="govt.id"
                    >{{govt.name | formatStateName}}</option>
                  </select>
                  <img
                    src="~/assets/icons/downward-arrow.svg"
                    alt
                    class="position-absolute down-arrow"
                  />
                </div>
                <template v-if="$v.userDetails.LGA.$dirty">
                  <p v-if="!$v.userDetails.LGA.required" class="invalid">This field is required</p>
                </template>
              </div>
            </div>
          </div>
          <div class="form-input">
            <div class="row">
              <div class="col-12">
                <div class="form-input position-relative">
                  <select
                    name="stateFedConstituency"
                    id="stateFedConstituency"
                    class="form-control mt-0"
                    @blur="$v.userDetails.stateFedConstituency.$touch()"
                    :class="{invalid: $v.userDetails.stateFedConstituency.$error}"
                    v-model="userDetails.stateFedConstituency"
                  >
                    <option value>Federal Constituency?</option>
                    <option
                      v-for="(govt, i) in fedConstituencies"
                      :key="i"
                      :value="govt._id"
                    >{{govt.name | formatStateName}}</option>
                  </select>
                  <img
                    src="~/assets/icons/downward-arrow.svg"
                    alt
                    class="position-absolute down-arrow"
                  />
                </div>
                <template v-if="$v.userDetails.stateFedConstituency.$dirty">
                  <p
                    v-if="!$v.userDetails.stateFedConstituency.required"
                    class="invalid"
                  >This field is required</p>
                </template>
              </div>
            </div>
          </div>
          <div class="form-input">
            <div class="row">
              <div class="col-12">
                <div class="form-input position-relative">
                  <select
                    name="senatorialDistrict"
                    id="senatorialDistrict"
                    class="form-control mt-0"
                    @blur="$v.userDetails.senatorialDistrict.$touch()"
                    :class="{invalid: $v.userDetails.senatorialDistrict.$error}"
                    v-model="userDetails.senatorialDistrict"
                  >
                    <option value>Senatorial District?</option>
                    <option
                      v-for="(govt, i) in senatorialDistricts"
                      :key="i"
                      :value="govt._id"
                    >{{govt.name }}</option>
                  </select>
                  <img
                    src="~/assets/icons/downward-arrow.svg"
                    alt
                    class="position-absolute down-arrow"
                  />
                </div>
                <template v-if="$v.userDetails.senatorialDistrict.$dirty">
                  <p
                    v-if="!$v.userDetails.senatorialDistrict.required"
                    class="invalid"
                  >This field is required</p>
                </template>
              </div>
            </div>
          </div>
          <div class="form-input">
            <div class="row">
              <div class="col-12">
                <div class="form-input position-relative">
                  <select
                    name="stateConstituency"
                    id="stateConstituency"
                    class="form-control mt-0"
                    @blur="$v.userDetails.stateConstituency.$touch()"
                    :class="{invalid: $v.userDetails.stateConstituency.$error}"
                    v-model="userDetails.stateConstituency"
                  >
                    <option value>State Constituency?</option>
                    <option
                      v-for="(govt, i) in stateConstituencies"
                      :key="i"
                      :value="govt._id"
                    >{{govt.name }}</option>
                  </select>
                  <img
                    src="~/assets/icons/downward-arrow.svg"
                    alt
                    class="position-absolute down-arrow"
                  />
                </div>
                <template v-if="$v.userDetails.stateConstituency.$dirty">
                  <p
                    v-if="!$v.userDetails.stateConstituency.required"
                    class="invalid"
                  >This field is required</p>
                </template>
              </div>
            </div>
          </div>
          <div class="row" v-if="origin">
            <div class="col-4">
              <a
                href="#"
                class="white-btn w-100 mt-2 auth d-inline-flex align-items-center justify-content-center"
                @click="origin = false"
                :disabled="loading"
              ><span>BACK</span></a>
            </div>
            <div class="col-8">
              <button
                class="sign-up w-100 mt-2 auth d-flex align-items-center justify-content-center"
                type="submit"
                :disabled="loading"
              >
                <div class="spinner-grow text-success" role="status" v-if="loading">
                  <span class="sr-only">Loading...</span>
                </div>
                <span>SAVE</span>
              </button>
            </div>
          </div>
          <div class="row" v-else>
            <div class="col-12">
              <button class="sign-up w-100 mt-2 auth" type="submit" :disabled="loading">CONTINUE</button>
            </div>
          </div>
        </form>
        <div class="text-center mt-2 pt-1" style="font-size: 11px; color: #091F0E;">
          <span>Already have an account?</span>
          <nuxt-link to="/login" class="font-weight-bold login ml-1">Login here</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
export default {
  layout: "authentication",
  validate({ query, store, params, redirect }) {
    const user = store.getters["user/getUser"];
    if ((!user._id && !query.token) || user.signupStatus) {
      return false;
    }
    if (user.isVerified && !user.signupStatus) {
      return true;
    }
    return store
      .dispatch("auth/verifyEmail", query.token)
      .then(data => {
        if (data.graphQLErrors) {
          // this.$toast.error(data.graphQLErrors[0].message);
          redirect("/login");
        }
        return true;
      })
      .catch(err => {
        return false;
      });
  },
  asyncData(context) {
    return {
      user: JSON.parse(
        JSON.stringify(context.store.getters["auth/getTempUserDetails"])
      )
    };
  },
  data() {
    return {
      origin: false,
      loading: false,
      loadingLGA: false,
      localGovernments: [],
      fedConstituencies: [],
      stateConstituencies: [],
      senatorialDistricts: []
    };
  },
  validations: {
    userDetails: {
      state: {
        required
      },
      LGA: {
        required
      },
      stateFedConstituency: {
        required
      },
      senatorialDistrict: {
        required
      },
      stateConstituency: {
        required
      }
    }
  },
  computed: {
    ...mapGetters("auth", ["getTempUserDetails", "getToken"]),
    governments() {
      return this.$store.getters["governments"];
    },
    userDetails() {
      if (!this.origin) {
        return this.user.residence;
      }
      return this.user.origin;
    }
  },
  mounted() {
    this.resetTempUserDetails();
    if (this.userDetails.state) {
      this.fetchLGAs();
      this.fetchFedConstituencies();
      this.fetchStateConstituencies();
      this.fetchSenatorialDistricts();
    }
  },
  watch: {
    "userDetails.state"(val) {
      if (val) {
        this.fetchLGAs();
        this.fetchFedConstituencies();
        this.fetchStateConstituencies();
        this.fetchSenatorialDistricts();
      }
    }
  },
  filters: {
    formatStateName(str) {
      return str
        .split(" ")
        .map(word => {
          return word.charAt(0).toUpperCase() + word.substring(1);
        })
        .join(" ");
    }
  },
  methods: {
    ...mapActions("auth", [
      "setTempUserDetails",
      "completeSignup",
      "resetTempUserDetails"
    ]),
    fetchFedConstituencies() {
      const self = this;
      this.$store
        .dispatch("fetchConstituency", {
          stateGovernmentID: self.userDetails.state,
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
      // this.loadingLGA = true;
      const self = this;
      this.$store
        .dispatch("fetchConstituency", {
          stateGovernmentID: self.userDetails.state,
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
        .dispatch("fetchConstituency", {
          stateGovernmentID: self.userDetails.state,
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
      this.loadingLGA = true;
      const self = this;
      this.$store
        .dispatch("localGovernments", {
          stateGovernmentID: self.userDetails.state
        })
        .then(data => {
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            this.loadingLGA = false;
            return;
          }
          this.localGovernments = data;
          this.loadingLGA = false;
        })
        .catch(err => {
          this.loadingLGA = false;
        });
    },
    continueSignUp() {
      this.$v.userDetails.$touch();
      if (this.$v.userDetails.$error) {
        return;
      }
      this.setTempUserDetails({
        type: "residence",
        payload: this.userDetails
      });
      this.origin = true;
      this.$v.userDetails.$reset();
    },
    completeUserSignUp() {
      this.$v.userDetails.$touch();
      if (this.$v.userDetails.$error) {
        return;
      }
      this.setTempUserDetails({
        type: "origin",
        payload: this.userDetails
      });
      let origin = this.getTempUserDetails.origin;
      let residence = this.getTempUserDetails.residence;

      let toBeRenamed = [
        {
          obj: origin,
          oldKey: "state",
          newKey: "stateOfOrigin"
        },
        {
          obj: origin,
          oldKey: "LGA",
          newKey: "localGovtOrigin"
        },
        {
          obj: residence,
          oldKey: "LGA",
          newKey: "localGovtResidence"
        },
        {
          obj: residence,
          oldKey: "state",
          newKey: "stateOfResidence"
        },
        {
          obj: residence,
          oldKey: "stateConstituency",
          newKey: "stateOfResidenceConstituency"
        },
        {
          obj: residence,
          oldKey: "stateFedConstituency",
          newKey: "stateOfResidenceFedConstituency"
        },
        {
          obj: residence,
          oldKey: "senatorialDistrict",
          newKey: "stateOfResidenceSenatorialDistrict"
        }
      ];

      toBeRenamed.forEach(name => {
        this.renameObjectKey(name.obj, name.oldKey, name.newKey);
      });
      const payload = { ...origin, ...residence };
      payload.token = this.$route.query.token || this.getToken;
      this.loading = true;
      this.completeSignup(payload)
        .then(data => {
          if (data.graphQLErrors) {
            this.errorMessage = data.graphQLErrors[0].message;
            this.$toast.error(this.errorMessage), (this.loading = false);
            this.$router.push("/login");
            return;
          }
          this.loading = false;
          this.$toast.success(
            "You have succesfully completed your registration!"
          );
          this.$router.push("/forums");
        })
        .catch(err => {
          this.loading = false;
        });
    },
    renameObjectKey(obj, oldKey, newKey) {
      delete Object.assign(obj, { [newKey]: obj[oldKey] })[oldKey];
    }
  }
};
</script>


<style scoped>
h4 {
  font-size: 18px;
  line-height: 22px;
  font-weight: 600;
  color: #000000;
}
p {
  font-size: 12px;
}
.facebook {
  background: #3b5998;
  border-radius: 4px;
  color: white;
  margin-bottom: 1rem;
  margin-top: 1rem;
}
.google {
  color: #464646;
  background: #fefefe;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
}

.card {
  z-index: 3;
}

.card-container {
  background-image: url("~assets/images/card-shadow.svg");
  background-repeat: no-repeat;
  background-size: cover;
  left: 97px;
  position: relative;
}

.sign-up {
  background: #168a59;
  border: none;
  letter-spacing: 0.8px;
  font-size: 12px;
  height: 40px;
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

.login {
  color: inherit;
  text-decoration: underline;
}

.down-arrow {
  bottom: 15px;
  right: 15px;
  pointer-events: none;
}

.border-bottom {
  border-color: #eaeaea;
}

button.auth {
  background: #168a59;
  border: none;
  border-radius: 2px;
  height: 40px;
  color: white;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.8px;
}
.white-btn.auth {
  background: #fff;
  border: solid 2px #168a59;
  height: 40px;
  color: #168a59;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.8px;
  text-decoration: none;
}

p.invalid {
  position: relative;
  top: -10px;
  margin: 0;
}

@media screen and (max-width: 767px) {
  .card-container {
    position: unset;
  }
}
</style>
