<template>
  <div class="tab-control">
    <!--    :class 动态绑定class-->
    <div v-for="(item, index) in title" class="tab-control-item" :class="{active: index === currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props:{
      title : {
        type : Array,
        default(){
          return ['精品', '新品', '热卖']
        }
      }
    },
    data() {
      return {
        currentIndex : 0
      };
    },
    methods: {
      itemClick(index){
        this.currentIndex = index
        //把子组件点击的事件传出去  内部向外传送是用emit 外部向内是props
        this.$emit('tabClick',index)
      }
    }
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background: #fff;
  }
  .tab-control-item{
    flex: 1;
  }
  .tab-control-item span{
    padding: 3px;
  }
  .active{
    color: var(--color-high-text);

  }
  .active span{
    border-bottom: 3px solid var(--color-high-text);
  }
</style>
