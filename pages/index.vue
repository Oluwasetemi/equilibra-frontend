<template>
  <div class="main-container">
    <div class="container-fluid px-0 header">
       <header class="pt-4">
          <nav class="navbar navbar-expand-lg navbar-light d-flex justify-space-between px-md-0">
            <nuxt-link to="/" class="navbar-brand pl-2">
              <img src="~/assets/icons/logo.svg" alt style="position: absolute;top: -20px;"/>
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
                  <a class="nav-link" href="#">Blog</a>
                </li>
                <li class="nav-item">
                  <nuxt-link to="/contact-us" class="nav-link">Contact Us</nuxt-link>
                </li>
                <li class="nav-item ml-lg-4">
                  <div class="dropdown" style="background: white;" v-if="isAuthenticated">
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
                        class="inline-block px-2 user-name"
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
                  <nuxt-link to="/sign-up" tag="button" class="btn" v-else>Join Us</nuxt-link>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      <div class="container">
       
        <div class="row">
          <div class="col-md-5 d-flex align-items-md-center">
            <div class="hero-text">
              <h1 class="font-weight-bold pt-3">The People’s Parliament!</h1>
              <h5
                class="pt-3"
              >Forum for the people to discuss issues of common interest in the community, constructively.</h5>
              <div class="pt-4">
                <button class="white-btn lorem" style="width: 190px">Lorem Ipsum</button>
              </div>
            </div>
          </div>
          <div class="col-md-7 d-flex align-items-md-center">
            <transition
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
              appear
            >
              <Map class="pt-5" />
            </transition>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-7">
          <figure class="who-we-are text-right py-md-5 py-4">
            <transition
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
              appear
            >
              <img
                src="~/assets/images/whoweareimage.svg"
                alt
                class="img-fluid lazy-load"
                height="450px"
              />
            </transition>
          </figure>
        </div>
        <div class="col-md-4 d-flex align-items-center">
          <section class="pb-4 pb-md-0 mb-5 mb-md-0">
            <h3 class="pb-2">Who we are</h3>
            <p>
              We are positively minded Nigerians, committed to unity and to encouraging fairness,
              just and equitable life, resulting collective progress and greatness for our country
              and humanity in general.
            </p>
            <div class="pt-2">
              <button class="green-btn">Read More</button>
            </div>
          </section>
        </div>
      </div>
      <section class="values pb-4 mb-4">
        <div class="row">
          <div class="col-md-4">
            <h3 class="mb-4">The values that holds us liare ir and lorem ipsum together</h3>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <div class="col-title mb-3">
              <div class="row">
                <div class="col-md-12 pb-3">
                  <img src="~assets/icons/Vision icon.svg" alt class="img-fluid mr-2" />
                  <h4 class="d-inline-block">Our Vision</h4>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <p style="width: 80%;">
                    To achieve, sustain unity and continuously engage positively
                    to harness the synergies from contributions of our diverse and
                    rich heritage in a free, fair and just society.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="col-title mb-3">
              <div class="row">
                <div class="col-md-12 pb-3">
                  <img src="~assets/icons/Values icon.svg" alt class="img-fluid mr-2" />
                  <h4 class="d-inline-block">Our Values</h4>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <p style="width: 80%;">
                    To achieve, sustain unity and continuously engage positively to harness the synergies
                    from contributions of our diverse and rich heritage in a free, fair and just society.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="col-title mb-3">
              <div class="row">
                <div class="col-md-12 pb-3">
                  <img src="~assets/icons/Mission icon.svg" alt class="img-fluid mr-2" />
                  <h4 class="d-inline-block">Our Mission</h4>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <p>
                    To create and nurture platforms and such other programs for positive engagement between
                    the people, social partners and our country’s institutions, including those elected or
                    appointed to serve within them, towards achieving greater common good.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="why-equilibra mt-4 pt-4 pb-5">
        <h3 class="text-center py-4">Why Use Equilibra</h3>
        <div class="row">
          <div class="col-md-7">
            <ul class="list pl-md-5 pl-4 pr-3">
              <li class="px-md-4 pb-2">
                <h5>Discuss issues of common interest</h5>
                <p class="pl-2">
                  Discuss issues of common interest in the community, constructively.
                  These issues maybe of common interest due to location or tier, e.g: local government area/state of origin;
                  local government area/state of residence; institutional service (e.g. ministry of …); federal.
                  It could relate to any arm of government
                </p>
              </li>
              <li class="px-md-4 pb-2">
                <h5>Engage with the institutions</h5>
                <p class="pl-2">
                  Engage with the institutions and those elected/appointed to serve the people within them.
                  The aim is to gain clarity on what is expected from the people/
                  citizens requiring service and the institution ensuring timely service with
                  the right quality and courtesy
                </p>
              </li>

              <li class="px-md-4 pb-2">
                <h5>Engage with the institutions</h5>
                <p class="pl-2">
                  Discuss issues of common interest in the community, constructively.
                  These issues maybe of common interest due to location or tier, e.g: local government area/state of origin;
                  local government area/state of residence; institutional service (e.g. ministry of …); federal.
                  It could relate to any arm of government
                </p>
              </li>
              <li class="px-md-4 pb-2">
                <h5>Engage with the institutions</h5>
                <p
                  class="pl-2"
                >Encourage the culture of improvement through accepting constructive dialogue and criticism.</p>
              </li>
            </ul>
          </div>
          <div class="col-md-5">
            <figure class="pr-md-5">
              <img
                src="~assets/images/northern-girl2.png"
                alt
                style="border: 10px solid white"
                height="380px"
                class="img-fluid"
              />
              <img
                src="~assets/icons/slanted-line.svg"
                alt
                class="position-absolute slanted-line img-fluid"
              />
            </figure>
          </div>
        </div>
        <div class="my-2 text-center">
          <button class="orange-btn">Get Started</button>
        </div>
      </section>
      <section class="equilibra-form pt-5">
        <div class="row">
          <div class="col-md-5">
            <h3 class="pt-5">The Equlibra Form Sections</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="position-relative card-with-shadow">
              <div class="card px-4 pt-3 pb-5 my-3">
                <figure class="py-2">
                  <img src="~assets/icons/judiciary-icon.svg" alt />
                </figure>
                <h4 class="font-weight-bold">Judiciary</h4>
                <p>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisiiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="position-relative card-with-shadow">
              <div class="card px-4 pt-3 pb-5 my-3">
                <figure class="py-2">
                  <img src="~assets/icons/executive.svg" alt />
                </figure>
                <h4 class="font-weight-bold">Executive</h4>
                <p>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisiiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="position-relative card-with-shadow">
              <div class="card px-4 pt-3 pb-5 my-3">
                <figure class>
                  <img src="~assets/icons/legislature.svg" alt />
                </figure>
                <h4 class="font-weight-bold">Legislature</h4>
                <p>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisiiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="position-relative card-with-shadow">
              <div class="card px-4 pt-3 pb-5 my-3">
                <figure class="py-2">
                  <img src="~assets/icons/states-icon.svg" alt />
                </figure>
                <h4 class="font-weight-bold">States</h4>
                <p>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisiiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="position-relative card-with-shadow">
              <div class="card px-4 pt-3 pb-5 my-3">
                <figure class="py-2">
                  <img src="~assets/icons/local-government.svg" alt />
                </figure>
                <h4 class="font-weight-bold">Local Government</h4>
                <p>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisiiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="keep-in-touch py-5">
        <div class="row">
          <div class="col-md-12">
            <div
              class="card-container px-md-5 mx-md-auto text-center d-flex flex-column justify-content-center align-items-content"
            >
              <div class="card-content">
                <div class="row">
                  <div class="col-md-12">
                    <h4 class="pt-3">We'd like to keep in touch with you</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit aot</p>
                  </div>
                </div>

                <div class="row justify-content-center">
                  <div class="col-md-6 pt-3">
                    <div class="input-container mx-3 mx-md-0">
                      <div class="row no-gutters">
                        <div class="col-8">
                          <input
                            type="email"
                            class="w-100 h-100 px-3"
                            placeholder="Your Email Address"
                          />
                        </div>
                        <div class="col-4">
                          <button class="w-100 h-100 subscribe">Subscribe</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import avatar from "~/assets/images/avatar.svg";
