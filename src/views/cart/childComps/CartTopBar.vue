<template>
  <div class="top-bar">
    <div class="item-bar-img">
      <span class="span-img">
<!--        <img src="~assets/img/common/back.svg" alt="" class="back" @click="">-->
        购物车
      </span>
      <span class="span-right">管理</span>
    </div>
    <div class="item-bar">共{{length}}件宝贝</div>
  </div>
</template>

<script>
  export default {
    name: "CartTopBar",
    props:{
      length: Number
    }
  }
</script>

<style scoped>
  .top-bar{
    width: 100%;
    height: 150px;
    background: var(--color-tint);
    padding-top: 20px;
  }
  .span-img{
    padding-left: 10px;
  }
  .item-bar-img span{
    display: inline-block;
    font-size: 18px;
    color: #fff;
  }
  .span-img img{
    vertical-align: middle;

  }
  .span-right{
    position: absolute;
    font-size: 14px;
    right: 10px;
  }
  .item-bar{
    width: 100%;
    color: #fff;
    font-size: 13px;
    padding:10px;
  }
</style>
