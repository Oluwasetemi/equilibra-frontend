<template>
  <div class="position-relative card-with-shadow pb-4">
    <info :info="information" />
    <div class="card border-0">
      <div
        class="background-img d-flex align-items-end"
        :style="{backgroundImage: `url(${imageURL})`}"
      >
        <img src="~/assets/icons/forum-card-icon.svg" alt class="position-relative card-icon" />
      </div>
      <div class="card-content py-4" style="padding-left: 20px; padding-right: 20px">
        <h3 class="pt-3 font-weight-bold">
          <span>{{ title == "LGA" ? localGovt : title  | capitalizeFirstLetter }}</span>
          <a
            href="#"
            class="ml-1 position-relative"
            style="top: -3px"
            data-toggle="modal"
            data-target="#roomInfoModal"
          >
            <img src="~/assets/icons/info-icon.svg" data-toggle="tooltip" title="Quick info" />
          </a>
        </h3>
        <p>
          We are positively minded Nigerians, committed to unity and to
          encouraging fairness, just and equitable lifee.
        </p>
        <nuxt-link
          tag="button"
          class="border-0 p-3 w-100"
          :to="link"
          style="background: #26B14F;"
        >
        Join the discussion
        </nuxt-link>
        <!-- Join {{ title == "LGA" ? localGovt : title  | capitalizeFirstLetter}} -->
      </div>
    </div>
  </div>
</template>


<script>
import info from "~/components/Rooms/room-info";
import imgURL from "~/assets/images/tanko.png";
export default {
  props: ["imageURL", "title", "link", "localGovt"],
  components: {
    info
  },
  data() {
    return {
      information: {
        name: "Ibrahim Tanko Muhammad",
        imgURL,
        post: "Chief Justice of Nigeria",
        roomDetails: [
          {
            value: "100,056",
            title: "Number of Awaiting trial detainees-nationwide (Ppl)"
          },
          {
            value: "68%",
            title: "Prison congestion rate (%)"
          },
          {
            value: "71%",
            title: "Average judgement delivery rate (%)"
          }
        ]
      }
    };
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
  font-size: 18px;
  font-weight: 400;
  color: var(--black-text);
  border-bottom: solid 1px rgba(22, 138, 89, 0.2);
}

p {
  line-height: 1.8em;
}

.who-we-are {
  /* background-image: url(../assets/images/judiciary_BG.svg); */
  height: 130px;
  background-repeat: no-repeat;
}

.card {
  background: #ffffff;
  border: none;
  position: relative;
  border-radius: 4px 4px 0px 0px;
  max-width: 390px;
  width: 100%;
  z-index: 3;
}

.card-icon {
  /* height: 50px; */
  border-radius: 10px;
  border: solid 3px white;
  left: 20px;
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
  box-shadow: 0px 2px 50px rgba(0, 0, 0, 0.2);
}

.card p {
  font-size: 16px;
}

.card button:hover {
  box-shadow: 0 2px 0px #107742;
}

div.dropdown {
  width: 160px;
  background: #ffffff;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.16);
  border-radius: 2px;
}

div.dropdown-menu {
  border: none;
  margin-top: 10px;
}

.navbar-light .nav-item a.dropdown-item {
  color: black;
  font-size: 14px;
}

.avatar {
  border-radius: 2px 0 0 2px;
  object-fit: cover;
  width: 38px;
  height: 38px;
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
