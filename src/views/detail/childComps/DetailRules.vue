<!-- 模态弹窗 -->
<template>
  <transition name="fade">
    <div class="self-modal" v-show='showModal' @click="cancelClick" v-bind:style="styleObj" @click.prevent.stop>
      <!--图片放大功能-->
<!--      <div class="imgMask" v-if="showBigImg" @click.stop="showBigImg=!showBigImg">-->
<!--        <div class="showImg">-->
<!--          <mt-swipe :auto="0" :show-indicators="false" :continuous="false" :defaultIndex="num">-->
<!--            <mt-swipe-item v-for="(item,index) in imgUrls" :key="item.id">-->
<!--              <div class="testNum"  >{{index+1+'/'+imgUrls.length}}</div>-->
<!--              <img :src=" $headerImg+imgUrls[index]+$bigImg" class="img"/>-->
<!--            </mt-swipe-item>-->
<!--          </mt-swipe>-->
<!--        </div>-->
<!--      </div>-->
      <!-- 自定义内容 -->
      <div  :class="[isIphoneX ? 'isIphoneX-career' : 'career']" @click.prevent.stop>
        <div class="selectGoods" >
          <div class="bgColse"  @click="cancelClick">
            <!--   关闭弹出的X图         -->
            <img class="close" src="~assets/img/public/goodsx.jpg" >
          </div>
          <div class="picture" @click="bigImg(0)">

            <img class="headerImg" v-if="rules.goods_thumb"  :src="rules.goods_thumb">
            <img class="headerImg" v-else :src="rules.goods_thumb">
          </div>
          <div class="priceAndRules">
            <div class="price" ref="price">¥ {{rules.moeny}}</div>
            <div class="stock" ref="stock">库存{{rules.stock}}件</div>

            <div class="selected" v-if="Array(rules.rule).length !== 0" ref='atrr_title'>请选择
              <span v-for="(item,index) in rules.rule" :ref="`atrr_name${index}`" v-show="true">{{item.atrr_name}}</span>
            </div>

            <div class="selected" v-if="Array(rules.rule).length !== 0" ref='val_title' v-show="false">请选择

            </div>

          </div>
        </div>
        <!--规格滚轮-->
        <better-scroll class="content" ref="scroll">
          <div class="selectGoods atrr" v-if="Array(rules.rule).length !== 0" >
            <div class="productConten" >
              <div class="product-delcom" v-for="(ProductItem,n) in rules.rule" >
                <p>{{ProductItem.atrr_name}}</p>
                <ul class="product-footerlist clearfix" >

                  <li v-for="(oItem,index) in ProductItem.val" @click="specificationBtn(oItem.value,n,$event,index,oItem.symbol)" :class="[oItem.isShow?'':'noneActive',subIndex[n] == index?'productActive':'']">
                    {{oItem.value}}
                  </li>

                </ul>
              </div>
            </div>
          </div>
          <div class="num">
            <div class="buyNum">购买数量</div>
            <div class="selNum">
              <div class="minute" @click="minus">-</div>
              <!--     v-model.lazy v-model的修饰符 lazy调用没那么频繁         -->
              <input type="number" class="input" v-model.lazy="buyNum" v-on:keyup.13="buyNumSubmit" @blur="buyNumSubmit" @focus="FocusSubmit"/>
              <div class="add" @click="add">+</div>
            </div>
          </div>
        </better-scroll>
        <div class="bottom"  @click="sureClick">完成</div>

      </div>

    </div>
  </transition>
