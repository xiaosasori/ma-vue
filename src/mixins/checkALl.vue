<script>
export default {
  data: () => ({
    selectedRow: {}
  }),
  computed: {
    checkAll: {
      get: function () {
        return this.getStock.stocks ? this.selectedRow.length === this.getStock.stocks.length : false
      },
      set: function (value) {
        let selected = {}
        if (value) {
          for (let i in this.getStock) {
            selected[i] = this.getStock[i]
            this.$refs.stockItem[i].isChecked = true
          }
        } else if (!value && Object.getOwnPropertyNames(this.selectedRow).length) {
          for (let i in this.selectedRow) {
            this.$refs.stockItem[i].isChecked = false
          }
          this.selectedRow = {}
        }
        this.selectedRow = selected
      }
    }
  },
  methods: {
    check (index, payload) {
      payload ? this.selectedRow[index] = this.getStock[index] : delete this.selectedRow[index]
      // stocks[index].isChecked = payload
    }
  }
}
</script>