import React, { useState,useEffect} from 'react'
import './index.less'
import memoryUtils from '../../utils/memoryUtils'
import { Button, Modal } from 'antd';
import { useNavigate,} from 'react-router-dom'
import Time from '../Time/time'
import storageUtils from '../../utils/storageUtils';
import {reqWeather} from '../../api/index'


export default function Header()  {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleExit=()=>{
    setIsModalOpen(true);
  }
  const handleOk=()=>{
    console.log("===handleOk===")
    memoryUtils.user={}
    storageUtils.removeUser() 
    navigate("/login") 
    
  }
  const handleCancel=()=>{
    setIsModalOpen(false)
  }
  // 相当于 componentDidMount 和 componentDidUpdate:
 /*  useEffect(async() => {
    // 使用浏览器的 API 更新页面标题
    const response =await reqLogin(101010100)
    console.log("reqLogin",reqLogin("101010100"))
  }); */
  useEffect(() => {
    console.log("获取数据")
    async function fetchData() {
      console.log("fetchData")
      // You can await here
     /*  const response = await reqWeather(101010100) */
      // ...
    }
    fetchData();
   
    
  }, []);
   
 

    return (
      <div className='header'>
        <div className='header-top'>
          <span>欢迎，admin</span>
          <span className="quit" onClick={handleExit}>退出</span>
          <Modal  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        是否确认退出？
        </Modal>
        </div>
        <div className='header-bottom'>
         <div className="header-bottom-left">
          首页
         </div>
         <div className="header-bottom-right">
          <Time/>
         </div>
         <div className='weather'>weather</div>
         
        </div>
       
      
      </div>
    )
  }