</template>
<script>
  //better 滚动组件
  import BetterScroll from 'components/common/betterScroll/Scroll'
  export default {
    name: 'DetailRules',
    components: {
      BetterScroll
    },
    data () {
      return {
        showBigImg: false,
        showModal: false,
        stock: 300,
        buyNum: 1,
        isIphoneX:false,
        selectArr: [], //存放被选中的值
        shopItemInfo: {}, //存放要和选中的值进行匹配的数据
        subIndex: [], //是否选中 因为不确定是多规格还是但规格，所以这里定义数组来判断
        symbol: [], //规格的标识
        result:[],
        goodsAttr: null, //选中后记录的规格
        FocusNum:0,
        goodsInfo: null, //商品基本信息
        selectType: String //点击的类型,
      }
    },
    props: {
      styleObj: { // 用于承接样式类
        type: Object,
        default: function () {
          return {
            position: 'fixed',
            bottom: 0,
            top: 0,
            left: 0,
            width: '100%',
            background: 'rgba(113,111,111,0.5)',
          }
        }
      },
      price: Number,
      mainPic: String,
      whichBtn: String,
      rules : {
        type: Object,
      }
    },
    methods: {

        getSpecifications(type,obj){
          //延迟加载 重新计算高度
          setTimeout(() => {
            this.$refs.scroll.refresh()
            this.$refs.scroll.scroll.hasVerticalScroll = true
          }, 100)

          this.goodsInfo = obj;
          this.selectType = type
        },
        //规格的选择
        specificationBtn(item, n, event, index,symbol) {
          // this.$refs.scroll.refresh()
          let self = this;
          if (self.selectArr[n] != item) {
            self.selectArr[n] = item;
            self.subIndex[n] = index;
            self.symbol[n] = symbol;
            self.$refs[`atrr_name${n}`][0].style.display = 'none'
          }else{
            self.selectArr[n] = "";
            self.symbol[n] = "";
            self.subIndex[n] = -1; //去掉选中的颜色
            self.$refs[`atrr_name${n}`][0].style.display = ''

          }
          //去除空值
          let arr = self.selectArr.filter(function (s) {
                      return s && s.trim();
                    });
          //判断是否选择完成
          if (this.rules.rule.length == arr.length){

            let symbol = self.symbol.join(',')
            let sku = self.rules.sku
            for(index in sku) {
              if (String(sku[index]['attr_symbol_path']) == symbol){
                self.rules.goods_thumb = sku[index]['thum_img']
                self.$refs.stock.innerHTML = "库存"+sku[index]['stock']+"件"
                self.$refs.price.innerHTML = "¥ " + sku[index]['price']

                let num = this.buyNum

                if (num > sku[index]['stock']){

                  this.buyNum = sku[index]['stock']

                }

                this.goodsAttr = sku[index]

                break
              }
            }

            self.$refs.atrr_title.style.display = 'none'

            self.$refs.val_title.style.display = ''

            let title = self.selectArr.join(" ")

            self.$refs.val_title.innerHTML = "已选:"+ title



          }else{

            this.goodsAttr = null

            self.$refs.stock.innerHTML = "库存"+self.rules.stock+"件"
            self.$refs.price.innerHTML = "¥ " + self.rules.moeny

            self.$refs.atrr_title.style.display = ''

            self.$refs.val_title.style.display = 'none'


          }

          self.checkItem();

        },
        //规格选中的赋值
        checkItem: function () {

          let self = this;
          let option = self.rules.rule;
          let result = [];  //定义数组存储被选中的值
          for (let i in option) {
            result[i] = self.selectArr[i] ? self.selectArr[i] : '';
          }
          for (let i in option) {
            let last = result[i];  //把选中的值存放到字符串last去
            for (let k in option[i].item) {
              result[i] = option[i].item[k].name; //赋值，存在直接覆盖，不存在往里面添加name值
              option[i].item[k].isShow = self.isMay(result); //在数据里面添加字段isShow来判断是否可以选择
            }
            result[i] = last; //还原，目的是记录点下去那个值，避免下一次执行循环时避免被覆盖

          }
          self.$forceUpdate(); //重绘
        },
        // 增添数量
        add () {

          //获取当前的数量
          let num = this.buyNum
          num ++
          if (this.goodsAttr == null){

            if (num > this.rules.stock){
              //如果需要使用$toast需要去main.js注册
              this.$toast({message: '数量超出范围'})
              return
            }

          }else{

            if (num > this.goodsAttr.stock){
              //如果需要使用$toast需要去main.js注册
              this.$toast({message: '数量超出范围'})
              return
            }

          }
          this.buyNum = num
        },
        buyNumSubmit (e) {
          if (e.target.value == 0){
            //如果需要使用$toast需要去main.js注册
            this.$toast({message: '数量超出范围'})
            this.buyNum = this.FocusNum
            return;
          }
          //获取当前的数量
          let num = this.buyNum

          if (this.goodsAttr == null){

            if (num > this.rules.stock){
              //如果需要使用$toast需要去main.js注册
              this.$toast({message: '数量超出范围'})
              return
            }

          }else{

            if (num > this.goodsAttr.stock){
              //如果需要使用$toast需要去main.js注册
              this.$toast({message: '数量超出范围'})
              return
            }

          }

        },
        FocusSubmit (){

           //获取焦点时记录一下当前的数量
          this.FocusNum = this.buyNum
        },
        // 减少购买数辆
        minus () {

          if (this.buyNum <= 1 ){
            return
          }

          this.buyNum--

        },
        isMay: function (result) {
          for (let i in result) {
            if (result[i] == '') {
              return true; //如果数组里有为空的值，那直接返回true
            }
          }
          return this.shopItemInfo[result].stock == 0 ? false : true; //匹配选中的数据的库存，若不为空返回true反之返回false
        },

      // 确定
      sureClick () {
        //先进行规格判断
        //规格名称
        let arr = []
        //获取所有的规格名称
        for (let i in this.rules.rule){
          arr.push(this.rules.rule[i]['atrr_name'])
        }
        //如果商品有规格
        if (this.rules.sku && Array(this.rules.rule).length !== 0 && this.goodsAttr == null){
          //获取选中的规格 判断是否为0
          if (Object.keys(this.selectArr).length == 0){
            //把数组转为字符串
            let data = arr.join(" ")

            this.$toast({message: "选择 " + data})

          }else{

            let noArr = []
            for (let i = 0; arr.length > i; i++){

              if (!this.selectArr[i] || this.selectArr[i] == '' || this.selectArr[i] == undefined){
                noArr.push(arr[i])
              }

            }
            //把数组转为字符串
            let data = noArr.join(" ")

            this.$toast({message: "选择 " + data})

          }

          return

        }



        //规格判断完毕执行 数据拼接
        const obj = {}
        obj.store_id = this.goodsInfo.shop.id
        obj.shop_name = this.goodsInfo.shop.shop_name
        obj.id = this.goodsInfo.id
        obj.imgURL = this.goodsInfo.imgURL
        obj.title = this.goodsInfo.title
        obj.sku = this.goodsAttr
        obj.selectArr = this.selectArr.join(";")
        obj.buyNum = this.buyNum
        //判断是购物车还是购买进来的
        if (this.selectType == 'cart'){
          //判断用户是否登录
          let token = this.$store.state.__token__

          if ( token == '' || token == null || token == false){
            this.$toast({message: "亲,请先登录~"})

            setTimeout(() => {
              // 2.跳转到登录页面
              this.$router.push({path: '/login'})
            },1000)

            return;
          }
          //把数据存进vuex里面 作为共享数据 //异步操作actions
          this.$store.dispatch('addCart', obj).then(() => {

            this.$toast({message: '加入购物车成功'})

            this.showModal = false

          })
        }else if (this.selectType == 'buy'){

          this.$router.push({path: '/order'})

        }


        //promise异步处理
        // return new Promise(function (resolve) {
        //   resolve('sure')
        // }, function (reject) {
        // })
      },
      // 取消
      cancelClick () {
        console.log('取消')
        this.$emit('colseAlter')
        this.showModal = false

        return new Promise(function (resolve) {
          resolve('cancel')
        }, function (reject) {

        })

      },

      // 看大图
      bigImg (index) {
        this.showBigImg = true
        this.num = index
      }
    }
  }
