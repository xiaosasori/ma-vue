<template lang="pug">
    router-link(:to="to" :class="[themes[theme], sizes[size]]") Signin
</template>

<script>
export default {
    data: () => ({
        themes: {
            primary: 'btn-primary',
            danger: 'btn-danger'
        },
        sizes: {
            normal: '',
            large: 'btn-lg'
        }
    }),
    props: {
        theme: {
            type: String,
            required: false
        },
        size: {
            type: String,
            required: false
        },
        to: {
            type: Object,
            required: false,
            default: {}
        }
    }
}
</script>

<style>

</style>
