import React, { Component } from 'react'
import { Card,Button, Divider, Radio, Table,Modal,message,Space } from 'antd';
import {reqGetRolelist,reqAddRole,reqDeleteRole} from '../../api/index'
import Addrole from './addrole';
import Authrole from './authrole';

export default class Role extends Component {
  constructor(props){
    super(props)
    this.addrole = React.createRef();
  }
  state={
    roles:[], //定义全部角色的数组
    selectRole:[], //定义被选中的数组
    disable:true,
    isaddRoleVisible:false,//添加校色的提示框
    deleteRoleVisible:false,//删除角色的提示框
    deleteRole_id:'',
    roleAuthVisible:false
  }
  //获取全部的角色数据  18 reqGetRolelist
  getAllRolelist=async()=>{
    const res= await reqGetRolelist()
    if(res.status===0){
      this.setState({roles:res.data})
    }
  }

  //创建角色，创建角色的弹框出现
  AddRole=()=>{
    this.setState({isaddRoleVisible:true})
  }
  //添加角色
  handleAddRole=async()=>{
    const roleName=this.addrole.current.getRole()
    const res=await reqAddRole(roleName)
    if(res.status===0){
      this.setState({isaddRoleVisible:false}) 
      this.getAllRolelist()
      message.success("添加用户成功")
    }

    console.log("roleName",roleName)
    
  }
  //取消添加角色
  handleCancelRole=()=>{
    this.setState({isaddRoleVisible:false}) //取消添加角色，添加角色弹框消失
  }
  //删除角色
  deleteRole=(record)=>{
    return ()=>{
      this.setState({deleteRoleVisible:true,deleteRole_id:record._id})

    }
  }
//设置角色权限
  SetroleAuth=()=>{
    this.setState({roleAuthVisible:true})
    
  }
  handlesetAuthOk=()=>{
    
  }
  handlesetAuthCancel=()=>{
    this.setState({roleAuthVisible:false})
  }
  

  //确认删除角色  handleDeleteOk
  handleDeleteOk=async()=>{
    this.setState({deleteRoleVisible:false})
    const _id=this.state.deleteRole_id
    const res= await reqDeleteRole(_id)
    console.log("res",res)
    if(res.status===0){
      message.success("删除角色成功")
      this.getAllRolelist()
    }
  }


  //确认取消删除角色  handleDeleteCancel
  handleDeleteCancel=()=>{
    this.setState({deleteRoleVisible:false})
  }
  
  componentDidMount(){
    this.getAllRolelist()
    
  }
  render() {
    const {selectionType,roles,selectRole,disable,isaddRoleVisible,deleteRoleVisible,roleAuthVisible}=this.state
   
    //标题
    const title=(
      <div>
        <Button type="primary" style={{marginRight:'10px'}} onClick={this.AddRole}>创建角色</Button>
        <Button type="primary" disabled={disable} onClick={this.SetroleAuth}>设置角色权限</Button>
      </div>
    )
    //表格的列数
    const columns = [
      {
        title: '_id',
        dataIndex: '_id',
      /*   render: (text) => <a>{text}</a>, */
      },
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
      },
      {
        title: '操作',
        key: '_id',
        render: (_, record) => (
          <Space size="middle">
            <a onClick={this.deleteRole(record)}>删除</a>
          </Space>
        ),
      },
    ];
    //选中某个角色进行操作
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({selectRole:selectedRows,disable:false})
      },
    };
    
   
    return (
      <div>
      <Card title={title} style={{textAlign:'left'}}>
      <Table
        rowSelection={{
          type: 'radio',
          ...rowSelection,
        }}
        rowKey={record => record._id}
        columns={columns}
        dataSource={roles} 
      />
    </Card>
    <Modal title="创建角色" destroyOnClose open={isaddRoleVisible} onOk={this.handleAddRole} onCancel={this.handleCancelRole}>
        <Addrole ref={this.addrole}/>
    </Modal>

    <Modal title="删除角色" open={deleteRoleVisible} onOk={this.handleDeleteOk} onCancel={this.handleDeleteCancel}>
        确认删除该角色吗？
    </Modal>

    <Modal title="设置角色权限" destroyOnClose  open={roleAuthVisible} onOk={this.handlesetAuthOk} onCancel={this.handlesetAuthCancel}>
        <Authrole selectRole={selectRole}/>
    </Modal>
    
    </div>
    )
  }
}

{/* <Modal /> 和 Form 一起配合使用时
，设置 destroyOnClose 也不会在 Modal关闭时销毁表单字段数据，需要设置 <Form preserve={false} />。 */}