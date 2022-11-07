/* 定义包含n个借口的函数的模块 */
import ajax from "./ajax";
import jsonp from 'jsonp'

//const BASE=''

export const reqLogin=(username,password)=>ajax('/api/login',{username,password},'POST')

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