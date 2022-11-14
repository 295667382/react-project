import React, { Component } from 'react'

import { Layout} from 'antd';
import {Link,Navigate,Routes,Route} from 'react-router-dom'
import Header from '../../commponent/header';
import LeftNav from '../../commponent/left-nav';
import MemoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import Category from '../category/category';
import Role from '../role/role';
import Home from '../home/home';
import Bar from '../charts/bar';
import Line from '../charts/line'
import Pie from '../charts/pie'
import Product from '../product/product';
import User from '../user/user'
import ProductDetail from '../product/detail';
import ProductAddUpdate from '../product/add-update'


const { Footer, Sider, Content } = Layout;


export default class admin extends Component {
    
  render() {
    //实现不登陆不能进入到此页面
    MemoryUtils.user=storageUtils.getUser()
    const user= MemoryUtils.user
    console.log("我现在的user._id",user._id)
    if(!user._id){
        console.log("路由到登陆页面")
        return <Navigate to='/login'/>
        
    }
    return (
        <Layout style={{height:'100%'}}>
        <Sider>
        <LeftNav />
            
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{backgroundColor: '#fafafa',padding:'20px'}}>            
          <Routes>
            <Route path="/home" element={<Home/>}></Route>
            <Route path="/category" element={<Category/>}></Route> 
           {/*  product的主页面，更新页面及细节页面 */}
            <Route path="/product" element={<Product/>}></Route>
            <Route path="product/detail" element={<ProductDetail/>}></Route> 
            <Route path="product/addupdate" element={<ProductAddUpdate/>}></Route> 
            <Route path="/role" element={<Role/>}></Route>
            <Route path="/user" element={<User/>}></Route>
            <Route path="/charts/bar" element={<Bar/>}></Route>
            <Route path="/charts/Line" element={<Line/>}></Route>
            <Route path="/charts/Pie" element={<Pie/>}></Route>

            </Routes>
          </Content>
          <Footer style={{textAlign: 'center', color: '#aaaaaa'}}>推荐使用谷歌浏览器，可以获得最佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}
