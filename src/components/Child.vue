<template>
    <div>
        <slot name="test"></slot>
        <slot :user="user" v-bind="loading=false">Default {{loading}}</slot>
        <slot name="footer"></slot>
        Child loading: {{loading}}
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                name: 'MA',
                age: 2
            },
            loading: true
        }
    },
    props: {
        // loading: {
        //     type: Boolean
        // }
    },
    created() {
        console.log('created', this.loading) // true
    },
    beforeMount(){
        console.log('beforeMount', this.loading) // true
    },
    mounted() {
        console.log('mounted',this.loading) // false
    }
}
</script>

<style>

</style>
