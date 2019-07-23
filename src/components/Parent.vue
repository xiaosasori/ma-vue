<template>
    <Child >
        <template #test>
            <p>hell</p>
            <h5>yeah</h5>
        </template>
        <template #default="{user}">
            <p>Hello</p>
            <button>Click</button>
            <h1>{{user.name}}</h1>
        </template>
        <template #footer>
            <footer>footer</footer>
        </template>
    </Child>
</template>

<script>
import Child from './Child'
export default {
    components: {
        Child,
    },
}
</script>

<style>

</style>
