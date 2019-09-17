<template lang="pug">
  div
    button(@click="change1") 1
    button(@click="change2") 2
    button(@click="change3") 3
    button(@click="change4") 4
    button(@click="check") Check
</template>

<script>
import {changeTracker} from '@/services/utils'
export default {
  data: () => ({
    test: {
      a: 1,
      b: 1,
      c: 1,
      d: {
        e: 1,
        f: 2
      }
    }
  }),
  methods: {
    check () {
      console.log(changeTracker.changedProps(this.test))
    },
    change1() {
      this.test.a++
      console.log(this.test)
    },
    change2() {
      this.test.b++
      console.log(this.test)
    },
    change3() {
      this.test.c++
      console.log(this.test)
    },
    change4() {
      this.test.d.e++
      console.log(this.test)
    }
  },
  created() {
    changeTracker.track(this.test)
  }
}
</script>