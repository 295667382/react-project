import React, { Component } from 'react'

import { Layout} from 'antd';
import {Link,Navigate,Routes,Route} from 'react-router-dom'
import Header from '../../commponent/header';
import LeftNav from '../../commponent/left-nav';
import MemoryUtils from '../../utils/memoryUtils';
import Category from '../category/category';
import Role from '../role/role';


const { Footer, Sider, Content } = Layout;

  
export default class admin extends Component {
    
  render() {
    //实现不登陆不能进入到此页面
    const user= MemoryUtils.user
    console.log("我现在的user._id",user._id)
    if(!user._id){
        console.log("路由到登陆页面")
        return <Navigate to='/login'/>
    }
    return (
        <Layout style={{height:'100%'}}>
        <Sider>
        <LeftNav/>
            
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{backgroundColor: 'white'}}>
            <Link to="role">role</Link>
            aaaa
          <Routes>
           {/*  <Route path="/category" element={<Category/>}></Route> */}
            <Route path="/role" element={<Role/>}></Route>
 
            </Routes>
          </Content>
          <Footer style={{textAlign: 'center', color: '#aaaaaa'}}>推荐使用谷歌浏览器，可以获得最佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}
