import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'
import AvueModularDesign from './components';
import $ from 'jquery'



Vue.use(Vant);
Vue.use(Avue);
Vue.use(AvueModularDesign);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
