<template>
  <div class="home">
    <track>
      <button eventCategory="Checkout" eventAction="Button Click" eventLabel="Sidebar" eventValue="$30">TrackButton</button>
    </track>
  </div>
</template>

<script>
import Track from '@/components/Track.vue'

export default {
  name: 'home',
  components: {
    Track
  },
  methods: {
    onClick(e) {
      
    }
  },
}
</script>
