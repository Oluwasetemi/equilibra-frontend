<template>
  <div class="container pt-4 pb-5 mb-5">
    <div class="row">
      <div class="col-lg-12">
        <header class="px-4 pb-2">
          <div class="row" style="min-height: 517px;">
            <div class="col-lg-7 d-flex flex-column justify-content-end">
              <h2
                class="font-weight-bold"
                v-if="government.name"
              >{{government.name.split(' ')[0] | capitalizeFirstLetter}}</h2>
              <p
                class="subtitle"
                style="font-size: 22px"
                v-if="government.name"
              >{{government.name.split(' ')[0] | capitalizeFirstLetter}}</p>
            </div>
            <transition
              enter-active-class="animated fadeInDown"
              leave-active-class="animated fadeOut"
              appear
            >
              <div class="col-lg-5 d-none d-lg-block" v-if="pageLoaded">
                <div class="card-container position-lg-absolute">
                  <div class="card px-4 pt-4 ml-auto">
                    <div class="mb-3 d-flex align-items-center">
                      <figure
                        class="d-inline-block mb-0 mr-2 rounded-circle border p-1"
                        style="border-color: #EAF7ED !important;"
                      >
                        <img src="~assets/images/el-rufai.png" alt class="rounded-circle photo" cl />
                      </figure>

                      <div class="details d-inline-block">
                        <div class="d-flex flex-column justify-content-center">
                          <span
                            class="name m-0"
                            style="line-height: 1.3em;"
                          >{{government.leader | capitalizeFirstLetter}}</span>
                          <span class="post m-0" style="line-height: 1.3em;">Executive Governor</span>
                        </div>
                      </div>
                    </div>
                    <div class="detail d-flex align-items-center pb-3 mb-3">
                      <figure class="detail-icon d-inline-block mb-0 mr-4 rounded-circle">
                        <img src="~assets/icons/population.svg" alt />
                      </figure>
                      <div class="details d-inline-block">
                        <div class="d-flex flex-column justify-content-center">
                          <span
                            class="figures m-0"
                            style="line-height: 1.3em;"
                          >{{ government.population.toLocaleString()}}</span>
                          <span class="heading m-0">Population</span>
                        </div>
                      </div>
                    </div>
                    <div class="detail d-flex align-items-center pb-3 mb-3">
                      <figure class="detail-icon d-inline-block mb-0 mr-4 rounded-circle">
                        <img src="~assets/icons/lgas.svg" alt />
                      </figure>
                      <div class="details d-inline-block">
                        <div class="d-flex flex-column justify-content-center">
                          <span
                            class="figures m-0"
                            style="line-height: 1.3em;"
                          >{{government.totalLg}}</span>
                          <span class="heading m-0">Number of LGAs</span>
                        </div>
                      </div>
                    </div>
                    <div class="detail d-flex align-items-center pb-3 mb-3">
                      <figure class="detail-icon d-inline-block mb-0 mr-4 rounded-circle">
                        <img src="~assets/icons/senators.svg" alt />
                      </figure>
                      <div class="details d-inline-block">
                        <div class="d-flex flex-column justify-content-center">
                          <span class="figures m-0" style="line-height: 1.3em;">3</span>
                          <span class="heading m-0">Senators</span>
                        </div>
                      </div>
                    </div>
                    <div class="detail d-flex align-items-center pb-3 mb-3">
                      <figure class="detail-icon d-inline-block mb-0 mr-4 rounded-circle">
                        <img src="~assets/icons/population.svg" alt />
                      </figure>
                      <div class="details d-inline-block">
                        <div class="d-flex flex-column justify-content-center">
                          <span class="figures m-0" style="line-height: 1.3em;">16</span>
                          <span class="heading m-0">Federal Constituencies</span>
                        </div>
                      </div>
                    </div>
                    <div class="detail d-flex align-items-center pb-3 mb-3">
                      <figure class="detail-icon d-inline-block mb-0 mr-4 rounded-circle">
                        <img src="~assets/icons/constituencies.svg" alt />
                      </figure>
                      <div class="details d-inline-block">
                        <div class="d-flex flex-column justify-content-center">
                          <span class="figures m-0" style="line-height: 1.3em;">34</span>
                          <span class="heading m-0">State Constituencies</span>
                        </div>
                      </div>
                    </div>
                    <div class="detail d-flex align-items-center pb-3 mb-3">
                      <figure class="detail-icon d-inline-block mb-0 mr-4 rounded-circle">
                        <img src="~assets/icons/population.svg" alt />
                      </figure>
                      <div class="details d-inline-block">
                        <div class="d-flex flex-column justify-content-center">
                          <span
                            class="figures m-0"
                            style="line-height: 1.3em;"
                          >{{government.infantMortalityRate}}%</span>
                          <span class="heading m-0">Infant Mortality Rate</span>
                        </div>
                      </div>
                    </div>
                    <div class="detail d-flex align-items-center pb-3 mb-3">
                      <figure class="detail-icon d-inline-block mb-0 mr-4 rounded-circle">
                        <img src="~assets/icons/infant-mortality.svg" alt />
                      </figure>
                      <div class="details d-inline-block">
                        <div class="d-flex flex-column justify-content-center">
                          <span class="figures m-0" style="line-height: 1.3em;">31.91%</span>
                          <span class="heading m-0">Access To Portable Water</span>
                        </div>
                      </div>
                    </div>
                    <div class="detail d-flex align-items-center pb-3 mb-3">
                      <figure class="detail-icon d-inline-block mb-0 mr-4 rounded-circle">
                        <img src="~assets/icons/literacy.svg" alt />
                      </figure>
                      <div class="details d-inline-block">
                        <div class="d-flex flex-column justify-content-center">
                          <span
                            class="figures m-0"
                            style="line-height: 1.3em;"
                          >{{government.literacyRate}}%</span>
                          <span class="heading m-0">Literacy Rate</span>
                        </div>
                      </div>
                    </div>
                    <div class="detail d-flex align-items-center pb-3 mb-3">
                      <figure class="detail-icon d-inline-block mb-0 mr-4 rounded-circle">
                        <img src="~assets/icons/employment.svg" alt />
                      </figure>
                      <div class="details d-inline-block">
                        <div class="d-flex flex-column justify-content-center">
                          <span
                            class="figures m-0"
                            style="line-height: 1.3em;"
                          >{{government.unemploymentRate}}%</span>
                          <span class="heading m-0">Unemployment Rate</span>
                        </div>
                      </div>
                    </div>
                    <div class="detail d-flex align-items-center pb-3 mb-3">
                      <figure class="detail-icon d-inline-block mb-0 mr-4 rounded-circle">
                        <img src="~assets/icons/girl-marriage.svg" alt />
                      </figure>
                      <div class="details d-inline-block">
                        <div class="d-flex flex-column justify-content-center">
                          <span class="figures m-0" style="line-height: 1.3em;">Not available</span>
                          <span class="heading m-0">Girls married before age 15</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="pt-3">
                    <nuxt-link tag="button" to="/sign-up" class="green-btn">Join Equilibra</nuxt-link>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </header>
      </div>
    </div>
    <article>
      <div class="row">
        <div class="col-lg-7">
          <div class="row">
            <div class="col-lg-12">
              <div class="description pt-4 mt-2">{{government.description}}</div>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-lg-4 col-md-6 py-2" v-for="(detail, i) in aboutState" :key="i">
              <div class="features mr-lg-3">
                <span class="title mb-2 d-block">{{detail.title}}</span>
                <span
                  class="value d-block"
                  v-if="!(government[detail.key] && government[detail.key].constructor === Array)"
                >{{government[detail.key] || ' Not available'}}</span>
                <span
                  class="value d-block"
                  v-else-if="government[detail.key] && government[detail.key].constructor === Array"
                >
                  <span v-if="government[detail.key].length > 0">
                    <span
                      v-for="(item, i) in government[detail.key]"
                      :key="i"
                    >{{item}}{{i != government[detail.key].length ? ',' : ''}}</span>
                  </span>
                  <span v-else>Not available</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-5 d-lg-none">
          <div class="card-container position-lg-absolute mt-4">
            <div class="card px-4 pt-4 ml-lg-auto">
              <div class="mb-3 d-flex align-items-center">
                <figure
                  class="d-inline-block mb-0 mr-2 rounded-circle border p-1"
                  style="border-color: #EAF7ED;"
                >
                  <img src="~assets/images/el-rufai.png" alt class="rounded-circle photo" cl />
                </figure>

                <div class="details d-inline-block">
                  <div class="d-flex flex-column justify-content-center">
                    <span class="name m-0" style="line-height: 1.3em;">Nasir El Rufai</span>
                    <span class="post m-0" style="line-height: 1.3em;">Executive Governor</span>
                  </div>
                </div>
              </div>
              <div class="detail d-flex align-items-center pb-3 mb-3">
                <figure class="detail-icon d-inline-block mb-0 mr-4 rounded-circle">
                  <img src="~assets/icons/population.svg" alt />
                </figure>
                <div class="details d-inline-block">
                  <div class="d-flex flex-column justify-content-center">
                    <span class="figures m-0" style="line-height: 1.3em;">8.3 Million</span>
                    <span class="heading m-0">Population</span>
                  </div>
                </div>
              </div>
              <div class="detail d-flex align-items-center pb-3 mb-3">
                <figure class="detail-icon d-inline-block mb-0 mr-4 rounded-circle">
                  <img src="~assets/icons/lgas.svg" alt />
                </figure>
                <div class="details d-inline-block">
                  <div class="d-flex flex-column justify-content-center">
                    <span class="figures m-0" style="line-height: 1.3em;">23</span>
                    <span class="heading m-0">Number of LGAs</span>
                  </div>
                </div>
              </div>
              <div class="detail d-flex align-items-center pb-3 mb-3">
                <figure class="detail-icon d-inline-block mb-0 mr-4 rounded-circle">
                  <img src="~assets/icons/senators.svg" alt />
                </figure>
                <div class="details d-inline-block">
                  <div class="d-flex flex-column justify-content-center">
                    <span class="figures m-0" style="line-height: 1.3em;">3</span>
                    <span class="heading m-0">Senators</span>
                  </div>
                </div>
              </div>
              <div class="detail d-flex align-items-center pb-3 mb-3">
                <figure class="detail-icon d-inline-block mb-0 mr-4 rounded-circle">
                  <img src="~assets/icons/population.svg" alt />
                </figure>
                <div class="details d-inline-block">
                  <div class="d-flex flex-column justify-content-center">
                    <span class="figures m-0" style="line-height: 1.3em;">16</span>
                    <span class="heading m-0">Federal Constituencies</span>
                  </div>
                </div>
              </div>
              <div class="detail d-flex align-items-center pb-3 mb-3">
                <figure class="detail-icon d-inline-block mb-0 mr-4 rounded-circle">
                  <img src="~assets/icons/constituencies.svg" alt />
                </figure>
                <div class="details d-inline-block">
                  <div class="d-flex flex-column justify-content-center">
                    <span class="figures m-0" style="line-height: 1.3em;">34</span>
                    <span class="heading m-0">State Constituencies</span>
                  </div>
                </div>
              </div>
              <div class="detail d-flex align-items-center pb-3 mb-3">
                <figure class="detail-icon d-inline-block mb-0 mr-4 rounded-circle">
                  <img src="~assets/icons/population.svg" alt />
                </figure>
                <div class="details d-inline-block">
                  <div class="d-flex flex-column justify-content-center">
                    <span class="figures m-0" style="line-height: 1.3em;">NaN%</span>
                    <span class="heading m-0">Infant Mortality Rate</span>
                  </div>
                </div>
              </div>
              <div class="detail d-flex align-items-center pb-3 mb-3">
                <figure class="detail-icon d-inline-block mb-0 mr-4 rounded-circle">
                  <img src="~assets/icons/infant-mortality.svg" alt />
                </figure>
                <div class="details d-inline-block">
                  <div class="d-flex flex-column justify-content-center">
                    <span class="figures m-0" style="line-height: 1.3em;">31.91%</span>
                    <span class="heading m-0">Access To Portable Water</span>
                  </div>
                </div>
              </div>
              <div class="detail d-flex align-items-center pb-3 mb-3">
                <figure class="detail-icon d-inline-block mb-0 mr-4 rounded-circle">
                  <img src="~assets/icons/literacy.svg" alt />
                </figure>
                <div class="details d-inline-block">
                  <div class="d-flex flex-column justify-content-center">
                    <span class="figures m-0" style="line-height: 1.3em;">47.31%</span>
                    <span class="heading m-0">Literacy Rate</span>
                  </div>
                </div>
              </div>
              <div class="detail d-flex align-items-center pb-3 mb-3">
                <figure class="detail-icon d-inline-block mb-0 mr-4 rounded-circle">
                  <img src="~assets/icons/employment.svg" alt />
                </figure>
                <div class="details d-inline-block">
                  <div class="d-flex flex-column justify-content-center">
                    <span class="figures m-0" style="line-height: 1.3em;">30.3%</span>
                    <span class="heading m-0">Unemployment Rate</span>
                  </div>
                </div>
              </div>
              <div class="detail d-flex align-items-center pb-3 mb-3">
                <figure class="detail-icon d-inline-block mb-0 mr-4 rounded-circle">
                  <img src="~assets/icons/girl-marriage.svg" alt />
                </figure>
                <div class="details d-inline-block">
                  <div class="d-flex flex-column justify-content-center">
                    <span class="figures m-0" style="line-height: 1.3em;">30.3%</span>
                    <span class="heading m-0">Girls married before age 15</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="pt-3">
              <nuxt-link tag="button" to="/sign-up" class="green-btn">Join Equilibra</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>


