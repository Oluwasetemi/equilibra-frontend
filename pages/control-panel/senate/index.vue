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
              <div class="value">{{rooms.pageInfo?rooms.pageInfo.totalCount:0}}</div>
              <div class="title mt-2">Total Existing Senatorial DIstricts</div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div
          class="col-md-6 row"
          :class="isNewActive ? 'hidden':''"
          style="padding-right: 0px !important;"
        >
          <div class="col-12 col-md-12" style="padding-right: 0px !important;">
            <div class="position-relative card-with-shadow pb-4">
              <div class="card text-left p-3 card4">
                <figure class="d-flex justify-content-between position-relative">
                  <div class="d-flex position-relative">
                    <img src="~/assets/images/total-insurance-icon.svg" alt />
                    <div class="title ml-3 pt-4 font-weight-bold">Existing Rooms</div>
                  </div>
                  <div class="d-flex position-relative">
                    <el-select placeholder="Select State" class="mt-3 mr-2">
                      <el-option
                        style="color: #000"
                        v-for="(state, index) in governments"
                        :key="index"
                      >{{state.name | capitalizeFirstLetter}}</el-option>
                    </el-select>
                    <button class="add-btn" @click="openNewItem()">
                      <i class="ft-plus"></i>
                    </button>
                  </div>
                </figure>

                <figure
                  class="d-flex justify-content-between position-relative"
                  v-for="(room, i) in rooms.edges"
                  :key="i"
                >
                  <div class="d-flex position-relative">
                    <img src="~/assets/images/total-insurance-icon.svg" alt />
                    <div>
                      <div class="title ml-3 pt-4">{{room.name}}</div>
                      <small class="ml-3">{{room.government.name | capitalizeFirstLetter}}</small>
                    </div>
                  </div>
                  <div>
                    <button class="add-btn" @click="edit_room(room)" :disabled="loading">
                      <i class="el-icon-edit" v-if="!loading"></i>
                      <span v-else class="spinner-grow"></span>
                    </button>
                    <button
                      class="add-btn active"
                      @click="delete_room(room._id)"
                      :disabled="loading"
                    >
                      <i class="ft-trash" v-if="!loading"></i>
                      <span v-else class="spinner-grow"></span>
                    </button>
                    <!-- <button
                      class="add-btn"
                      :class="admin.isSuspended?'suspended':'active'"
                      @click="suspend_admin(admin._id, admin.isSuspended)"
                      :disabled="loading"
                    >
                      <i :class="!admin.isSuspended?'ft-user-x':'ft-user-check'" v-if="!loading"></i>
                      <span v-else class="spinner-grow"></span>
                    </button>-->
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
        <div
          class="col-md-6 row ml-lg-3"
          style="padding-right: 0px !important;"
          v-if="isNewActive||isUpdateActive"
        >
          <div class="col-12 col-md-12" style="padding-right: 0px !important;">
            <div class="position-relative card-with-shadow pb-4">
              <div class="card text-left p-3 card4">
                <figure class="d-flex justify-content-between position-relative">
                  <div class="d-flex position-relative">
                    <img src="~/assets/images/total-insurance-icon.svg" alt />
                    <div
                      class="title ml-3 pt-4"
                    >{{isUpdateActive?"Modify Room Name":"Add New Room"}}</div>
                  </div>
                  <button class="add-btn" @click="closeNewTopic()">
                    <i class="ft-x"></i>
                  </button>
                </figure>

                <form @submit.prevent="submit">
                  <div class="form-group pt-3">
                    <label for="title">District Name</label>
                    <input
                      type="text"
                      @focus="errorMessage=''"
                      id="title"
                      :class="{invalid: $v.payload.name.$error || errorMessage}"
                      @blur="$v.payload.name.$touch()"
                      class="form-control"
                      v-model="payload.name"
                      placeholder="District Name"
                    />
                    <template v-if="$v.payload.name.$dirty">
                      <p v-if="!$v.payload.name.required" class="invalid">This field is required</p>
                      <p
                        v-else-if="!$v.payload.name.minLength"
                        class="invalid"
                      >Full Name should not be less than 5 characters</p>
                    </template>
                    <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                  </div>

                  <div class="form-group pt-3">
                    <label for="title">Government</label>
                    <el-select class="w-100" v-model="payload.government">
                      <el-option
                        v-for="(govt, i) in governments"
                        :key="i"
                        :label="govt.name.toUpperCase()"
                        :value="govt._id"
                      ></el-option>
                    </el-select>
                    <template v-if="$v.payload.government.$dirty">
                      <p
                        v-if="!$v.payload.government.required"
                        class="invalid"
                      >This field is required</p>
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
import { async } from "q";
export default {
  layout: "controlPanelLayout",
  data() {
    return {
      skip: 0,
      limit: 20,
      category: "",
      stateGovts: [],
      errorMessage: "",
      payload: {
        name: "",
        _id: "",
        government: ""
      },
      loading: false
    };
  },
  validations: {
    payload: {
      name: {
        required,
        minLength: minLength(1)
      },
      government: {
        required
      }
    }
  },
  computed: {
    governments() {
      return this.$store.getters["governments"];
    },
    ...mapGetters("admin/data", ["rooms", "categories"]),
    isNewActive() {
      return this.$route.query.new;
    },
    isUpdateActive() {
      return this.$route.query.update;
    },
    hasNext() {
      return this.rooms.pageInfo ? this.rooms.pageInfo.hasNextPage : false;
    },
    hasPrevious() {
      return this.skip >= this.limit;
    }
  },
  filters: {
    capitalizeFirstLetter(val) {
      return val
        .split(" ")
        .map(word => {
          return word.charAt(0).toUpperCase() + word.substring(1);
        })
        .join(" ");
    }
  },
  methods: {
    ...mapActions("admin/data", [
      "getRooms",
      "updateRoom",
      "getCats",
      "deleteRoom",
      "createRoom",
      "getAllGovts"
    ]),
    nextPage() {
      this.skip += this.limit;
      this.getGovts();
    },
    previousPage() {
      this.skip -= this.limit;
      this.getGovts();
    },
    edit_room(room) {
      let { name, government, _id } = room;
      this.payload = { name, government: government.id, _id };
      this.$router.push({ query: { update: room._id } });
    },
    disabledDate(date) {
      console.log(date);
      return date.getTime() > Date.now();
    },
    closeNewTopic() {
      this.$router.push({ query: {} });
    },
    openNewItem() {
      this.payload = {};
      this.$router.push({ query: { new: true } });
    },
    delete_room: async function(room) {
      try {
        await this.$confirm("Are you sure? This cannot be undone.", "Warning", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning"
        });
        this.deleteRoom({
          roomId: room
        }).then(async data => {
          this.loading = false;
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            return;
          }
          this.$toast.error(data.successMessage);
          await this.getGovts();
        });
      } catch (error) {}
    },
    async changedCategory() {
      this.stateGovts = await this.getAllGovts({
        skip: 0,
        limit: 37,
        slug: this.category
      });
      this.viewStateGovt = true;
    },
    submit() {
      var ds = this;
      ds.loading = true;
      this.$route.query.new
        ? this.createRoom({
            room: {
              name: ds.payload.name,
              government: ds.payload.government,
              roomType: "SENATE"
            }
          }).then(async data => {
            this.loading = false;
            if (data.graphQLErrors) {
              this.$toast.error(data.graphQLErrors[0].message);
              return;
            }
            this.$toast.error(data.successMessage);
            await this.getGovts();
            this.closeNewTopic();
          })
        : this.updateRoom({
            room: { name: ds.payload.name },
            roomId: ds.payload._id
          }).then(async data => {
            this.loading = false;
            if (data.graphQLErrors) {
              this.$toast.error(data.graphQLErrors[0].message);
              return;
            }
            this.$toast.error(data.successMessage);
            await this.getGovts();
          });
    },
    getGovts() {
      this.loading = true;
      let self = this;
      this.getRooms({
        roomType: "SENATE",
        limit: self.limit,
        skip: self.skip
      })
        .then(data => {
          this.loading = false;
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            return;
          }
          console.log(data);
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
  mounted: async function() {
    if (this.$route.query.update) {
      this.payload = {
        ...this.rooms.edges.find(e => e._id === this.$route.query.update)
      };
    } else {
      await Promise.all([this.getGovts(), this.getCategories()]);
    }
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
