import Vue from 'vue'
import VueRouter from 'vue-router'


const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')
const Login = () => import('views/login/Login')
const Register = () => import('views/register/Register')
const Order = () => import('views/order/Order')
const Orderdetail = () => import('views/orderdetail/Orderdetail')
const Orderlist = () => import('views/orderlist/Orderlist')


// Vue.all('*',function (req, res, next) {
//     res.header("Access-Control-Allow-Origin","*");
//     res.header("Access-Control-Allow-Headers","X-Requested-With,Content-Type");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     next();
// })

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
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
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title:'用户登录',
      index:1
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      title:'用户注册',
      index:1
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      title:'首页',
      index:0
    }
  },
  {
    path: '/category',
    name: 'category',
    component: Category,
    meta: {
      title:'分类',
      index:0
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
    meta: {
      title:'购物车',
      index:0
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      title:'我的',
      index:0
    }
  },
  {
    path: '/detail',
    name: 'detail',
    component: Detail,
    meta: {
      title:'商品详情',
      index:1
    }
  },
  {
    path: '/order',
    name: 'order',
    component: Order,
    meta: {
      title:'确认订单',
      index:1
    }
  },
  {
    path: '/orderlist',
    name: 'orderlist',
    component: Orderlist,
    meta: {
      title:'订单列表页',
      index:1
    }
  },
  {
    path: '/orderdetail',
    name: 'orderdetail',
    component: Orderdetail,
    meta: {
      title:'订单详情',
      index:1
    }
  }
],
mode: 'hash',

// const router = new VueRouter({
//   routes,
//   mode: 'history',
//   linkActiveClass: 'active'
// })

// router.beforeEach(function (to,from,next) {
//   document.title = to.matched[0].meta.title
//   // console.log(to)
//   next()
})
export default router
