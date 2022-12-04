import React, { Component } from 'react'
import { Button, Checkbox, Form, Input } from 'antd';

export default class Addrole extends Component {
    state={
        role:''
    }
    
    getRole=()=>{return this.state.role}
    render() {
    return (
    <div>
     <Form
   
      preserve={false}
      labelCol={{
        span: 5,
      }}
      wrapperCol={{
        span: 18,
      }}
      autoComplete="off"
    >
      <Form.Item
        label="创建角色"
        name="username"
        rules={[
          {
            required: true,
            message: '请输入角色',
          },
        ]}
      >
        <Input onChange={(e)=>this.setState({role:e.target.value})}/>
      </Form.Item>


   

     
    </Form>
      </div>
    )
  }
}
