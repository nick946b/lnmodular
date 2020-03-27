
import Card from './card.vue'
import GoodsAction from './goodsaction.vue'

const components = [//组件包js
  Card,
  GoodsAction
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
