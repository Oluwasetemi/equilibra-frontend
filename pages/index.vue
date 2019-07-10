<template>
  <div class="container-fluid px-0 header">
    <header class="px-md-3 pt-2">
      <nav class="navbar navbar-expand-lg d-flex justify-space-between">
          <img src="~/assets/icons/logo.svg" alt="">
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

        <div class="collapse navbar-collapse d-md-flex justify-content-md-end" id="navbarSupportedContent">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Home
              </a>
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
        <div class="col-md-5">
            <div class="hero-text mt-5 pt-5">
            <h1 class="font-weight-bold pt-3">The People’s Parliament! </h1>
            <h5 class="pt-3">Forum for the people to discuss issues of common interest in the community, constructively.</h5>
            <div class="pt-4">
                <button class="white-btn">Lorem Ipsum</button>
            </div>
            </div>
            
        </div>
        <div class="col-md-7">
        <Map/>
    </div>
    </div>
    </div>
    
  </div>
</template>

<script>
import Map from '~/components/Map'
export default {
    components: {
        Map
    }
}
</script>



<style scoped>
.header {
  background-image: url("~assets/images/headerBG.svg");
  background-repeat: no-repeat;
  background-size: contain;
  height: 719px;
  color: white;
}

.nav-item a{
    color: white
}

h1 {
    font-size: 30px;
}
h5 {
    font-size: 18px;
    line-height: 1.5em;
    font-weight: lighter
}

.hero-text {
    
}

h3 {

}

@media screen and (min-width: 1441px){
    .header {
        background-size: cover;
    }
}

</style>
