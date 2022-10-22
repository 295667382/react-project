import React, {Component} from 'react'
import {Routes, Route,Link} from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import './App.less'


class App extends Component{
  render(){
    return (
      <div className='app'>
       {/*  <Link to="/">admin</Link>
        <Link to="/login">login</Link> */}
       {/*  新版本路由不使用switch，替代使用Routes，同时需要将component改成element */}
        <Routes>
        <Route path="/" element={<Admin/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        </Routes>
      </div>
    )
  }
}
export default App

