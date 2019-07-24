<template>
    <h1 @click="$emit('compClick')">{{value}}</h1>
</template>

<script>
export default {
    props: {
        value: [String, Number]
    }
}
</script>

<style>

</style>
