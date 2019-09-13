<template>
  <div class="main-container">
    <div class="container-fluid px-0 header">
      <div class="container">
        <header class="pt-3">
          <nav class="navbar navbar-expand-lg navbar-light d-flex justify-space-between px-0">
            <nuxt-link to="/" class="navbar-brand">
              <img src="~/assets/icons/logo.svg" alt />
            </nuxt-link>

            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div
              class="collapse navbar-collapse d-lg-flex justify-content-md-end"
              id="navbarSupportedContent"
            >
              <ul class="navbar-nav">
                <li class="nav-item">
                  <nuxt-link to="/" class="nav-link">Home</nuxt-link>
                  <!-- <a class="" href="#"></a> -->
                </li>
                <li class="nav-item">
                  <nuxt-link to="/forums" class="nav-link">Forums</nuxt-link>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="http://www.theequilibra.com/blog/">Blog</a>
                </li>
                <li class="nav-item">
                  <nuxt-link to="/contact-us" class="nav-link">Contact Us</nuxt-link>
                </li>
                <li class="nav-item ml-4">
                  <transition
                    enter-active-class="animated zoomIn"
                    leave-active-class="animated fadeOut"
                    appear
                    mode="out-in"
                  >
                    <div
                      class="dropdown"
                      style="background: white;"
                      v-if="isAuthenticated"
                      :key="1"
                    >
                      <a
                        href="#"
                        class="dropdown-toggle d-flex align-items-center m-0"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <img :src="getUser.image || avatar" alt height="38px" class="mr-1 avatar" />
                        <div
                          class="inline-block pl-2 user-name"
                          style="color: black"
                        >{{getUser.username || getUser.fullName}}</div>
                        <img
                          src="~assets/icons/thin-downward-arrow.svg"
                          alt
                          class="position-relative"
                          style="left: 8px;"
                        />
                      </a>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <nuxt-link class="dropdown-item" to="account-settings">Account Settings</nuxt-link>
                        <a class="dropdown-item" href="#">Feedback</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#" @click.stop="logoutUser()">Logout</a>
                      </div>
                    </div>

                    <nuxt-link to="/sign-up" tag="button" class="btn" v-else :key="2">Join Us</nuxt-link>
                  </transition>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <div class="row">
          <div class="col-md-12">
            <div class="hero-text mt-md-5 text-md-center">
              <h1
                class="font-weight-bold pt-5 pt-md-3"
              >Lorem ipsum dolor sit amet, consectetur adipiscing elit</h1>
              <h5
                class="pt-3 mx-auto w-md-50"
              >Ut enim ad minim veniam, quis nostrud exercitation aliquip ex ea commodo consequat</h5>
              <div class="pt-3">
                <button class="white-btn px-5" style="width: unset">Get Started with Equilibra</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container pb-5 mt-4">
      <div class="row" v-if="isAuthenticated">
        <div class="col-md-12">
          <h4 class="pb-2">
            <span class="ml-3">Federal</span>
          </h4>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-md-6" v-for="(item, i) in cards" :key="i">
          <div class="position-relative card-with-shadow pb-4">
            <div class="card border-0 my-4">
              <div
                class="background-img d-flex align-items-end"
                :style="{backgroundImage: `url(${item.backgroundImage})`}"
              >
                <img
                  src="~/assets/icons/forum-card-icon.svg"
                  alt
                  class="position-relative card-icon"
                />
              </div>
              <div class="card-content p-4">
                <h3 class="pt-3">{{ item.title }}</h3>
                <p>
                  We are positively minded Nigerians, committed to unity and to
                  encouraging fairness, just and equitable lifee.
                </p>
                <nuxt-link
                  tag="button"
                  class="border-0 p-3 w-100"
                  :to="{path: item.link, params: {roomType: item.roomType}}"
                  style="background: #26B14F;"
                >Join {{item.title}}</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template v-if="isAuthenticated">
        <div class="row">
          <div class="col-md-12">
            <h4 class="pb-2 pt-2">
              <span class="ml-3">{{stateOfResidence | formatStateName}} - State of Residence</span>
            </h4>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 col-md-6" v-for="(item, i) in originCards" :key="i">
            <div class="position-relative card-with-shadow pb-4">
              <div class="card border-0 my-4">
                <div
                  class="background-img d-flex align-items-end"
                  :style="{backgroundImage: `url(${item.backgroundImage})`}"
                >
                  <img
                    src="~/assets/icons/forum-card-icon.svg"
                    alt
                    class="position-relative card-icon"
                  />
                </div>
                <div class="card-content p-4">
                  <h3 class="pt-3">
                    <span v-if="item.title == 'LGA'">{{localGovtResisdence | formatStateName}}</span>
                    <span v-else>{{item.title}}</span>
                  </h3>
                  <p>
                    We are positively minded Nigerians, committed to unity and to
                    encouraging fairness, just and equitable lifee.
                  </p>
                  <nuxt-link
                    tag="button"
                    class="border-0 p-3 w-100"
                    :to="{path: item.link, query: {state:true, isOrigin:false}}"
                    style="background: #26B14F;"
                  >
                    Join
                    <span v-if="item.title == 'LGA'">{{localGovtResisdence | formatStateName}}</span>
                    <span v-else>{{item.title}}</span>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <!-- {{getUser}} state of Residence
      <br />
      {{getUser.localGovtOrigin}} state of Origin
      <br /> -->

      <template v-if="isAuthenticated">
        <div class="row">
          <div class="col-md-12">
            <h4 class="pb-2 pt-2">
              <span class="ml-3">{{stateOfOrigin | formatStateName}} - State of Origin</span>
            </h4>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 col-md-6" v-for="(item, i) in residenceCards" :key="i">
            <div class="position-relative card-with-shadow pb-4">
              <div class="card border-0 my-4">
                <div
                  class="background-img d-flex align-items-end"
                  :style="{backgroundImage: `url(${item.backgroundImage})`}"
                >
                  <img
                    src="~/assets/icons/forum-card-icon.svg"
                    alt
                    class="position-relative card-icon"
                  />
                </div>
                <div class="card-content p-4">
                  <h3 class="pt-3">
                    <span v-if="item.title == 'LGA'">{{localGovtOrigin | formatStateName}}</span>
                    <span v-else>{{item.title}}</span>
                  </h3>
                  <p>
                    We are positively minded Nigerians, committed to unity and to
                    encouraging fairness, just and equitable lifee.
                  </p>
                  <nuxt-link
                    tag="button"
                    class="border-0 p-3 w-100"
                    :to="{path: item.link, query: {state:true, isOrigin:true }}"
                    style="background: #26B14F;"
                  >
                    Join
                    <span v-if="item.title == 'LGA'">{{localGovtOrigin | formatStateName}}</span>
                    <span v-else>{{item.title}}</span>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import avatar from "~/assets/images/avatar.svg";
