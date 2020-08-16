<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" @checkBtnClick="checkBtnClick" v-model="isSelectAll"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: <span>¥{{totalPrice}}</span></span>
    <span class="buy-product">
      <span>
        结算({{count}})
      </span>
    </span>

  </div>
</template>

<script>
  import CheckButton from './CheckButton'
  import { mapGetters } from 'vuex'

	export default {
		name: "BottomBar",
    data(){
		  return{
        count: 0
      }
    },
    components: {
		  CheckButton
    },
    computed: {
      ...mapGetters([
      	'cartList',
        'cartLength'
      ]),
		  totalPrice() {
        const cartList = this.cartList;
        let arr = []
        cartList.forEach(oitem => {
          oitem.goods.forEach(item => {
              if (item.checked === true){
                arr.push(item)
              }
          })
        })
        this.count = arr.length
        return arr.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {

          return preValue + item.buyNum * item.sku.price
        }, 0).toFixed(2)
      },
      isSelectAll: function () {
        if (Object.keys(this.cartList).length == 0){
          return false
        }
        return this.cartList.find(item => item.checked === false) === undefined
      }
    },
    methods: {
      checkBtnClick: function () {

        let isSelectAll = this.$store.getters.cartList.find(item => !item.checked);
        // 2.有未选中的内容, 则全部选中
        if (isSelectAll) {
          this.$store.getters.cartList.forEach(item => {
            if (item.checked == false){
              item.checked = true
            }
            item.goods.forEach(oitem => {
              if (oitem.checked == false){
                oitem.checked = true
              }
            })
          })
        } else {
          this.$store.getters.cartList.forEach(item => {
            if (item.checked == true){
              item.checked = false
            }
            item.goods.forEach(oitem => {
              if (oitem.checked == true){
                oitem.checked = false
              }
            })
          })
        }

      }
    }
	}
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #f9f9f9;
    position: fixed;
    bottom: 49px;
    left: 0;
    /*box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.05);*/
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
    z-index: 99;
  }

  .bottom-menu .select-all {
    position: absolute;
    left: 12px;
    /*top: 13px;*/
  }

  .bottom-menu .total-price {
    display: inline-block;
    position: relative;
    font-size: 16px;
    color: #666;
    text-align: right;
    width: 60%;
  }
  .total-price span{
    color:var(--color-high-text);
  }
  .bottom-menu .buy-product {
    color: #fff;
    width: 30%;
    height: 44px;
    text-align: center;
    float: right;
  }
  .buy-product span{
    display: inline-block;
    width: 90px;
    height: 36px;
    font-size: 15px;
    line-height: 36px;
    background-color: var(--color-high-text);
    border-radius: 2rem;
  }
</style>
