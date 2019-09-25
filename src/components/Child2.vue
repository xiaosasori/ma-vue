<template>
  <div v-on="$listeners" @click="bb">
    <p @click.stop="bubble">Bubble</p>
    <button @click="test">Click</button>
      Child 2 test: {{testMix}}
        <button @click="testUp">Up Child</button>
  </div>
</template>

<script>
import { setTimeout } from "timers"
import MixinTest from '@/mixins/test'
export default {
  data: () => ({
    loading: false
  }),
  mixins: [MixinTest],
  methods: {
    bb() {
      console.log("bb");
    },
    bubble() {
      console.log("buble child2");
    },
    test() {
      this.$emit("counter", true);
    }
  },
  beforeCreate() {
    this.$emit("counter", true);
  },
  mounted() {
    // setTimeout(() => this.$emit('counter', false), 1000)
    this.$emit("counter", true);
  }
};
</script>

<style>
</style>
