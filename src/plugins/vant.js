// 定义按需引入组件
import { Button, Form, Field, Toast, Cell, CellGroup, Tag, Picker, Popup } from 'vant'

const components = [Button, Form, Field, Toast, Cell, CellGroup, Tag, Picker, Popup]

export const setupComponents = Vue => {
  if (!Vue) return
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}
