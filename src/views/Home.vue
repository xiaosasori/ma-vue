<template>
  <div class="home">
    <!-- <Parent ref="parent" />
    <zoom-in />
    <zoomer />
    <div class="div" ref="test" @mousewheel.prevent="onMouseWheel">
    </div>
    <resize />
    <TrackerChangeVue/>
    <context />
    <functionalv />
    <button @click="test=0">Plus</button> -->
    <!-- <div v-click-outside="log" style="height: 100vh;background-color: pink"></div>
    <LazyImage width="1260" height="750" src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260%202520w" /> -->
    <TablePage />
  </div>
</template>

<script>
// @ is an alias to /src
import functionalv from '@/components/demo/functional/index.vue'
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
import LazyImage from '@/components/demo/LazyImage'
import TablePage from '@/components/demo/table/index'
export default {
  data: () => ({
    test: 1
  }),
  directives: {
    'click-outside': {
      bind (el, binding) {
        el.__ClickOutsideHandler__ = event => {
          // check if event's target is the el or contained by el
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event)
          }
        }
        document.body.addEventListener('click', el.__ClickOutsideHandler__)
      },
      unbind (el) {
        document.body.removeEventListener('click', el.__ClickOutsideHandler__)
      }
    }
  },
  name: 'home',
  watch: {
    test: {
      handler (val) {
        console.log('handler')
      }
    }
  },
  components: {functionalv, TrackerChangeVue, resize, context, FormTest, ReadFile, BaseForm, Parent, ZoomIn, Zoomer, LazyImage, TablePage},
  mounted(){
    // this.$http.get('https://jsonplaceholder.typicode.com/todos/1').then(res => console.log('data', res.data))
    // console.log(this.$refs.parent.$refs.child2)
    // this.$refs.test.addEventListener('click', this.test)
    this.$once('visible', () => {
      console.log('visible')
    })
  },
  methods: {
    log () {
      console.log('log')
    },
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