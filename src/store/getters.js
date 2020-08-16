const getters = {
  //获取购物车在vuex里的cartList 长度
  cartLength(state){
    //如果使用getters的话可以直接拿vuex里的state
    let count = 0;
    for (let item in state.cartList){
      count += state.cartList[item].goods.length
    }
    return count
  },
  //获取购物车里的cartList
  cartList(state){
    return state.cartList
  },
  //获取token
  _getToken(state){
    return state.__token__
  }
}

export default getters
