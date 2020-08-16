import * as types from './mutations-type'

export default {
  //加入购物车
  addCart({state, commit},payload){
    return new Promise((resolve) => {

      const obj = {}
      obj.store_id = payload.store_id
      obj.shop_name = payload.shop_name
      obj.type = -1
      obj.checked = false
      const goods = {}
      goods.id = payload.id
      goods.imgURL = payload.imgURL
      goods.title = payload.title
      goods.sku = payload.sku
      goods.selectArr = payload.selectArr
      goods.buyNum = payload.buyNum
      goods.checked = false
      obj.goods = [goods]

      //查找数组里面存不存在某个字
      let list = state.cartList.find(function (item) {
        return item.store_id == payload.store_id
      })


      //如果存在该商品则数量相加
      if (list){
        //获取cartList对应的下标
        const index = state.cartList.indexOf(list)
        let lst = state.cartList[index].goods.find(function (item) {
          return item.id == payload.id && item.sku.sku_id == payload.sku.sku_id
        })
        if (lst){
          const goodsIndex = state.cartList[index].goods.indexOf(lst)
          //获取需要加的数量
          let num = payload.buyNum

          const count = {}
          count.goodsIndex = goodsIndex
          count.index = index
          count.num = num

          commit(types.ADD_COUNTS, count)

        }else{
          goods.type = index
          //执行添加操作
          commit(types.ADD_TO_CART, goods)

        }




      }else{

        //执行添加操作
        commit(types.ADD_TO_CART, obj)
      }
      resolve()
    })

  }
}
