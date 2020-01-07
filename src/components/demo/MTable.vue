<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Index</th>
          <th>ID</th>
          <th>
            <input type="checkbox" />
          </th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Date</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        <TableItem
          @click.native="toggleSelect(item)"
          v-for="(item, $index) in data"
          :key="item.id"
          :item="item"
          :items="data"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import Sortable, {MultiDrag} from 'sortablejs'
import TableItem from './TableItem'
import _ from 'lodash'
export default {
  components: {TableItem},
  data () {
    const data = [
              { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016-10-15 13:43:27', 'gender': 'Male' },
              { 'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016-12-15 06:00:53', 'gender': 'Male' },
              { 'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016-04-26 06:26:28', 'gender': 'Female' },
              { 'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016-04-10 10:28:46', 'gender': 'Male' },
              { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female' },
              { 'id': 6, 'first_name': 'Jimmy', 'last_name': 'Milk', 'date': '2016-12-21 11:28:28', 'gender': 'Female' },
              { 'id': 7, 'first_name': 'Rock', 'last_name': 'Lee', 'date': '2016-02-16 15:29:11', 'gender': 'Male' },
              { 'id': 8, 'first_name': 'Mei', 'last_name': 'Lee', 'date': '2016-06-06 08:22:04', 'gender': 'Male' },
              { 'id': 9, 'first_name': 'Kind', 'last_name': 'Joy', 'date': '2016-07-12 02:21:12', 'gender': 'Female' }
            ]
    return {
      data,
      selected: []
    }
  },
  mounted () {
    Sortable.mount(new MultiDrag())
    const el = document.querySelector('tbody')
    const sortable = new Sortable(el, {
      multiDrag: true,
      selectedClass: 'selected',
      onSelect: this.onSelect,
      onDeselect: this.onDeselect,
      onEnd: this.onEnd
    })
  },
  methods: {
    onSelect (e) {
      console.log('onSelect', e)
    },
    onDeselect (e) {
      console.log('onDeselect', e)
    },
    onEnd (e) {
      console.log
      const selectedIndexes = this.selected.map(item => _.findIndex(this.data, item))
      console.log(selectedIndexes)
      const selected = []
      for (let i = selectedIndexes.length-1; i >= 0; i--) {
        selected.unshift(this.data.splice(selectedIndexes[i], 1)[0])
      }
      this.data.splice(e.newIndex, 0, ...selected)
    },
    toggleSelect (item) {
      if (!this.selected.includes(item)) {
        this.selected.push(item)
      } else {
        this.selected = this.selected.filter(tmp => tmp !== item)
      }
    }
  }
}
</script>

<style>
</style>