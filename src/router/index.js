import Vue from 'vue'
import Router from 'vue-router'
// import home from '@/components/tabbar/home'
// import member from '@/components/tabbar/member'
// import cart from '@/components/tabbar/cart'
// import search from '@/components/tabbar/search'
// import newslist from '@/components/news/newslist'
// import newsInfo from '@/components/news/newsInfo'
// import photoList from '@/components/photos/photoList'
// import photoInfo from '@/components/photos/photoInfo'
// import goodsList from '@/components/goods/goodsList'
// import goodsInfo from '@/components/goods/goodsInfo'
// import goodsComment from '@/components/goods/goodsComment'
// import goodsDesc from '@/components/goods/goodsDesc'
// import feedback from '@/components/feedback/feedback'
// import contact from '@/components/contact/contact'
// import LoadingComponent from '@/components/loadComponent/loadComponent'


//懒加载组件
/* function creatComponentToLoading(compon, url){
  //这种用不了
  return Vue.component(compon, () => ({
    需要加载的组件 (应该是一个 `Promise` 对象)
    component: import(url),
    // 异步组件加载时使用的组件
    loading: LoadingComponent,
    // 加载失败时使用的组件
    // error: ErrorComponent,
    // 展示加载时组件的延时时间。默认值是 200 (毫秒)
    delay: 200,
    // 如果提供了超时时间且组件加载也超时了，
    // 则使用加载失败时使用的组件。默认值是：`Infinity`
    timeout: 3000
  }))
//下面可以用，但是添加不了等待加载时的组件
  return Vue.component(compon, function(resolve){
    require(['@/components/news/newslist'], resolve)
  })
}
const newslist = creatComponentToLoading('newslist','@/components/news/newslist'); */
//另一种方式
// const home = () => import('@/components/tabbar/home');
const LoadingComponent = () => ({
  component: import('@/components/loadComponent/loadComponent'),
  loading: LoadingComponent,
})
//主页
const home = () => ({
  component: import('@/components/tabbar/home'),
  loading: LoadingComponent,
})
//购物车
const cart = () => ({
  component: import('@/components/tabbar/cart'),
  loading: LoadingComponent,
  delay: 2,
  timeout: 3000
})
//会员
const member = () => ({
  component: import('@/components/tabbar/member'),
  loading: LoadingComponent,
  delay: 2,
  timeout: 3000
})
//查找
const search = () => ({
  component: import('@/components/tabbar/search'),
  loading: LoadingComponent,
  delay: 2,
  timeout: 3000
})

// 新闻资讯
const newslist = () => ({
    component: import('@/components/news/newslist'),
    loading: LoadingComponent,
    delay: 2,
    timeout: 3000
})
const newsInfo = () => ({
  component: import('@/components/news/newsInfo'),
  loading: LoadingComponent,
  delay: 2,
  timeout: 3000
})

//照片分享组件
const photoList = () => ({
  component: import('@/components/photos/photoList'),
  loading: LoadingComponent,
  delay: 2,
  timeout: 3000
})
const photoInfo = () => ({
  component: import('@/components/photos/photoInfo'),
  loading: LoadingComponent,
  delay: 2,
  timeout: 3000
})

//商品购物
const goodsList = () => ({
  component: import('@/components/goods/goodsList'),
  loading: LoadingComponent,
  delay: 2,
  timeout: 3000
})
const goodsInfo = () => ({
  component: import('@/components/goods/goodsInfo'),
  loading: LoadingComponent,
  delay: 2,
  timeout: 3000
})
const goodsDesc = () => ({
  component: import('@/components/goods/goodsDesc'),
  loading: LoadingComponent,
  delay: 2,
  timeout: 3000
})
const goodsComment = () => ({
  component: import('@/components/goods/goodsComment'),
  loading: LoadingComponent,
  delay: 2,
  timeout: 3000
})

//联系与反馈
const feedback = () => ({
  component: import('@/components/feedback/feedback'),
  loading: LoadingComponent,
  delay: 2,
  timeout: 3000
})
const contact = () => ({
  component: import('@/components/contact/contact'),
  loading: LoadingComponent,
  delay: 2,
  timeout: 3000
})

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect:'/home' },
    { path:'/loading',  name:'', component: LoadingComponent},
    { path: '/home',  name: '', component: home },
    { path: '/member', name: '', component: member },
    { path: '/cart', name: '', component: cart},
    { path: '/search', name: '', component: search},
    { path: '/home/newslist', name: '', component: newslist}, //新闻资讯
    { path: '/home/newsinfo/:id', name: '', component: newsInfo },
      // redirect:'/home/newsinfo/:id/comment',
      //这里的:id代表给路由传参
      // children: [
      //   {path: 'comment', component: comment}//这里不要用子路由，用子组件更好
      // ]
    { path: '/home/photolist', name: '', component: photoList}, //图片分享
    { path: '/home/photoinfo/:id', name: '', component: photoInfo },
    { path: '/home/goodslist', name: '', component: goodsList},
    { path: '/home/goodsinfo/:id', name: '', component: goodsInfo,
        children:[
          {path: 'goodsdesc', name:"goodsdesc", component: goodsDesc},
          { path: 'goodscomment', name:"goodscomment", component: goodsComment },
        ]
    }, 
    // { path: '/home/goodsdesc/:id', name:"goodsdesc", component: goodsDesc },
    // { path: '/home/goodscomment/:id', name:"goodscomment", component: goodsComment },
    { path: '/home/feedback', component: feedback},
    { path: '/home/contact', component: contact},
  ],
  linkActiveClass: "mui-active"  //覆盖默认的路由高亮的类
})
