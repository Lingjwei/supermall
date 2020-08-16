<template>
  <div>
    <nav-bar>
      <div slot="left">
        <img src="~assets/img/common/back.svg" alt="" class="back" @click="backGo">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in title" class="title-item" @click="tabActive(index)" :class="{ active : activeIndex === index}">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  //导入公共导航栏
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: "DetailNavBar",
    //挂载组件
    components: {
      NavBar
    },
    data() {
      return {
        title : ['商品','店铺','详情','推荐'],
        activeIndex : 0
      }
    },
    methods: {
      tabActive(index){
        this.activeIndex = index
        //把indedx发射出去
        this.$emit('titleClick',index)
      },
      backGo(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .back {
    margin-top: 12px;
  }
  .title{
    /*均等分*/
    display: flex;
  }
  .title-item{
    flex: 1;
    font-size: 14px;
  }
  .title-item.active{
    color: var(--color-high-text);
  }
</style>
