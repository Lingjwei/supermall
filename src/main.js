import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Toast from 'components/common/toast'
import store from './store'

//动画css
import animated from 'animate.css'
//解决移动端的300ms延迟
import FastClick from 'fastclick'

FastClick.attach(document.body)

FastClick.prototype.focus = function (targetElement) {
  let length;
  if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
    length = targetElement.value.length;
    targetElement.focus();
    targetElement.setSelectionRange(length, length);
  } else {
    targetElement.focus();
  }
};

//图片懒加载
import VueLazyload from "vue-lazyload";
//图片懒加载
Vue.use(VueLazyload,{
  //js 导入图片要用require
  loading: require('assets/img/common/placeholder.png'),
  error: require('assets/img/common/placeholder.png')
})

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

Vue.use(Toast)

Vue.use(animated)
//挂载
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')


router.beforeEach((to,from,next)=>{
  console.log(to);
  console.log(from);
  if (to.name == 'order' && from.name == 'orderlist'){
    router.replace({path: '/profile'})
  }else{
    next();
  }
})
