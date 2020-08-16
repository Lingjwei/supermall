<template>
  <!-- vue 里想明确拿到一个东西可以绑定ref  一般绑定给子组件  如果是绑定在子组件上的 通过this.$refs.refname获取到的是组件对象,如何是放在标签里就是元素对象-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  //引入better-scroll滚动
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      click: {
        type: Boolean,
        default: true
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        scroll: null,
      }
    },
    computed: {
      scrollY() {
        return this.scroll.y
      }
    },
    mounted() {

      //创建滚动 默认better-scroll是不能实时监听滚动位置 需要传第三个参数probeType
      // { probeType: 3 } 0和1都不侦测 2在手指滚动的过程中侦测,在手指离开就不侦测 , 3 只要在滚动就侦测  监听scroll
      // { probeType: 3 , cklic: true } cklic 默认为false 监听点击事件
      // { probeType: 3 , cklic: true , pullUpLoad: true } pullUpLoad 上拉监听默认为false  监听pullingUp
      // this.scroll = new BScroll(this.$refs.wrapper,{
      //   probeType: this.probeType,
      //   click: this.click,
      //   pullUpLoad: this.pullUpLoad,
      //   useTransition:false,   //ios13 回弹问题
      //   hasVerticalScroll:true
      // })
      // //监听滚动位置
      // if (this.probeType === 2 || this.probeType === 3){
      //   this.scroll.on('scroll', (position) => {
      //     this.$emit('scroll',position)
      //   })
      // }
      // //监听到底部上拉加载更多
      // if (this.pullUpLoad){
      //   this.scroll.on('pullingUp', () => {
      //     this.$emit('pullingUp')
      //   })
      // }
      setTimeout(this._initScroll, 20)
    },
    methods: {
      _initScroll() {
        //创建滚动 默认better-scroll是不能实时监听滚动位置 需要传第三个参数probeType
        // { probeType: 3 } 0和1都不侦测 2在手指滚动的过程中侦测,在手指离开就不侦测 , 3 只要在滚动就侦测  监听scroll
        // { probeType: 3 , cklic: true } cklic 默认为false 监听点击事件
        // { probeType: 3 , cklic: true , pullUpLoad: true } pullUpLoad 上拉监听默认为false  监听pullingUp
        this.scroll = new BScroll(this.$refs.wrapper,{
          probeType: this.probeType,
          click: this.click,
          pullUpLoad: this.pullUpLoad,
          useTransition:false,   //ios13 回弹问题
          // hasVerticalScroll:true
        })
        //监听滚动位置
        if (this.probeType === 2 || this.probeType === 3){
          this.scroll.on('scroll', (position) => {
            this.$emit('scroll',position)
          })
        }
        //监听到底部上拉加载更多
        if (this.pullUpLoad){
          this.scroll.on('pullingUp', () => {
            this.$emit('pullingUp')
          })
        }
      },
      //回到某个位置
      scrollTo(x, y , time = 300){
        //判断是否有值再往下执行 属于隐事BUG 有可能没值就传了进来了
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
        // this.scroll.scrollTo(x, y, time)
      },
      //上拉加载跟多完成后需要调用一次这个 告诉scroll这次上拉加载完成了
      finishedPullUp(){
        this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
      },
      //重新加载高度
      refresh(){
        this.scroll && this.scroll.refresh && this.scroll.refresh()
      }
    }
  }
</script>
<!-- scoped 作用域 只会针对当前的 如果没写就全局-->
<style scoped>
  .wrapper {
    overflow: hidden;
  }
</style>
