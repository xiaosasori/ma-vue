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
    async scrollTo () {
      await this.$nextTick()
      let container = document.querySelector('.table-wrapper')
      container.scrollTo({top: container.scrollHeight, behavior: 'smooth'})
    },
    // wait until element render
    async calcDropdownInViewportVertical() {
      await this.$nextTick()
      const dom = await this.checkElement('.menuable__content__active.menu-combobox')
      const rect = dom.getBoundingClientRect()
      this.isListInViewportVertically = (
        rect.top >= 0 &&
        rect.top >= this.$refs['input-combobox'].getBoundingClientRect().bottom &&
        rect.bottom <= (window.innerHeight - 36 - 37 ||
          document.documentElement.clientHeight - 36 - 37)
      )
      if (!this.isListInViewportVertically && rect.height === 300) {
        this.y = rect.top - (rect.top - this.$refs['input-combobox'].getBoundingClientRect().top) - 300 - 8
      } else if (!this.isListInViewportVertically && rect.height < 300) {
        this.y = this.$refs['input-combobox'].getBoundingClientRect().top - rect.height - 10
      }
    },
    async checkElement(selector) {
      while (document.querySelector(selector) === null || document.querySelector(selector).getBoundingClientRect().x === 0) {
        await new Promise(resolve => window.requestAnimationFrame(resolve))
      }
      return document.querySelector(selector)
    },
    checkIsFocus () {
      if (this.$refs['input-combobox'] === document.activeElement) {
        // do something
      }
    }
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
  // @focusout
  // tr:focus-within
};
</script>
