<template>
  <div class="goods-item" @click="itemClick">
    <!-- @load可以监听图片加载完成   -->
    <img  v-lazy="goodsItem.goods_thumb" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.shop_price}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default(){
          return []
        }
      }
    },
    computed: {
      showImage(){
        return this.product.image || this.product.show.img
      }
    },
    methods: {
      imageLoad() {
        //发射一个事件总线  如果需要使用$bus实例需要在main里定义一下$bus
        this.$bus.$emit('itemImgLoad')
        this.$emit('dateilImg')
      },
      itemClick() {
        // 1.获取iid
        const id = this.goodsItem.id;
        // 2.跳转到详情页面
        this.$router.push({path: '/detail', query: {id}})
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
    height: 200px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  /*.goods-info .collect::before {*/
  /*  content: '';*/
  /*  position: absolute;*/
  /*  left: -15px;*/
  /*  top: -1px;*/
  /*  width: 14px;*/
  /*  height: 14px;*/
  /*  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;*/
  /*}*/
</style>
