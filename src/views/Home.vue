<template>
  <div @contexmenu.prevent="close" class="home">
    <!-- <ReadFile />
    <BaseForm /> -->
    <Parent ref="parent" />
    <table style="background-color:blue">
      <th>
        <td style="background-color:red" v-click-outside="onClickOutside" @contextmenu.prevent="$refs.ctx.open">
          Hello
        </td>
        <td style="background-color:green" v-click-outside="onClickOutside" @contextmenu.prevent="$refs.ctx.open">
          td2
        </td>
      </th>
    </table>
    <context-menu ref="ctx">
      <ul>
        <li>Menu 1</li>
        <li>Menu 2</li>
        <li>menu 3</li>
      </ul>
    </context-menu>
  </div>
</template>

<script>
// @ is an alias to /src
import FormMaterial from '@/components/FormMaterial'
import FormTest from '@/components/FormTest'
import ReadFile from '@/components/ReadFile.vue'
import BaseForm from '@/components/BaseForm'
import Parent from '@/components/Parent'
import ContextMenu from '@/components/contextmenu/context-menu'
import vClickOutside from 'v-click-outside'

export default {
  name: 'home',
  directives: {
      clickOutside: vClickOutside.directive
  },
  components: {FormTest, ReadFile, BaseForm, Parent, ContextMenu},
  mounted(){
    this.$http.get('https://jsonplaceholder.typicode.com/todos/1').then(res => console.log(res.body))
    console.log(this.$refs.parent.$refs.child2)
  },
  methods: {
    close() {
      console.log('right click')
      this.$refs.ctx.ctxVisible = false
    },
    onClickOutside(event, el) {
      console.log('click outside', el)
    },
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