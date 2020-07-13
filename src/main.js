import Vue from 'vue'
import App from './App.vue'
import router from './router' 
import { store } from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './registerServiceWorker'
import VuePageTransition from 'vue-page-transition'

const fb = require('./firebase')

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VuePageTransition)


Vue.config.productionTip = false

let app = null

fb.auth.onAuthStateChanged(()=>{
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})