<template>
    <div>
        <div id="slider" class="mui-slider" >
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <!-- 图片列表顶端的分类滑条，
                    注意这里开始要在第一个“全部”（id=0）那里获取焦点 ，采用三元表达式，类前面要加：-->
                    <a :class="['mui-control-item',  item.id==0?'mui-active':'']" 
                    v-for="item in Categorys" :key="item.id" @click="getPhotoList(item.id)">
                        {{item.title}}
   
                    </a>
                </div>
            </div>      

         <!-- 图片列表区域 -->
         <div>
            <ul class="photo-list">
                <router-link v-for="item in photoList" :key="item.id" :to="'/home/photoinfo/'+item.id" tag='li' >
                    <img v-lazy="item.img_url">
                 <!-- 图片列表文字-->
                    <div class="info">
                        <h1 class="info-title">{{ item.title }}</h1>
                        <div class="info-body">{{ item.zhaiyao }}</div>
                    </div>                    
                </router-link> 
  
            </ul>
        </div>
        </div>
       
        


    </div>
</template>

<script>

import mui from '../../lib/mui/js/mui.min.js'
import { Toast } from 'mint-ui'



export default {
    name:'photoList',
    data(){
        return{
            Categorys: [],
            photoList: []
        }
    },
    created(){
        this.getAllCategory();
        this.getPhotoList(0);
    },
    mounted(){
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });   
    },
    methods:{
        /* getAllCategory(){
            this.$http.get('api/getimgcategory').then( result => {
                if(result.data.status === 0){
                     result.data.message.unshift({title:"全部", id:0});
                    //  console.log(result.body.message);
                     this.Categorys = result.data.message;
                } else {
                    Toast('图片分类加载失败！');
                }
            })
        }, */
        async getAllCategory(){
            const {data} = await this.$http.get('api/getimgcategory');
            if(data.status === 0){
                data.message.unshift({title:"全部", id:0});
                this.Categorys = data.message;
            } else {
                Toast('图片分类加载失败！');
            }
    },

        /* getPhotoList(cateId){
            this.$http.get('api/getimages/'+ cateId).then( result => {
                if(result.data.status === 0){
                    this.photoList = result.data.message;
                }
            })
        } */
        async getPhotoList(cateId){
            const {data} = await this.$http.get('api/getimages/'+ cateId);
            if(data.status === 0){
                this.photoList = data.message;
            }
        }
    },
}
</script>

<style lang="less" scoped>

*{
    touch-action: pan-y;
}



.photo-list{
    padding: 0px;
    margin: 0; 
    list-style: none;  //加载li标签上也是一样的效果
    // padding-bottom: 0px;
    li{
        background-color:#ccc; //要出现懒加载还没出来是的背景
        text-align: center;
        margin: 10px;
        box-shadow: 0 0 6px #999; //阴影
        position: relative; //相对定位加上文字板块的绝对定位可以实现文字在图片上叠层显示
        //图片样式
        img{
        width:100%;
        vertical-align: middle;//图片放最中间位置
        }
        //图片文字介绍
        .info{
            text-align: left;
            background-color: rgba(0, 0, 0, 0.4); //最后一个参数是透明度
            position: absolute; //绝对定位
            bottom: 0px;
            color: white;
            padding: 2px;
            max-height: 88px;  //统一设置一下文字板块

            .info-title{
                font-size: 15px;
            }

            .info-body{
                font-size: 13px;
            }

        // 懒加载用法,官网上img写成了image要记得改过来
            img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
        }   
    }  
}




</style>


