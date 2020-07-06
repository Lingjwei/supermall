<template>
  <div id="profile">
    <nav-bar class="nav-bar"><div slot="center">我的档案</div></nav-bar>
    <!--<user-info/>-->
    <!--<account-info/>-->
    <!--<normal-list-view :list-data="orderList"/>-->
    <!--<normal-list-view :list-data="serviceList"/>-->
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: "Profile",
    components: {
      NavBar
    },
    data() {
    	return {

      }
    }
  }
</script>

<style scoped>
  #profile {
    background-color: #f2f2f2;
  }
  
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
