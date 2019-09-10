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
          :class="isNewActive ? 'hidden':''"
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
                  <div class="d-flex position-relative">
                    
                  </div>
                  <el-select v-model="filter" @change="getGovts" class="border-danger" placeholder="Select">
                    <el-option
                      v-for="(item, i) in filters"
                      :key="i"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
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
                    <i class="ft-arrow-left" v-if="!loading"></i>
                    <span v-else class="spinner-grow"></span>
                  </button>
                  <button class="add-btn active" @click="nextPage" :disabled="loading||!hasNext">
                    <i class="ft-arrow-right" v-if="!loading"></i>
                    <span v-else class="spinner-grow"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- d-flex justify-content-between position-relative -->
        <div class="col-md-7 row ml-lg-3" style="padding-right: 0px !important;" v-if="isNewActive||isUpdate">
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

                <form @submit.prevent="submitNewAdmin" v-if="isUpdate||isCreateNew">
                  <div class="row">
                    <div class="col-12">
                      <p><b>Basic Information</b></p>
                      <hr>
                    </div>
                    <div class="form-group pt-3 col-12 col-md-6">
                      <label for="title">Government Name</label>
                      <el-input class="w-100" v-model="govtPayload.name">
                      </el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-12 col-md-6">
                      <label for="title">Government Category</label>
                      <el-select style="text-transform: capitalize;" class="w-100" v-model="govtPayload.categoryID" @change="changedCategory">
                        <el-option style="text-transform: capitalize;" v-for="(item, i) in categories" :value="item.id" :key="i" :label="item.name">
                        </el-option>
                      </el-select>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-12 col-md-6">
                      <label for="title">Government Slogan</label>
                      <el-input class="w-100" v-model="govtPayload.slogan">
                      </el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-12 col-md-6" v-if="viewStateGovt">
                      <label for="title">State Government</label>
                      <el-select class="w-100" v-model="govtPayload.stateGovernment">
                        <el-option v-for="(govt, i) in stateGovts" :key="i" :label="govt.name" :value="govt.id">

                        </el-option>
                      </el-select>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-12 col-md-12">
                      <label for="title">Government Description</label>
                      <el-input type="textarea" rows="7" class="w-100"  v-model="govtPayload.description">
                      </el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>

                  </div>
                  <div class="form-group pt-3">
                    <button type="submit">Next</button>
                  </div>
                </form>



                <!-- step two -->

                <form v-if="isUpdateStep2">
                  <div class="row">
                    <div class="col-12 mt-3">
                      <p><b>Leaders Information</b></p>
                      <hr>
                    </div>

                    <div class="form-group pt-3 col-12 col-md-4">
                      <label for="title">Leader's Office</label>
                      <el-input class="w-100">
                      </el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-12 col-md-4">
                      <label for="title">Leader's Name</label>
                      <el-input class="w-100">
                      </el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-12 col-md-4">
                      <label for="title">Leader's Photo</label>
                      <el-input class="w-100">
                      </el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>


                    <div class="form-group pt-3 col-12 col-md-4">
                      <label for="title">Leader's Office</label>
                      <el-input class="w-100">
                      </el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-12 col-md-4">
                      <label for="title">Leader's Name</label>
                      <el-input class="w-100">
                      </el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-12 col-md-4">
                      <label for="title">Leader's Photo</label>
                      <el-input class="w-100">
                      </el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>


                    <div class="form-group pt-3 col-12 col-md-4">
                      <label for="title">Leader's Office</label>
                      <el-input class="w-100">
                      </el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-12 col-md-4">
                      <label for="title">Leader's Name</label>
                      <el-input class="w-100">
                      </el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-12 col-md-4">
                      <label for="title">Leader's Photo</label>
                      <el-input class="w-100">
                      </el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>


                    <div class="form-group pt-3 col-12 col-md-4">
                      <label for="title">Leader's Office</label>
                      <el-input class="w-100">
                      </el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-12 col-md-4">
                      <label for="title">Leader's Name</label>
                      <el-input class="w-100">
                      </el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group pt-3 col-12 col-md-4">
                      <label for="title">Leader's Photo</label>
                      <el-input class="w-100">
                      </el-input>
                      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
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
      filters: [{value: 'FG', label: 'Federal Govts'},{value: 'SG', label: 'State Govts'},{value: 'LG', label: 'Loccal Govts'}],
      govtPayload: {
        categoryID: "",
        name: "",
        slogan: "",
        description: "",
        leader: "",
        cjn: "",
        senatePresident: "",
        speaker: "",
        totalLg: "",
        population: "",
        totalConstituency: "",
        infantMortalityRate: "",
        literacyRate: "",
        unemploymentRate: ""
      },
      
      dateRangeValue: "",
      errorMessage: "",
      options: [
        { name: "Vue.js", code: "vu" },
        { name: "Javascript", code: "js" },
        { name: "Open Source", code: "os" }
      ],
      loading: false,
      viewStateGovt: false,
      stateGovts: [],
    };
  },
  validations: {
    govtPayload: {
      categoryID: {
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
    isNewActive() {
      return this.$route.query.new;
    },
    hasNext() {
      return this.limit == this.governments.length;
    },
    hasPrevious() {
      return this.skip >= this.limit;
    },
    isCreateNew(){
      return this.$route.query.new;
    },
    isUpdate(){
      return this.$route.query.update;
    },
    isUpdateStep2(){  
      return this.$route.query.update&&this.$route.query.step==2;
    },
    isUpdateStep3(){
      return this.$route.query.update&&this.$route.query.step==3;
    }
  },
  methods: {
    ...mapActions("admin/data", [
      "getAllGovts",
      "getCats",
      "getStateGovts"
    ]),
    edit_govt(govt){
      this.govtPayload = {...govt};
      this.$router.push({query: {update: govt.id}});
    },
    async changedCategory(){
      let catLg = this.categories.find(e=>e.slug=='LG');
      if(this.govtPayload.categoryID==catLg.id){
        this.stateGovts = await this.getAllGovts({skip: 0, limit: 37, slug: 'SG'});
        this.viewStateGovt = true;
      }else{
        this.viewStateGovt = false;
      }
    },
    nextPage() {
      this.skip += this.limit;
      this.getGovts();
    },
    previousPage() {
      this.skip -= this.limit;
      this.getGovts();
    },
    openNewTopic() {
      this.$router.push({ query: { new: true } });
    },
    disabledDate(date) {
      console.log(date);
      return date.getTime() > Date.now();
    },
    closeNewTopic() {
      this.$router.push({ query: {} });
    },
    submitNewAdmin() {
      var ds = this;
      ds.loading = true;
      ds.createAdmin(ds.adminPayload).then(data => {
        this.loading = false;
        if (data.graphQLErrors) {
          this.$toast.error(data.graphQLErrors[0].message);
          return;
        }
        this.$toast.error(data.successMessage);
      });
    },
    suspend_admin(id, suspended) {
      var message = !suspended
        ? "This will permanently suspend this admin. Continue?"
        : "This will reactivate this admin. Continue?";
      var ds = this;
      this.$confirm(message, "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning"
      }).then(() => {
        ds.loading = true;
        return this.suspendAdmin({ suspended, adminId: id })
          .then(data => {
            this.loading = false;
            if (data.graphQLErrors) {
              this.$toast.error(data.graphQLErrors[0].message);
              return;
            }
            this.$toast.error(data.successMessage);
            this.getAdmins();
          })
          .catch(err => {
            return (this.loading = false);
          });
      });
    },

    delete_admin(id) {
      var message = "This will permanently delete this admin. Continue?";
      var ds = this;
      this.$confirm(message, "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning"
      }).then(async () => {
        ds.loading = true;
        ds.deleteAdmin({ adminId: id }).then(data => {
          this.loading = false;
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            return;
          }
          this.$toast.error(data.successMessage);
        });
      });
    },
    getGovts() {
      this.loading = true;
      let self = this;
      this.getAllGovts({skip: self.skip, limit: self.limit, slug: this.filter})
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
    getCategories(){
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
    if(this.$route.query.update){
      let id = this.$route.query.update;
      this.govtPayload = {...this.governments.find(e=>e.id===id)};
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
