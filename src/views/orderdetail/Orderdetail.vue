<template>
  <div>
    <!-- 导航 -->
    <nav-bar class="home-nav">
      <div slot="left">
        <img src="~assets/img/common/back.svg" alt="" class="back" @click="backGo">
      </div>
      <div slot="center">订单详情</div>
      <div slot="right"></div>
    </nav-bar>
    <div>我是订单详情页</div>
  </div>
</template>

<script>
  //头底部导航栏组件
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: "Orderdetail",
    components:{
      NavBar
    },
    data(){
      return{
      }
    },
    methods:{
      backGo(){

        let query = this.$router.history.current.query.path
        console.log(query)
        if (query == undefined){

          this.$router.push({path: '/orderlist'})

        }else{

          this.$router.back()

        }

      },
      back() {
        this.backGo();
      }
    }
  }
</script>

<style scoped>

</style>
