
<template>
  <div>
    <WhiteNav/>
    <nuxt />
  </div>
</template>

<script>
import WhiteNav from '~/components/Shared/cpanelNavBar'
import Footer from '~/components/Shared/footer'
export default {
    components: {
        WhiteNav
    }
}
</script>

<style scoped>
  div {
  background: #fdfdfd;

  }
</style>
