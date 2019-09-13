<template lang="pug">
div
  input(
    v-bind="$attrs"
    @change="$emit('input', checkedProxy)" type="checkbox"
    :value="val"
    v-model="checked")
  //- label.cbx(for='cbx')
  //-   span
  //-     svg(width='12px', height='10px', viewbox='0 0 12 10')
  //-       polyline(points='1.5 6 4.5 9 10.5 1')
  //-   span CodePenChallenge
</template>

<script>
export default {
  inheritAttrs: false,
  // model: {
  //   prop: 'checked',
  //   event: 'change'
  // },
  data: () => ({
    checkedProxy: false
  }),
	props: {
		label: {
			type: String,
			default: ''
		},
    name: String,
    value: String|Boolean,
    val: String
  },
  computed: {
    checked: {
      get () {
        return this.value
      },
      set (val) {
        this.checkedProxy = val
      }
    }
  },
}
</script>
<style scoped>
/* html,
body {
  height: 100%;
}
body {
  display: grid;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  color: #223254;
}
.cbx {
  margin: auto;
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
}
.cbx span {
  display: inline-block;
  vertical-align: middle;
  transform: translate3d(0, 0, 0);
}
.cbx span:first-child {
  position: relative;
  width: 18px;
  height: 18px;
  border-radius: 3px;
  transform: scale(1);
  vertical-align: middle;
  border: 1px solid #9098a9;
  transition: all 0.2s ease;
}
.cbx span:first-child svg {
  position: absolute;
  top: 3px;
  left: 2px;
  fill: none;
  stroke: #fff;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 16px;
  stroke-dashoffset: 16px;
  transition: all 0.3s ease;
  transition-delay: 0.1s;
  transform: translate3d(0, 0, 0);
}
.cbx span:first-child:before {
  content: "";
  width: 100%;
  height: 100%;
  background: #506eec;
  display: block;
  transform: scale(0);
  opacity: 1;
  border-radius: 50%;
}
.cbx span:last-child {
  padding-left: 8px;
}
.cbx:hover span:first-child {
  border-color: #506eec;
}
.inp-cbx:checked + .cbx span:first-child {
  background: #506eec;
  border-color: #506eec;
  animation: wave 0.4s ease;
}
.inp-cbx:checked + .cbx span:first-child svg {
  stroke-dashoffset: 0;
}
.inp-cbx:checked + .cbx span:first-child:before {
  transform: scale(3.5);
  opacity: 0;
  transition: all 0.6s ease;
}
@-moz-keyframes wave {
  50% {
    transform: scale(0.9);
  }
}
@-webkit-keyframes wave {
  50% {
    transform: scale(0.9);
  }
}
@-o-keyframes wave {
  50% {
    transform: scale(0.9);
  }
}
@keyframes wave {
  50% {
    transform: scale(0.9);
  }
} */

</style>