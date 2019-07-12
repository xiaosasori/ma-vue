<script>
export default {
  name: "Track",
  mounted() {
    /** 
     * true says we want to use event capturing instead of the default event
     * bubbling. Event capture means that events are dispatched top down the 
     * DOM tree to our listener instead of the default bubbling up the DOM tree.
     * In actual effect, this lets us also listen to clicks even if there is a
     * preventDefault declared.
     */
    this.$slots.default[0].elm.addEventListener("click", this.trackClick, true);
    // this.$on('hook:beforeDestroy', () => removeEventListener)
  },
  props: [eventCategory, eventAction, eventLabel, eventValue],
  methods: {
    trackClick() {
      ga("send", "event", eventCategory, eventAction, eventLabel, eventValue);
    }
  },
  render() {
    return $this.$slots.default;
  }
};
</script>