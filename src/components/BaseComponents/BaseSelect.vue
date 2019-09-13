<template lang="pug">
  div
    label(v-if="label") {{label}}
    select(:value="value" @change="updateValue" v-bind="$attrs")
      option(
        v-for="option in options"
        :value="option" :key="option"
        :selected="option === value"
      ) {{option}}
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    value: [String, Number]
  }
}
</script>