<template>
  <div>
    <!-- 导航 -->
    <nav-bar class="home-nav">
      <div slot="left">
        <img src="~assets/img/common/back.svg" alt="" class="back" @click="backGo">
      </div>
      <div slot="center">我是订单页</div>
      <div slot="right"></div>
    </nav-bar>
    <div>我是订单页</div>
    <div class="button-pay" @click="pay()">确认下单</div>
  </div>
</template>

<script>
  //头底部导航栏组件
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: "Order",
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
        this.$router.back()
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
