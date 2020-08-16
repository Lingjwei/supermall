import {request} from "./request";
//获取所有分类
export function getCateItem() {
  return request({
    url: '/Category/GetCategoryItem'
  })
}
//点击请求子分类 (暂时没用到)
export function getSubcategories(parent_id) {
  return request({
    url: '/Category/GetSubCategory',
    params: {
      parent_id
    }
  })
}
