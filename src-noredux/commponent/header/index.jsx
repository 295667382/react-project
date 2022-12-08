import React, { useState,useEffect} from 'react'
import './index.less'
import memoryUtils from '../../utils/memoryUtils'
import { Button, Modal } from 'antd';
import { useNavigate,useLocation} from 'react-router-dom'
import Time from '../Time/time'
import storageUtils from '../../utils/storageUtils';
import {reqWeather} from '../../api/index';
import {menulist} from '../../config/menuConfig.js';

export default function Header()  {
  //动态获取user
  const user =memoryUtils.user.username
  const {pathname} = useLocation()
  //console.log("pathname",pathname)
  //判断在哪个页面
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username,setUsername]=useState()
  const handleExit=()=>{
    setIsModalOpen(true);
  }
  //用户点击确认后清除user的信息
  const handleOk=()=>{
    memoryUtils.user={}
    storageUtils.removeUser() 
    navigate("/login") 
  }
  //用户点击取消之后，消除弹框
  const handleCancel=()=>{
    setIsModalOpen(false)
  }
//获取user
  const getUser=()=>{
    const {username}=storageUtils.getUser()
    setUsername(username)

  }
  useEffect(() => {
    getUser() 
  }, []);
    return (
      
      <div className='header'>
        <div className='header-top'>
          <span>欢迎，{username}</span>
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

