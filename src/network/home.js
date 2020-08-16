import {request} from "./request"

export function getHomeMultiData() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoodsData(type, page) {
  return request({
    url: '/home/getHomeGoods',
    params: {
      type,
      page
    }
  })
}
