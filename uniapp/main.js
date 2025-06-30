import App from './App'
import config from './config'

// 引入 uView UI
import uView from './uni_modules/vk-uview-ui';

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'

// 使用 uView UI
Vue.use(uView);

// 将配置挂载到全局
Vue.prototype.$config = config

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
	
	// 使用 uView UI
	app.use(uView)
	
	// 将配置挂载到全局
	app.config.globalProperties.$config = config
	
  return {
    app
  }
}
// #endif