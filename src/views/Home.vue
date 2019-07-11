<template>
  <div class="home">
    <track>
      <button eventCategory="Checkout" eventAction="Button Click" eventLabel="Sidebar" eventValue="$30">TrackButton</button>
    </track>
    <ReadFile />
  </div>
</template>

<script>
import Track from '@/components/Track.vue'
import ReadFile from '@/components/ReadFile.vue'

export default {
  name: 'home',
  components: {
    Track, ReadFile
  },
  methods: {
    onClick(e) {
      
    }
  },
}
</script>
