<template>
  <div class="container-fluid">
    <div class="pt-5 px-5 mx-4">
      <div class="row">
        <div class="col-md-12">
          <div class="welcome mb-4">
            <h4>Welcome, Administrator!</h4>
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
              <div class="value">{{adminStatistics.usersCount}}</div>
              <div class="title mt-2">Total Registered Users</div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="position-relative card-with-shadow pb-4">
            <div class="card text-left p-3 card2">
              <figure>
                <img src="~/assets/images/total-insurance-icon.svg" alt />
              </figure>
              <div class="value">{{adminStatistics.adminsCount}}</div>
              <div class="title mt-2">Total Registered Administrators</div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="position-relative card-with-shadow pb-4">
            <div class="card text-left p-3 card3">
              <figure>
                <img src="~/assets/images/total-insurance-icon.svg" alt />
              </figure>
              <div class="value">{{adminStatistics.commentCount}}</div>
              <div class="title mt-2">Total Forum Comments</div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="position-relative card-with-shadow pb-4">
            <div class="card text-left p-3 card4">
              <figure>
                <img src="~/assets/images/total-insurance-icon.svg" alt />
              </figure>
              <div class="value">{{adminStatistics.roomsCount||0}}</div>
              <div class="title mt-2">Total Created Rooms</div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 row" style="padding-right: 0px !important;">
          <div class="col-md-6 col-12" style="padding-right: 10px !important;">
			<div class="position-relative card-with-shadow pb-4">
				<div class="card text-left p-3 card4">
				<figure>
					<img src="~/assets/images/total-insurance-icon.svg" alt />
				</figure>
				<div class="value">{{adminStatistics.topicsCount||0}}</div>
				<div class="title mt-2">Total Created Topics</div>
				</div>
			</div>
		  </div>
		  <div class="col-md-6 col-12 pl-md-4" style="padding-right: 0px !important;">
			<div class="position-relative card-with-shadow pb-4">
				<div class="card text-left p-3 card4">
				<figure>
					<img src="~/assets/images/total-insurance-icon.svg" alt />
				</figure>
				<div class="value">{{adminStatistics.lastMonthComments||0}}</div>
				<div class="title mt-2">Last Month's Comments</div>
				</div>
			</div>
		  </div>
        </div>
		<!-- d-flex justify-content-between position-relative -->
		<div class="col-md-6 row ml-lg-3" style="padding-right: 0px !important;">
		  <div class="col-12 col-md-12" style="padding-right: 0px !important;">
			<div class="position-relative card-with-shadow pb-4">
				<div class="card text-left p-3 card4">
					<figure class="d-flex position-relative">
						<img src="~/assets/images/total-insurance-icon.svg" alt />
						<div class="title ml-3 pt-4">Latest Comments</div>
					</figure>
					<ul style="padding-inline-start: 0;" class="px-3" v-if="adminStatistics.latestComments">
						<li class="list-style-none py-3 border-bottom flex justify-content-between position-relative"
						v-for="(comment, i) in adminStatistics.latestComments" :key="i">
							<!-- {{comment}} -->
						</li>
            <li v-if="adminStatistics.latestComments.length===0" class="list-style-none py-3 border-bottom flex justify-content-between position-relative">
              No Comments in the last month.              
            </li>
					</ul>
				
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
export default {
  layout: "controlPanelLayout",
  data() {
    return {
      mounted: false,
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
	}
  },
  computed: {
  	...mapGetters('admin', ['adminStatistics']),
    refresh(){
      if(this.mounted) {
        this.getStats();
        this.mounted = false;
      }
    }
  },
  methods: {
	  ...mapActions('admin', ['getAdminStatistics']),
	  getStats() {
      this.loading = true;
      let self = this;
      this.getAdminStatistics({token: self.token})
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
    }
  },
  created(){
	  this.mounted = true;
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
