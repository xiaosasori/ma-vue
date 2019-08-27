<template>
    <div>
        <Child :loading="loading" >
            <template #test>
                <p>hell</p>
                <h5>yeah</h5>
            </template>
            <template #default="{user}">
                <p>Default {{loading}}</p>
                <h1>{{user.name}}</h1>
            </template>
            <template #footer>
                <footer>footer</footer>
            </template>
        </Child>
        <Child2 ref="child2" @counter="loading = $event" />
    </div>
</template>

<script>
import Child from './Child'
import Child2 from './Child2'
export default {
    data: () => ({
        loading: false
    }),
    components: {
        Child, Child2
    },
}
</script>

<style>

</style>
