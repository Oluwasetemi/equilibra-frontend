<template>
  <div
    ref="modal"
    class="modal fade"
    id="roomInfoModal"
    role="dialog"
    aria-labelledby="roomInfoLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content px-4 pt-4">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="mb-3 d-flex align-items-center">
          <figure
            class="d-inline-block mb-0 mr-2 rounded-circle border p-1"
            style="border-color:#07834E !important;"
          >
            <img :src="info.imgURL" alt class="rounded-circle photo" cl />
          </figure>

          <div class="details d-inline-block">
            <div class="d-flex flex-column justify-content-center">
              <span class="name m-0" style="line-height: 1.3em;">{{info.name}}</span>
              <span class="post m-0" style="line-height: 1.3em;">{{info.post}}</span>
            </div>
          </div>
        </div>
        <div
          class="detail d-flex align-items-center pb-3 mb-3"
          v-for="(detail, i) in info.roomDetails"
          :key="i"
        >
          <figure class="detail-icon d-inline-block mb-0 mr-4 rounded-circle">
            <img src="~assets/icons/population.svg" alt />
          </figure>
          <div class="details d-inline-block">
            <div class="d-flex flex-column justify-content-center">
              <span class="figures m-0" style="line-height: 1.3em;">{{detail.value}}</span>
              <span class="heading m-0">{{detail.title}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ["info"]
};
</script>


<style scoped>
.modal-content {
  border-radius: 4px;
  max-width: 470px;
  border: 1px solid rgba(222, 225, 229, 0.17);
  background: #fdfdfd;
  border-radius: 4px;
}

p {
  font-size: 18px;
}

span.title {
  color: #07834e;
}

span.heading {
  color: #747a76;
  font-size: 14px;
  line-height: 2.5em;
  font-weight: 100;
}
span.figures {
  color: #091f0e;
  font-size: 26px;
}

span.name {
  color: var(--black-text);
  font-size: 20px;
  font-weight: 400;
}

span.post {
  color: #168a59;
  font-size: 14px;
}

.photo {
  height: 100px;
}

article {
  padding-bottom: 150px;
}
button.close {
  position: absolute;
  right: 0;
  top: 0;
  background: #dceee6;
  border-radius: 0px 4px 0px 0px;
  height: 34px;
  width: 40px;
}

.close span {
  color: #07834e;
  font-weight: 100;
}
</style>
