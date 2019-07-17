<template>
  <div class="main-container">
    <div class="container-fluid px-0 header">
      <header class="px-md-3 pt-2">
        <nav class="navbar navbar-expand-lg navbar-light d-flex justify-space-between">
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
                <a class="nav-link" href="#">Forums</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Blog</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Contact Us</a>
              </li>
              <li class="nav-item ml-4">
                <button class="btn">Join Us</button>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="hero-text mt-md-5 text-center">
              <h1
                class="font-weight-bold pt-3"
              >Lorem ipsum dolor sit amet, consectetur adipiscing elit</h1>
              <h5
                class="pt-3 mx-auto w-50"
              >Ut enim ad minim veniam, quis nostrud exercitation aliquip ex ea commodo consequat</h5>
              <div class="pt-3">
                <button class="white-btn px-md-5" style="width: unset">Get Started with Equilibra</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container pb-5">
      <div class="row">
        <div class="col-md-4" v-for="(item, i) in cards" :key="i">
          <div class="card border-0 my-4">
            <div
              class="background-img d-flex align-items-end"
              :style ="{backgroundImage: `url(${item.backgroundImage})`}"
            >
              <img src="~/assets/icons/forum-card-icon.svg" alt class="position-relative card-icon" />
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
                :to="item.link"
                style="background: #26B14F;"
              >Join {{item.title}}</nuxt-link>
            </div>
          </div>
        </div>
        <div class="col-md-4"></div>
        <div class="col-md-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
import judiciaryImage from '~/assets/images/judiciary_BG.svg'
import senateImage from '~/assets/images/senate-BG.svg'
import executiveImage from '~/assets/images/executive_BG.svg'
import repsImage from '~/assets/images/representatives-BG.svg'
import Map from "~/components/Map";
import Footer from "~/components/Shared/footer";
export default {
  layout: "footerOnly",
  components: {
    Map,
    Footer
  },
  data() {
    return {
      cards: [
        {
          title: "Judiciary",
          description:
            " We are positively minded Nigerians, committed to unity and to encouraging fairness, just and equitable life.",
          backgroundImage: judiciaryImage,
          link: "/rooms/judiciary"
        },
        {
          title: "Executive",
          description:
            " We are positively minded Nigerians, committed to unity and to encouraging fairness, just and equitable life.",
          backgroundImage: executiveImage,
          link: "/rooms/judiciary"
        },
        {
          title: "Senate",
          description:
            " We are positively minded Nigerians, committed to unity and to encouraging fairness, just and equitable life.",
          backgroundImage: senateImage,
          link: "/rooms/judiciary"
        },
        {
          title: "House of Reps",
          description:
            " We are positively minded Nigerians, committed to unity and to encouraging fairness, just and equitable life.",
          backgroundImage: repsImage,
          link: "/rooms/house-of-representatives"
        }
      ]
    };
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
  background-size: contain;
  height: 480px;
  color: white;
}

.navbar-light .nav-item a,
.navbar-light .navbar-nav .active > .nav-link,
.navbar-light .navbar-nav .nav-link:hover,
.navbar-light .navbar-nav .nav-link:focus {
  color: white;
}

h1 {
  font-size: 30px;
}
h5 {
  font-size: 18px;
  line-height: 1.5em;
  font-weight: 400;
  display: inline-block;
}

h6 {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 2px;
}

h3 {
  font-size: 22px;
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
  font-size: 18px;
  font-weight: 400;
  color: var(--black-text);
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
  box-shadow: 0px 2px 50px rgba(0, 0, 0, 0.2);
  border-radius: 4px 4px 0px 0px;
}

.card-icon {
  /* height: 50px; */
  border-radius: 10px;
  border: solid 3px white;
  left: 25px;
  top: 25px;
}

.card button {
  color: white;
  border-radius: 4px;
}

.card-with-shadow::after {
  content: "";
  display: block;
  position: absolute;
  width: 80%;
  height: 98px;
  bottom: 50px;
  z-index: 2;
  left: 10%;
  background: rgba(0, 0, 0, 0.0001);
  box-shadow: 0px 3px 100px rgba(0, 0, 0, 0.12);
}

.card p {
  font-size: 14px;
}

.card button:hover {
    box-shadow: 0 2px 0px #107742
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
