<template>
  <div class="app-img">
    <img
      :alt="$attrs.alt || ''"
      :src="dataUrl"
      v-bind="$attrs"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  data: () => ({
    
  }),
  props: {
    src: {
      type: String,
      required: true
    }
  },
  computed: {
    dataUrl () {
      const {width, height} = this.$attrs
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

    const observer = new IntersectionObserver(([entry]) => {
      const img = $el.querySelector("img")

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
}
</style>