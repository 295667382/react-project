
import React, { useState,useEffect} from 'react'
import { Button, Menu } from 'antd';
import './index.less'
import { Link, useNavigate,useLocation} from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig';
import storageUtils from '../../utils/storageUtils';
import {setHeadTitle} from '../../redux/actions'
import {connect} from 'react-redux'


function LeftNav(props){
  console.log("props",props)
  const location = useLocation()
  const navigate = useNavigate()
  const [roleList,setRoleList]=useState([])
  const path=location.pathname
  
  useEffect(() => {
    getMenuList(menuList)
  }, []);
  const getMenuList=(menuList)=>{
    const {role}=storageUtils.getUser()
    const {menus}=role
    console.log("该用户自己的权限",menus,"所有的菜单列表",menuList)
    menuList.map((item)=>{
      if(menus.indexOf(item.key)!==-1){
        
        console.log("成功匹配",item.key)
        if(menus.indexOf(item.key)!==-1){
          item['ishow']="true"
        }
      }else if(item.children){
        console.log("虽然没有匹配，但是我有孩子")
        const children=item.children
        children.map((sonitem)=>{
          if(menus.indexOf(sonitem.key)!==-1){
            sonitem['ishow']="true"
          }
        })

      }
    })
    console.log("menulist",menuList)
    //获取show为true的值  
  }
  const handleClick=({ item, key, keyPath, domEvent })=>{
    console.log("==============item===========",item,
    "==============key==============:",key,"==============keyPath==============:",keyPath,"==============domEvent==============",domEvent)
    const {title}=item.props
   /*  console.log("title",title) */
    navigate(key)
    props.setHeadTitle(title)
    
    
    

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
        items={menuList}
      /> 
    </div>
    )
  }
  export default connect(
    state => ({user: state.user}), {setHeadTitle}
    )(LeftNav)