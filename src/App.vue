<template>
  <div id="app" style="background-color:#eee;position: fixed;width: 100%;height: 100%;">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  mounted () {
    // if (this.axios.defaults.headers.common['Authorization'] === undefined) {
    //   this.$router.push({ name: 'login' })
    // }
  }
}
</script>

<style>
  @import "./assets/css/style.css";
</style>
