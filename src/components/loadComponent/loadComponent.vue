<template>
  <div class="loading-div">
	<mt-spinner type="snake" color="red" class='loading-spinner'></mt-spinner>
  </div>
</template>

<script>

import { Spinner } from 'mint-ui';
// Vue.component(Spinner.name, Spinner);

export default {
  name: 'loadComponent',
  data(){
    return {}
  },
  created(){
    
  },
  methods:{
    
  }
}
</script>

<style>
/* 顶部的层级设置，使得不会 */
.loading-spinner{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.loading-div{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.15);
}

</style>
