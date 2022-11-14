/* 定义包含n个借口的函数的模块 */
import ajax from "./ajax";
import jsonp from 'jsonp'

//const BASE=''
//登陆
export const reqLogin=(username,password)=>ajax('/api/login',{username,password},'POST')


//获取一级或某个二级分类列表  reqCategorys  parentId为父级的id

export const reqCategorys=(parentId)=>ajax('/api/manage/category/list',{parentId:parentId},'GET')

//删除分类类别 _id（_id）
export const reqDeleteCategory=(_id)=>ajax('/api/manage/category/delete',{_id:_id},'POST')

//添加分类 reqAddCategory
export const reqAddCategory= (parentId,categoryName)=>ajax('/api/manage/category/add',{parentId:parentId,categoryName:categoryName},'POST')

//更新品类名称 reqUpdateCategory   
//categoryId 父级分类的ID
//categoryName  名称
export const reqUpdateCategory=(categoryId,categoryName)=>ajax('/api/manage/category/update',{categoryId:categoryId,categoryName:categoryName},'POST')


//获取商品列表
/* ### 请求URL：
    http://localhost:5000/manage/product/list
### 请求方式：
   GET
### 参数类型:
    |参数		|是否必选 |类型     |说明
    |pageNum    |Y       |Number   |页码
    |pageSize   |Y       |Number   |每页条目数 */
export const reqGetProduct=(pageNum,pageSize)=>ajax('/api/manage/product/list',{pageNum:pageNum,pageSize:pageSize},'GET')

/* 9- 根据分类ID获取分类
### 请求URL：
    http://localhost:5000/manage/category/info
### 请求方式：
    GET
### 参数类型:
    |参数		|是否必选 |类型     |说明
    |categoryId    |Y       |string   |父级分类的ID */
export const reqIdGetCategory=(categoryId)=>ajax('/api/manage/category/info',{categoryId:categoryId},'GET')


//11-根据ID/Name搜索产品分页列表
/* |参数		|是否必选 |类型     |说明
|pageNum       |Y       |Number   |页码
|pageSize      |Y       |Number   |每页条目数
|productName   |N       |String   |根据商品名称搜索
|productDesc   |N       |String   |根据商品描述搜索 */

export const reqSearchCategory=(pageNum,pageSize,productName,productDesc)=>ajax('/api/manage/product/search',{pageNum:pageNum,pageSize:pageSize,productName:productName,productDesc:productDesc},'GET')


//https://devapi.qweather.com/v7/weather/now?location=101010100&key=0c7e0798d4bc4525a418ac399b34637f
export function reqWeather(city) { const url =
   // `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p4 9MVra6urFRGOT9s8UBWr2`
   `https://devapi.qweather.com/v7/weather/now?location=${city}&key=0c7e0798d4bc4525a418ac399b34637f`
    return new Promise((resolve, reject) => { jsonp(url, {
    param: 'callback'
    }, (error, response) => {
    if (!error && response.status == 'success') {
        console.log("返回来的天气数据",response)
    //const {dayPictureUrl, weather} = response.results[0].weather_data[0] resolve({dayPictureUrl, weather})
    } else { alert('获取天气信息失败')
    } })
    }) }