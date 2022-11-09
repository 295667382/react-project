/* 定义包含n个借口的函数的模块 */
import ajax from "./ajax";
import jsonp from 'jsonp'

//const BASE=''

export const reqLogin=(username,password)=>ajax('/api/login',{username,password},'POST')

//获取分类
export const reqCategorys=(parentId)=>ajax('/api/manage/category/list',{parentId:parentId})

//添加分类POST
export const reqAddCategory=(parentId,categoryName)=>ajax('/api/manage/category/add',{parentId,categoryName},'POST')

//删除分类
export const reqDeleteCategory=(_id)=>ajax('/api/manage/category/delete',{_id:_id},'POST')

//更新品类名称
export const reqUpdateCategory=(categoryId,categoryName)=>ajax('/api/manage/category/update',{categoryId,categoryName},'POST')
//https://devapi.qweather.com/v7/weather/now?location=101010100&key=0c7e0798d4bc4525a418ac399b34637f
export function reqWeather(city,options) { 
    const { timeout } = options;
   // `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p4 9MVra6urFRGOT9s8UBWr2`
   //`https://devapi.qweather.com/v7/weather/now?location=${city}&key=0c7e0798d4bc4525a418ac399b34637f`
   return new Promise((resolve, reject) => {
    let funcName = `jsonp${Date.now()}`
    let time =  null, scriptNode;
    window[funcName] = function(data) {
        if (timeout) clearTimeout(time);
        resolve(data);
        // 很重要的性能优化点
        // 清除本次请求产生的回调函数和script标签
        delete window[funcName];
        document.body.removeChild(scriptNode);
      }
      const url=`https://devapi.qweather.com/v7/weather/now?location=${city}&key=0c7e0798d4bc4525a418ac399b34637f`
      scriptNode = document.createElement('script');
      scriptNode.src = `${url}?callback=${funcName}`;
      document.body.appendChild(scriptNode);
      time = setTimeout(() => {
        reject('network err, timeout')
      }, timeout)
      scriptNode.onerror = function(err) {
        reject(err);
      }
   })
}



