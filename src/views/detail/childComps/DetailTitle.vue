<template>
  <div class="recommend">
    <div class="r-left">
    </div>
    <div class="r-content">
      {{title}}
    </div>
    <div class="r-right">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailTitle",
    props: {
      title: String
    }
  }
</script>

<style scoped>
  /*  推荐*/
  .recommend {
    display: flex;
    padding-bottom: 10px;
    height: 50px;
  }
  .r-left, .r-right{
    border-bottom: 1px solid #666;
    /*width: 100px;*/
    height: 25px;
  }
  .r-left{
    text-align: right;
  }
  .r-right{
    text-align: left;
  }
  .r-content {
    flex: 1;
    text-align: center;
    font-size: 18px;
    line-height: 50px;
  }
</style>
