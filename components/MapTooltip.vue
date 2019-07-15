<template>
  <div class="tooltipp px-3 py-3">
    <div class="mb-3 d-flex align-items-center">
      <figure class="d-inline-block mb-0 mr-2">
        <img src="~assets/images/el-rufai.png" alt />
      </figure>

      <div class="details d-inline-block">
        <div class="d-flex flex-column justify-content-center">
          <span class="name m-0" style="line-height: 1.3em;">Nasir El Rufai</span>
          <span class="post m-0" style="line-height: 1.3em;">Executive Governor</span>
        </div>
      </div>
    </div>
    <div class="state mb-2">
      <div class="d-inline-block state-initials mr-1" style>
        <span>KD</span>
      </div>
      <span class="state">Kaduna</span>
    </div>
    <p class="description mb-1">
      Kaduna State was created on May 27, 1967 from the then northern
      region by the then regim of General Yakubu Gowon. Jigawa State
      was carved out of Kano State in the state creation exercise of 1991.
    </p>
    <nuxt-link to="/state/kaduna" >Read More</nuxt-link>
  </div>
</template>

<style scoped>
.tooltipp {
  height: 282px;
  width: 302px;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
border-radius: 2px;
  position: absolute;
  visibility: hidden;
  /* pointer-events: none; */
}

span.name {
  color: var(--black-text);
  font-size: 17px;
  font-weight: 600;
}

span.post {
  color: #168a59;
  font-size: 13px;
}

span.state {
  color: var(--black-text);
  font-size: 19px;
}

p.description {
  font-size: 13px;
  color: var(--gray-text);
  line-height: 1.3rem;
}
a {
  color: var(--dark-green-color);
  font-size: 11px;
}

img {
  border-radius: 50%;
}

.state-initials {
  background: #e6f3ed;
  border-radius: 4px;
  padding: 9.1px 10px;
  color: var(--dark-green-color);
  font-size: 13px;
}

figure {
    border-radius: 50%;
    /* width: 40px;
    height: 40px; */
    padding: 2px;
    border: 1px solid #EAF7ED;
}
</style>
