<template lang="pug">
  div.container(:class="{'is-dragover': dragging}")
    label.image-mesage(for="dropzone")
      span(v-show="files.length===0") Drop files
    input(
      id="dropzone"
      class='image-input'
      type='file'
      @change="onChange($event.target.files)"
      @drop.stop.prevent="onChange($event.dataTransfer.files); dragging = false;"
      @dragenter.prevent.stop="dragging = true"
      @dragover.prevent.stop="dragging = true"
      @dragleave.prevent.stop="dragging = false"
      @dragend.prevent.stop="dragging = false"
      @drag.prevent.stop=""
      @dragstart.prevent.stop=""
      :key="inputKey"
      :multiple="multiple"
      :class="{'is-dragover':dragging}"
      :accept="accept"
      ref="input"
    )
    div.wrapper.d-flex
      div.content(v-for="(file, ind) in files" :key="ind")
        v-img.mx-1(v-if="file.type.includes('image')" width="100" contain :src="file.url")
        v-icon.mx-1.icon(v-else x-large) insert_drive_file
        p {{file.name}}
        v-btn(outline color="error" @click.stop="remove(ind)") Remove
</template>

<script>
export default {
  data () {
    return {
      inputKey: Math.random(),
      dragging: false,
      files: []
    }
  },
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: '*'
    },
    maxFiles: {
      type: Number,
      default: null
    }
  },
  methods: {
    remove (index) {
      this.files.splice(index, 1)
      this.$emit('remove', index)
      this.resetInput()
    },
    onChange (files) {
      const filesAccept = []
      for (let file of files) {
        if (file.type.match('image/')) {
          filesAccept.push(file)
        }
      }
      if (filesAccept.length) {
        this.receiveFiles(filesAccept)
      }
    },
    receiveFiles (files) {
      this.$emit('select', files)
      for (let file of files) {
        this.files.push({url: URL.createObjectURL(file), type: file.type, name: file.name})
      }
    },
    resetInput () {
      this.inputKey = Math.random()
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  border 1px dashed black
  border-radius 4px
  height 100%
  position relative
  width 100%
  min-height 150px
  top -8px
  transition background-color .2s
.wrapper
  align-items flex-end
  flex-flow row wrap
  .content
    flex 0 0 100px !important
  p
    text-overflow ellipsis
    width 100px
    overflow hidden
    white-space nowrap
input.image-input
  opacity 0
  position absolute
  width 100%
  min-height 100px
  height 100%
  left 0
  top 0
  cursor pointer
.is-dragover
  background-color #d4d4d4
.image-mesage
  font-style italic
  width 100%
  text-align center
  position absolute
  top 50%
  left 0
  -webkit-transform translateY(-50%)
.icon
  width 100px
  height 100px
</style>
