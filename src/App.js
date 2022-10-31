import React, { Component } from 'react'
import './App.less';
import {Button, message} from 'antd'
import { Link,BrowserRouter,Routes,Route} from 'react-router-dom'
import Admin from './pages/admin/admin'
import Login from './pages/login/login'

class App extends Component() {
  render() {
    return (
      <div className="app">
        <Routes>
          <Route path="/" element={<Admin/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
      </div>
      
      
    );
  }
  
}

export default App;
