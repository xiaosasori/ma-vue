<template lang="pug">
  div(:resize="handleResize('zxc')")
    h3 Resize test
    | {{resi}}
</template>

<script>
export default {
  data: () => ({
    resi: true
  }),
  created: function () {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    resizeTest (param) {
      console.log('resize test' + param)
    },
    handleResize (param) {
      console.log('handleResize' + param)
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