// Federal Image backgrounds
import judiciaryImage from "~/assets/images/judiciary_BG.svg";
import senateImage from "~/assets/images/senate-BG.svg";
import executiveImage from "~/assets/images/executive_BG.svg";
import repsImage from "~/assets/images/representatives-BG.svg";

// Origin Image backgrounds
import originJudiciaryImage from "~/assets/images/origin-judiciary-BG.svg";
import originHOAImage from "~/assets/images/origin-HOA-BG.svg";
import originExecutiveImage from "~/assets/images/origin-executive-BG.svg";
import originLGAImage from "~/assets/images/origin-LGA-BG.svg";

// Residence Image backgrounds
import residenceJudiciaryImage from "~/assets/images/residence-judiciary-BG.svg";
import residenceHOAImage from "~/assets/images/residence-HOA-BG.svg";
import residenceExecutiveImage from "~/assets/images/residence-executive-BG.svg";
import residenceLGAImage from "~/assets/images/residence-LGA-BG.svg";
import Map from "~/components/Map";
import Footer from "~/components/Shared/footer";
import { mapActions, mapGetters } from "vuex";
export default {
  layout: "footerOnly",
  components: {
    Map,
    Footer
  },
  data() {
    return {
      avatar,
      localGovtResisdence: "",
      localGovtOrigin: "",
      cards: [
        {
          title: "Judiciary",
          description:
            " We are positively minded Nigerians, committed to unity and to encouraging fairness, just and equitable life.",
          backgroundImage: judiciaryImage,
          link: "/rooms/judiciary?group=Vent-The-Steam"
        },
        {
          title: "Executive",
          description:
            " We are positively minded Nigerians, committed to unity and to encouraging fairness, just and equitable life.",
          backgroundImage: executiveImage,
          link: "/rooms/executive?group=Vent-The-Steam"
        },
        {
          title: "Senate",
          description:
            " We are positively minded Nigerians, committed to unity and to encouraging fairness, just and equitable life.",
          backgroundImage: senateImage,
          link: "/rooms/senate?group=Vent-The-Steam"
        },
        {
          title: "House of Reps",
          description:
            " We are positively minded Nigerians, committed to unity and to encouraging fairness, just and equitable life.",
          backgroundImage: repsImage,
          link: "/rooms/HOR?group=Vent-The-Steam"
        }
      ],
      originCards: [
        {
          title: "Judiciary",
          description:
            " We are positively minded Nigerians, committed to unity and to encouraging fairness, just and equitable life.",
          backgroundImage: originJudiciaryImage,
          link: "/rooms/judiciary?group=Vent-The-Steam"
        },
        {
          title: "Executive",
          description:
            " We are positively minded Nigerians, committed to unity and to encouraging fairness, just and equitable life.",
          backgroundImage: originExecutiveImage,
          link: "/rooms/executive?group=Vent-The-Steam"
        },
        {
          title: "House of Assembly",
          description:
            " We are positively minded Nigerians, committed to unity and to encouraging fairness, just and equitable life.",
          backgroundImage: originHOAImage,
          link: "/rooms/HOA?group=Vent-The-Steam"
        },
        {
          title: "LGA",
          description:
            " We are positively minded Nigerians, committed to unity and to encouraging fairness, just and equitable life.",
          backgroundImage: originLGAImage,
          link: "/rooms/LGA?group=Vent-The-Steam"
        }
      ],
      residenceCards: [
        {
          title: "Judiciary",
          description:
            " We are positively minded Nigerians, committed to unity and to encouraging fairness, just and equitable life.",
          backgroundImage: residenceJudiciaryImage,
          link: "/rooms/judiciary?group=Vent-The-Steam"
        },
        {
          title: "Executive",
          description:
            " We are positively minded Nigerians, committed to unity and to encouraging fairness, just and equitable life.",
          backgroundImage: residenceExecutiveImage,
          link: "/rooms/executive?group=Vent-The-Steam"
        },
        {
          title: "House of Assembly",
          description:
            " We are positively minded Nigerians, committed to unity and to encouraging fairness, just and equitable life.",
          backgroundImage: residenceHOAImage,
          link: "/rooms/HOA?group=Vent-The-Steam"
        },
        {
          title: "LGA",
          description:
            " We are positively minded Nigerians, committed to unity and to encouraging fairness, just and equitable life.",
          backgroundImage: residenceLGAImage,
          link: "/rooms/LGA?group=Vent-The-Steam"
        }
      ]
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
    ...mapGetters("user", ["getUser"]),
    stateOfOrigin() {
      const self = this;
      let govtw = this.$store.getters["governments"].find(
        govt => self.getUser.stateOfOrigin == govt.id
      );
      return govtw ? govtw.name : "";
    },
    stateOfResidence() {
      const self = this;
      let govtw = this.$store.getters["governments"].find(
        govt => self.getUser.stateOfResidence == govt.id
      );
      return govtw ? govtw.name : "";
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
    ...mapActions("auth", ["logout"]),
    fetchLGAs(stateID, val) {
      const self = this;
      this.$store
        .dispatch("localGovernments", {
          stateGovernmentID: stateID
        })
        .then(data => {
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            this.loadingLGA = false;
            return;
          }
          this[val] = this.getState(data, this.getUser[val], val);
        })
        .catch(err => {});
    },
    getState(LGAS, id, key) {
      let lga = LGAS.find(lga => this.getUser[key] == id);
      return lga ? lga.name : "";
    },
    logoutUser() {
      this.logout();
    }
  },
  mounted() {
    if (this.isAuthenticated) {
      this.fetchLGAs(this.getUser.stateOfResidence, "localGovtResisdence");
      this.fetchLGAs(this.getUser.stateOfOrigin, "localGovtOrigin");
    }
  }
};
</script>



<style scoped>
.main-container {
  background: #fdfdfd;
}
.header {
  background-image: url("~assets/images/forums-BG.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: center;
  height: 437px;
  color: white;
}

.navbar-light .nav-item a,
.navbar-light .navbar-nav .active > .nav-link,
.navbar-light .navbar-nav .nav-link:hover,
.navbar-light .navbar-nav .nav-link:focus {
  color: white;
}

h1 {
  font-size: 32px;
}
h5 {
  font-size: 18px;
  line-height: 1.5em;
  font-weight: 100;
  display: inline-block;
}

h6 {
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 2px;
}

h3 {
  font-size: 24px;
  font-weight: 600;
  color: var(--black-text);
  line-height: 1.5em;
}

.background-img {
  height: 130px;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 4px 4px 0px 0px;
}

h4 {
  font-size: 20px;
  font-weight: 400;
  color: var(--black-text);
  border-bottom: solid 1px rgba(22, 138, 89, 0.2);
}

p {
  line-height: 1.8em;
}

.who-we-are {
  background-image: url(../assets/images/judiciary_BG.svg);
  height: 130px;
  background-repeat: no-repeat;
}

.card {
  background: #ffffff;
  border: none;
  position: relative;
  /* box-shadow: 0px 2px 50px rgba(0, 0, 0, 0.2); */
  border-radius: 4px 4px 0px 0px;
  z-index: 3;
}

.card-icon {
  /* height: 50px; */
  border-radius: 10px;
  border: solid 3px white;
  left: 25px;
  top: 30px;
}

.card button {
  color: white;
  border-radius: 4px;
}

.card-with-shadow::after {
  content: "";
  display: block;
  position: absolute;
  width: 90%;
  height: 98px;
  bottom: 50px;
  z-index: 2;
  left: 5%;
  background: rgba(0, 0, 0, 0.0001);
  box-shadow: 0px 3px 100px rgba(0, 0, 0, 0.12);
}

.card p {
  font-size: 16px;
}

.card button:hover {
  box-shadow: 0 2px 0px #107742;
}

.user-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 95px;
  color: black;
}

@media (min-width: 1200px) {
  .container {
    max-width: 1261px !important;
  }
}
@media screen and (min-width: 1441px) {
  .header {
    background-size: cover;
  }
}
@media (min-width: 576px) {
  section.keep-in-touch .card-container {
    background-size: cover;
    background-position: center;
    width: 85%;
  }
  footer p {
    width: 80%;
  }
}
@media (max-width: 991px) {
  .header {
    background-size: auto;
  }
}
@media (max-width: 576px) {
  .slanted-line {
    left: 80px;
    height: 120%;
    bottom: 0;
    background-blend-mode: darken;
    opacity: 0.8;
  }
}
@media (max-width: 800px) {
  .who-we-are {
    background-size: cover;
    background-position: unset;
  }
}
</style>
