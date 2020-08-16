<template>
  <div class="login">
    <!-- 导航 -->
    <nav-bar class="home-nav">
      <div slot="left">
        <img src="~assets/img/common/back.svg" alt="" class="back" @click="loadgo">
      </div>
      <div slot="center">登录</div>
      <div slot="right"></div>
    </nav-bar>
    <login-info></login-info>
  </div>
</template>

<script>
  //头底部导航栏组件
  import NavBar from 'components/common/navbar/NavBar'
  import loginInfo from './childComps/loginInfo'

  export default {
    name: "Login",
    components:{
      NavBar,
      loginInfo
    },
    //组件加载完成
    created() {

    },
    destroyed(){
      window.removeEventListener('popstate', this.back, false);//false阻止默认事件
    },
    mounted() {
      // 如果支持 popstate 一般移动端都支持了
      if (window.history && window.history.pushState) {
        // 往历史记录里面添加一条新的当前页面的url
        history.pushState(null, null, document.URL);
        // 给 popstate 绑定一个方法 监听页面刷新
        window.addEventListener('popstate', this.back, false);//false阻止默认事件
      }

    },
    methods: {

      loadgo(){

        let query = this.$router.history.current.query.path
        if (query){

          this.$router.replace({path: '/'+query})

        }else{

          this.$router.back()

        }

      },
      back() {
        this.loadgo();
      }
    }
  }
</script>

<style scoped>

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    z-index: 9;
    font-size: 20px;
  }
  .back{
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    left: 10px;
    margin-top: -12px;
  }
  .login{
    width: auto;
  }

</style>
