<template>
  <div class="home">
    <!-- <h1 v-color="['red','gold','pink','blue']">Hello</h1>
    <h1 v-color:fast.underline="['red','gold','pink','blue']">Hello</h1>
    <FormTest /> -->
    <div class="dropper">
    <input
      type="file"
      @change="uploadImages($event.target.files)"
      accept="image/*"
    />
    <span>Drag files here!</span>
</div>
  </div>
</template>

<script>
// @ is an alias to /src
import FormMaterial from '@/components/FormMaterial'
import FormTest from '@/components/FormTest'
export default {
  name: 'home',
  components: {FormTest},
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
