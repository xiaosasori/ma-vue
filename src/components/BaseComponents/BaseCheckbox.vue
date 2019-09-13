<template lang="pug">
div
    label(v-if="label") {{label}}
    input(
			v-bind="$attrs"
			@change="$emit('input', $event.target.checked)" type="checkbox"
      :name="name" :value="val")
</template>

<script>
export default {
  inheritAttrs: false,
  model: {
    prop: 'checked',
    event: 'change'
  },
	props: {
		label: {
			type: String,
			default: ''
		},
    value: {
      type: Boolean,
      default: false
    },
    name: String,
    val: String
	}
}
</script>