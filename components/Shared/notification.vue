<template>
    <div v-if="message">
      <p>{{ message }}</p>
    </div>
  
</template>

<script>
export default {
  props: ["message", "type"],
  computed: {
    getMessage() {
      return this.message
    }
  },
  watch: {
    getMessage(val) {
      // showNotification = true
    }
  },
};
</script>


<style scoped>
div {
  width: 220px;
  height: 66px;
  padding: 13px 18px;
  background: #ee3934;
  border-radius: 2px;
  position: absolute;
  z-index: 1000;
  right: 40px;
  top: 40px;
}
p {
  color: white;
  font-size: 14px;
}
</style>
