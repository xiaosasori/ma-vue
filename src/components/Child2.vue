<template>
    <div>
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
