<template>
  <div :class="$style.app">
    <Header />
    <div :class="$style.view">
      <Nuxt />
    </div>
    <Panel />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  created() {
    this.initCart()
  },
  methods: {
    ...mapActions(['initCart'])
  },
}
</script>

<style lang="scss" module>
.app {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  & .view {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
}

</style>
