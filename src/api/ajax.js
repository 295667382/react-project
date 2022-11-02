import axios from 'axios'
import { message } from 'antd'

export default function ajax(url,data={},method='GET'){
    console.log("daolema ")
    return new Promise(function(resolve,reject){
        let promise
        if (method==='GET') {
           promise= axios.get(url,{params:data})
        }else{
            promise=axios.post(url,data)
        }
        promise.then(response=>{
            resolve(response.data)
        }).catch(error=>{
           // reject('请求错误:'+error.message)
           message.error('请求出错了'+error.message)
        })

    })

}