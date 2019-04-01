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
import goodsList from '@/components/goods/goodsList'
import goodsInfo from '@/components/goods/goodsInfo'
import goodsComment from '@/components/goods/goodsComment'
import goodsDesc from '@/components/goods/goodsDesc'
import feedback from '@/components/feedback/feedback'
import contact from '@/components/contact/contact'



Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect:'/home' },
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
