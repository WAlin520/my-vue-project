<template>
    <div>
        <div class="photoIfo-container">
            <h1 class="title">{{ photoInfo.title }}</h1>
            <p class="subtitle">
                <span class="addtime">发表时间：{{ photoInfo.add_time | dateFormat }}</span>
                <span class="clickindex">点击{{ photoInfo.click }}次</span>
            </p>
          
            <hr>

         <div class="thumbs">
                <!-- 缩略图区域 -->
            <vue-preview :slides="ThumbPhotoList" class="image-preview">
                <!-- <img height="100"> -->
            </vue-preview>
         </div>
            <!-- <img class="preview-img" v-for="(item, index) in ThumbPhotoList" :src="item.src" height="100" @click="$preview.open(index, list)"> -->

            <!-- 图片内容区域 -->
            <div class="content" v-html="photoInfo.content"></div>
        </div>


        <!-- 评论子组件 -->
        <comment></comment>


    </div>
</template>

<script>

import comment from '../subcomponent/comment'

export default {
    name:'photoInfo',
    data(){
        return{
            id: this.$route.params.id,
            photoInfo:{},
            ThumbPhotoList:[]
        }
    },
    created(){
        this.getPhotoInfo();
        this.getPhotoThumb();
    },
    methods:{
        getPhotoInfo(){
            this.$http.get( 'api/getimageInfo/'+this.id ).then(result => {
                if(result.body.status === 0){
                    // console.log(result.body.message);
                    this.photoInfo = result.body.message[0];
                }
            })
        },
        //获取缩略图
        getPhotoThumb(){
            this.$http.get('api/getthumimages/'+this.id).then(
                result => {
                    if( result.body.status ===0 ){
                         result.body.message.forEach(element => {
                        element.w = 600;
                        element.h = 600;
                        element.msrc = element.src;
                    });
                    this.ThumbPhotoList = result.body.message;
                    // console.log(this.ThumbPhotoList); 
                    }
                  
                })
        },
        //vue-preview官网
        handleClose () {
        // console.log('close event')
      }
    },
    components:{
        comment
    }
}
</script>

<style lang="less" scoped>

.photoIfo-container{
    margin: 0 5px;
    .title{
        font-size: 16px;
        color:cadetblue;
        text-align: center;
        font-weight: 700;
        margin-top: 10px;
        line-height: 30px;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        margin-bottom: 5px;
        .addtime{

        }
        .clickindex{}
    }
    hr{
        margin-top: 5px;
        margin-bottom: 15px;
    }
    .content{
        font-size: 14px;
        line-height: 30px;
    }
}

//预览图加加样式
// .image-preview{
//     img{
//         height: 100px;
//     }
// }

// .my-gallery{
//     img{
//     height: 100px;
// }
// }

</style>


