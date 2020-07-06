import Vue from 'vue'
import VueRouter from 'vue-router'


const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')

Vue.use(VueRouter)

  const routes = [
  {
      //路径
    path: '/',
    redirect:'/home',
      //标题
    meta: {
        title:'首页'
    }
  },

  {
    path: '/home',
    component: Home,
    meta: {
      title:'首页'
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      title:'分类'
    }
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      title:'购物车'
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      title:'我的'
    }
  },
  {
    path: '/detail',
    component: Detail,
    meta: {
      title:'商品详情'
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
})

router.beforeEach(function (to,from,next) {
  document.title = to.matched[0].meta.title
  // console.log(to)
  next()
})
export default router
