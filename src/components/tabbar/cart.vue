<template>
  <div class="shopcar-container">
  
    <div class="goods-list">

      <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner goods-item">
            <!-- 开关 -->
						<mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="changeSelected(item.id, $store.getters.getGoodsSelected[item.id])" ></mt-switch>
            <!-- 图片 -->
            <img :src="item.thumb_path" alt="">
            <!-- 信息区域 -->
            <div class="info">
              <h1>{{ item.title }}</h1>
              <div class="goods-info">
                <span class="price">￥{{ item.sell_price }}</span>
                <!-- countObj[item.id] 表示这条商品对应的数量 -->
      <!-- 如何从购物车中获取商品的数量 :
      可以先创建一个空对象，然后循环购物车中所有商品的数据，把当前循环这条商品的id，作为对象的属性名，count值作为
      对象的属性值，这样，当所有的商品循环一遍，就会得到一个对象：{88:2， 89:1， ...}
      -->
                <!-- <a>{{ $store.getters.getGoodsCount[item.id] }}</a> -->
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsId="item.id"></numbox>
                <a href="#" @click.prevent="del(item.id, i)">删除</a>
              </div>
            </div>
					</div>
				</div>
			</div>

      <!-- 结算区域 -->
      <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
              <p>总计（不含运费）</p>
              <p>
                已勾选商品<span class="danger">{{ $store.getters.getAllCountAmount.count }}</span>件，总价
                <span class="danger">￥{{ $store.getters.getAllCountAmount.amount }}</span>
              </p>
            </div>
            <mt-button type="danger">去结算</mt-button>
					</div>
				</div>
			</div>

      <!-- <p>{{ $store.getters.getGoodsSelected }}</p> -->

    </div> 
  </div>
</template>

<script>
// import { mapGetters, mapMutations } from "vuex";
import numbox from "../../components/subcomponent/shopcart_numbox"

export default {
     name: "cart",
    data() {
        return {
        goodslist: [] // 商品列表
        };
    },
    created() {
        this.getGoodsList();
    },
    methods: {
      async getGoodsList(){
        //获取store中所有商品的id，然后拼接处一个用逗号分隔的字符串
        var idArr = [];
        this.$store.state.cart.forEach(item => {
          idArr.push(item.id);
        });
        //如果购物车没有商品不能请求，否则会报错
        if( idArr.length <= 0 ){
            return;
          }
        const {data} = await this.$http.get('api/goods/getshopcarlist/'+ idArr.join(","));
          if(data.status === 0){
            this.goodslist = data.message;
            // console.log(this.goodslist);
          }      
      },
      del(id, index){
        //点击删除吧商品从store中根据数据传递的id删除，同时，把当前组件中的goodlist中对应删除的那个商品，使用index删除
        this.goodslist.splice(index, 1); //删除goodslist中要删除的商品
        this.$store.commit("delFormCart", id);
      },
      changeSelected(goodsId, selected){
        // console.log(goodsId + "---" + selected);
        this.$store.commit("updateGoodsSelected", { id: goodsId, selected: selected })
      }
    },
      
    components: {
        numbox
    }
}
</script>
 

<style lang="less" scoped>

.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-item {
    display: flex;
    img {
      width: 60px;
      height: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .goods-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .price {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
      }
    }
  }
}
.danger {
  color: red;
  font-weight: bold;
  font-size: 16px;
}
.jiesuan {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>