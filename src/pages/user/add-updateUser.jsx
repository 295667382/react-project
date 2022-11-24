import React, { Component } from 'react'
import { Button, Checkbox, Form, Input,Select } from 'antd';

export default class AddupdateUser extends Component {
    state={
        username:'',
        password:'',
        phone:'',
        email:'',
        role_id:''
    }
   /*  getUser=()=>{
        return ({
            username:this.state.username
        })
    } */
    render() {
    return (
      <div>
       <Form
      name="basic"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 15 }}
      initialValues={{ remember: true }}
      onFinish={this.onFinish}
      onFinishFailed={this.onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: '请输入用户名!' }]}
      >
        <Input onChange={(e)=>this.setState({username:e.target.value})}/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: '请输入密码!' }]}
      >
        <Input.Password onChange={(e)=>this.setState({password:e.target.value})}/>
        </Form.Item>
        <Form.Item
        label="手机号"
        name="phone"
        rules={[{ required: true, message: '请输入手机号!' }]}>
        <Input onChange={(e)=>this.setState({phone:e.target.value})}/>
        </Form.Item>

        <Form.Item
        label="邮箱"
        name="email"
        rules={[{ required: true, message: '请输入邮箱!' }]}>
        <Input onChange={(e)=>this.setState({email:e.target.value})}/>
        </Form.Item>

        <Form.Item
        label="角色"
        name="role_id"
        rules={[{ required: true, message: '请输入角色!' }]}>
        <Select  
            onChange={this.handleSelect}
            options={[
                {
                value: 'jack',
                label: 'Jack',
                },
                {
                value: 'lucy',
                label: 'Lucy',
                }
            ]}
            />
        
        </Form.Item>

      
    </Form>

      </div>
    )
  }
}

