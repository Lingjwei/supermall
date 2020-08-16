<template style="background: #f9f9f9;">
  <div class="cart">
    <nav-bar class="nav-bar" v-if="scrollY" ref="navbar" ><div slot="center">购物车({{length}})</div></nav-bar>
    <better-scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll">
      <cart-top-bar :length="length" v-if="length !== 0"></cart-top-bar>
      <cart-list :list="list" v-if="length !== 0" @imageLoad="imageLoad"></cart-list>
      <detail-title :title="'精选推荐'" ref='goodsList' :class="{'detail-goodsList':length !== 0}"></detail-title>
      <!--商品列表-->
      <goods-list :goods="goodsList" class="goodslist"></goods-list>
    </better-scroll>
    <cart-bottom-bar ></cart-bottom-bar>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartTopBar from "./childComps/CartTopBar";
  import CartBottomBar from "./childComps/CartBottomBar";
  import CartList from "./childComps/CartList";
  //better 滚动组件
  import BetterScroll from 'components/common/betterScroll/Scroll'
  //相当于引入store里的getters mapGetters辅助函数 把store里的getters映射到computed里
  //标题组件
  import DetailTitle from '../detail/childComps/DetailTitle'

  //商品列表组件
  import GoodsList from  'components/content/goods/GoodsList'
  //请求加载
  import {getRecommend} from "network/detail";
  //混入
  import {itemListenerMixin, backTopMixin} from 'common/mixin'
  // import  Velocity from 'velocity-animate'
  import { mapGetters } from 'vuex'
  export default {
    name: "Cart",
    components: {
      NavBar,
      CartTopBar,
      CartList,
      CartBottomBar,
      BetterScroll,
      GoodsList,
      DetailTitle
    },
    data() {
      return {
        scrollY : true,
        goodsList: [],
      }
    },
    mixins: [itemListenerMixin , backTopMixin],
    //计算属性
    computed: {
      ...mapGetters({
        length : 'cartLength',
        list : 'cartList'
      })
    },
    created() {
      // 3.请求推荐请求
      this._getRecommend()

    },
    methods: {
      _getRecommend() {
        getRecommend().then(res => {
          //获取推荐信息
          this.goodsList = res.list

        })
      },
      imageLoad() {
        this.$refs.scroll.refresh()
      },
      contentScroll(position){
        // console.log(position.y)
        if (this.length == 0){
          this.scrollY = true
        }else{
          this.scrollY = - position.y > 80
        }
      },


    },
    destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },

  }
</script>

<style scoped>
  body {
    height: 100%;
    padding: 0;
    margin: 0;
    background: #f9f9f9 !important;
  }
  .cart{
    width: 100%;
    height: 100%;

  }
  .show_dis{
    display: block;
  }
  .show_none{
    display: none;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
  .detail-goodsList{
    padding: 10vh 2vw 6vh 2vw !important;
  }
  .content {
    height: 80vh;
    overflow: hidden
  }
  .goodslist{
    position: relative;
    padding: 2vh 2vw  0 2vw;
  }
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
