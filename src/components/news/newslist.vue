<template>
    <div>

        <!-- 新闻资讯的内容 -->
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
                <router-link :to=" '/home/newsInfo/' + item.id " class="">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{ item.title }}</h1>
                        <p class="mui-ellipsis">
                            <span>发表时间：{{ item.add_time | dateFormat }}</span>
                            <span>点击：{{ item.click }}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
        

    </div>
</template>

<script>

import { Toast } from 'mint-ui'

export default {
    name: 'newslist',
    data(){
        return {
            newsList: []
        }
    },
    created(){
        this.getNewsList();
    },
    methods:{
        getNewsList(){
            this.$http.get('http://www.liulongbin.top:3005/api/getnewslist').then(
                function(result){
                    // console.log(result.body);
                    if( result.body.status === 0 ){
                        this.newsList = result.body.message;
                    } else{
                        Toast('新闻资讯加载失败');
                    }
                }
            )
        }
    }
}
</script>

<style lang="less" scoped>

.mui-table-view{
    li{
        h1 {
            font-size:14px;
        }
        .mui-ellipsis{
            font-size: 12px;
            //主轴两端对齐
            display: flex;
            justify-content: space-between;
        }
    }
}




</style>



