// 兼容IE
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// plugins
import { setupComponents } from './plugins/vant'
import { setupCustomComponents } from './plugins/customComponents'



// 导航守卫
// import '@/router/permission'

Vue.config.productionTip = false

// 初始化函数
const bootstrap = function () {
  // 配置项
  setupComponents(Vue)
  setupCustomComponents(Vue)

  // process.env.NODE_ENV === 'development' && new VConsole()

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

bootstrap()
