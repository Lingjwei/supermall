<template>

  <div id="home">
    <nav-bar class="home-nav"><div slot="left">首页</div><div slot="center">购物街</div><div slot="right">购物车</div></nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  
  export default {
    name: "Home",
    components:{
      NavBar
    },
    data() {
      return {
      }
    },
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    z-index: 9;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
