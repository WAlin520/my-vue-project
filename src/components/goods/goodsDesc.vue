<template>
  <div class="goodsdesc-container">
    <h3 class="title">{{ info.title }}</h3>
    <hr>
    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>

import { Toast } from 'mint-ui'

export default {
  data() {
    return {
        id: this.$route.params.id,
      info: {} // 商品的描述信息
    };
  },
//   props: ["id"],
  created() {
    this.getGoodsDesc();
  },

  methods: {
    /* getGoodsDesc(){
        this.$http.get("api/goods/getdesc/" + this.id).then(result =>{
            if (result.body.status === 0) {
                // console.log(result.body.message);
                this.info = result.body.message[0];
                // console.log(this.info);
            }else{
                Toast("图文详情加载失败！")
            }
        })
    } */
    async getGoodsDesc(){
        const {data} = await this.$http.get("api/goods/getdesc/" + this.id);
        if (data.status === 0) {
            this.info = data.message[0];
        }else{
            Toast("图文详情加载失败！")
        }
    }
  },

};
</script>

<style lang="less">
.goodsdesc-container {
    // text-align: center;
    margin:0 3px; 
  .title {
    font-size: 16px;
    margin: 10px 0;
    color: blue;
    // text-align: center;
  .content {
    img{
      width: 100%;//这里没用
    //   height: 100%;
    font-size: 12px;
    }
    // p{
    //     color:black !important;
    // }
  }
}
}
.gomeImgLoad{
    width:100%;
    height: 100%;
}

.ke-zeroborder{
    td{
        font-size: 13px;
        color: rgb(130, 130, 130);
        img{
            width:165px;
            height:110px;
        }
    }
}

</style>