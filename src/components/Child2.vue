<template>
    <div v-on="$listeners" @click="bb">
        <p @click="bubble">Bubble</p>
        <button @click="test">Click</button>
    </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
    data: () => ({
        loading: false
    }),
    methods: {
      bb() {
        console.log('bb')
      },
        bubble() {
          console.log('buble child2')
        },
        test() {
            this.$emit('counter', true)
        }
    },
    beforeCreate() {
        this.$emit('counter', true)
    },
    mounted() {
        // setTimeout(() => this.$emit('counter', false), 1000)
        this.$emit('counter', true)
    }
}
</script>

<style>

</style>
