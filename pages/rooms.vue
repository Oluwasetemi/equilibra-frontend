<template>
  <div class="container pr-0 px-0">
    <div class="px-md-3 px-0">
      <div class="row no-gutters flex-row flex-lg-nowrap justify-content-between">
        <div class="px-3 card-container d-lg-block d-none py-4 scrollable">
          <Card :imageURL="imageUrl2.imageUrl" title="Judiciary" link="/rooms/judiciary" />
          <aside class="pt-5">
            <div class="groups border border-bottom-0">
              <ul class="p-0">
                <li class="header font-weight-bold p-3 border-bottom">Groups</li>
                <a href="">
                  <li class="p-3 border-bottom selected">Vent the Steam</li>
                </a>
                <a href v-for="(group, i) in groups" :key="i">
                  <li class="px-4 py-3 border-bottom">{{group.name}}</li>
                </a>
              </ul>
            </div>
          </aside>
        </div>
        <nuxt-child/>
      </div>
    </div>
  </div>
</template>

<script>
import imageUrl from "~/assets/images/judiciary_BG.svg";
import Card from "~/components/Forums/forum-card";
export default {
  layout: "greenNavOnly",
  data() {
    return {
      imageUrl2: { imageUrl },
      groups: [
        {
          name: "High Court",
          link: ""
        },
        {
          name: "Customary Court of Appeal",
          link: ""
        },
        {
          name: "Magistrate Court",
          link: ""
        },
        {
          name: "Customary Court",
          link: ""
        },
        {
          name: "Customary Court of Appeal",
          link: ""
        },
        {
          name: "Magistrate Court",
          link: ""
        }
      ]
    };
  },
  mounted() {
    console.log(this.imageURL);
  },
  components: {
    Card
  }
};
</script>

<style scoped>
.scrollable {
      overflow-y: scroll;
    max-height: calc(100vh - 80px);
}
/* Groups */
.groups {
  border-radius: 4px;
  color: #000000;
  background: white;
}

.groups .border-bottom:not(.selected) {
  border-color: #E7E7E7 !important;
}
.groups li.header {
  font-size: 16px;
}
.groups li:not(.header) {
  font-size: 15px;
  font-weight: 400;
}
.selected {
  background: #dceee6;
  border-left: solid 3px #07834e;
}

/* Groups end */
.border {
  border-color: #e7e7e7;
}
.actions {
  font-size: 12px;
}
.card-container {
  flex: 0 0 30%;
}
.forum-container {
  flex: 0 0 100%;
}
.forum-header {
  background-image: url("~assets/images/forum-header-BG.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: center;
  height: 158px;
  color: white;
}

h4 {
  font-weight: 600;
  font-size: 18px;
}

p {
  font-size: 13px;
}

.comments p,
p,
span.user-handle {
  font-size: 14px;
}

span.time-posted {
  font-size: 12px;
  color: #50bc93;
}

span.username {
  font-size: 15px;
  color: #000000;
}

.comment-content {
  color: #181818;
}

input {
  height: 48px;
  border: 1px solid #e7e7e7;
  box-sizing: border-box;
  border-radius: 2px;
}
button {
  background: #26b14f;
  border-radius: 2px;
  color: white;
  border: 0;
  height: 48px;
  width: 100%;
  max-width: 120px;
  /* padding: 0 5px; */
  border: none;
}

a {
  color: inherit;
  text-decoration: none;
}
@media (min-width: 768px) {
  .forum-container {
    flex: 0 0 70%;
  }
}
@media (min-width: 1200px) {
  .container {
    max-width: 1400px !important;
  }
}
</style>
