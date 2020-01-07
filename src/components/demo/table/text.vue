<template>
  <div>
    {{value}}
  </div>
</template>

<script>
export default {
  props: {
    value: String
  },
  updated () {
    console.log('updated')
  }
}
</script>

<style>

</style>