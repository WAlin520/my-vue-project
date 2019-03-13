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


//这里要从本地读取cart
var cartList = JSON.parse(localStorage.getItem('cart') || "[]");
// var cartList = JSON.parse("[]");


//导入vuex模块
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    cart: cartList,
  },
  mutations:{

    addtoCart(state, goods){  //这里的参数第一个默认是state
      //要分成id之前就已经存在的和之前不存在的
      var flag = false;
      state.cart.some( item => {
        if(item.id === goods.id){
          item.count += parseInt(goods.count);
          flag = true;
          return true;
        }
      })
      if( !flag ){
        state.cart.push(goods);
      }
      console.log(state.cart);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    }
  },
  getters:{
    getAllCount(state){
      var totalNum = 0;
      state.cart.forEach( item =>{
      totalNum += item.count;
      })
      return totalNum;
    //   setInterval(
    //     () => {return totalNum},1000
    //  )
    }
  }
})


import './lib/CSS/global.css'

// import 'viewerjs/dist/viewer.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,  //vuex仓储要挂载一下
  components: {
    App
  },
  template: '<App/>'
})
