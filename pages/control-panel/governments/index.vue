<template>
  <div class="container-fluid">
    <div class="pt-5 px-lg-5 px-2 mx-lg-4">
      <div class="row">
        <div class="col-md-12">
          <div class="welcome mb-4">
            <h4>Hello, Administrator!</h4>
            <p class="date pb-3">{{new Date().toDateString()}}</p>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 col-lg-3">
          <div class="position-relative card-with-shadow pb-4">
            <div class="card text-left p-3 card1">
              <figure>
                <img src="~/assets/images/total-insurance-icon.svg" alt />
              </figure>
              <div class="value">{{total}}</div>
              <div class="title mt-2">Total Created Governments</div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div
          class="col-md-5 row"
          :class="isUpdate ? 'hidden':''"
          style="padding-right: 0px !important;"
        >
          <div class="col-12 col-md-12" style="padding-right: 0px !important;">
            <div class="position-relative card-with-shadow pb-4">
              <div class="card text-left p-3 card4">
                <figure class="d-flex justify-content-between position-relative">
                  <div class="d-flex position-relative">
                    <img src="~/assets/images/total-insurance-icon.svg" alt />
                    <div class="title ml-3 pt-4 font-weight-bold">Created Governments</div>
                  </div>
                </figure>
                <figure class="d-flex justify-content-between position-relative">
                  <div class="d-flex position-relative"></div>
                  <el-select
                    v-model="filter"
                    @change="changeFilter"
                    class="border-danger"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="(item, i) in filters"
                      :key="i"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </figure>

                <figure
                  class="d-flex justify-content-between position-relative"
                  v-for="(govt, i) in governments"
                  :key="i"
                >
                  <div class="d-flex position-relative">
                    <img src="~/assets/images/total-insurance-icon.svg" alt />
                    <div style="text-transform: capitalize;">
                      <div class="title ml-3 pt-4">{{govt.name}}</div>
                      <small class="ml-3">{{govt.leader}}</small>
                    </div>
                  </div>
                  <div>
                    <button class="add-btn active" @click="edit_govt(govt)" :disabled="loading">
                      <i class="el-icon-edit" v-if="!loading"></i>
                      <span v-else class="spinner-grow"></span>
                    </button>
                  </div>
                </figure>
                <div class="text-center">
                  <button class="add-btn" @click="previousPage" :disabled="loading||!hasPrevious">
                    <i class="ft-chevron-left" v-if="!loading"></i>
                    <span v-else class="spinner-grow"></span>
                  </button>
                  <button class="add-btn active" @click="nextPage" :disabled="loading||!hasNext">
                    <i class="ft-chevron-right" v-if="!loading"></i>
                    <span v-else class="spinner-grow"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- d-flex justify-content-between position-relative -->
        <div
          class="col-md-7 row ml-lg-3"
          style="padding-right: 0px !important;"
          v-if="$route.query.update"
        >
          <div class="col-12 col-md-12" style="padding-right: 0px !important;">
            <div class="position-relative card-with-shadow pb-4">
              <div class="card text-left p-3 card4">
                <figure class="d-flex justify-content-between position-relative">
                  <div class="d-flex position-relative">
                    <img src="~/assets/images/total-insurance-icon.svg" alt />
                    <div class="title ml-3 pt-4">Modify Government</div>
                  </div>
                  <button class="add-btn" @click="closeNewTopic()">
                    <i class="ft-x"></i>
                  </button>
                </figure>

                <form @submit.prevent="submitGovt" v-if="isUpdate">
                  <div class="row">
                    <div class="col-12">
                      <p>
                        <b>Basic Information</b>
                      </p>
                      <hr />
                    </div>
                    <div class="form-group pt-3 col-12 col-md-6">
                      <label for="title">Government Name</label>
                      <el-input class="w-100" v-model="govtPayload.name"></el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-12 col-md-6">
                      <label for="title">Government Category</label>
                      <el-select
                        style="text-transform: capitalize;"
                        class="w-100"
                        v-model="govtPayload.category"
                        @change="changedCategory"
                      >
                        <el-option
                          style="text-transform: capitalize;"
                          v-for="(item, i) in categories"
                          :value="item.id"
                          :key="i"
                          :label="item.name.toUpperCase()"
                        ></el-option>
                      </el-select>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-12 col-md-6">
                      <label for="title">Government Slogan</label>
                      <el-input class="w-100" v-model="govtPayload.slogan"></el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-12 col-md-6" v-if="viewStateGovt">
                      <label for="title">State Government</label>
                      <el-select class="w-100" v-model="govtPayload.stateGovernment">
                        <el-option
                          v-for="(govt, i) in stateGovts"
                          :key="i"
                          :label="govt.name"
                          :value="govt.id"
                        ></el-option>
                      </el-select>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-12 col-md-12">
                      <label for="title">Government Description</label>
                      <vue-editor v-model="govtPayload.description"></vue-editor>

                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                  </div>
                  <div class="form-group pt-3">
                    <el-button :loading="loading" native-type="submit">Next</el-button>
                    <el-button :loading="loading" @click="goTo2" native-type="button">Skip</el-button>
                  </div>
                </form>

                <!-- step two -->
                <form v-if="isUpdateStep2" @submit.prevent="submitGovt()">
                  <div class="row">
                    <div class="col-12 mt-3">
                      <p>
                        <b>Leaders Information</b>
                      </p>
                      <hr />
                    </div>

                    <div class="form-group pt-3 col-12 col-md-4">
                      <label for="title">Leader's Office</label>
                      <!-- <el-select class="w-100">
                        <el-option></el-option>
                      </el-select>-->
                      <el-input class="w-100"></el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-12 col-md-4">
                      <label for="title">Leader's Name</label>
                      <el-input class="w-100"></el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-12 col-md-4">
                      <label for="title">Leader's Photo</label>
                      <el-input class="w-100"></el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>

                    <div class="form-group pt-3 col-12 col-md-4">
                      <label for="title">Leader's Office</label>
                      <el-input class="w-100"></el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-12 col-md-4">
                      <label for="title">Leader's Name</label>
                      <el-input class="w-100"></el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-12 col-md-4">
                      <label for="title">Leader's Photo</label>
                      <el-input class="w-100"></el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>

                    <div class="form-group pt-3 col-12 col-md-4">
                      <label for="title">Leader's Office</label>
                      <el-input class="w-100"></el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-12 col-md-4">
                      <label for="title">Leader's Name</label>
                      <el-input class="w-100"></el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-12 col-md-4">
                      <label for="title">Leader's Photo</label>
                      <el-input class="w-100"></el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>

                    <div class="form-group pt-3 col-12 col-md-4">
                      <label for="title">Leader's Office</label>
                      <el-input class="w-100"></el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-12 col-md-4">
                      <label for="title">Leader's Name</label>
                      <el-input class="w-100"></el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-12 col-md-4">
                      <label for="title">Leader's Photo</label>
                      <el-input class="w-100"></el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>

                    <div class="form-group pt-3 pl-3">
                      <el-button :loading="loading" @click="goTo1" native-type="button">Back</el-button>
                      <el-button :loading="loading" @click="goTo3" native-type="button">Skip</el-button>
                      <el-button :loading="loading" native-type="submit">Next</el-button>
                    </div>
                  </div>
                </form>

                <!-- step two -->
                <form v-if="isUpdateStep3" @submit.prevent="submitGovt">
                  <div class="row">
                    <div class="col-12 mt-3">
                      <p>
                        <b>Government Area Information</b>
                      </p>
                      <hr />
                    </div>

                    <div class="form-group pt-3 col-6 col-md-3">
                      <label for="title">Population</label>
                      <el-input type="number" v-model="govtPayload.population" class="w-100"></el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-6 col-md-3">
                      <label for="title">Total LGAs</label>
                      <el-input type="number" v-model="govtPayload.totalLg" class="w-100"></el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-6 col-md-3">
                      <label for="title">Ruling Party</label>
                      <el-input class="w-100" v-model="govtPayload.rulingParty"></el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>

                    <div class="form-group pt-3 col-6 col-md-3">
                      <label for="title">Constituencies</label>
                      <el-input type="number" class="w-100" v-model="govtPayload.totalConstituency"></el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-6 col-md-3">
                      <label for="title">GDP per Head</label>
                      <el-input class="w-100" v-model="govtPayload.gdpPerHead"></el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-6 col-md-3">
                      <label for="title">Unemployment Rate</label>
                      <el-input type="number" class="w-100" v-model="govtPayload.unemploymentRate"></el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>

                    <div class="form-group pt-3 col-6 col-md-3">
                      <label for="title">Literacy Rate</label>
                      <el-input type="number" class="w-100" v-model="govtPayload.literacyRate"></el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-6 col-md-3">
                      <label for="title">Crime Rate</label>
                      <el-input type="number" class="w-100" v-model="govtPayload.crimeRate"></el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-6 col-md-3">
                      <label for="title">Inflation Rate</label>
                      <el-input type="number" class="w-100" v-model="govtPayload.inflationRate"></el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>

                    <div class="form-group pt-3 col-6 col-md-3">
                      <label for="title">Infant Mortality</label>
                      <el-input
                        type="number"
                        class="w-100"
                        v-model="govtPayload.infantMortalityRate"
                      ></el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-6 col-md-3">
                      <label for="title">Foreign Reserve</label>
                      <el-input type="number" class="w-100" v-model="govtPayload.foreignReserve"></el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-6 col-md-3">
                      <label for="title">Power Generated</label>
                      <el-input type="number" class="w-100" v-model="govtPayload.powerGenerated"></el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>

                    <div class="form-group pt-3 col-12 col-md-4">
                      <label for="title">Budget Pass Rate</label>
                      <el-input type="number" class="w-100" v-model="govtPayload.budgetPassDate"></el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>

                    <div class="form-group pt-3 col-12 col-md-4">
                      <label for="title">Budget Performance Rate</label>
                      <el-input
                        type="number"
                        class="w-100"
                        v-model="govtPayload.budgetPerformanceRate"
                      ></el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-12 col-md-4">
                      <label for="title">Budget Submission Rate</label>
                      <el-input
                        type="number"
                        class="w-100"
                        v-model="govtPayload.budgetSubmissionDate"
                      ></el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-12 col-md-4">
                      <label for="title">Plenary Attendance Rate</label>
                      <el-input
                        type="number"
                        class="w-100"
                        v-model="govtPayload.plenaryAttendanceRate"
                      ></el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-12 col-md-4">
                      <label for="title">Non-oil Contribution</label>
                      <el-input
                        type="number"
                        class="w-100"
                        v-model="govtPayload.nonOilSectorContributionToGDP"
                      ></el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>

                    <div class="form-group pt-3 pl-3 col-12">
                      <el-button :loading="loading" @click="goTo2" native-type="button">Back</el-button>
                      <el-button
                        :loading="loading"
                        @click.prevent="submitGovt"
                        native-type="button"
                      >Save and Exit</el-button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  layout: "controlPanelLayout",
  data() {
    return {
      skip: 0,
      limit: 5,
      total: 1000,
      filter: "SG",
      offices: [
        { label: "President", slug: "president" },
        { label: "Governor", slug: "governor" },
        { label: "Senate President", slug: "senate-president" },
        { label: "Speaker", slug: "speaker" },
        { label: "Chief Justice", slug: "chief-justice" }
      ],
      filters: [
        { value: "FG", label: "Federal Govts" },
        { value: "SG", label: "State Govts" },
        { value: "LG", label: "Loccal Govts" }
      ],
      govtPayload: {
        category: "",
        name: "",
        slogan: "",
        description: "",
        leader: "",
        cjn: "",
        senatePresident: "",
        speaker: "",
        totalLg: 0,
        population: 0,
        totalConstituency: 0,
        infantMortalityRate: 0,
        literacyRate: 0,
        unemploymentRate: 0,
        crimeRate: 0
      },

      dateRangeValue: "",
      errorMessage: "",
      loading: false,
      viewStateGovt: false,
      stateGovts: []
    };
  },
  validations: {
    govtPayload: {
      category: {
        required,
        minLength: minLength(5)
      },
      name: {
        required,
        minLength: minLength(5),
        email
      },
      slogan: {
        required,
        minLength: minLength(5)
      },
      description: {
        required,
        minLength: minLength(5)
      },
      leader: {
        required,
        minLength: minLength(5)
      },
      cjn: {
        required,
        minLength: minLength(5)
      },
      senatePresident: {
        required,
        minLength: minLength(5)
      },
      speaker: {
        required,
        minLength: minLength(5)
      }
    }
  },
  computed: {
    ...mapGetters("admin/data", ["governments", "categories"]),
    hasNext() {
      return this.limit == this.governments.length;
    },
    hasPrevious() {
      return this.skip >= this.limit;
    },
    isUpdate() {
      return this.$route.query.update && this.$route.query.stage == 1;
    },
    isUpdateStep2() {
      return this.$route.query.update && this.$route.query.stage == 2;
    },
    isUpdateStep3() {
      return this.$route.query.update && this.$route.query.stage == 3;
    }
  },
  methods: {
    ...mapActions("admin/data", [
      "getAllGovts",
      "getCats",
      "getStateGovts",
      "createGovt"
    ]),
    edit_govt(govt) {
      this.govtPayload = { ...govt };
      this.$router.push({ query: { update: govt.id, stage: 1 } });
    },
    async changedCategory() {
      let catLg = this.categories.find(e => e.slug == "LG");
      if (this.govtPayload.categoryID == catLg.id) {
        this.stateGovts = await this.getAllGovts({
          skip: 0,
          limit: 37,
          slug: "SG"
        });
        this.viewStateGovt = true;
      } else {
        this.viewStateGovt = false;
      }
    },
    changeFilter() {
      this.skip = 0;
      this.getGovts();
    },
    nextPage() {
      this.skip += this.limit;
      this.getGovts();
    },
    previousPage() {
      this.skip -= this.limit;
      this.getGovts();
    },
    goTo1() {
      this.$router.push({
        query: { update: this.$route.query.update, stage: 1 }
      });
    },
    goTo2() {
      this.$router.push({
        query: { update: this.$route.query.update, stage: 2 }
      });
    },
    goTo3() {
      this.$router.push({
        query: { update: this.$route.query.update, stage: 3 }
      });
    },

    closeNewTopic() {
      this.$router.push({ query: {} });
    },
    submitGovt() {
      let eazzy = { ...this.govtPayload };
      console.log(eazzy);
      delete eazzy.__typename;
      delete eazzy.categoryID;
      delete eazzy.totalStateConstituency;
      var ds = this;
      ds.loading = true;
      ds.createGovt(eazzy).then(data => {
        this.loading = false;
        if (data.graphQLErrors) {
          this.$toast.error(data.graphQLErrors[0].message);
          return;
        }
        if (this.isUpdate) {
          // go to update 2
          this.$router.push({ query: { update: data.id, stage: 2 } });
        }
        if (this.isUpdateStep2) {
          // go to update 3
          this.$router.push({ query: { update: data.id, stage: 3 } });
        }
        if (this.isUpdateStep3) {
          // close editing pane
          this.$router.push({ query: {} });
        }
      });
    },

    getGovts() {
      this.loading = true;
      let self = this;
      this.getAllGovts({
        skip: self.skip,
        limit: self.limit,
        slug: this.filter
      })
        .then(data => {
          this.loading = false;
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            return;
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    getCategories() {
      this.loading = true;
      let self = this;
      this.getCats()
        .then(data => {
          this.loading = false;
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            return;
          }
          this.govtPayload.categoryID = this.categories[0].id;
        })
        .catch(err => {
          this.loading = false;
        });
    }
  },
  created() {
    if (this.$route.query.update) {
      let id = this.$route.query.update;
      this.govtPayload = { ...this.governments.find(e => e.id === id) };
    }
    this.getGovts();
    this.getCategories();
  }
};
</script>


<style scoped>
.container-fluid {
  background: #fbfbfd;
}
.container {
  font-family: "Avenir Next", sans-serif;
  padding-bottom: 150px;
}
h4 {
  font-size: 24px;
  color: #240f00;
  letter-spacing: 0.1px;
  font-weight: 600;
}
p.date {
  font-size: 15px;
  line-height: 20px;
  letter-spacing: 0.2px;
  color: #737373;
}
.card {
  background: #ffffff;
  border: none;
  border-radius: 4px;
  min-height: 200px;
  z-index: 3;
}
div.value {
  font-size: 32px;
  font-weight: 700;
  color: #4d0032;
}
div.title {
  font-size: 15px;
  letter-spacing: 0.2px;
  color: #240f00;
  font-weight: 200;
}
.card-with-shadow::after {
  content: "";
  display: block;
  position: absolute;
  width: 80%;
  height: 98px;
  bottom: 34px;
  z-index: 2;
  left: 10%;
  background: #ffffff;
  box-shadow: 20px 10px 20px rgba(0, 0, 0, 0.07);
}

div.table-container {
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.05);
}

