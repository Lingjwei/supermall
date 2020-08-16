<template>
  <div class="register">
    <!-- 导航 -->
    <nav-bar class="home-nav">
      <div slot="left">
        <img src="~assets/img/common/back.svg" alt="" class="back" @click="loadgo">
      </div>
      <div slot="center">注册</div>
      <div slot="right"></div>
    </nav-bar>
    <div class="register-div">
      <div class="register-input">
        <input type="text" name="phone" v-model="phone" placeholder="请输入手机号">
        <input type="password" name="password" v-model="password" placeholder="请输入密码">
        <div>
          <span class="register-yzm" @click="getCode" :disabled="codeDisabled">{{codeMsg}}</span>
          <input type="text" name="code" v-model="code" placeholder="请输入验证码">
        </div>

      </div>

      <div class="register-button" @click="_registerAction">注 册</div>

    </div>
  </div>
</template>

<script>
  //头底部导航栏组件
  import NavBar from 'components/common/navbar/NavBar'

  import {codeAction, registerAction} from 'network/register'

  export default {
    name: "Register",
    components: {
      NavBar
    },
    data() {
      return{
        timer:'',
        phone:'',
        password:'',
        countdown:60,
        codeMsg:'获取验证码',
        codeDisabled:true,
        code:'',
      }
    },
    methods: {
      getCode(){
        if(this.phone !=='' ){

          var reg = /^1[13456789]\d{9}$/;
          if(!reg.test(this.phone)){
            this.$toast({message: '手机号输入错误'})
          }

          this.codeDisabled = true;
          let data = {
            phone:this.phone
          }
          codeAction(data).then(res=>{
            if(res.data.code == 200){
              this.$toast({message: '发送成功您的验证码为'+res.data.msg },1000)
              if(!this.timer){
                this.timer = setInterval(()=>{
                  if(this.countdown>0&& this.countdown<=60){
                    this.countdown -- ;
                    if(this.countdown !== 0){
                      this.codeDisabled = true;
                      this.codeMsg = '重新发送('+this.countdown+')';
                    }else{
                      clearInterval(this.timer);
                      this.codeMsg  = "获取验证码";
                      this.countdown  = 60;
                      this.timer = null;
                      this.codeDisabled  = false;
                    }
                  }
                },1000)
              }
            }else{
              this.$toast({message: res.data.data})
              this.codeDisabled  = false;
            }
          })
        }else{
          this.$toast({message: '请输入手机号'})
        }
      },
      _registerAction(){
        let data = {
          phone:this.phone,
          password:this.password,
          code:this.code
        }
        registerAction(data).then(res=>{
          if (res.data.code == 200){

            this.$store.state.__token__ = res.data.token

            this.$router.push({path: '/'})

          }

          this.$toast({message: res.data.data})
        })
      },
      loadgo(){
          this.$router.back()
      },
    }
  }
</script>

<style scoped>

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition-delay: 99999s;
    transition: color 99999s ease-out, background-color 99999s ease-out;
    -webkit-transition-delay: 99999s;
    -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
    -webkit-text-fill-color: #807c7c;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    z-index: 9;
    font-size: 20px;
  }
  .back{
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    left: 10px;
    margin-top: -12px;
  }
  .register{
    width: auto;
  }
  .register-div{
    width: 100%;
    height: 100%;
    padding:0 20px;

  }
  .register-img{
    width: 120px;
    height: 120px;
    margin-right: auto;
    margin-left: auto;
  }
  .register-yzm{
    display: inline-block;
    width: 90px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    border-radius: 20px;
    background: #e6e6e64d;
    color: var(--color-high-text);
    font-size: 14px;
    position: absolute;
    right: 20px;
    margin-top: 5px;

  }
  .register-img img{
    width: 120px;
    height: 120px;
  }
  .register-input{
    margin-top: 50px;
  }
  .register-input input{
    width: 100%;
    outline:none;
    border:0px;
    display:block;
    margin-left:auto;
    margin-right:auto;
    margin-top: 20px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ee8888;
    background: #f9f9f9;
  }
  .register-button{
    margin-top: 20px;
    width: 100%;
    height: 50px;
    border-radius: 5rem;
    background: #fa8888;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    color: #ffffff;
  }
  .register-type{
    margin-top: 20px;
    color: #5c6b77;
  }
  .register-type-l{
    position: absolute;
    left: 20px;
  }
  .register-type-r{
    position: absolute;
    right: 20px;
  }
</style>
