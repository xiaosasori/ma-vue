<template>
  <div class="home">
    <ReadFile />
    <BaseForm />
    <BaseButton theme="primary" />
    <h1 class="has-text-white is-uppercase">ầ</h1>
    <button class="button is-primary">afg</button>
    <b-button type="is-link">buefy</b-button>
    <base-checkbox val="t1" name="t" label="checkbox" v-model="selected" value="1" />
    <base-checkbox val="t2" name="t" label="checkbox" v-model="selected" value="2" />
  </div>
</template>

<script>
// @ is an alias to /src
import BaseCheckbox from '@/components/BaseComponents/BaseCheckbox'
import FormMaterial from '@/components/FormMaterial'
import FormTest from '@/components/FormTest'
import ReadFile from '@/components/ReadFile.vue'
import BaseForm from '@/components/BaseForm'
import BaseButton from '@/components/BaseButton'

export default {
  name: 'home',
  data: () => ({
    selected: []
  }),
  components: {FormTest, ReadFile, BaseForm, BaseButton, BaseCheckbox},
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