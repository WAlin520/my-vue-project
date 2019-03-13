<template>

    <!-- 商品列表 -->
    <div class="goods-list">
        
        <!-- 商品列表每一项 -->
        <!--网页中，有两种跳转方式：
        1.使用a标签的形式叫做标签跳转 
        2.使用window.location.herf的形式，叫做编程式跳转 -->
        <!-- <router-link class="goods-item" v-for="item in goodsList" :key="item.id" 
        :to="'/home/goodsinfo/'+item.id" tag="div">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sale">
                    <span>热卖中</span>
                    <span>{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link> -->

        <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sale">
                    <span>热卖中</span>
                    <span>{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>

        <!-- 加载更多 -->
        <transition>
        <button type="button" class="mui-btn mui-btn-outlined mui-btn-primary" 
            style='width:100%' v-if="more_show" @click="getmoreList" :key="'more'">
            加载更多
        </button>
        <button type="button" class="mui-btn mui-btn-outlined mui-btn-primary mui-disabled" 
        disabled="" style='width:100%' v-else="more_show"><span class="mui-spinner" :key="'loading'">
            </span>&nbsp;<span>Loading...</span>
            </button>
        </transition>

    </div>
</template>

<script>

import { Toast } from 'mint-ui'

export default {
    name:"goodList",
    data(){
        return{
            pageIndex: 1,
            goodsList: [],
            more_show: true,
        }
    },
    created(){
        this.getGoodsList();
    },
    methods:{
        getGoodsList(){
            this.$http.get('api/getgoods?pageindex='+this.pageIndex).then(
                result => {
                    if(result.body.status === 0){
                        console.log(result.body.message);   
                        this.goodsList = this.goodsList.concat(result.body.message);
                        this.more_show = true;

                    }else{
                        Toast("加载商品列表失败！");
                        this.more_show = true;
                    }
                })
        },
        getmoreList(){
            this.pageIndex++;
            this.more_show = false;
            this.getGoodsList();
            // setInterval( ()=>{ this.more_show = true;}, 1000 );
        },
        goDetail(id){
            // console.log(this);
            this.$router.push('/home/goodsinfo/'+id);
        }
    }
}
</script>


<style lang="less" scoped>

.goods-list{
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    //实现列表每个边框都留有空白，每个横项之间留有空隙
    justify-content:space-between;//space-arround行不通

    .goods-item{
        width: 49%;
        border: 1px solid #ccc;
        box-shadow:0 0 8px #ccc;
        border-radius: 6px;
        //实现每个项纵向上的留空
        margin:4px 0;
        padding: 2px;
        //切换主轴变为纵向，然后贴端对齐
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        /*法一：给盒子加relative定位，给info灰色小格子加absolute定位，
         要记住商品盒子加padding，因为整个灰色盒子不算在流式布局里面不会占坑*/
        // position: relative;
        // padding-bottom: 6px;

        //设置一个最小支撑起来的框保证网速差时图片加载不出来时该有的格局
        min-height: 293px;

        img{
            width:100%;
        }
        .title{
            font-size: 15px;
        }
        .info{
            background-color: #eee;
            // 给info灰色小格子加absolute定位
            // position: absolute;
            // width: 100%;
            // bottom: 0;

            p{
                margin: 0;
                padding: 4px;
            }
            .price{
                .now{
                    color:red;
                    font-size: 16px;
                    font-weight:bold;
                }
                .old{
                    text-decoration: line-through;//字体中间划线
                    font-size: 12px;
                    margin-left: 10px;
                }
            }
            .sale{
                display: flex;
                justify-content: space-between;
                font-size: 13px
            }
        }
    }
}

//按钮
.v-enter, .v-leave-to{
    opacity: 0;
    position:relative;
}

.v-enter-active, .v-leave-active{
    transition: opacity 0.3s;
}


// 经典两列布局实现的时候，每个商品盒子左右两侧文字标题不一样行时，由于流式定位会导致其中一行出现最底下的空白，解决方案有：
// 一：给盒子加relative定位，给info灰色小格子加absolute定位
// 二：切换主轴变为纵向，然后贴端对齐

</style>
