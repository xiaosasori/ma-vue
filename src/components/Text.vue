<template>
  <div>
    <!-- 1 -->
    <div>
      <GrandChild @click="$emit('event', 'p1', 'p2')" />
      <!-- use arguments instead of $event -->
      <Child @event="$emit('event', arguments)" />
    </div>
    <!-- 2 -->
    <div>
      <Child @click="listeners['custom-event']('message from child')" />
      <Parent @custom-event="some_method" />
    </div>
    <!-- 3 -->
    <div>
      <Child ref="child" />
    </div>
		<!-- 4 -->
		<div>
			<Child @hook:created="doSomething" />
      <!-- Set state when slot is mounted -->
      <slot v-bind = "counter = false" /> 
		</div>
    <!-- reset when logou --> location.reload()
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0
    };
  },
  created() {
    const userString = localStorage.getItem('user')
    if(userString) {
      const userData = JSON.parse(userString)
      this.$store.commit('SET_USER_DATA', userData)
    }
    axios.interceptors.response.use(
      response => response,
      error => {
        if(error.response.status === 401) {
          this.$store.dispatch('logout')
        }
        return Promise.reject(error)
      }
    )
  },
  mounted() {
		// 3. watch counter state
    this.$watch(
      "$refs.child.counter",
      (new_value, old_value) => (this.counter = new_value)
    );

    // clear out event listener
    this.$on('hook:beforeDestroy', () => {
      // thidPartyPlugin.destroy()
    })
    // Event between components: component 2
    this.$root.$on('finishLoading', data => {
        console.log(data);
    });
  },
  methods: {
    // Event between components: component 1
    finishLoading() {
      this.$root.$emit('finishLoading', data)
    },
    focusChanged (event) {
      const el = event.target
      // console.log(el)
    },
    // when custom checkbox components onCheck
    check (index, payload) {
      payload ? this.selectedRow.push(index) : this.selectedRow = this.selectedRow.filter(val => val!==index)
      this.stocksFM[index].isChecked = payload
    },
  },
  computed: {
    // selectedRow = [] contains index of selected row
    selectAll: {
      get: function () {
        return this.stocksFM ? this.selectedRow.length === this.stocksFM.length : false
      },
      set: function (value) {
        const selected = []

        if (value) {
          for (let i in this.$refs.fmItem) {
            selected.push(Number(i))
            this.$refs.fmItem[i].isChecked = true
          }
        } else if (!value && this.selectedRow.length) {
          for (let i of this.selectedRow.length) {
            this.$refs.fmItem[i].isChecked = false
          }
        }

        this.selectedRow = selected
      }
    }
  },
  created() {
    document.addEventListener('focusin', this.focusChanged)
  },
  beforeDestroy() {
    document.removeEventListener('focusin', this.focusChanged)
  }
};
</script>