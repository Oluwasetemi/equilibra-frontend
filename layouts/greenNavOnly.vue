
<template>
  <div>
    <GreenNav/>
    <nuxt />
  </div>
</template>

<script>
import GreenNav from '~/components/Shared/greenNavBar'
import Footer from '~/components/Shared/footer'
export default {
    components: {
        GreenNav
    }
}
</script>

<style scoped>
  div {
  background: #fdfdfd;
  }
</style>
