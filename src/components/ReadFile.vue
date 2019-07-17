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
			const file = e.target.files[0]
			console.log(file.type)
			if (!file) return

			let reader = new FileReader()
			reader.readAsText(file, 'UTF-8')
			reader.onload = e => {
				if (file.type === 'application/json'){
					try {
          	this.cats = JSON.parse(text);
        	} catch(e) {
          	alert("Sorry, your file doesn't appear to be valid JSON data.");
        	}

				}
				this.text = file.type === 'application/json' ? 
					JSON.parse(e.target.result) : e.target.result
			}
			reader.onerror = e => console.log(e)
		}
	},
};
</script>