h5 {
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.1px;
  color: #4d0032;
  font-weight: 600;
  padding-top: 18px;
  padding-bottom: 18px;
}

th {
  font-size: 14px;
  letter-spacing: 0.2px;
  color: #737373;
  font-weight: 200;
}
td {
  font-size: 14px;
  letter-spacing: 0.2px;
  color: #240f00;
  font-weight: 500;
}

tr:nth-child(odd) {
  background: #f8f7f6;
}

button {
  background: #f58634;
  border-radius: 2px;
  color: white;
  font-size: 12px;
  letter-spacing: 0.2px;
  /* width: 100%; */
  width: 136px;
  border: none;
  height: 30px;
  transition: box-shadow 0.2s ease-in-out;
}

button.view {
  background: transparent;
  border: solid 1px #f58634;
  color: #f58634;
}

button.suspended {
  background: #750505 !important;
  color: #fff !important;
}

button.active {
  background: #f58634 !important;
  color: #fff !important;
}
button:focus {
  outline: 0;
  box-shadow: none;
}
button.add-btn {
  background: #fff;
  color: #f58634;
  width: 60px;
  height: 60px;
  font-size: 18px;
  line-height: 60px;
  border: solid 1px #f58634;
}
button.add-btn:hover,
button.add-btn:focus {
  box-shadow: unset;
}

button:hover,
button:focus {
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15);
}

.card1 {
  background-image: url("~assets/images/total-insurance-BG.svg");
  background-position: right bottom;
  background-size: auto;
  background-repeat: no-repeat;
}
.card2 {
  background-image: url("~assets/images/total-insurance-amount-BG.svg");
  background-position: right bottom;
  background-size: auto;
  background-repeat: no-repeat;
}
.card3 {
  background-image: url("~assets/images/total-claims-BG.svg");
  background-position: right bottom;
  background-size: auto;
  background-repeat: no-repeat;
}
.card4 {
  background-image: url("~assets/images/total-claims-amount-BG.svg");
  background-position: right bottom;
  background-size: auto;
  background-repeat: no-repeat;
}

@media (min-width: 1200px) {
  .container {
    max-width: 1360px;
  }
}
</style>
