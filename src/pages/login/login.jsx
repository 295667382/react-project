import React, { Component } from 'react'
import './login.less'
import logo from '../../assets/images/logo.png'

export default class login extends Component {
  render() {
    return (
      <div className="login">
        <div class="login-header">
            <img src={logo} alt="logo"/>
            <h1>React 项目: 后台管理系统</h1>

        </div>
        <section className='login-content'>
            <h3>用户登录</h3>
        </section>
      </div>
    )
  }
}
