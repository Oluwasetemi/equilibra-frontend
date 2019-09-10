<template>
  <div
    class="modal fade"
    id="imageModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="imageModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <figure class="position-relative mx-4">
          <button
            type="button"
            class="close position-absolute"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <img :src="img" alt />
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["img"]
};
</script>
<style scoped>
img {
  object-fit: contain;
  width: 100%;
  /* height: 400px; */
}
.modal-content {
  background: transparent;
  border: none;
}
.close {
  top: -10px;
  height: 30px;
  width: 30px;
  right: -10%;
  background: white;
  border-radius: 50%;
  font-weight: 400;
}
</style>