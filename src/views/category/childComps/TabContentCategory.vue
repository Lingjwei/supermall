<template>
  <div>
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="Array(subcategories).length">
      <div slot="grid" class="item" v-for="(item, index) in subcategories" :key="index">
        <a >
          <img class="item-img" v-lazy="item.icon" alt="">
          <div class="item-text">{{item.cat_name}}</div>
        </a>
      </div>
    </grid-view>
  </div>
</template>

<script>
  import GridView from 'components/common/gridView/GridView'

  export default {
    name: "TabContentCategory",
    components: {
      GridView
    },
    props: {
      subcategories: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return{
        list: []
      }
    },
    //组件创建完后调用,生命周期函数,一旦创建完立即请求 created里拿不到元素
    created() {
      this._do()
    },
    methods: {
      _do(){
        setTimeout(() => {
          this.subcategories = this.subcategories
        },500)
      }
    }

  }
</script>

<style scoped>
  .panel img {
    width: 100%;
  }

  .item {
    text-align: center;
    font-size: 12px;
    width: 21.33333vw;
    height: 21.33333vw;
  }

  .item-img {
    width: 80px;
    height: 80px;
  }

  .item-text {
    margin-top: 15px;
  }
</style>
