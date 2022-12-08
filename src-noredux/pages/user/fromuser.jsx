import React, { Component } from 'react'
import { Button, Checkbox,Modal, Form, Input,Select } from 'antd';

export default class Fromuser extends Component {
    state={
        options:[],
        role_id:'',
        role_name:''
    }
    constructor(props) {
        console.log("constructor")
        super(props);
        this.formRef = React.createRef();
    }
    //初始化列表
    componentDidMount(){
        console.log("===componentDidMount======",this.props)
        const {roles}=this.props
        const newmap=roles.map((item)=>{
            return {
            value:item._id,
            label:item.name,
            _id:item._id
            }
        })
        this.setState({options:newmap})
    }
    //手动选择角色，并更新role_id及role_name
    handleSelect=(value, option)=>{
        console.log("option",option)
        this.setState({
          role_id:option._id,
          role_name:option.label
        })
      }
    render() {
    const {options}=this.state
    return (
      <div>
        <Form
            name="basic"
            ref={this.formRef}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
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
                options={options}
                />
            </Form.Item>
    </Form>
      </div>
    )
  }
}
