<template>
  <div class="dropdown-menu">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    <div class="title d-flex align-items-center mb-4">
      <img src="~/assets/icons/caution-icon.svg" alt="caution" class="mr-3" />
      <h4 class="inline-block m-0">Are you sure?</h4>
    </div>
    <p>Are you sure you want to delete this message?</p>
    <div class="buttons d-flex justify-content-between">
      <button class="delete" @click="deleteComment()">Delete</button>
      <button
          type="submit"
          class="cancel d-flex align-items-center justify-content-center"
          :disabled="loading"
        >
          <div class="spinner-grow text-success" v-if="loading"></div>
          <span>Cancel</span>
        </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['loading'],
  methods:  {
    deleteComment() {
      this.$emit('deleteComment')
    }
  }
}
</script>

<style scoped>
.dropdown-menu {
  border: none;
  width: 310px;
  background: white;
  padding: 30px;
  border: 1px solid rgba(222, 225, 229, 0.5);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  border-radius: 2px;
}

h4 {
  font-size: 20px;
  letter-spacing: -0.4px;
  color: #091f0e;
  font-weight: 700;
}

p {
  font-size: 16px;
  letter-spacing: -0.4px;
  color: #737373;
  line-height: 1.3em;
}

button {
  border-radius: 2px;
  padding: 4.5px;
  font-size: 14px;
  font-weight: 100;
  width: 45%;
}

button.delete {
  border: 1px solid #ee3934;
  background: #ee3934;
  color: white;
}

button.cancel {
  border: 1px solid #e7e7e7;
  color: #737373;
}

button.close {
  position: absolute;
  right: 0;
  top: 0;
  height: 34px;
  width: 40px;
}

.close span {
  color: #000000;
  font-weight: 100;
  font-size: 20px;
}
</style>
