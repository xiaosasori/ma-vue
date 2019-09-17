<template lang="pug">
  div.container
    img-view(style="width: 20vw;height:20vw;")
      div.item
</template>

<script>
import ImgView from './ImgView'
export default {
  components: {ImgView}
}
</script>

<style scoped>
.container {
  text-align: center;

}
.item {
  background-image: linear-gradient(red, yellow);
  width: 300px;
  height: 300px;
}
</style>