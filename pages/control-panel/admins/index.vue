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
              <div class="title mt-2">Total Created Administrators</div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8 row" style="padding-right: 0px !important;">
          <div class="col-12 col-md-12" style="padding-right: 0px !important;">
            <div class="position-relative card-with-shadow pb-4">
              <div class="card text-left p-3 card4">
                <figure class="d-flex justify-content-between position-relative">
                  <div class="d-flex position-relative">
                    <img src="~/assets/images/total-insurance-icon.svg" alt />
                    <div class="title ml-3 pt-4 font-weight-bold">Administrative Users</div>
                  </div>
                  <button class="add-btn" @click="openNewTopic()">
                    <i class="ft-plus"></i>
                  </button>
                </figure>

                <figure
                  class="d-flex justify-content-between position-relative"
                  v-for="(admin, i) in admins"
                  :key="i"
                >
                  <div class="d-flex position-relative">
                    <img src="~/assets/images/total-insurance-icon.svg" alt />
                    <div>
                      <div class="title ml-3 pt-4">{{admin.fullName}}</div>
                      <small class="ml-3">{{admin.email}}</small>
                    </div>
                  </div>
                  <div>
                    <button class="add-btn" @click="delete_admin(admin._id)" :disabled="loading">
                      <i class="ft-trash-2" v-if="!loading"></i>
                      <span v-else class="spinner-grow"></span>
                    </button>
                    <button
                      class="add-btn"
                      :class="admin.isSuspended?'suspended':'active'"
                      @click="suspend_admin(admin._id, admin.isSuspended)"
                      :disabled="loading"
                    >
                      <i :class="!admin.isSuspended?'ft-user-x':'ft-user-check'" v-if="!loading"></i>
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
        <div class="col-md-4 row ml-lg-3" style="padding-right: 0px !important;" v-if="isNewActive">
          <div class="col-12 col-md-12" style="padding-right: 0px !important;">
            <div class="position-relative card-with-shadow pb-4">
              <div class="card text-left p-3 card4">
                <figure class="d-flex justify-content-between position-relative">
                  <div class="d-flex position-relative">
                    <img src="~/assets/images/total-insurance-icon.svg" alt />
                    <div class="title ml-3 pt-4">Create New Administrator</div>
                  </div>
                  <button class="add-btn" @click="closeNewTopic()">
                    <i class="ft-x"></i>
                  </button>
                </figure>

                <form @submit.prevent="submitNewAdmin">
                  <div class="form-group pt-3">
                    <label for="title">Full Name</label>
                    <input
                      type="text"
                      @focus="errorMessage=''"
                      id="title"
                      :class="{invalid: $v.adminPayload.fullName.$error || errorMessage}"
                      @blur="$v.adminPayload.fullName.$touch()"
                      class="form-control"
                      v-model="adminPayload.fullName"
                      placeholder="Admin First Name"
                    />
                    <template v-if="$v.adminPayload.fullName.$dirty">
                      <p
                        v-if="!$v.adminPayload.fullName.required"
                        class="invalid"
                      >This field is required</p>
                      <p
                        v-else-if="!$v.adminPayload.fullName.minLength"
                        class="invalid"
                      >Full Name should not be less than 5 characters</p>
                    </template>
                    <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                  </div>

                  <div class="form-group pt-3">
                    <label for="title">Email</label>
                    <input
                      type="email"
                      @focus="errorMessage=''"
                      id="title"
                      :class="{invalid: $v.adminPayload.email.$error || errorMessage}"
                      @blur="$v.adminPayload.email.$touch()"
                      class="form-control"
                      v-model="adminPayload.email"
                      placeholder="Admin Email"
                    />
                    <template v-if="$v.adminPayload.email.$dirty">
                      <p
                        v-if="!$v.adminPayload.email.required"
                        class="invalid"
                      >This field is required</p>
                      <p
                        v-else-if="!$v.adminPayload.email.minLength"
                        class="invalid"
                      >Email should not be less than 5 characters</p>
                      <p
                        v-else-if="!$v.adminPayload.email.email"
                        class="invalid"
                      >Email should be a valid email address</p>
                    </template>
                    <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                  </div>

                  <div class="form-group pt-3">
                    <label for="title">Username</label>
                    <input
                      type="text"
                      @focus="errorMessage=''"
                      id="title"
                      :class="{invalid: $v.adminPayload.username.$error || errorMessage}"
                      @blur="$v.adminPayload.username.$touch()"
                      class="form-control"
                      v-model="adminPayload.username"
                      placeholder="Admin Username"
                    />
                    <template v-if="$v.adminPayload.username.$dirty">
                      <p
                        v-if="!$v.adminPayload.username.required"
                        class="invalid"
                      >This field is required</p>
                      <p
                        v-else-if="!$v.adminPayload.username.minLength"
                        class="invalid"
                      >username should not be less than 5 characters</p>
                    </template>
                    <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                  </div>

                  <div class="form-group pt-3">
                    <button type="submit">Save</button>
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
      mounted: false,
      skip: 0,
      limit: 5,
      total: 0,
      adminPayload: {
        fullName: "",
        email: "",
        username: ""
      },
      dateRangeValue: "",
      errorMessage: "",
      options: [
        { name: "Vue.js", code: "vu" },
        { name: "Javascript", code: "js" },
        { name: "Open Source", code: "os" }
      ],
      loading: false
    };
  },
  validations: {
    adminPayload: {
      fullName: {
        required,
        minLength: minLength(5)
      },
      email: {
        required,
        minLength: minLength(5),
        email
      },
      username: {
        required,
        minLength: minLength(5)
      }
    }
  },
  computed: {
    ...mapGetters("admin", ["admins"]),
    isNewActive() {
      return this.$route.query.new;
    },
    hasNext() {
      return this.skip < this.total - this.limit;
    },
    hasPrevious() {
      return this.skip >= this.limit;
    }
  },
  methods: {
    ...mapActions("admin", [
      "getAdminUsers",
      "suspendAdmin",
      "deleteAdmin",
      "createAdmin"
    ]),
    openNewTopic() {
      this.$router.push({ query: { new: true } });
    },
    disabledDate(date) {
      console.log(date);
      return date.getTime() > Date.now();
    },
    nextPage() {
      this.skip += this.limit;
      this.getAdmins();
    },
    previousPage() {
      this.skip -= this.limit;
      this.getAdmins();
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
        location.href = location.href;
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
          location.href = location.href;
        });
      });
    },
    getAdmins() {
      this.loading = true;
      let self = this;
      this.getAdminUsers({ type: "ADMIN", limit: self.limit, skip: self.skip })
        .then(data => {
          this.loading = false;
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            return;
          }
          this.total = data.pageInfo.totalCount;
        })
        .catch(err => {
          this.loading = false;
        });
    }
  },
  created() {
    this.getAdmins();
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
