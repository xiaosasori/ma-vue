import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VImg } from "vuetensils"

Vue.component("VImg", VImg)
// axios
import axios from 'axios'
Vue.prototype.$http = axios
// import VueAxios from 'vue-axios'
// Vue.use(VueAxios, axios)
// Buefy
// import 'buefy/dist/buefy.css'
// import Buefy from 'buefy'
// import 'bulma/css/bulma.css'
// Vue.use(Buefy)
//vuelidate
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
// rxjs
import VueRx from 'vue-rx'
Vue.use(VueRx)

// Register base component
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  // The relative path of the components folder
  './components/BaseComponents',
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base component filenames
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName)

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  )
})
// directive
import color from './directives/color'
// Vue.directive(color)
Vue.directive('color', function (el, binding) {
  const modifiers = binding.modifiers
  if (modifiers.underline) el.style.textDecoration = 'underline'
  const speeds = {
    normal: 1000,
    fast: 500
  }
  const speedName = binding.arg || 'normal'
  const speed = speeds[speedName]
  const colors = binding.value
  let i = 0
  setInterval(() => {
    el.style.color = colors[i++]
    if (i === colors.length) i = 0
  }, speed)
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
