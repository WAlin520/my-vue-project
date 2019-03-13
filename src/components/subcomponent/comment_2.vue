<template>
   
    <div>
        <!-- 发表评论 -->
             <h3>评论区</h3>
             

            <textarea placeholder="请输入要BB的内容（最多吐槽120字）" maxlength="120" v-model="newcomment"></textarea>
            <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
         <!-- <div id="picture" class="mui-popover mui-popover-action mui-popover-bottom mui-active commenttabel" v-show="show" > -->
            <hr>			
                <!-- 评论列表 -->   
        <div class="comment-container">  
            <div class="commentList" v-for="(item, i) in commentList" :key="item.add_time">
                <div class="commentList-left">
                    <span class="mui-icon mui-icon-contact mui-icon-icon-contact-filled"></span>
                    <span class="commentList-floor">{{i+1}}楼</span>
                </div>
                <div class="commentList-commentBox" >
                    <p>
                    <span class="commentList-username">{{item.user_name}}</span>
                    <span class="commentList-time">{{ item.add_time | dateFormat }}</span>                        
                    </p>

                    <p class="commentList-contentBox">{{item.content}}</p>
                </div>
            </div>
            <transition mode="out-in">
            <button type="button" class="mui-btn mui-btn-outlined mui-btn-primary" 
            style='width:100%' v-if="more_show" @click="getmoreInfo" :key="'more'">
            加载更多
            </button>
            <button type="button" class="mui-btn mui-btn-outlined mui-btn-primary mui-disabled" 
            disabled="" style='width:100%' v-else="more_show"><span class="mui-spinner" :key="'loading'">
                </span>&nbsp;<span>Loading...</span>
                </button>
            </transition>

        </div>  

    </div>
</template>

<script>

import comment from '../subcomponent/comment'
import { Toast } from 'mint-ui'

export default {
    name:'goodsComment',
    data(){
        return{
            show: false,
            pageIndex: 1,
            commentList: [],
            more_show: true,
            newcomment: '',  //评论列表输入的新评论内容
            id: this.$route.params.id,
        }
    },
    props:['parentId'],
    created(){
        this.getNewsInfo();
    },
    methods:{
        //获取评论列表
        getNewsInfo(){
            this.$http.get('api/getcomments/' + this.id + "?pageindex=" + this.pageIndex )
            .then( result => {
                if( result.body.status === 0 ){
                    // console.log(result.body.methods);
                    this.commentList = this.commentList.concat(result.body.message);
                    // this.more_show = true;
                }else{
                    Toast('加载评论失败！');  
                    // this.more_show = true;
                }
            })
        },
        //加载更多的评论
        getmoreInfo(){
            this.pageIndex++;
            this.more_show = false;
            this.getNewsInfo();
            setInterval( ()=>{ this.more_show = true;}, 1000 );
        },
        //发表评论
        postComment(){
            //校验是否为空
            if( this.newcomment.trim().length === 0 ){
                Toast('评论内容不能为空');
                return;
            }else{
            //post参数1：请求的URL地址 
            //2.提交给服务器的数据对象 { content:this.msg }
            // 3.定义提交的时候表单中数据的格式 { emulateJSON:true }，这个可以全局定义
             // this.$http.post( 'api/postcomment/' + $route.params.id  )//可以直接在路由上找id也可以通过父组件传进来id
            this.$http.post( 'api/postcomment/' + this.id, { content:this.newcomment.trim()  })
            .then(function(result){
                if(result.body.status === 0){
                    Toast('发表评论成功');
                    //拼接出一个评论对象
                    var cmt = { user_name:'匿名用户', add_time: Date.now(), content: this.newcomment };
                    this.commentList.unshift(cmt);
                    this.show = false;
                    this.newcomment = "";
                }else{
                    Toast('发表评论失败');
                }
            })

             }
        }
    },

}

</script>

<style lang="less" scoped> 

// .comment-container{
//     padding-bottom: 40px;
// }

//发表按钮样式
.commentBtn{
    // padding: 5px 20px;
     color:rgba(255, 1, 1, 0.39); 
     font-size:16px; 
     font-weight: 700;
     background-color:rgb(218, 219, 221); 
     position:fixed;
     width: 100%;
    //  margin-bottom: 50px;
    //  padding-bottom: 50px;
     bottom:50px;
     z-index: 3;
}

//观点：
h3{
    margin-top:20px;
    margin-bottom: 15px;
    margin-left:10px;
    font-size: 18px;
    font-weight: 800;
}

//评论列表样式
.commentList{
    display: flex;
    padding: 5px 10px;
    justify-content:flex-start;
    padding-bottom: 15px;
    margin:5px;

    .commentList-left{       
         width:12%;        
        //  margin-top: 2px;
         text-align:center ;
        //小人头图标
        .mui-icon-icon-contact-filled{
        color: darkgray;
        width: 100%;
        font-size:40px;
        // flex:1;
        }
        .commentList-floor{
            font-size:11px;
        }  
    }
}

 .commentList-commentBox{
    padding: 2px 5px;            
    font-family: "宋体";
    font-weight: bold;
    color:black;
    .commentList-username{
        font-size: 15px;
        color:rgb(231, 132, 99);
        margin:2px 0;
    }
    .commentList-contentBox{
        font-size: 14px;
        margin:0;
    }
    .commentList-time{
        font-size: 10px;
        // text-align: right;
        color: rgba(156, 176, 199, 0.979);
        margin-left:10px;
    }
}


      //更改placeholder样式
//  textarea::-webkit-input-placeholder{
//     font-size: 15px;
//     line-height: 40px;
//     vertical-align: middle;  
// }
.v-enter, .v-leave-to{
    opacity: 0;
    position:relative;
}

.v-enter-active, .v-leave-active{
    transition: opacity 0.1s;
}

textarea {
  font-size: 15px;
  margin: 0;
  margin-bottom: 5px;
}


</style>


