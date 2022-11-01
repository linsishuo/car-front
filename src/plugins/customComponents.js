import VForm from '@/components/vForm'

const components = [VForm]

export const setupCustomComponents = Vue => {
  components.forEach(component => {
    console.log(component)
    Vue.component(component.name, component)
  })
}
