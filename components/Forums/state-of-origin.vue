<template>
  <div class="row">
    <div class="col-md-4" v-for="(item, i) in cards" :key="i">
      <div class="card border-0 my-4">
        <div
          class="background-img d-flex align-items-end"
          :style="{backgroundImage: `url(${item.backgroundImage})`}"
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
</template>

<style scoped>
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
  box-shadow: 0 2px 0px #107742;
}

div.dropdown {
  width: 160px;
  background: #ffffff;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.16);
  border-radius: 2px;
}

.navbar-light .nav-item a.dropdown-item {
  color: black;
  font-size: 14px;
}

.avatar {
  border-radius: 2px 0 0 2px;
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

