<template>
  <div class="container-fluid px-0">
    <section class="footer pt-1">
      <div class="container d-flex flex-column justify-content-between pt-5 px-md-4">
        <div class="top-content d-flex align-items-center py-5 mx-md-5" style="height: 55%">
          <div class="pt-md-5 pb-md-3">
            <div class="row">
              <div class="col-md-7">
                <h2 class="font-weight-bold pb-4">
                  Join Nigerians on Equilira to discuss isssues
                  of common interest in the community, constructively.
                </h2>
              </div>
            </div>
            <div class="row">
              <div class="col-md-7 pb-5">
                <a href class="mr-4">
                  <img src="~assets/icons/play-store-icon.svg" alt class="mb-2" />
                </a>
                <a href>
                  <img src="~assets/icons/app-store-icon.svg" alt class="mb-2" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="row" > -->
        <footer
          class="px-5 pt-5 pb-3 mx-md-5 d-md-flex flex-column justify-content-md-center"
          style="height: 45%"
        >
          <!-- <div class="col-md-12"> -->
          <div class="row">
            <div class="col-md-5">
              <nuxt-link to="/">
                <img src="~assets/icons/green-logo.svg" alt style="position: relative;top: -5px;" />
              </nuxt-link>
              <p class="py-2 w-md-75">
                People’s parliament, committed to unity and to encouraging fairness,
                just and equitable life, resulting collective progress and greatness
                for our country and humanity in general.
              </p>
            </div>
            <div class="col-md-7">
              <div class="row justify-content-around">
                <div class="col-md-3">
                  <h6>COMPANY</h6>
                  <ul class="py-2 px-0">
                    <li>
                      <a href>Home</a>
                    </li>
                    <li>
                      <a href>Partner With Us</a>
                    </li>
                    <li>
                      <a href>About Us</a>
                    </li>
                    <li>
                      <a href>Contact Us</a>
                    </li>
                  </ul>
                </div>
                <div class="col-md-3">
                  <h6>LEGAL</h6>
                  <ul class="py-2 px-0">
                    <li>
                      <a href>Privacy Policy</a>
                    </li>
                    <li>
                      <a href>Terms and Conditions</a>
                    </li>
                  </ul>
                </div>
                <div class="col-md-3">
                  <h6>SOCIAL</h6>
                  <ul class="py-2 px-0">
                    <li>
                      <a href>Facebook</a>
                    </li>
                    <li>
                      <a href>Twitter</a>
                    </li>
                    <li>
                      <a href>Instagram</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-5">
              <p>© The Equilibra 2019. All rights reserved.</p>
            </div>
            <div class="col-md-3">
              <div class="social-media-icons">
                <a href class="ml-md-4 mr-md-0 ml-0 mr-3">
                  <img src="~assets/icons/facebook.svg" alt />
                </a>
                <a href class="ml-md-4 mr-md-0 ml-0 mr-3">
                  <img src="~assets/icons/instagram.svg" alt />
                </a>
                <a href class="ml-md-4 mr-md-0 ml-0 mr-3">
                  <img src="~assets/icons/twitter.svg" alt />
                </a>
              </div>
            </div>
          </div>
          <!-- </div> -->
        </footer>
      </div>

      <!-- </div> -->
    </section>
  </div>
</template>

<style scoped>
.main-container {
  background: #fdfdfd;
}
.header {
  background-image: url("~assets/images/headerBG.svg");
  background-repeat: no-repeat;
  background-size: contain;
  height: 719px;
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
  font-size: 20px;
  line-height: 1.5em;
  font-weight: 400;
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
  background-position: 35px;
  /* height: 200px;
  width: 200px; */
}

section.values p {
  font-size: 14px;
}

section.why-equilibra {
  background: #fcf6ee;
}
section.why-equilibra h5 {
  background: #fcf6ee;
  color: var(--black-text);
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
  bottom: 70px;
  background-blend-mode: darken;
  opacity: 0.8;
}

section.footer h2 {
  color: white;
  font-size: 28px;
  line-height: 2.5rem;
}

section.footer {
  background-image: url("~assets/images/Footer.png");
  background-position-y: bottom;
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: 80px;
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

