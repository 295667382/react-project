import React, { Component } from 'react'
import { Button, Form, Input} from 'antd';
import './login.less'
import logo from './image/logo.png'


export default class Login extends Component {
    formRef = React.createRef();
    render() {
    
    //console.log("this.props",this.props)
    const handleSubmit=(value)=>{
        console.log(value) 
        console.log("this.formRef",this.formRef) 
         
    }
    return (
       
      <div className="login">
            <header className='login-header'>
                <img src={logo} alt="biaoti"/>
                <h1>React项目:后台管理系统</h1>  
            </header>
        <section className="login-content">
            <h2>用户登录</h2>
            <Form ref={this.formRef}  name="normal_login" onFinish={handleSubmit} className="login-form" initialValues={{ remember: true }} >
                <Form.Item  name="username"  rules={[{ required: true,message: 'Please input your Username!'},{min:4,message:'必须大于4位'},{max:12,message:'必须小于12位'},{pattern:'^[a-zA-Z0-9]*$',message:'用户名必须要是英文和数字'}]}>
                <Input  placeholder="Username"/>
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' },{min:4,message:'必须大于4位'},{max:12,message:'必须小于12位'}]}>
                <Input type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button"> 登陆</Button>
                </Form.Item>
            </Form>
        </section>
      </div>
    )
  }
}
