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
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0
    };
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
    }
  }
};
</script>