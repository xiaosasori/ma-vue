<script>
export default {
  name: "Track",
  mounted() {
    this.$slots.default[0].elm.addEventListener("click", this.trackClick, true);
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