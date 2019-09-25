<template>
    <div>
        <slot name="test"></slot>
        <slot :user="user" v-bind="loading=false">Default {{loading}}</slot>
        <slot name="footer"></slot>
        Child loading: {{loading}}
        Child 1 test: {{testMix}}
        <button @click="testUp">Up Child</button>
    </div>
</template>

<script>
import MixinTest from '@/mixins/test'

export default {
    mixins: [MixinTest],
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
