import { request } from "./request"

export function getHomeDetail(id) {
  return request({
    url: '/detail/GetGoodsDetail',
    params: {
      id
    }
  })
}

export class Goods {
  constructor(goodsInfo, goodsItem) {
    this.title = goodsInfo.title
    this.store_id = goodsInfo.store_id
    this.shop_name = goodsInfo.shop_name
    this.shop_price = goodsInfo.shop_price
    this.sales = goodsItem.sales
    this.collection_num = goodsItem.collection_num
    this.goods_thumb = goodsInfo.goods_thumb
  }
}

export class Rules {
  constructor(goods, data) {
    this.goods_thumb = goods.goods_thumb
    this.rule = data.rule
    this.sku = data.sku
    this.stock = data.goodsInfo.count
    this.moeny = data.goodsInfo.moeny

  }
}

export class GoodsInfo {
  constructor(goodsInfo) {
    if (goodsInfo.goods_desc_img.length != 0){
      this.goods_desc_img = goodsInfo.goods_desc_img
    }
    if (String(goodsInfo.goods_desc_text)){
      this.goods_desc_text = goodsInfo.goods_desc_text
    }
  }
}

export function getRules(id) {
  return request({
    url: '/detail/GetGoodsRules',
    params: {
      id
    }
  })
}

export function getRecommend(type = 'sell') {
  return request({
    url: '/home/getHomeGoods',
    params: {
      type
    }
  })
}
