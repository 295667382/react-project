import React, { Component } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Card,Button,Space, Table, Tag, message,Modal,Input,Select } from 'antd';
import './category.less'
import {reqCategorys,reqDeleteCategory} from '../../api/index'
export default class Category extends Component {
  state={
    categoryList:[], //分类列表
    _id:'',
    categoryTitle:'一类列表',
    defaultValue:'一类列表',
    isModalOpen:false,//控制添加类别表单对话框是否弹出
  }
  //初始化列表方法
  getCategoryList=async(parentId)=>{
    const response =await reqCategorys(parentId)
    console.log("getCategoryList",response)
    if(response.status===0){
      this.setState({categoryList:response.data})
    }
    
  }
  //点击事件
  //删除某个类别
  deleteCategory=(record)=>{
    return (async()=>{  
      const _id=record._id
      //根据唯一标识_id删除类别
      const response =await reqDeleteCategory(_id)
      if(response.status===0){
        //以parentId重新获取列表
        this.getCategoryList(record.parentId)
      }
    })
  }
  //添加类别相关的方法
  addCategory=()=>{
    console.log("tianjia ")
    this.setState({isModalOpen:true})
    //点击添加之后弹出对话框
    
  }
  //添加类别的对话框点击确定
  handleAddOk=()=>{
    //首页添加

    //子页面添加

  }
  //添加类别的对话框点击取消
  handleAddCancel=()=>{
    this.setState({isModalOpen:false})
    message.info("取消添加")
  }

  //查看子列表  获取一级或某个二级分类列表  reqCategorys  parentId为父级的id 子列表的parentId为父列表的_id
  SearchSonCategory=(record)=>{
    return (()=>{
      const parentId=record._id
      //记录一下当前的_id值
      
      let name
      this.setState({_id:record._id},()=>{
        this.state.categoryList.forEach((item)=>{  
          if(item._id===this.state._id) {
            name=item.name
          }
        })
       // console.log("name",name)
        this.setState({categoryTitle:`一类列表->${name}`,defaultValue:name})

      })
      this.getCategoryList(parentId)
    })
  }

  //初始化
  componentDidMount(){
    this.getCategoryList("0")
  }
  render() {
    const { Column, ColumnGroup } = Table;
    const addbutton=(
      <Button type="primary" onClick={this.addCategory} icon={<PlusOutlined />}>添加</Button>
    )
    const {categoryList,_id,categoryTitle,isModalOpen,defaultValue}= this.state
    return (
    <div className='category'>
    <Card style={{ textAlign: 'left'}} size="small" title={categoryTitle} extra={addbutton} >
    <div class="category-list">
    <Table dataSource={categoryList} >
    <Column title="parentId" dataIndex="parentId" key="parentId" />
    <Column title="_id" dataIndex="_id" key="_id" />
    <Column title="类别名称" dataIndex="name" key="name" />
    <Column
    title="操作"
    key="action"
    render={(_,record) => (
      <Space size="middle">
        <a>修改分类 {record.lastName}</a>
        <a onClick={this.SearchSonCategory(record)}>查看子分类</a>
        <a onClick={this.deleteCategory(record)} style={{color:'red'}}>删除</a>
      </Space>
    )}
  />
</Table>
    </div>
    </Card>
      <Modal title="添加类别" open={isModalOpen} onOk={this.handleAddOk} onCancel={this.handleAddCancel}>
      <span>分类类型:</span>
      <Select 
      defaultValue={defaultValue}
      style={{marginBottom:'10px',width: '320px',marginLeft:'10px'}}
      allowClear
    />
      <div>
        <span>类别名称:</span>
        <Input placeholder="请输入类别名称" style={{marginBottom:'10px',width: '320px',marginLeft:'10px'}} />
      </div>
      </Modal>
   
    
    </div>
    )
  }
}
