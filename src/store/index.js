import Vue from 'vue'
import Vuex from 'vuex'

//安装插件
Vue.use(Vuex)

//创建对象
const store = new Vuex.Store({
  //放入数据,数据源
  state:{
  
  },
  //更新/修改state的数据
  mutations:{
  
  },
  //异步操作
  actions:{
  
  },
  //一般用于state数据处理后的结果返回
  getters:{
  
  },
  //划分模块state
  modules:{
    a:{
      state:{
    
      },
      //更新/修改state的数据
      mutations:{
    
      },
      //异步操作
      actions:{
    
      },
      //一般用于state数据处理后的结果返回
      getters:{
    
      },
    },
    b:{
      state:{
    
      },
      //更新/修改state的数据
      mutations:{
    
      },
      //异步操作
      actions:{
    
      },
      //一般用于state数据处理后的结果返回
      getters:{
    
      },
    }
  }
  
})

//导出store独享
export default store


