import {requestPost} from "./request"

export function loginAction(data){
  return requestPost({
    url: '/login/loginAction'
  },data)
}

export function codeAction(data){
  return requestPost({
    url: '/login/codeAction'
  },data)
}
