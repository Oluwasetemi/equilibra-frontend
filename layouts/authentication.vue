
<template>
  <div>
    <WhiteNav />
    <div class="container-fluid px-0">
      <div class="row no-gutters">
        <div class="col-md-4 left-section pt-4 pb-5 d-flex flex-column justify-content-center" style="min-height: calc(100vh - 55.99px)">
          <nuxt />
        </div>
    <div class="col-md-8 right-section d-none d-md-block" style="min-height: calc(100vh - 55.99px)">
            <div class="shapes" style="height: 100%">

            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WhiteNav from "~/components/Shared/whiteNavBar";
import Footer from "~/components/Shared/footer";
export default {
  components: {
    Footer,
    WhiteNav
  }
};
</script>

<style scoped>
.right-section {
  background-image: url("~assets/images/senate-building.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: white;
}
.shapes{
  background-image: url("~assets/images/shapes-background.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: right bottom;
  color: white;
}
.left-section {
  background: #f3faf5;
}

.border-bottom {
    border-color: #EAEAEA;
}
</style>
