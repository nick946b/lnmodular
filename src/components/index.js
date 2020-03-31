
import Card from './card.vue'
import GoodsAction from './goodsaction.vue'
import Options from './options.vue'

const components = [//组件包js
  Card,
  GoodsAction,
  Options

]

const Config = {
  install (Vue) {
    if (this.installed) return
    this.installed = true

    components.map(component => {
      Vue.component(component.name, component);
    })
  }
}

export default Config
