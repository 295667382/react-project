import React, { Component } from 'react'

import { Button, Menu } from 'antd';
import './index.less'
import { Link, useNavigate,useLocation} from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import {items} from '../../config/menuConfig.js'

function LeftNav(){
  const location = useLocation()
  const navigate = useNavigate()
  console.log("location",location)
  const path=location.pathname
  const handleClick=(e)=>{
    const key=e.key
    navigate(key)
  }
    return (
    <div  className='left-nav'>
        <Link to="/" className='left-nav-header'>
            <img alt="logo" src={logo}/>
            <h1>后台</h1>
        </Link>
        <Menu
        selectedKeys={path}
        mode="inline"
        theme="dark"
        onClick={handleClick}
        items={items}
      /> 
    </div>
    )
  }
export default LeftNav;