<template>
  <div class="login-div">
    <div class="login-img"><img src="~assets/img/common/placeholder.png" alt=""></div>
    <div class="login-input" v-show="ishashow">
      <input ref="phone" type="text" name="phone" v-model="phone" placeholder="请输入手机号">
      <input type="password" name="password" v-model="password" placeholder="请输入密码">
    </div>
    <div class="login-input" v-show="!ishashow">

      <input type="text" name="phone" v-model="phone" placeholder="请输入手机号">

      <div>
        <span class="login-yzm" @click="getCode" :disabled="codeDisabled">{{codeMsg}}</span>
        <input type="text" name="code" v-model="code" placeholder="请输入验证码">
      </div>
    </div>
    <div class="login-button" @click="_loginAction">登 录</div>
    <div class="login-type">
      <span class="login-type-l" v-show="ishashow"  @click="show">手机号验证登录</span>
      <span class="login-type-l" v-show="!ishashow" @click="show">手机号密码登录</span>
      <span class="login-type-r" @click="registerAction">新用户注册</span>
    </div>
  </div>
</template>

<script>
  import {loginAction, codeAction} from 'network/login'
  export default {
    name: "loginInfo",
    data () {
      return {
        phone:'',
        password:'',
        countdown:60,
        codeMsg:'获取验证码',
        codeDisabled:true,
        code:'',
        ishashow: true
      }
    },
    mounted() {
      // this.$refs.phone.focus()
    },
    methods:{
      _loginAction(){
        let data = {}
        if (this.ishashow){
          data.type = 0
        }else{
          data.type = 1
        }
        data.phone = this.phone
        data.password = this.password
        data.code = this.code

        loginAction(data).then(res => {
          if (res.data.code == 200){

            this.$store.state.__token__ = res.data.token

            this.$router.push({path: '/'})

          }

          this.$toast({message: res.data.data})
        })
      },
      show(){
        this.ishashow = !this.ishashow
      },
      registerAction(){
        this.$router.push({path: '/register'})
      },
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
  .login-div{
    width: 100%;
    height: 100%;
    padding:60px 20px;

  }
  .login-img{
    width: 120px;
    height: 120px;
    margin-right: auto;
    margin-left: auto;
  }
  .login-img img{
    width: 120px;
    height: 120px;
  }
  .login-input{
    margin-top: 50px;
  }
  .login-input input{
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
  .login-button{
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
  .login-yzm{
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
  .login-type{
    margin-top: 20px;
    color: #5c6b77;
  }
  .login-type-l{
    position: absolute;
    left: 20px;
  }
  .login-type-r{
    position: absolute;
    right: 20px;
  }
</style>