import { mapActions, mapGetters } from "vuex";
import Map from "~/components/Map";
import Footer from "~/components/Shared/footer";
export default {
  layout: "footerOnly",
  data() {
    return {
      avatar
    };
  },
  components: {
    Map,
    Footer
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
    ...mapGetters("user", ["getUser"])
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    ...mapActions('govt', ['getSGs']),
    logoutUser() {
      this.logout();
    }
  },
  mounted(){
    // debugger
  }
  // mounted() {
  //   let elmts = document.querySelectorAll(".lazy-load");
  //   if (window.img_observer && window.img_observer.observer) {
  //     window.img_observer.observer.disconnect();
  //     delete window.img_observer;
  //     for (let i = 0, len = elmts.length; i < len; i++) {
  //       // load image only when the image src is updated
  //       const img = elmts[i].getAttribute("data-src") || false;
  //       if (
  //         img &&
  //         elmts[i].getAttribute("data-loaded") === "true" &&
  //         img !== elmts[i].getAttribute("src")
  //       ) {
  //         elmts[i].setAttribute("data-loaded", false);
  //       }
  //     }
  //   }
  //   window.img_observer = lozad(elmts);
  //   window.img_observer.observe();
  // }
};
</script>



<style scoped>
.main-container {
  background: #fdfdfd;
}
.header {
  background-image: url("~assets/images/headerBG.svg");
  background-repeat: no-repeat;
  background-size: contain;
  min-height: 50vw;
  color: white;
  font-weight: 100;
}

