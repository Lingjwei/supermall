import {ADD_COUNTS , ADD_TO_CART} from './mutations-type'

export default {
  //购物车数量相加
  [ADD_COUNTS](state, payload){

    state.cartList[payload.index].goods[payload.goodsIndex].buyNum += payload.num

  },
  //购物车加入新商品
  [ADD_TO_CART](state, payload){

    if (payload.type === -1){

      state.cartList.push(payload)

    }else{

      state.cartList[payload.type].goods.push(payload)

    }


  }
}
