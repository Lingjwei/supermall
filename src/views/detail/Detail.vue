<template>

  <div id="detail">
<!--    //详情导航栏-->
    <detail-nav-bar @titleClick="selectIndex" :current-index="currentIndex"/>
    <better-scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll">
      <detail-banner :top-images="topImages"></detail-banner>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop" ref='shop'/>
      <detail-info :detail-info="detailInfo" @imageLoad="imageLoad" ref='info'></detail-info>
      <detail-title :title="'精选推荐'" ref='goodsList'></detail-title>
      <goods-list :goods="goodsList"></goods-list>
    </better-scroll>
    <!--回到顶部组件  组件监听必须加上.native (.onshowGoodsce 只回调一次)-->
    <back-top v-show="isShowBackTop" @click.native="backTop"/>
    <detail-bottom-bar @addToCart="selectColor"/>
    <detail-rules ref="colorSelect" :rules="rules" @getCartNum="getCartNum"></detail-rules>

  </div>
</template>

<script>
  //头部导航
  import DetailNavBar from './childComps/DetailNavBar'
  //轮播
  import DetailBanner from './childComps/DetailBanner'
  //标题
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  //店铺名称
  import DetailShopInfo from './childComps/DetailShopInfo'
  //底部
  import DetailBottomBar from './childComps/DetailBottomBar'
  //商品描述
  import DetailInfo from './childComps/DetailInfo'
  //标题组件
  import DetailTitle from './childComps/DetailTitle'
  //商品列表组件
  import GoodsList from  'components/content/goods/GoodsList'
  //商品规格弹窗
  import DetailRules from "./childComps/DetailRules";
  //better 滚动组件
  import BetterScroll from 'components/common/betterScroll/Scroll'
  //请求加载
  import {getHomeDetail, Goods, GoodsInfo, Rules, getRecommend , getRules} from "network/detail";
  //混入
  import {itemListenerMixin, backTopMixin} from 'common/mixin'

  import {debouce} from "../../common/utils";
  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailBanner,
      DetailBaseInfo,
      DetailShopInfo,
      DetailBottomBar,
      DetailInfo,
      BetterScroll,
      GoodsList,
      DetailTitle,
      DetailRules,
    },
    mixins: [itemListenerMixin , backTopMixin],
    data() {
      return {
      	id: '',
        topImages: [],
        goods: {},
        shop: {},
	      detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        goodsList: [],
        themeTops: [],
        currentIndex: 0,
        title: null,
        cartNum: 0,
        price: 99,
        mianUrl: 'assets/img/recommend_bg.jpg',
        rules: {},
        goodsThumb: null,
      }
    },
    created() {
    	// 1.取出id
      this.id = this.$route.query.id

      // 2.发送商品请求
      this._getDetail(this.id)

      // 3.请求推荐请求
      this._getRecommend()

    },
    mounted() {

      let newRefresh = debouce(this.$refs.scroll.refresh, 500)
      this.itemImgListener = () => {
        newRefresh()
      }


    },
    destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    methods: {
	    selectIndex(index) {
		    this.$refs.scroll.scrollTo(0, -this.themeTops[index], 500)
	    },
	    contentScroll(position) {

	    	// 决定backTop按钮是否显示
        this.isShowBackTop = (-position.y) > 800
	    	// 监听滚动到某个主题
        this._listenScrollTheme(-position.y)

	    },
      _listenScrollTheme(position) {
	      let length = this.themeTops.length;
	      for (let i = 0; i < length; i++) {
		      let iPos = this.themeTops[i];
		      /**
		       * 判断的方案:
		       *  方案一:
		       *    条件: (i < (length-1) && currentPos >= iPos && currentPos < this.themeTops[i+1]) || (i === (length-1) && currentPos >= iPos),
		       *    优点: 不需要引入其他的内容, 通过逻辑解决
		       *    缺点: 判断条件过长, 并且不容易理解
		       *  方案二:
		       *    条件: 给themeTops最后添加一个很大的值, 用于和最后一个主题的top进行比较.
		       *    优点: 简洁明了, 便于理解
		       *    缺点: 需要引入一个较大的int数字
		       * 疑惑: 在第一个判断中, 为什么不能直接判断(currentPos >= iPos)即可?
		       * 解答: 比如在某一个currentPos大于第0个时, 就会break, 不会判断后面的i了.
		       */
		      if (position >= iPos && position < this.themeTops[i+1]) {
			      if (this.currentIndex !== i) {
				      this.currentIndex = i;
			      }
			      break;
		      }
	      }
      },
	    cartClick() {
	    	this.$router.push('/cart')
      },
    	_getDetail(id) {
        getHomeDetail(id).then(res => {
        	// 1.获取数据
          const data = res.list
	        // 2.获取顶部的图片数据
          this.topImages = data.goodsInfo.goods_img
          // 3.获取商品信息 如果需要写new的方式需要在detail.js创建一个class 并且绑定方法,相当于传入一个对象提取属性
          this.goods = new Goods(data.goodsInfo, data.goodsItem)
          this.goodsThumb = data.goodsInfo.goods_thumb
          // 4.获取店铺信息
          this.shop = data.shopInfo
          // 5.获取商品详细信息
          this.detailInfo = new GoodsInfo(data.goodsInfo)
          //数据加载完成后
          this.$nextTick(() => {
            this.$refs.scroll.refresh()
            // 获取对应的offsetTop
            this.themeTops = []
            this.themeTops.push(0)
            this.themeTops.push(this.$refs.shop.$el.offsetTop)
            this.themeTops.push(this.$refs.info.$el.offsetTop)
            this.themeTops.push(this.$refs.goodsList.$el.offsetTop)
            this.themeTops.push(Number.MAX_VALUE)
            // 请求规格数据
            this._getRules(this.id)
          })

        })
      },
	    _getRecommend() {
	    	getRecommend().then(res => {
	    	  //获取推荐信息
	    		this.goodsList = res.list

		    })
      },
      _getRules(id) {
        getRules(id).then(res => {
          //获取规格信息
          this.rules = new Rules(this.goods,res.data)

        })
      },
      imageLoad() {
        this.$refs.scroll.refresh()
        // 获取对应的offsetTop
        this.themeTops = []
        this.themeTops.push(0)
        this.themeTops.push(this.$refs.shop.$el.offsetTop)
        this.themeTops.push(this.$refs.info.$el.offsetTop)
        this.themeTops.push(this.$refs.goodsList.$el.offsetTop)
        this.themeTops.push(Number.MAX_VALUE)
      },
      getCartNum (data) {
        this.cartNum = this.cartNum + data
      },
      selectColor: function (data) {
        //data  cart加入购物车 buy购买
        //打开弹窗  //传入商品基本信息
        const obj = {}
        obj.id = this.id
        obj.imgURL = this.goods.goods_thumb
        obj.title = this.goods.title
        obj.shop = this.shop


        this.$refs.colorSelect.showModal = true
        this.$refs.colorSelect.getSpecifications(data,obj)

      }

    },

  }
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 1;
    background-color: #fff;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0;
  }


</style>
