<template>
  <tr>
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
    item: Object
  }
}
</script>

<style>
.selected {
  background-color: orange;
}
</style>