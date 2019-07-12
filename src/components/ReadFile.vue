<template>
  <div>
    <div id="app" v-cloak>
      <input type="file" ref="myFile" @change="selectedFile" />
      <br />
      <textarea v-model="text"></textarea>
    </div>
  </div>
</template>

<script>
export default {
	name: 'ReadFile',
	data() {
		return {
			text: ''
		}
	},
	methods: {
		selectedFile(e) {
			console.log(this.$refs.myFile.files[0])
			console.log(e.target.files[0])
		}
	},
};
</script>