import Vue from 'vue'
import App from './App'
import request from './utils/request.js'

Vue.config.productionTip = false
// 全局挂载封装的请求
Vue.prototype.$https = request

// 自定义全局共享数据 通过vue的原型来实现
// #ifdef H5
// Vue.prototype.baseurl = 'h5api'
Vue.prototype.baseurl = 'http://157.122.54.189:9088'
// #endif

// #ifdef MP-WEIXIN
Vue.prototype.baseurl = 'http://157.122.54.189:9088'
// #endif


App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