</script>
<style scoped>
  .self-modal{
    z-index: 3006;
  }
  .isIphoneX-career{
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    position: fixed;
    width: 100%;
    bottom: 0px;
    background: white !important;
    padding-bottom: 34px;
  }
  .career{
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    position: fixed;
    width: 100%;
    bottom: 0px;
    background: white !important;
  }
  .selectGoods{
    margin: 1rem;
    padding-bottom: 10px;
    border-bottom:1px solid #ebebeb ;
    text-align: left;
  }
 .atrr{
    padding-bottom: 0px;
  }
  .bgColse{
    margin-top: -1rem;
    margin-right: -1rem;
    height: 4rem;
    text-align: center;
    align-items: center;
    width: 4rem;
    float: right;
  }
  .close{
    margin-top: 0.7rem;
    margin-right: -1.6rem;
    width: 1rem;
    height: 1rem;
  }
  .picture{
    width: 5.3125rem;
    height: 5.3125rem;
    display: inline-block;
  }
  .headerImg{
    width: 5.3125rem;
    height: 5.3125rem;
  }
  .imgMask{
    position: absolute;
    height: 100%;
    width:100%;
    top:0px;
    left:0;
    z-index: 100;
    background:rgba(0,0,0,1);
  }
  .testNum{
    position: absolute;
    width: 100%;
    padding-top: 2rem;
    color: white;
    text-align: center;
    font-size: .875rem;
    font-weight: bold;
  }
  .showImg{
    height: 100%;
    width: 100%;
    position: absolute;
    align-items: center;
    left: 0px;
    top:0;
  }
  .img{
    object-fit: scale-down;
    height: auto;
    width: 100%;
  }
  .priceAndRules{
    margin-left: 10px;
    text-align: left;
    display: inline-block;

  }
  .price{
    color: var(--color-high-text);
    margin-bottom: 5px;
    font-size:.875rem;
  }
  .stock{
    color: #999999;
    margin-bottom: 5px;
    font-size: .7rem;
  }
  .selected{
    color: #333333;
    font-size:.7rem;
  }
  .selected span{
    margin-left:.3rem;
  }
  .selColor .selected{
    padding-top: 5px;
  }
  .selRules .selected{
    padding-top: 10px;
  }
  ul {
    list-style: none;
  }

  li {
    list-style-type: none;
  }
  .clearfix:after {
    display: block;
    overflow: hidden;
    clear: both;
    height: 0;
    visibility: hidden;
    content: "";
  }

  * {
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  @media screen and (max-width: 319px) {
    html {
      font-size: 42.666665px;
    }
  }
  @media screen and (min-width: 320px) and (max-width: 359px) {
    html {
      font-size: 42.66666px;
    }
  }
  @media screen and (min-width: 360px) and (max-width: 374px) {
    html {
      font-size: 48px;
    }
  }
  @media screen and (min-width: 375px) and (max-width: 383px) {
    html {
      font-size: 50px;
    }
  }
  @media screen and (min-width: 384px) and (max-width: 399px) {
    html {
      font-size: 51.2px;
    }
  }
  @media screen and (min-width: 400px) and (max-width: 413px) {
    html {
      font-size: 53.333335px;
    }
  }
  @media screen and (min-width: 414px) {
    html {
      font-size: 55.2px;
    }
  }
  .productConten {
    margin-bottom: 1rem;
  }
  .product-delcom {
    padding-bottom: 5%;
    color: #323232;
    font-size: 1rem;
  }
  .product-footer a {
    -webkit-flex: 1;
    -webkit-box-flex: 1;
    flex: 1;
    color: #fff;
    font-size: 0.3rem;
    text-decoration: none;
  }
  .num{
    text-align: left;
    height: 3.125rem;
    padding: 0px 15px;
    display: flex;
    justify-content: space-between;
  }
  .selNum{
    display: flex;
    margin-top: .3125rem;
    height: 2.5rem;
  }
  .num img{
    padding-top: 0px;
    width: 1.375rem;
    height: 1.375rem;
    float: left;
  }
  .dataNum{
    margin-top: 0px;
    padding: 0px 10px;
    display: inline-block;
    color: #3fc9a5;
    height: 1.375rem;
    line-height: 1.375rem;
    font-size: .875rem;
    float: left;
  }
  .buyNum{
    line-height: 2.5rem;
    display: inline-block;
  }

  .bottom{
    width: 90%;
    font-size: 1rem;
    text-align: center;
    color: white;
    background: var(--color-high-text);
    border-radius: 10rem;
    line-height:2.5rem;
    height: 2.5rem;
    margin: 0 auto;
    margin-bottom: 30px;
  }
  .product-footerlist {

    margin-top: 0.5rem;
  }
  .product-footerlist li {
    border-radius: 0.2rem;
    padding: 0.6rem;
    font-size: 0.8rem;
    text-align: center;
    float: left;
    margin-right: 0.8rem;
    min-width: 0.96rem;
    margin-bottom: 0.16rem;
  }
  .product-footerlist li {
    background-color: #1A1A29;
    color: #fff;
  }
  .product-footerlist li {
    background-color: #e1e1e19e;
    color: #000;
    /*pointer-events: none;*/  /*无法被点击*/
  }
  .product-footerlist li.noneActive {
    background-color: #e1e1e19e;
    border: 1px solid #e1e1e19e;
    color: #000000;
    /*pointer-events: none;*/
  }
  .product-footerlist li.productActive {
    background-color: var(--color-high-text);
    color: #fff;
    border: 1px solid var(--color-high-text);
  }

  .clearfix:after {
    display: block;
    overflow: hidden;
    clear: both;
    height: 0;
    visibility: hidden;
    content: "";
  }
  /*减号*/

  .minute {
    width: 25px;
    text-align: center;
    height: 26px;
    line-height: 26px;
    font-size: 18px;
    border: 1px solid #e1e1e19e;
    margin-right: .1rem;
    background: #e1e1e19e;
  }
  /*加号*/

  .add {
    width: 25px;
    border: 1px solid #e1e1e19e;
    height: 26px;
    line-height: 26px;
    text-align: center;
    font-size: 18px;
    margin-left: .1rem;
    background: #e1e1e19e;
  }

  .input {
    flex:1;
    width: 40px;
    height: 26px;
    display: inline-block;
    line-height: 30px;
    text-align: center;
    background: #e1e1e19e;
    border: 1px solid #e1e1e19e;
  }

  .content {
    height: 60vh;
    overflow: hidden
  }

</style>
