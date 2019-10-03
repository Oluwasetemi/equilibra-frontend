<template>
  <div class="dropdown-menu p-3">
    <label for="sharable-link" class="m-0">Share Link</label>
    <div class="form-input">
      <input
        ref="link"
        type="text"
        class="form-control my-2"
        value="https://theequilibra.com/p/lorem-ipsumabore"
        id="sharable-link"
      />
    </div>
    <div class="footer d-flex justify-content-between pt-1">
      <div class="socials">
        <img src="~/assets/icons/facebook (2).svg" alt class="mr-3" />
        <a class="twitter-share-button" href="https://twitter.com/intent/tweet">
          <img src="~/assets/icons/twitter (1).svg" alt class="mr-3" />
        </a>

        <a href="whatsapp://send?text=Hello%20World!">
          <img src="~/assets/icons/whatsapp.svg" alt />
        </a>
      </div>
      <button class="close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>


<script>
export default {
  mounted() {
    this.$refs.link.select();
  }
};
</script>


<style scoped>
.dropdown-menu {
  width: 385px;
  background: #ffffff;
  border: 1px solid rgba(222, 225, 229, 0.5);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  border-radius: 2px;
}
label {
  font-size: 14px;
  line-height: 16px;
  color: black;
}

.form-control {
  height: 40px;
  font-weight: 100;
  border: 1px solid #dfdfdf;
  box-sizing: border-box;
  border-radius: 2px;
  font-size: 14px;
  line-height: 16px;
  color: #444444;
}

.close span {
  color: #07834e;
  font-weight: 100;
}
</style>