.navbar-light .nav-item a,
.navbar-light .navbar-nav .active > .nav-link,
.navbar-light .navbar-nav .nav-link:hover,
.navbar-light .navbar-nav .nav-link:focus {
  color: white;
}

h1 {
  font-size: 34px;
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
  font-weight: 700;
  color: var(--black-text);
  line-height: 1.5em;
}
h4 {
  font-size: 20px;
  font-weight: 400;
  color: var(--black-text);
}

p {
  line-height: 1.8em;
}

.who-we-are {
  background-image: url("~assets/images/pattern-BG.svg");
  background-repeat: no-repeat;
  background-position: 111px center;
  /* height: 200px;
  width: 200px; */
}

section.values p {
  font-size: 14px;
}

section.why-equilibra {
  background: #fcf6ee;
}
section.why-equilibra h3 {
  font-weight: 700;
}
section.why-equilibra h5 {
  background: #fcf6ee;
  color: var(--black-text);
  font-weight: 400;
}

section.why-equilibra ul {
  list-style-type: none;
  font-size: 14px;
}

section.why-equilibra li:before {
  content: url("~assets/icons/bullet-icon.svg");
  margin: 0 0.5rem 0 -15px;
  position: relative;
  top: 2px;
}

section.keep-in-touch .card-container {
  background: url("~assets/images/small-BG.svg") no-repeat;
  min-height: 306px;
  color: white;
  background-position: center;
  background-size: auto;
}

section.keep-in-touch .card-container input {
  border: none;
}
section.keep-in-touch .card-container button {
  background: var(--other-green-color);
  color: white;
  border: none;
}

.input-container {
  border: solid 1px white;
  background: white;
  height: 50px;
  font-size: 14px;
}

.input-container > * {
  height: 100%;
}

section.keep-in-touch .card-container button:hover {
  background: #48a37c;
}

.card-container .card-content {
  margin-top: -50px;
}

.card-container .card-content h4 {
  color: white;
  font-weight: 600;
}
.card {
  background: #ffffff;
  border-radius: 4px 4px 0px 0px;
  border: none;
  position: relative;
  height: 320px;
  z-index: 3;
}

.card-with-shadow {
  padding-bottom: 10px;
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
  font-size: 16px;
}

section.footer {
  background: var(--dark-green-color);
  /* min-height: 100vh; */
}

.slanted-line {
  left: 90px;
  height: 490px;
  bottom: 115px;
  background-blend-mode: darken;
  opacity: 0.8;
}

section.footer h2 {
  color: white;
  font-size: 28px;
  line-height: 2.5rem;
}

section.footer {
  background-image: url("~assets/images/top-phone.svg"),
    url("~assets/images/right-phone.svg"),
    url("~assets/images/bottom-phone.svg");
  background-repeat: no-repeat, no-repeat, no-repeat;
  /* background-size: 24%, 18%, 24%; */
  /* background-attachment: fixed; */
  background-size: 319px, 229px, 319px;
  background-position: 820px 30px, 1080px 100px, 990px bottom;
  /* background-position: 83% 30px, right 100px, right bottom; */
}

footer {
  background: white;
  min-height: 325px;
}

footer li a,
footer h6 {
  color: var(--black-text);
  text-decoration: none;
}

footer li {
  font-size: 15px;
  color: var(--black-text);
  line-height: 2.5rem;
}

footer p {
  font-size: 15px;
  color: var(--black-text);
  line-height: 2rem;
}

@media (min-width: 1200px){
header {
    max-width: 1360px;
    margin: auto
}
}

@media (min-width: 1200px) {
  .container {
    max-width: 1260px;
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
    background-size: cover;
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
