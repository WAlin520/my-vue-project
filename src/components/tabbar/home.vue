<template>
  <div class="home">

    <!-- 这是轮播图的 -->
    <swiper :lunbotuList="lunbotuList" :full="true"></swiper>
    <!-- 底下不用了改成子组件 -->
       <!-- <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id" >
        <img :src="item.img" alt="">
      </mt-swipe-item>
    </mt-swipe> -->

    <!--九宫格到六宫格的改造  -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/newslist">
                <img src="@/assets/image/menu1.png" alt="">
                <div class="mui-media-body">新闻资讯</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/photolist">
                <img src="@/assets/image/menu2.png" alt="">
                <div class="mui-media-body">图片分享</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/goodslist">
                <img src="@/assets/image/menu3.png" alt="">
                <div class="mui-media-body">商品购买</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/feedback">
                <img src="@/assets/image/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="@/assets/image/menu5.png" alt="">
                <div class="mui-media-body">视频专区</div></a></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/home/contact">
                <img src="@/assets/image/menu6.png" alt="">
                <div class="mui-media-body">联系我们</div>
            </router-link>
        </li>
    </ul> 
  

  </div>
</template>

<script>

import { Toast } from 'mint-ui'
// Vue.component( Toast.name, Toast )这里面不需要注册，根据官网
//导入轮播图子组件
import swiper from '../subcomponent/swiper'

export default {
  name: 'home',
  data () {
    return {
      lunbotuList: []
    }
  },
  methods:{
    getLunbotu(){  //获取轮播图数据的方法
      // console.log("lunbotu");
      // this.$http.get('http://www.liulongbin.top:3005/api/getlunbo').then( result => {  
      this.$http.get('api/getlunbo').then( result => {
        // console.log(result.body);
        if( result.body.status === 0 ) {
          this.lunbotuList = result.body.message;
          // console.log(this.lunbotuList);
        }else{
          Toast("轮播图加载失败");
          }
      })
    }
  },
  created(){
    this.getLunbotu();
  },
  //子组件注册
  components:{
    swiper
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

//轮播图整个container的样式
// .mint-swipe{
//   height: 150px;
// }

/* 样式一 */
 /* .mint-swipe-item:nth-child(1) {
    background-color: red;
  }

   .mint-swipe-item:nth-child(2) {
    background-color: blanchedalmond;
  }

   .mint-swipe-item:nth-child(3) {
    background-color: yellow;
  } */

/* 样式二 */
//  .mint-swipe-item {
//    &:nth-child(1){
//      background-color: red;
//    } 
//   }

 //轮播图图片样式
//  img{ 
//    width:100%;
//    weight:100%
  
//  }

//九宫格整个大格的样式
 .mui-grid-view.mui-grid-9{
   background-color: white;
   border: none;

//九宫格每个小格子的样式
 .mui-table-view-cell{
   border: 0;
 }

 img{
   width:75px;
   height: 75px
 }

 //九宫格每个小格子的文字
 .mui-media-body{
   font-size: 14px
 }
 }






</style>
