import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'

// axios
import axios from 'axios'
Vue.prototype.$http = axios
// import VueAxios from 'vue-axios'
// Vue.use(VueAxios, axios)
// Buefy
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
Vue.use(Buefy)
//vuelidate
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
// rxjs
import VueRx from 'vue-rx'
Vue.use(VueRx)
// directive
import color from './directives/color'
// Vue.directive(color)

Vue.directive('color', function(el,binding){
  const modifiers = binding.modifiers
  if(modifiers.underline) el.style.textDecoration = 'underline'
  const speeds = {
    normal: 1000,
    fast: 500
  }
  const speedName = binding.arg || 'normal'
  const speed = speeds[speedName]
  const colors = binding.value
  let i = 0
  setInterval(()=> {
    el.style.color = colors[i++]
    if(i===colors.length) i = 0
  },speed)
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
