<template>
  <div class="search">
    <div class="search">
        <input placeholder="请输入搜索词">
          <button type="button" class="mui-btn mui-btn-danger">
            搜索
          </button>
    </div>
  </div>
</template>

<script>


export default {
  name: 'search',
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style <style lang="less" scope>

.search{
    position: relative; 
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .mui-btn{
      height: 30px;
    }
}
.search::before{
    content: "☌";
    transform: rotate(180deg);
    float: left;
    font-size: 25px;
    position: absolute;
    line-height: 30px;
    left: 10px;
}
.search input{
    margin:5px 5px;
    display: block;
    padding-left: 25px;
    height: 30px;
    box-sizing: border-box;
}
</style>
