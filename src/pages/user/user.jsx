import React, { Component } from 'react'
import { Card,Button, Space, Table, Tag,Modal,message} from 'antd';
import { Route, Routes, useNavigate,useLocation,useParams } from "react-router-dom";
import {reqGetAllUsers,reqDeleteUser, reqAddUser,reqUpdateUser} from '../../api/index'
import Fromuser from './fromuser';
import Password from 'antd/lib/input/Password';

export default class User extends Component {
    state={
        userList:[],
        deleteUser:[],
        roles:[],
        showform:false,
        update_id:'',//记录update_id
        addorupdateFlag:false //判断是添加用户还是修改用户的falg
    }
    constructor(props) {
        super(props);
        this.users = React.createRef();
    }
    //初始化数据
    componentDidMount(){
        this.getAllUsers()
    }
    //获取初始化列表
    getAllUsers=async()=>{
        const response=await reqGetAllUsers()
        console.log("response",response)
        if(response.status===0){
          const {roles,users}=response.data
          const arrayc={}
          for(let i = 0; i < roles.length; i ++){ 
            arrayc[roles[i]._id]=roles[i].name
          }
          console.log("arrayc",arrayc)
          for(let i=0;i<users.length;i++){
            users[i]['name']=arrayc[users[i].role_id]
          }
          this.setState({userList:users,roles:roles})
        }
      }
    //添加用户
    addUser=()=>{
        this.setState({showform:true,addorupdateFlag:true})
        
    }
    //修改用户modifyUser
    modifyUser=(record)=>{
        return ()=>{
            this.setState({update_id:record._id,showform:true},()=>{
                if(this.users.current.formRef){
                    console.log("----")
                    this.users.current.formRef.current.setFieldsValue({
                        phone:record.phone,
                        username:record.username,
                        email:record.email,
                        password:record.password,
                        role_name:record.role_name,
                        role_id:record.role_id
                    })
                }
            })
        }
    }
    //点击删除用户，删除用户弹框出现
    deleteUser=(user)=>{
        return ()=>{
            this.setState({deleteUser:user},()=>{
                this.setState({isDeleteUserOpen:true})
              })

        }
    }
    //确认删除用户
    handleDeleteOk=async()=>{
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
    //添加或者更新用户
    handleUserOk=async()=>{
        console.log("ref",this.users)
        const {username,password,phone,email,role_id}=this.users.current.state
        if(this.state.addorupdateFlag){
            //如果是新增用户
            console.log("新增用户")
            const res = await reqAddUser(username,password,phone,email,role_id)
            console.log("新增用户res===",res)
            if(res.status===0){
                this.setState({showform:false,addorupdateFlag:false})
                this.getAllUsers()
                message.success("用户添加成功")
                this.users.current.formRef.current.resetFields()//添加后清除；
            }else{
                message.error(res.msg)
                this.setState({showform:false,addorupdateFlag:false})
            }
            
        }else{
            //如果是编辑用户
            console.log("编辑用户")
            const _id=this.state.update_id
            
            const res = await reqUpdateUser(_id,username,phone,email,role_id)
            if(res.status===0){
                this.setState({showform:false})
                this.getAllUsers()
                message.success("用户修改成功")
                this.users.current.formRef.current.resetFields()

            }else{
                message.error(res.msg)
                this.setState({showform:false})
            }  
        }
    }
    //取消添加或者删除用户
    handleUserCancel=()=>{
        this.setState({showform:false,addorupdateFlag:false})
        this.users.current.formRef.current.resetFields()
       
    }
    render() {
    const title=(
        <Button type="primary" onClick={this.addUser}>创建用户</Button>
    )
    const columns=[
        {
          title: 'id',
          dataIndex: '_id',
          key: '_id',
         /*  render: (text) => <a>{text}</a>, */
        },
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
              <a onClick={this.modifyUser(record)}>修改</a>
              <a onClick={this.deleteUser(record)}>删除</a>
            </Space>
          ),
        },
    ];
    
    const {userList,isDeleteUserOpen,showform,roles,addorupdateFlag}=this.state
    const addtitle=(
        addorupdateFlag?<span>添加用户</span>:<span>编辑用户</span>
    )
    return (
      <div>
        <Card title={title} style={{textAlign:'left'}}>
        <Table columns={columns} dataSource={userList} />
        </Card>
        <Modal title="删除用户" open={isDeleteUserOpen} onOk={this.handleDeleteOk} onCancel={this.handleDeleteCancel}>
        <p>确认删除该用户吗？</p>
        </Modal>
        <Modal title={addtitle}  open={showform} onOk={this.handleUserOk} onCancel={this.handleUserCancel}>
            <Fromuser roles={roles} ref={this.users}/>
          
        </Modal>

      </div>
    )
  }
}
