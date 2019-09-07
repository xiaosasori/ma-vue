<template lang="pug">
  div
    img(id="drawing"
      src="https://images.pexels.com/photos/556416/pexels-photo-556416.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=300&w=300"
      @mousewheel.prevent="onMouseWheel"
    )
    
</template>

<script>
export default {
  data: () => ({
    originX: 0,
    originY: 0,
    translateX: 0,
    translateY: 0,
    scale: 1,
    transformation: {},
    zooming: null,
    el: 'drawing',
    current: {
      originX: 0,
      originY: 0,
      translateX: 0,
      translateY: 0,
      scale: 1
    },
    last: {
      originX: 0,
      originY: 0,
      translateX: 0,
      translateY: 0,
      scale: 1
    }
  }),
  methods: {
    onMouseWheel (e) {
      console.log(e)
    },
    transform2d (t) {
      let transform2d = 'matrix('
      transform2d += t.getScale().toFixed(1) + ",0,0," + t.getScale().toFixed(1) + "," + t.getTranslateX().toFixed(1) +"," + t.getTranslateY().toFixed(1) + ")"
      return transform2d
    },
    apply (t) {
      const elem = this.$refs.drawing.$el
      var orig = t.getOriginX().toFixed(10) + "px " + t.getOriginY().toFixed(10) + "px"
      elem.setProperty("transform-origin", orig)
      elem.setProperty("-ms-transform-origin", orig)
      elem.setProperty("-o-transform-origin", orig)
      elem.setProperty("-moz-transform-origin", orig)
      elem.setProperty("-webkit-transform-origin", orig)
      let transform2d = this.transform2d(t)
      elem.setProperty("transform", transform2d)
      elem.setProperty("-ms-transform", transform2d)
      elem.setProperty("-o-transform", transform2d)
      elem.setProperty("-moz-transform", transform2d)
      elem.setProperty("-webkit-transform", transform2d)
    }
  }
}
</script>