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
              <div class="value">{{reports.pageInfo?reports.pageInfo.totalCount:0}}</div>
              <div class="title mt-2">Total Reports</div>
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
                    <div class="title ml-3 pt-4">All Reports</div>
                  </div>
                </figure>
                <ul style="padding-inline-start: 0;" class="px-3">
                  <li
                    v-if="reports.edges && reports.edges.length===0"
                    class="list-style-none py-3 border bg-white py-3 px-4 text-center"
                  >No Reported Comments</li>
                  <li
                    class="list-style-none py-3 border bg-white py-3 px-4 d-flex justify-content-between position-relative"
                    v-for="(comment, i) in reports.edges"
                    :key="i"
                  >
                    <div>
                      <div>
                        <label>Original Comment</label>
                        <div class="d-flex position-relative">
                          <img
                            :src="comment.author.image"
                            class="mt-4"
                            style="width: 30px; height: 30px; border-radius: 100%;"
                            alt
                          />
                          <div>
                            <div class="title ml-3 pt-3">{{comment.comment}}</div>
                            <small
                              class="ml-3"
                              style="text-transform: capitalize;"
                            >{{comment.author.fullName}}</small>
                          </div>
                        </div>
                        <label class="mt-3">
                          All Reports
                          <i
                            class="ml-3"
                            :class="showReports?'el-icon-arrow-up':'el-icon-arrow-down'"
                            @click="showReports=!showReports"
                          ></i>
                        </label>
                      </div>
                      <div v-show="showReports">
                        <div
                          v-for="(rep, i) in comment.reports"
                          :key="i"
                          class="d-flex justify-content-between position-relative"
                        >
                          <div class="d-flex position-relative">
                            <img
                              :src="rep.reporter.image"
                              class="mt-4"
                              style="width: 30px; height: 30px; border-radius: 100%;"
                              alt
                            />
                            <div>
                              <div class="title ml-3 pt-3">{{rep.report}}</div>
                              <small
                                class="ml-3"
                                style="text-transform: capitalize;"
                              >{{rep.reporter.fullName}}</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <el-button
                        @click="removeComment(comment._id)"
                        class="bg-success text-light"
                      >Delete Comment</el-button>
                      <el-button
                        @click="removeUser(comment.author._id)"
                        class="bg-success text-light"
                      >Suspend User</el-button>
                    </div>
                  </li>
                </ul>
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
                    <div class="title ml-3 pt-4">Report Details</div>
                  </div>
                  <button class="add-btn" @click="closeNewTopic()">
                    <i class="ft-x"></i>
                  </button>
                </figure>
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
      limit: 20,
      isNewActive: false,
      showReports: false
    };
  },

  computed: {
    ...mapGetters("admin", ["reports"])
  },
  methods: {
    ...mapActions("admin", [
      "getReports",
      "deleteReportedComment",
      "deleteReportedUser"
    ]),
    openNewTopic() {
      this.$router.push({ query: { new: true } });
    },
    closeNewTopic() {
      this.$router.push({ query: {} });
    },
    removeComment: async function(id) {
      try {
        await this.$confirm(
          "Are you sure you wish to delete this comment?",
          "warning",
          {
            cancelButtonText: "Cancel",
            okButtonText: "OK"
          }
        );
        this.loading = true;
        this.deleteReportedComment({ commentId: id })
          .then(data => {
            this.loading = false;
            if (data.graphQLErrors) {
              this.$toast.error(data.graphQLErrors[0].message);
              return;
            }
            this.$toast.success(data.successMessage);
          })
          .catch(err => {
            this.loading = false;
          });
      } catch (error) {}
    },

    removeUser: async function(id) {
      try {
        await this.$confirm(
          "Are you sure you wish to delete this comment?",
          "warning",
          {
            cancelButtonText: "Cancel",
            okButtonText: "OK"
          }
        );
        try {
          this.loading = true;
          var data = await this.deleteReportedUser({ id: id });
          this.loading = false;
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            return;
          }
          this.$toast.success(data.successMessage);
        } catch (error) {
          this.loading = false;
        }
      } catch (error) {}
    },
    getAllReports() {
      this.loading = true;
      let self = this;
      this.getReports({ skip: this.skip, limit: this.limit })
        .then(data => {
          this.loading = false;
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            return;
          }
          this.$toast.success(data.successMessage);
        })
        .catch(err => {
          this.loading = false;
        });
    }
  },
  created() {
    this.getAllReports();
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
