import React, { Component } from 'react'
import { Button, Checkbox, Form, Input,message } from 'antd';
import './login.less'
import logo from '../../assets/images/logo.png'
import { reqLogin } from '../../api';



export default class login extends Component {
    onFinish = async (values) => {
        const {username,password}=values
        //reqLogin(username,password).then((res)=>{console.log("res",res)}).catch((err)=>{console.log(err)})
        const response=await reqLogin(username,password)
        console.log(response)
        if(response.status===0){
            console.log("登录成功")
            message.info("登录成功")
            
            
        }else{
            console.log("登录失败")
            message.error("登录失败")
        }
        
       
      };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
      /* handleClick=(e)=>{
        console.log("登录按钮",this.props)
      } */
      
  render() {

    const NameValidator = (rule, value, callback) => {
        if (value) {
          const nameLength = value.length
          if (nameLength >= 4 && nameLength <= 12) {
            return Promise.resolve()
          } else {
            return Promise.reject('名称长度为4-12个字符')
          }
        } else {
          return Promise.resolve()
        }
      };
    
    return (
      <div className="login">
        <div className="login-header">
            <img src={logo} alt="logo"/>
            <h1>React 项目: 后台管理系统</h1>

        </div>
        <section className='login-content'>
       {/*  用户名/密码的的合法性要求
            1). 必须输入
            2). 必须大于等于 4 位
            3). 必须小于等于 12 位
            4). 必须是英文、数字或下划线组成 */}
            <h3>用户登录</h3>
            <Form name="basic" labelCol={{span: 8,}} wrapperCol={{ span: 16,}} initialValues={{remember: true,}}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            autoComplete="off"
            >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                {
                    required: true,
                    message: 'Please input your username!',
                },
                ]}
            >
            <Input />
             </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                {
                    validator: NameValidator
                }
            ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item  wrapperCol={{
                offset: 8,
                span: 16,
                }}>
                <Button onClick={this.handleClick} className='loginbutton' type="primary" htmlType="submit">
                登录
                </Button>
            </Form.Item>
            </Form>
        </section>
      </div>
    )
  }
}
