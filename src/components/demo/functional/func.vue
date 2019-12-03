<script>
export default {
  functional: true,
  render (h) {
    console.log('ren functional')
    return h('h3', 'func comp')
  }
}
</script>