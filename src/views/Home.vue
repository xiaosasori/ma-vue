<template>
  <div class="home">
    <ReadFile />
    <BaseForm />
  </div>
</template>

<script>
// @ is an alias to /src
import FormMaterial from '@/components/FormMaterial'
import FormTest from '@/components/FormTest'
import ReadFile from '@/components/ReadFile.vue'
import BaseForm from '@/components/BaseForm'

export default {
  name: 'home',
  components: {FormTest, ReadFile, BaseForm},
  mounted(){
    this.$http.get('https://jsonplaceholder.typicode.com/todos/1').then(res => console.log(res.body))
  },
  methods: {
    uploadImages(e){
      console.log(e)
    }
  }
}
</script>
<style scoped>
.dropper {
  height: 30vh;
  border: 2px dashed black;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.dropper:hover {
  background-color: #eee;
}
input {
  width: 100%;
  height: 30vh;
  position: absolute;
  opacity: 0;
}
</style>