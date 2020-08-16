<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.icon" alt="">
        <span class="text-span">{{item.menu_name}}</span>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommends: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    margin-top: 10px;
    flex-shrink: 0;
    font-size: 14px;
    padding-bottom: 30px;
    border-bottom: 10px solid #eee;
  }

  .recommend-item {
    flex: 1;
    text-align: center;
    flex-shrink: 0;
  }

  .recommend img {
    width: 5rem;
    height: 5rem;
    margin-bottom: 10px;
  }

  .text-span{
    display: inline-block;
  }
</style>
