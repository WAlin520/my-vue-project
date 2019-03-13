<template>
       <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id" >
        <img :src="item.img" alt="" class="{'full': isfull}">
      </mt-swipe-item>
    </mt-swipe>
</template>

<script>
export default {
    name: 'swiper',
    data(){
        return{}
    },
    props:[
        'lunbotuList', 'isfull',  //谁使用轮播图谁就传lunbotuList，涉及父组件向子组件传值
    ],
}
</script>

<style lang="less" scoped>
.mint-swipe{
    height: 150px; 
    text-align: center;

//轮播图图片样式
    img{ 
        //  width:100%;
        height:100%;
    }
    .full{
         width: 100%;
  }
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

}


</style>




