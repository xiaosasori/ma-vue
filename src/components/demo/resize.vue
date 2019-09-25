<template lang="pug">
  div(:resizexc="resizeTest()")
    | {{resi}}
</template>

<script>
export default {
  data: () => ({
    resi: true
  }),
  mounted: function () {
    console.log('mounted resize')
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    resizeTest () {
      console.log('resize test')
    },
    handleResize (param) {
      let windowHeight = document.documentElement.clientHeight
      console.log(param + ' window height: ' + windowHeight)
      if (document.getElementById('table-stock-info') && document.getElementById('header-dialog')) {
        let stockInfoHeight = document.getElementById('table-stock-info').clientHeight
        let headerDialogHeight = document.getElementById('header-dialog').clientHeight
        this.scrollHeight = windowHeight - stockInfoHeight - headerDialogHeight - 16
      }
    }
  }
}
</script>

<style>

</style>