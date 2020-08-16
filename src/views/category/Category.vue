<template>

  <div id="category">

    <nav-bar class="nav-bar"><div slot="center">分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
  <!--    <tab-content-category :subcategories="subcategories"></tab-content-category>-->
      <scroll id="tab-content"
              :data="[categoryData]"
              ref="scroll">
        <div>
          <tab-content-category :subcategories="showSubcategory"/>
  <!--        <tab-control :titles="['综合', '新品', '销量']"-->
  <!--                     @itemClick="tabClick"/>-->
  <!--        <goods-list :goods="showCategoryDetail"/>-->
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import TabMenu from './childComps/TabMenu'

  import TabContentCategory from "./childComps/TabContentCategory";

  import { getCateItem } from 'network/category'

  import Scroll from 'components/common/betterScroll/Scroll'

  export default {
		name: "Category",
    components: {
      NavBar,
      TabMenu,
      TabContentCategory,
      Scroll
    },
    data() {
		  return{
        categories: [],
        subcategories: [],
        categoryData: {},
        currentIndex:0
      }
    },
    //组件创建完后调用,生命周期函数,一旦创建完立即请求 created里拿不到元素
    created() {
		  this._getCateItem()
    },
    methods: {
      _getCateItem(){
        getCateItem().then(res =>{
          this.categories = res.data
          this.subcategories = [res.data[this.currentIndex].parent]

        })
      },
      //点击请求子分类 暂时没用到
      // _getSubcategories(catId){
      //   getSubcategories(catId).then(res => {
      //     this.subcategories = res.data
      //   })
      // },

      selectItem(index){
        this.subcategories = [this.categories[index].parent]
        // let catId = this.categories[index].cat_id
        // this._getSubcategories(catId)
      }
    },
    computed: {
      showSubcategory() {
        if (this.currentIndex === -1) return []
        return this.subcategories[this.currentIndex]
      },

    },
	}
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }
</style>
