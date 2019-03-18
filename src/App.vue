<template>

  <div id="app" class="app-container">
		
		<!-- 头部导航栏-->
    <mt-header fixed title="my-personal-vue-project">
      <span slot="left" @click="goBack()">
        <mt-button icon="back" v-show="flag">返回</mt-button>
      </span>
    </mt-header>
		<!-- <img src="./assets/img/menu1.png"> -->


  <!-- 中间主体部分，用router实现 -->
	 <!-- 这里out-in模式不行  -->	
	 	<!-- <transition mode="out-in"> -->
		<transition>
			<router-view/>
		</transition>
  


	<!-- 下面的选项卡 -->
		<nav class="mui-bar mui-bar-tab">
				<router-link class="mui-tab-item-al" to="/home">
					<span class="mui-icon mui-icon-home"></span>
					<span class="mui-tab-label">首页</span>
				</router-link>
        <router-link class="mui-tab-item-al" to="/member">
            <span class="mui-icon mui-icon-contact"></span>
            <span class="mui-tab-label">会员</span>
        </router-link>
        <router-link class="mui-tab-item-al" to="/cart">
						<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
              <span class="mui-badge" id="badge"> {{ this.$store.getters.getAllCount }}</span></span>
            <span class="mui-tab-label">购物车</span>
        </router-link>
        <router-link class="mui-tab-item-al" to="/search">
            <span class="mui-icon mui-icon-search"></span>
            <span class="mui-tab-label">搜索</span>
        </router-link>
    </nav>
		<!-- <tabbar/> -->

  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      flag: false,
    }
  },
  created(){
    this.flag = this.$route.path === "/home"? false:true;
  },
  methods:{
    goBack(){
      this.$router.go(-1);
    }
  },
  watch:{
    //监听URL地址，如果是home就隐藏返回键
    "$route.path": function(newVal){
      if(newVal === "/home"){
        this.flag = false;
      } else {
        this.flag = true;
      }
    }
  }
}
</script>

<style>
/* 顶部的层级设置，使得不会 */
.mint-header.is-fixed{
	z-index: 99;
}

.app-container{
	padding-top: 40px;
	overflow-x: hidden;
	/* overflow 属性规定当内容溢出元素框时发生的事情。hidden：内容会被修剪，并且其余内容是不可见的。
	这里可以设置样式横向样式不动，不能加y，因为众向需要滑动 */
	padding-bottom: 50px;
}

/* 路由的过渡样式 */
.v-enter {
	opacity: 0;
	transform: translateX(100%);  /*每个设备宽度不一样所以直接100%*/
	/* position: absolute; */
}

 .v-leave-to {
	opacity: 0;
	transform: translateX(-100%); 
	position: absolute;
	/* 这里解决位移问题，经测试用mode:out-in只能在页面完全放好位置之后显示出来轮播图 */

}

.v-enter-active,.v-leave-active{
	transition: all 0.3s ease;
}


.mui-bar{
  z-index: 98;
}


/* 改类名，解决MUI的bug */

.mui-bar-tab .mui-tab-item-al.mui-active {
    color: #007aff;
}

.mui-bar-tab .mui-tab-item-al {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}

.mui-bar-tab .mui-tab-item-al .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-al .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}

</style>
