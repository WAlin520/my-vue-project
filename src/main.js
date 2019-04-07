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
/* import vueResource from 'vue-resource'
Vue.use(vueResource)
//全局配置：请求的根路径，提交表单的格式
Vue.http.options.root = 'http://www.liulongbin.top:3005'
Vue.http.options.emulateJSON = true */


//引入axios模块
import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: 'http://www.liulongbin.top:3005'
})




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
// localStorage.setItem('cart', JSON.stringify(cartList));



//导入vuex模块
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    cart: cartList,
  },
  mutations: {
    addtoCart(state, goods){  //这里的参数第一个默认是state
      //要分成id之前就已经存在的和之前不存在的
      var flag = false;
      state.cart.some( (item,i) => {
        if(item.id === goods.id){
          item.count = parseInt(item.count) + parseInt(goods.count);
          item.selected = true;
          // var newitem = state.cart.splice(i,1);
          // state.cart.unshift(newitem);
          flag = true;
          return true;
        }
      })
      if( !flag ) {
        state.cart.push(goods);
      }
      console.log(state.cart);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    updateGoodsInfo(state, goodsInfo){   //在购物车修改购买商品数量
      state.cart.some(item => {
        if(item.id == goodsInfo.id){
          item.count = parseInt(goodsInfo.count);
          return true; //这句不能忘啊，找到就跳出来
        }
      })
      //修改完商品数量要将最新的购物车数据保存到本地中
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    delFormCart(state, id) {
      state.cart.some( (item, i) => {
        if (item.id == id) {
          state.cart.splice(i, 1);
          return true;
        }
      })  
      //删除完商品数量要将最新的购物车数据保存到本地中
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    updateGoodsSelected(state, goodsInfo){   //在购物车修改购买商品是否选择
      state.cart.some(item => {
        if(item.id == goodsInfo.id){
          item.selected = goodsInfo.selected;
          return true; //这句不能忘啊，找到就跳出来
        }
      })
      //修改完商品数量要将最新的购物车数据保存到本地中
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
  getters: {
    getAllCount(state) {
      var totalNum = 0;
      state.cart.forEach( item => {
      totalNum += item.count;
      })
      return totalNum;
    //   setInterval(
    //     () => {return totalNum},1000
    //  )
    },

    getGoodsCount(state) {
        var o = {} ;
        state.cart.forEach(item => {
          o[item.id] = item.count;
        })
        return o;
    },
    getGoodsSelected(state) {
      var o = {} ;
      state.cart.forEach(item => {
        o[item.id] = item.selected;
      })
      return o;
    },
    //计算所选商品的总价
    getAllCountAmount(state){
      var o = { count:0, amount:0 };
      state.cart.forEach( item => {
        if(item.selected){
        o.count = o.count + parseInt(item.count);
        o.amount = o.amount + parseInt(item.price) * parseInt(item.count);
        }
      })
      return o;
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
