// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'



// //设置头部选用mint-UI中的Header组件
// import { Header, Swipe, SwipeItem, Button } from 'mint-ui'
// Vue.component(Header.name, Header)

// //懒加载页面，加载不了只能全部注册组件
// import { Lazyload } from 'mint-ui';
// Vue.use(Lazyload)

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)



//设置页面底端选项栏的样式：选用MUI的tabbar
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 主页中的轮播图使用mint-UI中的swipe组件
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// // Vue.component(Toast.name, Toast)
// Vue.component(Button.name, Button)




//导入vue-resource模块
import vueResource from 'vue-resource'
Vue.use(vueResource)
//全局配置：请求的根路径，提交表单的格式
Vue.http.options.root = 'http://www.liulongbin.top:3005'
Vue.http.options.emulateJSON = true

//导入格式化时间的插件
import moment from 'moment'
//定义全局的过滤器，用于时间
Vue.filter('dateFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})


//导入vue-preview
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


import './lib/CSS/global.css'

// import 'viewerjs/dist/viewer.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
