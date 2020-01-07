<template>
  <tr>
    <td>{{index}}</td>
    <td>{{item.id}}</td>
    <td>{{item.first_name}}</td>
    <td>{{item.last_name}}</td>
    <td>{{item.date}}</td>
    <td>{{item.gender}}</td>
  </tr>
</template>

<script>
export default {
  props: {
    item: Object,
    items: Array
  },
  computed: {
    index () {
      return this.items.indexOf(this.item)
    }
  }
}
</script>

<style>
.selected {
  background-color: orange;
}
</style>