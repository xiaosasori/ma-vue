<template>
    <div>
        <slot name="test"></slot>
        <slot :user="user">Default</slot>
        <slot name="footer"></slot>

    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                name: '1',
                age: 2
            }
        }
    },
}
</script>

<style>

</style>
