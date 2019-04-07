<template>


    <div class="newsinfo-containners">
        <!-- 大标题 -->
        <h3 class="title">{{ newsInfo.title }}</h3>
        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间：{{ newsInfo.add_time | dateFormat }}</span>
            <span>点击{{newsInfo.click}}次</span>
        </p>

        <hr>
        <!-- 内容区域 -->
        <div class="content" v-html="newsInfo.content">
            <!-- 这里是因为得到的数据是HTML格式的 -->
        </div>

        <!-- 评论区域 -->
        <!-- <router-view></router-view> -->
        <!-- 这里涉及到父组件向子组件传参 -->
        <comment :parentId="this.id"></comment>
    </div>
</template>

<script>

import { Toast } from 'mint-ui'
import comment from '../subcomponent/comment'
import router from '../../router'

export default {
    name:'newsInfo',
    data(){
        return {
            id: this.$route.params.id,//捕获ID
            newsInfo: [],
        }
    },
    created(){
        this.getNewsInfo();
    },
    methods:{
        /* getNewsInfo(){
            this.$http.get('api/getnew/'+this.id).then( result => {
                // console.log(result.body);
                if(result.body.status === 0){
                   this.newsInfo = result.body.message[0]; //message是一个数组
                }else{
                    Toast('新闻资讯加载失败。。。');
                }
            } )
        } */
        async getNewsInfo(){
            const {data} = await this.$http.get('api/getnew/'+this.id);
            // console.log(data);
            if(data.status === 0){
                   this.newsInfo = data.message[0]; //message是一个数组
                }else{
                    Toast('新闻资讯加载失败。。。');
                }
        }
    },
    // router,
    //注册子组件
    components:{
        comment
    }
}
</script>

<style lang="less">
.newsinfo-containners{
    // padding: 0 5px;//左右给出一点空间，外边框距
    .title{
       font-size: 16px;
       text-align: center;
       margin: 15px 0; //margin指内边框距
       padding: 0 5px
    }
    .subtitle{
        font-size: 13px;
        //左右对齐
        display: flex;
        justify-content: space-between;
        padding: 0 5px;
    }
    .content{
        padding: 0 5px
    }

}

</style>


