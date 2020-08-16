<template>
  <div id="home" class="wrapper">
      <!-- 导航 -->
      <nav-bar class="home-nav"><div slot="left">首页</div><div slot="center">购物街</div><div slot="right">购物车</div></nav-bar>
      <!--商品列表导航 //用于做吸顶效果在scroll里做不方便-->
      <tab-control  ref="topTab" class="tab-control"  @tabClick="tabClick" v-show="isTabFixed"></tab-control>
      <!-- 滚动包含 -->
      <better-scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll" @pullingUp="loadUp">
      <!-- 轮播 -->
      <home-swiper :banners="banners" @swiperLoaded="swiperLoaded"></home-swiper>
      <!--推荐-->
      <recommend-view :recommends="recommends"></recommend-view>
      <!--本周流行-->
      <feature-view></feature-view>
      <!--商品列表导航-->
      <tab-control  ref="contentTab" class="tab-control"  @tabClick="tabClick"></tab-control>
      <!--商品列表-->
      <goods-list :goods="showGoods"></goods-list>
      <!--下拉滚动效果使用better-scroll  性能好 npm安装命令 npm install beeter-scroll --save 又或者去git里找better-scroll的dist文件下js文件-->
    </better-scroll>
    <!--回到顶部组件  组件监听必须加上.native (.onshowGoodsce 只回调一次)-->
    <back-top v-show="isShowBackTop" @click.native="backTop"/>
  </div>
</template>

<script>
  //轮播组件
  import HomeSwiper from './childComps/HomeSwiper'
  //推荐组件
  import RecommendView from './childComps/RecommendView'
  //本周流行
  import FeatureView from  './childComps/FeatureView'
  //商品列表导航切换组件
  import TabControl from  'components/content/tabControl/TabControl'
  //商品列表组件
  import GoodsList from  'components/content/goods/GoodsList'
  //头底部导航栏组件
  import NavBar from 'components/common/navbar/NavBar'
  //better 滚动组件
  import BetterScroll from 'components/common/betterScroll/Scroll'
  //加载请求数据方法
  import { getHomeMultiData, getHomeGoodsData } from "network/home"
  //混入
  import { itemListenerMixin, backTopMixin }  from 'common/mixin'

  export default {
    name: "Home",
    components:{
      NavBar,
      BetterScroll,
      TabControl,
      GoodsList,
      HomeSwiper,
      RecommendView,
      FeatureView,
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods:{
          'pop': {page:1,list:[]},
          'new': {page:1,list:[]},
          'sell': {page:1,list:[]}
        },
        currentType : 'pop',
        tabOffsetTop: 0,
        saveY : 0,
        isTabFixed : false
      }
    },
    //计算属性
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    //进页面时创建函数
    activated() {
      //重新加载高度
      this.$refs.scroll.refresh()
      //回来的时候滚动到原来的位置
      setTimeout(this.$refs.scroll.scrollTo(0, this.saveY, 0), 20)
    },
    //离开页面前的函数
    deactivated() {
      //离开的时候记录高度
      this.saveY = this.$refs.scroll.scroll.y
      //取消全局事件监听
      this.$bus.$off('itemImgLoad',this.itemImgListener)

    },
    //组件创建完后调用,生命周期函数,一旦创建完立即请求 created里拿不到元素
    created() {
      //1.首页轮播菜单数据
      this._getHomemultidata();
      //请求商品数据
      this._getProductData('pop')
      this._getProductData('new')
      this._getProductData('sell')

    },
    mounted() {

    },
    //挂在网组件后请求
    methods: {
      /**
       * 网络请求
       */
      _getHomemultidata(){
        getHomeMultiData().then(res =>{
          this.banners = res.data.banner;
          this.recommends = res.data.recommends;

        })
      },
      _getProductData(type){
        const page = this.goods[type].page
        getHomeGoodsData(type, page).then(res =>{
          const newList = res.list
          //...类似于追加
          this.goods[type].list.push(...newList)
          this.goods[type].page += 1
          // 完成加载更多数据
          this.$refs.scroll.finishedPullUp()
        })
      },
      /**
       * 事件监听
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        if(this.$refs.contentTab !== undefined){
          this.$refs.contentTab.currentIndex = index
          this.$refs.topTab.currentIndex = index
        }
      },
      backClick(){
        //拿到组件对象里的scroll 第三个参数毫秒
        this.$refs.scroll.scrollTo(0, 0, 300)
      },
      contentScroll(position){
        //判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 800
        //判断是否吸顶 position : fixed
        //如果为0证明还没获取到高度
        if (this.tabOffsetTop != 0){
          this.isTabFixed = position.y <= -this.tabOffsetTop
        }
      },
      loadUp(){
        this._getProductData(this.currentType)
        //加载完成调用这个重新计算高度  有时候图片加载速度慢的时候会出现高度问题bug
      },
      swiperLoaded(){
        this.tabOffsetTop = this.$refs.contentTab.$el.offsetTop
      }

    }
  }
</script>
<!-- scoped 作用域 只会针对当前的 如果没写就全局-->
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
