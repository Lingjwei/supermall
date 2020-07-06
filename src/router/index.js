import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HomeComponents from '../components/HomeComponents.vue'

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
    name: 'Home',
    component: Home,
    meta: {
      title:'首页'
    },
    //子路由设置
    // children: [
    //   {
    //     path: 'news',
    //     component: () => import(/* webpackChunkName: "about" */ '../components/HomeNaws.vue')
    //   },
    //   {
    //     path: 'message',
    //     component: () => import(/* webpackChunkName: "about" */ '../components/HomeMessage.vue')
    //   }
    // ]
  },
  {
    path: '/about',
    name: 'About',
      //标题
    meta: {
      title:'关于'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //加载的模板地址
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
    {
      path: '/category',
      name: 'Category',
      //标题
      meta: {
        title:'购物车'
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //加载的模板地址
      component: () => import(/* webpackChunkName: "about" */ '../views/Category.vue')
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
