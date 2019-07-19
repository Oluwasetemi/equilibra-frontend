
<template>
  <div>
    <WhiteNav/>
    <nuxt />
    <Footer/>
  </div>
</template>

<script>
import WhiteNav from '~/components/Shared/whiteNavBar'
import Footer from '~/components/Shared/footer'
export default {
    components: {
        Footer,
        WhiteNav
    }
}
</script>

<style scoped>
  div {
  background: #fdfdfd;

  }
</style>
