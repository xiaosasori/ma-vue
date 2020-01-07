<template>
  <tr>
    <td>{{item.id}}</td>
    <td>
      <BaseCheckbox :value="isChecked(item)" />
    </td>
    <td>
      <BaseInput v-model="item.first_name"/>
    </td>
    <td>
      <BaseInput v-model="item.last_name" />
    </td>
    <td>
      <BaseInput v-model="item.date" />
    </td>
    <td>
      <TextC :value="item.gender" />
    </td>
  </tr>
</template>

<script>
import BaseCheckbox from '@/components/BaseComponents/BaseCheckbox'
import BaseInput from '@/components/BaseComponents/BaseInput'
import TextC from './text'
export default {
  components: {
    TextC,
    BaseInput,
    BaseCheckbox
  },
  props: {
    selectedRows: Array,
    item: Object
  },
  methods: {
    isChecked (item) {
      return this.selectedRows.indexOf(item) >= 0
    }
  },
  updated () {
    console.log('update row')
  }
}
</script>

<style>

</style>