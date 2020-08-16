import {debouce} from "./utils";
import BackTop from 'components/content/backTop/BackTop';
//回到顶部
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 1000)
    }
  }
}

//监听图片加载完成,防抖
export const itemListenerMixin = {
	data: function () {
		return {
			itemImgListener: null
		}
	},
	mounted() {

    let newRefresh = debouce(this.$refs.scroll.refresh, 500)
    this.itemImgListener = () => {
      newRefresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
  }
}
