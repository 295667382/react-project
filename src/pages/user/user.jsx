import React, { Component } from 'react'
import { Card,Button, Space, Table, Tag,Modal,message} from 'antd';
import {reqGetAllUsers,reqDeleteUser} from '../../api/index'
import AddupdateUser from './add-updateUser';

/* |username    |Y       |string   |用户名
	|password    |Y       |string   |密码
	|phone       |N       |string   |手机号
	|email       |N       |string   |邮箱 
  |role_id     |N       |string   |角色ID */
    
export default class User extends Component {
  state={
    userList:[],
    roles:[],
    isDeleteUserOpen:false,
    deleteUser:[],
    isModalAddUserOpen:false,
    

  }
  constructor(props) {
    super(props);
    this.adduser = React.createRef();
    
}
  componentDidMount(){
    this.getAllUsers()
  }
  getAllUsers=async()=>{
    const response=await reqGetAllUsers()
    console.log("responese",response)
    if(response.status===0){
      const {roles,users}=response.data
     /*  const userList = users.map((_,index)=>({...users[index],...roles[index]})) */
      const userList = users.map((_,index)=>{
        console.log("index",index)
        return ({...users[index],name:roles[index].name})
      })
      this.setState({userList:userList,roles:roles})
    }
  }
  //删除用户，出现弹框
  deleteUser=(user)=>{
    return ()=>{
      this.setState({deleteUser:user},()=>{
        this.setState({isDeleteUserOpen:true})
      })
    }
  }
   //确认删除用户
  handleDeleteOk=async()=>{
    console.log("this.state.deleteUser",this.state.deleteUser)
    const {_id}=this.state.deleteUser
    const res=await reqDeleteUser(_id)
    console.log("res",res)
    if(res.status===0){
      message.success("用户删除成功")
      this.setState({isDeleteUserOpen:false})
      this.getAllUsers()
    }

    
  }
   //取消删除用户
  handleDeleteCancel=()=>{
    this.setState({isDeleteUserOpen:false})
  }
  //

  //添加用户
  addUpdateUser=()=>{
    return (()=>{
      this.setState({isModalAddUserOpen:true})
    })
  }
  handleAddUserOk=()=>{
    console.log("this.ref",this.adduser)

  }
  handleAddUserCancel=()=>{
    this.setState({isModalAddUserOpen:false})
  }


  render() {
    const title=(
      <Button type="primary" onClick={this.addUpdateUser()}>创建用户</Button>
    )
    const columns=[
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
       /*  render: (text) => <a>{text}</a>, */
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'address',
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        key: 'create_time',
         render: (create_time, record) => {
          var date = new Date(create_time)
          const time=date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()
          return <span>{time}</span>
         }        
      },
      {
        title: '所属角色',
        dataIndex: 'name',
        key:'name',
        
      },
      
      {
        title: '操作',
        key: '_id',
        render: (_, record) => (
          <Space size="middle">
            <a>修改</a>
            <a onClick={this.deleteUser(record)}>删除</a>
          </Space>
        ),
      },
    ];
    const {userList,isDeleteUserOpen,isModalAddUserOpen}=this.state
    //判断是添加用户还是修改用户
    const addtitle=(
      <span>添加用户</span>
    )
    return (
      <div>
        <Card title={title} style={{textAlign:'left'}}>
        <Table columns={columns} dataSource={userList} />;
        </Card>
        <Modal title="删除用户" open={isDeleteUserOpen} onOk={this.handleDeleteOk} onCancel={this.handleDeleteCancel}>
        <p>确认删除该用户吗？</p>
        </Modal>
        <Modal title={addtitle} open={isModalAddUserOpen} onOk={this.handleAddUserOk} onCancel={this.handleAddUserCancel}>
          <AddupdateUser ref={this.adduser}/>
        </Modal>
   
      </div>
    )
  }
}
