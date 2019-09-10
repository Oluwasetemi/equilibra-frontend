<template>
  <div class="container-fluid">
    <div class="pt-5 px-5 mx-4">
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
              <div class="value" v-if="topics.pageInfo && topics.pageInfo.totalCount">{{topics.pageInfo.totalCount}}</div>
              <div class="value" v-else>0</div>
              <div class="title mt-2">Total Created Topics</div>
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
                    <div class="title ml-3 pt-4">Created Topics</div>
                  </div>
                  <button class="add-btn" @click="openNewTopic()">
                    <i class="ft-plus"></i>
                  </button>
                </figure>

                <figure class="d-flex justify-content-between position-relative">
                  <div class="d-flex position-relative">
                    
                  </div>
                  <el-select v-model="filter" @change="getTopics" class="border-danger" placeholder="Select">
                    <el-option
                      v-for="(item, i) in filters"
                      :key="i"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </figure>
                <div class="text-center" v-loading="loading">

                </div>
                <figure v-if="!loading"
                  class="d-flex justify-content-between position-relative"
                  v-for="(topic, i) in topics.edges"
                  :key="i"
                >
                  <div class="d-flex position-relative">
                    <img src="~/assets/images/total-insurance-icon.svg" alt />
                    <div>
                      <!-- <div class="title ml-3 pt-4">{{admin.fullName}}</div> -->
                      <small class="ml-3">{{topic.title}}</small>
                    </div>
                  </div>
                  <div>
                    <button
                      class="add-btn"
                      :class="'active'"
                      @click="modifyTopic(topic)"
                      :disabled="loading"
                    >
                      <i :class="'el-icon-edit'" v-if="!loading"></i>
                      <span v-else class="spinner-grow"></span>
                    </button>
                  </div>
                </figure>
                <figure
                  class="d-flex justify-content-between position-relative"
                  v-if=" topics.edges && topics.edges.length===0"
                >
                  <div class="d-flex position-relative">
                    <img src="~/assets/images/total-insurance-icon.svg" alt />
                    <div>
                      <div class="title ml-3 pt-4">No Topics Found</div>
                    </div>
                  </div>
                </figure>

                <div class="text-center" v-if="topics.pageInfo &&topics.pageInfo.totalCount > limit">
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
                    <div class="title ml-3 pt-4" v-if="$route.query.new">Create New Topic</div>
                    <div class="title ml-3 pt-4" v-if="$route.query.update">Update Topic</div>
                  </div>
                  <button class="add-btn" @click="closeNewTopic()">
                    <i class="ft-x"></i>
                  </button>
                </figure>

                <form @submit.prevent="submitTopic">
                  <div class="form-group pt-3">
                    <label for="title">Topic Title (Required)</label>
                    <input
                      type="text"
                      @focus="errorMessage=''"
                      id="title"
                      :class="{invalid: $v.topicPayload.title.$error || errorMessage}"
                      @blur="$v.topicPayload.title.$touch()"
                      class="form-control"
                      v-model="topicPayload.title"
                      placeholder="Topic Title"
                    />
                    <template v-if="$v.topicPayload.title.$dirty">
                      <p
                        v-if="!$v.topicPayload.title.required"
                        class="invalid"
                      >This field is required</p>
                      <p
                        v-else-if="!$v.topicPayload.title.minLength"
                        class="invalid"
                      >Title should not be less than 5 characters</p>
                    </template>
                    <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                  </div>

                  <div class="form-group pt-3">
                    <label for="title">Topic Description (Required)</label>
                    <textarea
                      :rows="2"
                      @focus="errorMessage=''"
                      id="description"
                      :class="{invalid: $v.topicPayload.description.$error || errorMessage}"
                      @blur="$v.topicPayload.description.$touch()"
                      class="form-control"
                      v-model="topicPayload.description"
                      placeholder="Topic Description"
                    />
                    <template v-if="$v.topicPayload.description.$dirty">
                      <p
                        v-if="!$v.topicPayload.description.required"
                        class="invalid"
                      >This field is required</p>
                      <p
                        v-else-if="!$v.topicPayload.description.minLength"
                        class="invalid"
                      >Description should not be less than 5 characters</p>
                    </template>
                    <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                  </div>

                  <div class="form-group pt-3">
                    <label for="rooms">Schedule for Rooms (Required)</label>
                    <el-select
                      class="w-100"
                      @focus="errorMessage=''"
                      id="rooms"
                      :class="{invalid: $v.topicPayload.rooms.$error || errorMessage}"
                      @blur="$v.topicPayload.rooms.$touch()"
                      v-model="topicPayload.rooms"
                      filterable multiple
                      placeholder="Select"
                    >
                      <el-option
                        v-for="(item, i) in rooms.edges"
                        :key="i"
                        :label="item.name"
                        :value="item._id"
                      ></el-option>
                    </el-select>
                    <template v-if="$v.topicPayload.rooms.$dirty">
                      <p v-if="!$v.topicPayload.rooms.required" class="invalid">This field is required</p>
                      <p
                      v-else-if="!$v.topicPayload.rooms.minLength"
                      class="invalid"
                      >Rooms should not be less than 1 items</p>
                    </template>
                    <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                  </div>
                  <div class="form-group pt-3">
                    <label for="startDate">Start Date</label>
                    <el-select v-model="topicPayload.date" filterable class="w-100" placeholder="Select">
                      <el-option
                        v-for="(item, i) in sundays"
                        :key="i"
                        :label="new Date(item).toDateString()"
                        :value="new Date(item).toISOString()">
                      </el-option>
                    </el-select>
                  </div>

                  <div class="form-group pt-3">
                    <button>Save</button>
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
      limit: 10,
      total: 0,
      filter: true,
      filters: [{value: true, label: 'Approved'},{value: false, label: 'Not Approved'}],
      loading: false,
      pickerOptions: {
        disabledDate: (time)=>{
          return time<Date.now()
        }
      },
      topicPayload: {
        rooms: [],
        title: "",
        description: "",
        date: "",
      },
      dateRangeValue: [Date.now(), ''],
      errorMessage: "",
      options: [
        { name: "Vue.js", code: "vu" },
        { name: "Javascript", code: "js" },
        { name: "Open Source", code: "os" }
      ],
      transactions: [
        {
          type: "Third Party Motor Insurance",
          amount: 21400000,
          date: "14 0ct 2019",
          complete: true
        },
        {
          type: "Life Insurance",
          amount: 21400000,
          date: "14 0ct 2019",
          complete: true
        },
        {
          type: "Health Insurance",
          amount: 21400000,
          date: "14 0ct 2019",
          complete: false
        },
        {
          type: "Motor Insurance",
          amount: 21400000,
          date: "14 0ct 2019",
          complete: false
        }
      ]
    };
  },
  validations: {
    topicPayload: {
      title: {
        required,
        minLength: minLength(6)
      },
      description: {
        required,
        minLength: minLength(6)
      },
      date: {
        required,
        minLength: minLength(6)
      },
      rooms: {
        required,
        minLength: minLength(1)
      }
    }
  },
  computed: {
    ...mapGetters("admin", ["topics", "rooms"]),
    isNewActive() {
      return this.$route.query.new || this.$route.query.update;
    },
    hasNext() {
      return this.skip < this.total - this.limit;
    },
    hasPrevious() {
      return this.skip >= this.limit;
    },
    sundays(){
      var d = new Date(), d2 = new Date(), sundays = [];
      d.setDate(d.getDate() + (0 + 7 - d.getDay()) % 7);
      sundays.push(new Date(d));
      for (let index = 0; index < 9; index++) {
        sundays.push(new Date(d.setDate(d.getDate() + (7))));
      }
      return sundays;
    }
  },
  methods: {
    ...mapActions("admin", ["getAllTopics", "getRooms", "saveTopic","deleteTopic", "updateTopic"]),
    openNewTopic() {
      this.topicPayload = {
        rooms: [],
        title: "",
        description: "",
        startDate: "",
      };
      this.$router.push({ query: { new: true } });
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

    modifyTopic: async function(topic){
      // modify topic logic happens here
      this.topicPayload = {...topic};
      this.$router.push({query: {update: topic._id}});
    },
    getAllRooms: async function() {
      this.loading = true;
      let self = this;
      try {
        let data = await this.getRooms({});
        this.loading = false;
        if (data.graphQLErrors) {
          this.$toast.error(data.graphQLErrors[0].message);
          return;
        }
      } catch (error) {
        this.loading = false;
      }
    },
    submitTopic() {
      this.$v.$touch();
      let isInvalid = this.$v.$invalid;
      if(isInvalid) return;
      this.loading = true;
      let self = this;
      var {_id, title, rooms, description} = self.topicPayload;
      if(this.$route.query.update){
        this.updateTopic({topic: {title, rooms, description}, _id})
        .then(data => {
          self.loading = false;
          if (data.graphQLErrors) {
            self.$toast.error(data.graphQLErrors[0].message);
            return;
          }
          this.$toast.error("Topic updated");
          return;
        })
        .catch(err => {
          self.loading = false;
          return;
        });
      }
      
      if(this.$route.query.new){
        this.saveTopic({topic: self.topicPayload})
        .then(data => {
          self.loading = false;
          if (data.graphQLErrors) {
            self.$toast.error(data.graphQLErrors[0].message);
            return;
          }
          this.$toast.error("Topic Created");
        })
        .catch(err => {
          self.loading = false;
          return;
        });
      }
    },
    resetFields(){
      if(this.$route.query.update){
        this.topicPayload = this.topics.filter(e=>e._id==this.$route.query.update);
      }
    },
    getTopics: async function() {
      this.loading = true;
      let self = this;
      try {
        let data = this.getAllTopics({query: {isVerified: self.filter}, limit: self.limit, skip: self.skip})
        this.loading = false;
        if (data.graphQLErrors) {
          this.$toast.error(data.graphQLErrors[0].message);
          return;
        }
      } catch (error) {
        this.loading = false;
      }
    }
  },
  created() {
    this.getTopics();
    this.getAllRooms();
  },
  mounted(){
    this.resetFields();
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
