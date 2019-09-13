<template>
  <div @contexmenu.prevent="close" class="home">
    <!-- <ReadFile />
    <BaseForm /> -->
    <Parent ref="parent" />
    <zoom-in />
    <table style="background-color:blue">
      <th>
        <td style="background-color:red" @contextmenu.prevent="$refs.ctx.open">
          Hello
        </td>
        <td style="background-color:green" @contextmenu.prevent="$refs.ctx.open">
          td2
        </td>
      </th>
    </table>
    <button @click="change1">1</button>
    <button @click="change2">2</button>
    <button @click="change3">3</button>
    <button @click="change4">4</button>
    <button @click="check">Check</button>
    <div class="div" @mousewheel.prevent="onMouseWheel">
    <div class="div" ref="test" @mousewheel.prevent="onMouseWheel">

    </div>
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
import BaseCheckbox from '@/components/BaseComponents/BaseCheckbox'
import FormMaterial from '@/components/FormMaterial'
import FormTest from '@/components/FormTest'
import ReadFile from '@/components/ReadFile.vue'
import BaseForm from '@/components/BaseForm'
import Parent from '@/components/Parent'
import ContextMenu from '@/components/contextmenu/context-menu'
import ZoomIn from '@/components/Base/ZoomIn'
import {changeTracker} from '@/services/utils'
export default {
  name: 'home',
  data: () => ({
    test: {
      a: 1,
      b: 1,
      c: 1,
      d: {
        e: 1,
        f: 2
      }
    }
  }),
  components: {FormTest, ReadFile, BaseForm, Parent, ContextMenu, ZoomIn},
  mounted(){
    changeTracker.track(this.test)
    this.$http.get('https://jsonplaceholder.typicode.com/todos/1').then(res => console.log('data', res.data))
    console.log(this.$refs.parent.$refs.child2)
    this.$refs.test.addEventListener('click', this.test)
  },
  methods: {
    onMouseWheel(e) {
      console.log(e)
    },
    test() {
      console.log('test')
      console.log()
    },
    close() {
      console.log('right click')
      this.$refs.ctx.ctxVisible = false
    },
    uploadImages(e){
      console.log(e)
    },
    check() {
      console.log(changeTracker.changed(this.test))
    },
    change1() {
      this.test.a++
      console.log(this.test)
    },
    change2() {
      this.test.b++
      console.log(this.test)
    },
    change3() {
      this.test.c++
      console.log(this.test)
    },
    change4() {
      this.test.d.e++
      console.log(this.test)
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
.div {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  background-color: green;
}
</style>