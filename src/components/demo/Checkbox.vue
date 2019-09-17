<template lang="pug">
  div
    base-checkbox(native-value="check1" v-model="check") check1
    base-checkbox(native-value="check2" v-model="check") check2
    base-checkbox(native-value="check3" v-model="check") check3
    base-checkbox(key="15" name="check5" label="check5" v-model="checkAll") checkall
    br
    base-checkbox(val="13" :indeterminate="true" :disabled="true" v-model="check1") Disabled
    {{check}}
</template>

<script>

export default {
  data: () => ({
    check: []
  }),
  checkAll: {
    get: function () {
      return this.check.length === 3 ? true : false
    },
    set: function (value) {
      if (value) {
        for (let i =0; i<3;i++) {
          let tmp = `check${i+1}`
          this.check.push(tmp)
        }
      } else if (!value) {
        this.check = []
      }
    }
  }
}
</script>