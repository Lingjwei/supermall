<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive  include="Home,Category,Orderlist,profile">
        <router-view></router-view>
      </keep-alive>
    </transition>
    <main-tab-bar v-if="show"></main-tab-bar>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabbar/MainTabBar'
  import axios from 'axios'

  export default {
    name: 'App',
    components: {
      MainTabBar
    },
    data(){
      return {
        show:false,
        transitionName:''
      }
    },
    watch: { //监听路由的变化 来控制main-tab-bar的显示和隐藏
      $route (to , from) {
        //设置进入回退动画效果
        if (to.meta.index > from.meta.index){
          // 设置动画名称
          this.transitionName = 'slide-left';

        }else{

          this.transitionName = 'slide-right';

        }
        //监听底部导航栏是否显示
        if (to.name === 'home' || to.name === 'category' || to.name === 'cart' || to.name === 'profile') {
          this.show = true
          this.transitionName = ''
        }else{
          this.show = false
        }
        //进入购物车或者个人中心时判断用户是否登录
        // if (to.name === 'cart' || to.name === 'profile'){
        if (to.name === 'cart'){

          let token = this.$store.state.__token__

          if ( token == '' || token == null || token == false){
              // 2.跳转到登录页面
              this.$router.push({path: '/login',query:{path:from.name}})

          }

        }
        //下完订单跳转到订单详情页时返回个人中心
        // console.log(to.name)
        // console.log(from.name)
        if (to.name === 'order' && from.name === 'orderdetail'){
          // 2.跳转到个人中心
          this.$router.push({path: '/orderlist'})
        }

      }
    }
  }
</script>

<style>
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 500ms;
    position: absolute;
  }.slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }.slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }.slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
    /*transition: opacity .5s;*/
  }.slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  @import "./assets/css/base.css";
</style>
