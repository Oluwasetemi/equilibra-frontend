<template slot="title">
  <div class="tooltipp px-4 py-3" id="customdiv" style="display: none">
    <div class="mb-3 d-flex align-items-center">
      <figure class="d-inline-block mb-0 mr-2">
        <img src="~assets/images/el-rufai.png" alt height="60px" />
      </figure>

      <div class="details d-inline-block">
        <div class="d-flex flex-column justify-content-center">
          <span
            class="name m-0"
            style="line-height: 1.3em;"
            v-if="government.leader"
          >{{government.leader | capitalizeFirstLetter}}</span>
          <span class="" v-else style="color: gainsboro; font-weight: 200">not available</span>
          <span class="post m-0" style="line-height: 1.3em;">Executive Governor</span>
        </div>
      </div>
    </div>
    <div class="state mb-2">
      <div class="d-inline-block state-initials mr-1" style>
        <span>{{government.slug ? government.slug.toUpperCase()|| '': ''}}</span>
      </div>

      <span
        class="state"
        v-if="government.name"
      >{{government.name.split(' ')[0] | capitalizeFirstLetter }}</span>
    </div>
    <p
      class="description mb-1"
    >{{government.description ? `${government.description.substr(0, 207)}...` || '': ''}}</p>
    <nuxt-link :to="governmentLink">Read More</nuxt-link>
  </div>
</template>

<script>
export default {
  computed: {
    government() {
      return this.$store.getters["currentGovernment"];
    },
    governmentLink() {
      return this.$store.getters["currentGovernment"].name
        ? `/state?id=${
            this.$store.getters["currentGovernment"].name.split(" ")[0]
          }`
        : "/state?id=abia";
    }
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
.tooltipp {
  height: 300px;

  width: 340px;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  /* position: absolute; */
  /* visibility: hidden; */
  /* pointer-events: none; */
}

span.name {
  color: var(--black-text);
  font-size: 19px;
  font-weight: 600;
}

span.post {
  color: #168a59;
  font-size: 15px;
  font-weight: 100;
}

span.state {
  color: var(--black-text);
  font-size: 19px;
}

p.description {
  font-size: 13px;
  color: var(--gray-text);
  line-height: 1.3rem;
  font-weight: 100;
}
a {
  color: var(--dark-green-color);
  font-size: 13px;
  font-weight: 100;
}

img {
  border-radius: 50%;
}

.state-initials {
  background: #e6f3ed;
  border-radius: 4px;
  padding: 9.1px 10px;
  color: var(--dark-green-color);
  font-size: 15px;
  font-weight: 100;
}

figure {
  border-radius: 50%;
  /* width: 40px;
    height: 40px; */
  padding: 2px;
  border: 1px solid #eaf7ed;
}
</style>
