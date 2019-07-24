<template>
    <div>
        <component v-model="value" @compClick="toggleComp" :is="comp" />
    </div>
</template>

<script>
import BaseInput from '@/components/BaseInput'
import Test from '@/components/Test'
export default {
    data: () => ({
        value: '',
        comp: 'BaseInput'
    }),
    components: {BaseInput, Test},
    methods: {
        toggleComp() {
            this.comp = this.comp === 'BaseInput' ? 'Test' : 'BaseInput'
        }
    }
}
</script>

<style>

</style>
