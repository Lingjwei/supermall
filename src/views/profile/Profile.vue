<template>
  <div id="profile">
    <nav-bar class="nav-bar"><div slot="center">我的档案</div></nav-bar>
    <!--<user-info/>-->
    <!--<account-info/>-->
    <!--<normal-list-view :list-data="orderList"/>-->
    <!--<normal-list-view :list-data="serviceList"/>-->
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import preventBack from 'vue-prevent-browser-back';//组件内单独引入
  export default {
    name: "Profile",
    mixins: [preventBack],//注入
    components: {
      NavBar
    },
    data() {
    	return {

      }
    },
    mounted(){
      //防止页面后退
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL);
      });
    },
    destroyed(){
      //离开页面时销毁
      window.removeEventListener('popstate', this.fun, false);//false阻止默认事件
    },
    methods:{
      fun(){
        this.$router.push({'name':'index'});
      }
    }
  }
</script>

<style scoped>
  #profile {
    background-color: #f2f2f2;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
