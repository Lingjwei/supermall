import {requestPost} from "./request"

export function codeAction(data){
  return requestPost({
    url: '/register/codeAction'
  },data)
}

export function registerAction(data){
  return requestPost({
    url: '/register/registerAction'
  },data)
}
