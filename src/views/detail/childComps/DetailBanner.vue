<template>
  <div class="deta-banner" v-if="topImages.length">
    <swiper>
      <swiper-item  v-for="(item, index) in topImages" class="swiper-item">
        <img :src="item" alt="" >
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "DetailBanner",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImages: Array
    }
  }
</script>

<style scoped>
.swiper-item{
  height: 280px;
}
</style>
