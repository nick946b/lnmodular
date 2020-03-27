import Config from '../components'
import ModularDesign from './index.vue'

export default {//引入模块的方式
  install (Vue) {
    Vue.use(Config)
    Vue.component('Avue' + ModularDesign.name, ModularDesign);
  }
}
