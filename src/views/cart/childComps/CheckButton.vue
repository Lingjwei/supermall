<template>
    <div>
      <span class="icon-selector" :class="{'selector-active': checked}" @click="selectItem">
        <img src="~/assets/img/cart/tick.svg" alt="">
      </span>
    </div>
</template>

<script>
	export default {
		name: "CheckButton",
    props: {
		  value: {
		    type: Boolean,
        default: false
      }
    },
    data: function () {
		  return {
		    checked: this.value
      }
    },
    methods: {
      selectItem: function () {
        this.$emit('checkBtnClick')
      }
    },
    watch: {
		  value: function (newValue) {
        this.checked = newValue;
      }
    }
	}
</script>

<style scoped>
  .icon-selector {
    position: relative;
    margin: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ff8198;
    cursor: pointer;
    background: #ffffff;
  }
  .icon-selector img{
    vertical-align: middle;
    margin-top: -0.1rem;
    width: 4.5vw;
    height: 4.5vw;
  }

  .selector-active {
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>
