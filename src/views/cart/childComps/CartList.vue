<template>
  <div class="cart-list">
      <div class="cart-goodslist" v-for="(item,index) in list">
        <div class="cart-shop">

          <span>
            <CheckButton @checkBtnClick="checkedChange(index)" v-model="item.checked"></CheckButton>
          </span>

          <span class="store-name">{{item.shop_name}}</span>
        </div>

        <div class="cart-goodslist-l" v-for="(oItem,n) in item.goods" >
          <span class="cart-goodslist-input">
            <CheckButton @checkBtnClick="checkedgoods(n,index)" v-model="oItem.checked"></CheckButton>
          </span>
          <span class="cart-goodslist-img">
            <img :src="oItem.imgURL" alt="" @load="imageLoad">
          </span>
          <span class="cart-goodslist-item">
            <div class="title">{{oItem.title}}</div>
            <div>{{oItem.selectArr}}</div>
            <div>¥ {{oItem.sku.price}}</div>
          </span>
        </div>

      </div>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'
	export default {
		name: "CartList",
    components: {
      CheckButton
    },
    props: {
		  list: Array
    },
    data() {
		  return {
        imagesLength: 0
      }
    },
    methods: {
      checkedChange: function (index) {
        this.list[index].checked = !this.list[index].checked;
        if (this.list[index].checked == true){
          for (let item in this.list[index].goods){
            this.list[index].goods[item].checked = true
          }
        }else{
          for (let item in this.list[index].goods){
            this.list[index].goods[item].checked = false
          }
        }
      },
      checkedgoods: function (n,index) {

        this.list[index].goods[n].checked = !this.list[index].goods[n].checked;

        let lst = this.list[index].goods.find(function (item) {
          return item.checked == false
        })
        //只要存在一个false 那么就不是全选
        if (lst){
          this.list[index].checked = false
        }else{
          this.list[index].checked = true
        }
      },
      imageLoad(){
        this.$emit('imageLoad')
      }
    },


	}

</script>

<style scoped>
  .cart-list {
    position: relative;
    width: 94%;
    /*left: 3%;*/
    border-radius: 0.6rem;
    margin: -4.5rem auto;
    background: #ffffff;
    z-index: 9;
    /*padding-left: 10px;*/
  }
  .cart-shop{
    height: 40px;
    line-height: 40px;

  }
  span{
    height: 80px;
    display: inline-block;
  }
  .cart-shop sapn{
    text-align: center;
  }
  .cart-goodslist{
    margin-bottom: 0.6rem;
  }
  .cart-goodslist span{
    height: 100%;
    /*margin-left: 0.8rem;*/
  }
  .cart-goodslist span:nth-child(n+1){
    margin-left: 0.8rem;
  }
  .cart-goodslist-input{
    vertical-align: middle;
  }
  .cart-goodslist-img{
    flex: 1;
  }
  .cart-goodslist-img img{
    vertical-align: Top;
    width: 70px;
    height: 70px;
  }
  .cart-goodslist-item{
    vertical-align: Top;
    width: 60%;
  }
  .cart-goodslist-item div{
    font-size: 14px;
    /*width: 50%;*/
  }
  .cart-goodslist-item div:nth-child(n+2){
    margin-top: 0.3rem;
  }
  .cart-goodslist-item div:nth-child(3){
    color: var(--color-high-text);
  }
  .title{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .store-name{
    font-size: 12px;
  }
  .cart-goodslist-l{
    padding-bottom: .5rem;
    padding-top: .5rem;
  }
</style>
