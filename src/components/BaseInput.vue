<template lang="pug">
	div
		label(v-if="label") {{label}}
		input(
			v-bind="$attrs"
			:value="value"
			@input="$emit('input', $event.target.value)" type="text")
		button(@click="$emit('compClick')") Change
</template>

<script>
export default {
	inheritAttrs: false,
	props: {
		label: {
			type: String,
			default: ''
		},
		value: [String, Number]
	}
};
</script>

<style>
</style>
