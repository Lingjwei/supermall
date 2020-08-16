<template>
  <div>
    <!-- 导航 -->
    <nav-bar class="home-nav">
      <div slot="left">
        <img src="~assets/img/common/back.svg" alt="" class="back" @click="backGo">
      </div>
      <div slot="center">我是订单列表页</div>
      <div slot="right"></div>
    </nav-bar>
    <div>我是订单列表页,我返回要跳到个人中心</div>
    <div class="button-pay" @click="pay()">进入订单详情</div>
  </div>
</template>

<script>
  //导入公共导航栏
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: "Orderlist",
    components:{
      NavBar
    },
    data(){
      return{
      }
    },
    methods:{
      pay(){
        this.$router.push({path: '/orderdetail'})
      },
      backGo(){
        this.$router.replace({path: '/profile'})
      },
      back() {
        this.backGo();
      }
    }
  }
</script>

<style scoped>
  .button-pay{
    width: 100px;
    height: 40px;
    color: #fff;
    background: var(--color-high-text);
    line-height: 40px;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -50px;
  }
</style>
