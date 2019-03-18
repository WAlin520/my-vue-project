<template>

    <!-- 这里组件需要初始化，否则要刷新之后才能点击增加 -->
    <div class="mui-numbox" data-numbox-min='1' data-numbox-max='max'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" ref="numbox" @change="changeNumber" />
        <!-- 输入框有个change函数，可以监测文本的变化 -->
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
//要导入mui的文件
import mui from "../../lib/mui/js/mui.min.js"

export default {
    name: "numbox",
    mounted(){
        mui(".mui-numbox").numbox();//这里是mui组件的初始化，当组件挂载到页面中之后，去初始化 数字框
        mui(".mui-numbox").numbox().setOption('step',1);
    },
    methods:{
        changeNumber(){
            this.$emit("changeNum", parseInt(this.$refs.numbox.value));
            // console.log(this.$refs.numbox.value);
        }
    },
    props:[ 'max'],   //父组件传过来的库存值
    watch:{
        "max": function(new_value, old_value){
            mui(".mui-numbox").numbox().setOption('max', new_value);
        }
    }
}
</script>

<style lang="less" scoped>

.mui-numbox{
    z-index: 88;
}

</style>


