<template>
    <comment :parentId="$route.params.id" ></comment>
    
</template>

<script>

//这里的评论框的样式两种类型可选
// import comment from '../subcomponent/comment'
import comment from '../subcomponent/comment_2'

export default {
    name: 'goodsComment',
    components:{
        comment
    }
}
</script>

<style lang="less" scoped>

</style>


