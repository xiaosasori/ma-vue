<template lang="pug">
  div
    p {{a}}
      button(@click="a++") +
    p {{b}}
      button(@click="b++") +
    func
</template>

<script>
import func from './func'
export default {
  components: {
    func
  },
  data: () => ({
    a: 0,
    b: 0
  })
}
</script>

<style>

</style>