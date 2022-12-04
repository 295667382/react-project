/* 定义包含n个借口的函数的模块 */
import ajax from "./ajax";
import jsonp from 'jsonp'

/* const BASE='/api' */
const BASE=''
//1-登陆
export const reqLogin=(username,password)=>ajax(BASE+'/login',{username,password},'POST')

/* ## 2. 添加用户

### 请求URL：
	http://localhost:5000/manage/user/add

### 请求方式：
	POST

### 参数类型
	|参数		|是否必选 |类型     |说明
	|username    |Y       |string   |用户名
	|password    |Y       |string   |密码
	|phone       |N       |string   |手机号
	|email       |N       |string   |邮箱 
    |role_id     |N       |string   |角色ID
    */
export const reqAddUser=(username,password,phone,email,role_id)=>ajax(BASE+'/manage/user/add',
    {username:username,
    password:password,
    phone:phone,
    email:email,
    role_id:role_id},'POST')


/* 
    ## 3. 更新用户
    ### 请求URL：
        http://localhost:5000/manage/user/update
    
    ### 请求方式：
        POST
    
    ### 参数类型
    
        |参数		|是否必选 |类型     |说明
        |_id         |Y       |string   |ID
        |username    |N       |string   |用户名
        |phone       |N       |string   |手机号
        |email       |N       |string   |邮箱
        |role_id     |N       |string   |角色ID */

export const reqUpdateUser=(_id,username,phone,email,role_id)=>ajax(BASE+'/manage/user/update',
    {
    _id:_id,
    username:username,
    phone:phone,
    email:email,
    role_id:role_id
    },'POST')

/* ## 4. 获取所有用户列表
### 请求URL：
	http://localhost:5000/manage/user/list

### 请求方式：
	GET */
export const reqGetAllUsers=()=>ajax(BASE+'/manage/user/list',{},'GET')

/*     ## 5. 删除用户
    ### 请求URL：
        http://localhost:5000/manage/user/delete
    
    ### 请求方式：
        POST
    
    ### 参数类型:
    
        |参数		|是否必选 |类型     |说明
        |userId     |Y       |string   |用户ID     */
export const reqDeleteUser=(userId)=>ajax(BASE+'/manage/user/delete',
    {userId:userId},'POST')

    

//6-获取一级或某个二级分类列表  reqCategorys  parentId为父级的id

export const reqCategorys=(parentId)=>ajax(BASE+'/manage/category/list',{parentId:parentId},'GET')

//删除分类类别 _id（_id）
export const reqDeleteCategory=(_id)=>ajax(BASE+'/manage/category/delete',{_id:_id},'POST')

//添加分类 reqAddCategory
export const reqAddCategory= (parentId,categoryName)=>ajax(BASE+'/manage/category/add',{parentId:parentId,categoryName:categoryName},'POST')

//更新品类名称 reqUpdateCategory   
//categoryId 父级分类的ID
//categoryName  名称
export const reqUpdateCategory=(categoryId,categoryName)=>ajax(BASE+'/manage/category/update',{categoryId:categoryId,categoryName:categoryName},'POST')



/* 9- 根据分类ID获取分类
### 请求URL：
    http://localhost:5000/manage/category/info
### 请求方式：
    GET
### 参数类型:
    |参数		|是否必选 |类型     |说明
    |categoryId    |Y       |string   |父级分类的ID */
export const reqIdGetCategory=(categoryId)=>ajax(BASE+'/manage/category/info',{categoryId:categoryId},'GET')
//10-获取商品列表
/* ### 请求URL：
    http://localhost:5000/manage/product/list
### 请求方式：
   GET
### 参数类型:
    |参数		|是否必选 |类型     |说明
    |pageNum    |Y       |Number   |页码
    |pageSize   |Y       |Number   |每页条目数 */
export const reqGetProduct=(pageNum,pageSize)=>ajax(BASE+'/manage/product/list',{pageNum:pageNum,pageSize:pageSize},'GET')


//11-根据ID/Name搜索产品分页列表
/* |参数		|是否必选 |类型     |说明
|pageNum       |Y       |Number   |页码
|pageSize      |Y       |Number   |每页条目数
|productName   |N       |String   |根据商品名称搜索
|productDesc   |N       |String   |根据商品描述搜索 */

export const reqSearchCategory=(pageNum,pageSize,productName,productDesc)=>ajax(BASE+'/manage/product/search',{pageNum:pageNum,pageSize:pageSize,productName:productName,productDesc:productDesc},'GET')
/* ## 12. 添加商品
### 请求URL：
    http://localhost:5000/manage/product/add

### 请求方式：
    POST

### 参数类型:
    |参数		       |是否必选 |类型     |说明
    |categoryId    |Y       |string   |分类ID
    |pCategoryId   |Y       |string   |父分类ID
    |name          |Y       |string   |商品名称
    |desc          |N       |string   |商品描述
    |price         |N       |string   |商品价格
    |detail        |N       |string   |商品详情
    |imgs          |N       |array   |商品图片名数组 */

