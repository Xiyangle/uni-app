import Vue from 'vue'
import App from './App'
import request from './utils/request.js'

Vue.config.productionTip = false
// 全局挂载封装的请求
Vue.prototype.$https = request
// 自定义全局共享数据 通过vue的原型来实现
Vue.prototype.baseurl = 'h5api'

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
