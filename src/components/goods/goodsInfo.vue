<template>
   <div>

           <!-- 添加小球动画 -->
            <transition   
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
                <div class="ball" v-show="ballShow" ref="ball"></div>
            </transition>  


        <div class="goodsInfo-container">
            <!-- 商品轮播图 -->
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <swiper :lunbotuList="photolunbotuList" :isfull="false"></swiper>
                    </div>
                </div>
            </div>

            <!-- 商品购买区域 -->
            <div class="mui-card">
                <div class="mui-card-header">{{ goodsInfo.title }}</div>
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <p class="pri">
                            市场价：<del>￥{{ goodsInfo.market_price }}</del>&nbsp;&nbsp;
                            销售价：<span class="now_price">￥{{ goodsInfo.sell_price }}</span>
                        </p>
                        <p>
                            购买数量：
                            <numbox @changeNum="changeCount" :max="goodsInfo.stock_quantity"></numbox>
                 <!-- 注意： 这里 的 max 是库存量 -->
              <!-- 由于 goodsinfo 是通过 Ajax 动态获取回来的，但是，Ajax 是异步请求，需要消耗时间 -->
              <!-- 因此，可能会导致这样的情况： bobox 组件 先于 Ajax 渲染出来，此时， 组件被渲染的时候，
               goodsinfo 为 空对象，因此，传递到子组件中的 stock_quantity 是 undefined；  -->
                        </p>
                        <p>
                            <mt-button type="primary" size="small">立即购买</mt-button>
                            <mt-button type="danger" size="small" @click="addCart" >加入购物车</mt-button>
                        </p>
                    </div>
                </div>
            </div>

            <!-- 商品参数区域 -->
            <div class="mui-card">
                <div class="mui-card-header">商品参数</div>
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <p>商品货号：{{ goodsInfo.goods_no }}</p>
                        <p>库存情况：{{ goodsInfo.stock_quantity }}</p>
                        <p>上架时间：{{ goodsInfo.add_time | dateFormat }}</p>
                    </div>
                </div>
                <div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
                </div>
            </div>
       </div>  

        <!-- 商品详情和评价区域 -->
       <router-view></router-view>     
       
    </div>
       


</template>

<script>

//导入轮播图组件 加入购物车组件
import swiper from '../subcomponent/swiper'
import numbox from '../subcomponent/goodsinfo_numbox'
import router from '../../router/index.js'

export default {
    name: 'goodsInfo',
    data(){
        return{
            id: this.$route.params.id,
            photolunbotuList: [],
            goodsInfo: [],
            goodsDesc: [],
            ballShow: false, //小球显示与否
            cartNumber: 1, //加入购物车数量组件上的数量
            countMax:"", //库存量
        }
    },
    components:{
        swiper, numbox
    },

    created(){
        this.getGoodsLunbotu();
        this.getGoodsInfo();
    },
    methods:{
        getGoodsLunbotu(){
            this.$http.get('api/getthumimages/'+ this.id).then(
                result => {
                    if (result.body.status === 0) {
                        // console.log(result.body.message);
                        result.body.message.forEach(element => {
                            element.img = element.src;
                        });
                        //先循环轮播图数组的每一项，为item添加img属性，因为轮播图组件中，传入图片的URL是用的item.img
                        this.photolunbotuList = result.body.message;
                    }
            })
        },
        getGoodsInfo(){
            //获取商品的信息
            this.$http.get('api/goods/getinfo/'+this.id).then(
                result=>{
                if (result.body.status === 0) {
                    this.goodsInfo = result.body.message[0];
                    // console.log(this.goodsInfo);
                }
            })  
        },
        goDesc(id){
    // 点击按钮，跳转到 商品的描述页面
      // 注意： 在 this 这个组件身上，有 this.$route 和 this.$router
      // this.$route 是专门用来获取路由中参数的；
      // this.$router 是专门来实现编程式导航的；
            this.$router.push({ name:"goodsdesc", params:{id} });
        },
        goComment(id){
            this.$router.push({ name:"goodscomment", params:{id} });
        },
        addCart(){
            this.ballShow = !this.ballShow;
            // console.log(this.cartNumber);
            var goods = { id: this.id, price: this.goodsInfo.sell_price, count: this.cartNumber, selected: true };
            this.$store.commit("addtoCart", goods);
        },
        changeCount(num){
        // 获取选择的商品的数量
        // console.log("父组件中拿到了传递过来的count值为：" + c);
        // 把 用户选择的最新的数量值，保存到 data 中，方便用户点击加入购物车按钮时候，把数量值同步到 徽标中
            this.cartNumber = num;
        },

        //小球钩子函数动画
        beforeEnter(el){
            // var ballPosition = this.$refs.ball.getBoundingClientRect();
            // el.style.transform = `translate(${ballPosition.left}px, ${ballPosition.top}px )`;
            el.style.transform = "translate( 0, 0)";
            el.style.opacity = 1; //这里要设置不透明度，不然会有bug

        },
        enter(el,done){
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            // 动态获取徽标的横纵坐标【注意：这里获取徽标的位置，和双向数据绑定没有任何关系，所以，可以直接使用普通的DOM操作】
            // DOM操作的优势：不论要操作的元素属于哪个组件，只要这个元素属于document，那么就能够直接获取到
            const badgePositon = document.getElementById("badge").getBoundingClientRect(); //获取购物车上的小标的位置
            const xDist = badgePositon.left - ballPosition.left;
            const yDist = badgePositon.top - ballPosition.top;
            el.offsetWidth;
            el.style.transform = `translate( ${xDist}px, ${yDist}px )`;
             // 贝塞尔曲线在线生成器： http://cubic-bezier.com/#.46,-0.4,1,.49
            el.style.transition = "all 0.5s cubic-bezier(.46,-0.4,1,.49)";
            done();
        },
        afterEnter(el){
            this.ballShow = !this.ballShow;
        }
    }
}
</script>

<style lang="less" scoped>

.goodsInfo-container{
    z-index: 97;
    background-color: #eee;
    overflow: hidden;   //取消padding

    .now_price{
        font-size: 16px;
        color: red;
        font-weight: bold;
    }
}

.mui-card-footer, .mui-card-header{
    // display: block;
    button{
        margin: 10px 2px;
    }
}

// 小球动画样
.ball{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;  //脱离文档流
    z-index: 99;
    left: 148px;
    top: 340px;
}



// 分析小球动画有Bug的原因：
// 原因：就是因为 小球 入场动画的终点坐标，已经固定写死了！
// 解决问题的突破点：把小球 translate 时候的  横纵坐标，动态写活即可；
// 如何实现： 如何把 横纵坐标 动态获取呢？
//  + 先动态获取小球的横纵坐标
//  + 再动态获取徽标的横纵坐标
//  + 让 徽标的横纵坐标 - 小球的横纵坐标 等到的结果，就是小球要动态位移的距离；

</style>


