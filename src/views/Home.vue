<template>
  <div class="home">
    <!-- <ReadFile />
    <BaseForm /> -->
    <Parent ref="parent" />
    <zoom-in />
    <zoomer />
    <!-- <div class="div" @mousewheel.prevent="onMouseWheel"> -->
    <div class="div" ref="test" @mousewheel.prevent="onMouseWheel">
    </div>
    <resize />
    <TrackerChangeVue/>
    <context />
  </div>
</template>

<script>
// @ is an alias to /src
import FormMaterial from '@/components/FormMaterial'
import FormTest from '@/components/FormTest'
import ReadFile from '@/components/ReadFile.vue'
import BaseForm from '@/components/BaseForm'
import Parent from '@/components/Parent'
import ZoomIn from '@/components/Base/ZoomIn'
import Zoomer from '@/components/demo/zoomer/test'
import context from '@/components/contextmenu/demo'
import resize from '@/components/demo/resize'
import TrackerChangeVue from '@/components/demo/TrackerChange'

export default {
  name: 'home',
  components: {TrackerChangeVue, resize, context, FormTest, ReadFile, BaseForm, Parent, ZoomIn, Zoomer},
  mounted(){
    // this.$http.get('https://jsonplaceholder.typicode.com/todos/1').then(res => console.log('data', res.data))
    // console.log(this.$refs.parent.$refs.child2)
    // this.$refs.test.addEventListener('click', this.test)
    this.$once('visible', () => {
      console.log('visible')
    })
  },
  methods: {
    onMouseWheel(e) {
      console.log(e)
    },
    close() {
      console.log('right click')
      this.$refs.ctx.ctxVisible = false
    },
    uploadImages(e){
      console.log(e)
    },
  }
}
</script>
<style scoped>
input {
  width: 100%;
  height: 30vh;
  position: absolute;
  opacity: 0;
}
</style>