export const reqAddProduct=(categoryId,pCategoryId,name,desc,price,detail,imgs,categoryName,pCategoryName)=>ajax(BASE+'/manage/product/add',{
    categoryId:categoryId,
    pCategoryId:pCategoryId,
    name:name,
    desc:desc,
    detail:detail,
    price:price,
    imgs:imgs,
    categoryName:categoryName,
    pCategoryName:pCategoryName
},'POST')


/* ## 13. 更新商品
### 请求URL：
    http://localhost:5000/manage/product/update

### 请求方式：
    POST

### 参数类型:
    |参数		       |是否必选 |类型     |说明
    |_id           |Y       |string   |商品ID
    |categoryId    |Y       |string   |分类ID
    |pCategoryId   |Y       |string   |父分类ID
    |name          |Y       |string   |商品名称
    |desc          |N       |string   |商品描述
    |price         |N       |string   |商品价格
    |detail        |N       |string   |商品详情
    |imgs          |N       |array   |商品图片名数组 */

export const reqUpdateProduct=(_id,categoryId,pCategoryId,name,desc,price,detail,imgs,categoryName,pCategoryName)=>ajax(BASE+'/manage/product/update',{
    _id:_id,
    categoryId:categoryId,
    pCategoryId:pCategoryId,
    name:name,
    desc:desc,
    detail:detail,
    price:price,
    imgs:imgs,
    categoryName:categoryName,
    pCategoryName:pCategoryName
},'POST')

/* ## 14. 对商品进行上架/下架处理
### 请求URL：
    http://localhost:5000/manage/product/updateStatus

### 请求方式：
    POST

### 参数类型:

    |参数		      |是否必选 |类型     |说明
    |productId    |Y       |string   |商品名称
    |status       |Y       |number   |商品状态值

### 返回示例：
    {
      "status": 0
    }
 */
 
export const reqchangeProductstatus=(productId,status)=>ajax(BASE+'/manage/product/updateStatus',{productId:productId,status:status},'POST')

/* 
## 15. 上传图片
### 请求URL：
    http://localhost:5000/manage/img/upload

### 请求方式：
    POST

### 参数类型:

    |参数		|是否必选 |类型     |说明
    |image  |Y       |文件   |图片文件 */


/* 
## 17. 添加角色

    ### 请求URL：
        http://localhost:5000/manage/role/add
    
    ### 请求方式：
        POST
    
    ### 参数类型:
        |参数		     |是否必选 |类型     |说明
        |roleName    |Y       |string   |角色名称 */
export const reqAddRole=(roleName)=>ajax(BASE+'/manage/role/add',{roleName:roleName},'POST')



/*  ## 18. 获取角色列表
    ### 请求URL：
        http://localhost:5000/manage/role/list
    
    ### 请求方式：
        GET */
export const reqGetRolelist=()=>ajax(BASE+'/manage/role/list',{},'GET')

/* ## 19. 更新角色(给角色设置权限)
### 请求URL：
    http://localhost:5000/manage/role/update

### 请求方式：
    POST

### 参数类型:
  
    |参数		     |是否必选  |类型     |说明
    |_id          |Y       |string   |角色ID
    |menus        |Y       |array    |权限key数组
    |auth_time    |Y       |number   |权限时间
    |auth_name    |Y       |string   |权限人姓名 */



export const reqUpdateRole=(_id,menus,auth_time,auth_name)=>ajax(BASE+'/manage/role/update',{
    _id:_id,
    menus:menus,
    auth_name:auth_name,
    auth_time:auth_time
},'POST')



//22-删除商品 /manage/product/delete
export const reqDeleteProduct=(_id)=>ajax(BASE+'/manage/product/delete',{_id:_id},'POST')



//23）删除角色  http://localhost:5000/manage/role/delete POST _ID
export const reqDeleteRole=(_id)=>ajax('/api/manage/role/delete',{_id:_id},'POST')

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
<<<<<<< HEAD
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



=======
   `https://devapi.qweather.com/v7/weather/now?location=${city}&key=0c7e0798d4bc4525a418ac399b34637f`
    return new Promise((resolve, reject) => { jsonp(url, {
    param: 'callback'
    }, (error, response) => {
    if (!error && response.status == 'success') {
       // console.log("返回来的天气数据",response)
    //const {dayPictureUrl, weather} = response.results[0].weather_data[0] resolve({dayPictureUrl, weather})
    } else { alert('获取天气信息失败')
    } })
 }) }
>>>>>>> temp
