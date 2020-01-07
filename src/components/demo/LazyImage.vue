<template>
  <div class="app-img">
    <div v-if="dataUrl" :style="{ background }" class="app-img__placeholder">
      <img :src="placeholder || dataUrl" alt v-bind="$attrs" />
    </div>
    <img :alt="$attrs.alt || ''" :src="dataUrl" v-bind="$attrs" class="app-img__img" />
  </div>
</template>

<script>
export default {
  data: () => ({
    
  }),
  props: {
    src: {
      type: String,
      required: true
    },
    placeholder: String,
    background: String,
    height:[String, Number]
  },
  computed: {
    dataUrl () {
      const {width, height} = this.$attrs
      console.log(this)
      if(!width || !height) return ''

      // create a tiny png with matching aspect ratio as img
      const w = 100
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      // canvas.width = w
      // canvas.height = (height / width) * w
      return canvas.toDataURL()
    }
  },
  mounted() {
    const { src, $el } = this
    console.log(this)
    const observer = new IntersectionObserver(([entry]) => {
      const img = $el.querySelector(`.app-img__img`)
      const placeholder = $el.querySelector(`.app-img__placeholder`)

      img.onload = function() {
        delete img.onload
        if (placeholder) {
          placeholder.remove()
        }
      }
      if (entry.isIntersecting) {
        // Element is in viewport
        img.src = src
        observer.disconnect()
      }
    })
    observer.observe($el)
    this.$once("hook:beforeDestroy", () => {
      observer.disconnect()
    })
  },
}
</script>

<style>
.app-img {
  display: inline-block;
  position: relative;
}

.app-img__placeholder {
  position: absolute;
}
</style>