<script>
import { setTimeout } from "timers";
export default {
  layout: "whiteNavWithFooter",
  data() {
    return {
      pageLoaded: false,
      aboutState: [
        {
          title: "Motivation",
          key: "slogan"
        },
        {
          title: "Created",
          value: "27 May 1967"
        },
        {
          title: "Political Party",
          key: "rulingParty"
        },
        {
          title: "Museums & Parks",
          key: "museumsAndParks"
        },
        {
          title: "Agriculture",
          key: "agriculture"
        },
        {
          title: "Mineral Resources",
          key: "mineralResources"
        },
        {
          title: "Other tourist attractions",
          key: "touristAttractionCenters"
        }
      ]
    };
  },
  validate(data) {
    if (data.params.id) {
      console.log(data.params.id)
      return true;
    }
    return false;
  },
  computed: {
    government() {
      return this.$store.getters["currentGovernment"];
    }
  },
  filters: {
    capitalizeFirstLetter(val) {
      return val
        .split(" ")
        .map(val => {
          return val.charAt(0).toUpperCase() + val.substring(1);
        })
        .join(" ");
    }
  },
  mounted() {
    setTimeout(() => {
      this.pageLoaded = true;
    }, 1000);
    this.$store.dispatch("governmentByFilter", {
      filterBy: "name",
      payload: `${this.$route.params.id.toLowerCase()} state`
    });
  }
};
</script>

<style scoped>
.container {
  background: #fdfdfd;
  min-height: 1400px;
}

.card {
  border-radius: 0;
  background: #ffffff;
  width: 100%;
  max-width: 350px;
  min-width: 350px;
  border: 1px solid rgba(222, 225, 229, 0.17);
}

.card-container {
  top: 35px;
  right: 25px;
}
header {
  background-image: url("~assets/images/kaduna.png");
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 508px;
  color: white;
}

p {
  font-size: 18px;
}

span.title {
  color: #07834e;
}

span.heading {
  color: #747a76;
  font-size: 14px;
  line-height: 2.5em;
}
span.figures {
  color: #091f0e;
  font-size: 26px;
}

span.name {
  color: var(--black-text);
  font-size: 20px;
  font-weight: 400;
}

span.post {
  color: #168a59;
  font-size: 14px;
}

.photo {
  height: 100px;
}

article {
  padding-bottom: 150px;
}
@media (min-width: 992px) {
  .card-container {
    position: absolute;
  }
}
</style>
