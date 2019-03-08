import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/tabbar/home'
import member from '@/components/tabbar/member'
import cart from '@/components/tabbar/cart'
import search from '@/components/tabbar/search'
import newslist from '@/components/news/newslist'
import newsInfo from '@/components/news/newsInfo'
import photoList from '@/components/photos/photoList'
import photoInfo from '@/components/photos/photoInfo'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', redirect:'/home'
    },
    {
      path: '/home',
      name: '',
      component: home
    },
    {
      path: '/member',
      name: '',
      component: member
    },
    {
      path: '/cart',
      name: '',
      component: cart
    },
    {
      path: '/search',
      name: '',
      component: search
    },
    {
      path: '/home/newslist', //新闻资讯
      name: '',
      component: newslist
    },
    {
      path: '/home/newsinfo/:id',
      name: '',
      // redirect:'/home/newsinfo/:id/comment',
      component: newsInfo //这里的:id代表给路由传参
      // children: [
      //   {path: 'comment', component: comment}//这里不要用子路由，用子组件更好

      // ]
    },
    {
      path: '/home/photolist', //图片分享
      name: '',
      component: photoList
    },
    {
      path: '/home/photoinfo/:id', //图片分享
      name: '',
      component: photoInfo
    }
  ],
  linkActiveClass: "mui-active"  //覆盖默认的路由高亮的类
})
