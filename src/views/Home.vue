<template>
  <div class="home">
<<<<<<< HEAD
    <ReadFile />
    <BaseForm />
    <BaseButton theme="primary" />
=======
    <!-- <ReadFile />
    <BaseForm /> -->
    <Parent />
>>>>>>> 2a43a4dbf8813c8f8e8020c1af93926a25656012
  </div>
</template>

<script>
// @ is an alias to /src
import FormMaterial from '@/components/FormMaterial'
import FormTest from '@/components/FormTest'
import ReadFile from '@/components/ReadFile.vue'
import BaseForm from '@/components/BaseForm'
<<<<<<< HEAD
import BaseButton from '@/components/BaseButton'

export default {
  name: 'home',
  components: {FormTest, ReadFile, BaseForm, BaseButton},
=======
import Parent from '@/components/Parent'

export default {
  name: 'home',
  components: {FormTest, ReadFile, BaseForm, Parent},
>>>>>>> 2a43a4dbf8813c8f8e8020c1af93926a25656012
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