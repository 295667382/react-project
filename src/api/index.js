/* 定义包含n个借口的函数的模块 */
import ajax from "./ajax";
//const BASE=''

export const reqLogin=(username,password)=>ajax('/api/login',{username,password},'POST')