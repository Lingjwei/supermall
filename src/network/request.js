import axios from 'axios'

export function request(config, success, failure) {
  // const insetdata1 = axios.create({
  //   baseURL : 'http://123.207.32.32:8000',
  //   timeout : 5000
  // })
  //
  // insetdata1(config)
  //   .then(res => {
  //     success(res);
  //   })
  //   .catch(err => {
  //     failure(err)
  //   })
  //Promise 封装
  // return new Promise((resolve, reject) => {
  //   const insetdata1 = axios.create({
  //     baseURL : 'http://123.207.32.32:8000',
  //     timeout : 5000
  //   })
  //   insetdata1(config)
  //     .then(res => {
  //       resolve(res);
  //     })
  //     .catch(err => {
  //       reject(err)
  //     })
  //   // return insetdata1(config)
  // })
  //最后简洁封装
  const insetdata1 = axios.create({
    baseURL : 'http://123.207.32.32:8000',
    timeout : 5000
  })
  
  //axios拦截器 写axios就是全局
  insetdata1.interceptors.request.use(config => {
    // console.log(config)
    //1.比如说config的信息不符合服务器要求
    //2.比如每次发送网络请求时,都希望在界面里显示一个请求图标
    //3.某些网络请求(比如登录(token)),必须携带一些特殊信息
    return config
  },err => {
    // console.log(err)
  })
  
  //axios响应拦截
  insetdata1.interceptors.response.use(res => {
    // console.log(res)
    return res.data
  },err => {
    console.log(err)
  })
  
  return insetdata1(config)
}
//多个ip使用
// export function insetdata2(config) {
//   const insetdata2 = axios.create({
//     baseURL : 'http://xxxxxx.com',
//     timeout : 5000
//   })
//
//   insetdata2(config)
//     .then(res => {
//       success(res);
//     })
//     .catch(err => {
//       failure(err)
//     })
// }