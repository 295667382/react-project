import React, { Component } from 'react'
import { Card,Button, Space, Table, Tag,Modal, message, Popconfirm } from 'antd';
import { PlusOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import {reqCategorys,reqAddCategory,reqDeleteCategory,reqUpdateCategory} from '../../api/index'
import AddForm from './addForm';
import { toHaveAccessibleDescription } from '@testing-library/jest-dom/dist/matchers';
import Updatecatory from './updatecatory';

export default class Category extends Component {
  state={
    categoryList:[],
    open:false,
    parentId:'',
    categoryName:'',//添加模块的分类名称
    breadname:'',//面包屑二级分类名称
    Updatecatoryshow:false,
    UpdatecatoryItem:{},
    id:'',
    record:{}
  
  }
  //添加一级分类
  addcategory=async()=>{
      this.setState({open:true})
      
  }
  //更新分类接口
  updateCategory=(record)=>{
    
    return (()=>{
      console.log('===asasssd===',record)
      this.setState({Updatecatoryshow:true,UpdatecatoryItem:{...record}})
      console.log("==Updatecatoryshow",this.state.Updatecatoryshow)
      console.log("===UpdatecatoryItem",this.state.UpdatecatoryItema)
      
    })
    
  }

  //删除
  deleteCategory=(record)=>{
    return (async()=>{
      const _id=record._id
      const response=await reqDeleteCategory(_id)
      console.log("=deleteCategory==",response)
      if(response.status===0){
        message.success("删除成功")
        this.getCategoryList()
      }
      
    })
  }
  //取消删除
  deleteCancel=()=>{
    message.info('取消删除');
  }
  //获取分类列表接口
  getCategoryList=async (parentId)=>{
    console.log("getCategoryList==parentId==",parentId)
    const response =await reqCategorys(parentId)
   // console.log("====",response)
    const newList=[]
    response.data.forEach((item)=>{
      newList.push({
        ...item,scopedSlots: { customRender: 'action' }
      })
    })
    this.setState({categoryList:newList})
  }
  //查看子分类
  searchCategory=(record)=>{  
    return(async()=>{
      //console.log("record",record)
      this.setState({record:record},()=>{
        this.getCategoryList(record._id)
      })

      
      console.log("this.state.record",this.state.record)
    })
   
  }
  //父子数据
  saveCategory=(value)=>{
    console.log("saveCategory",value)
    this.setState({parentId:value})
  }
  savecategoryName=(value)=>{
    this.setState({categoryName:value})
  }
  //对话框的方法
  handleOk=async()=>{
    const parentId=this.state.parentId
    const categoryName=this.state.categoryName
    const response =await reqAddCategory(parentId,categoryName)
    console.log(" response", response)
    if(response.status===0){
      this.setState({open:false})
      message.success("添加分类成功")
      this.getCategoryList(parentId)
    }
   
  }  
  handleCancel=()=>{
    this.setState({open:false})
  }
  componentDidMount(){
    this.getCategoryList("0")
  }
  //渲染
  renderupdateCategory(){
    console.log("/渲染",this.stateUpdatecatoryshow)
    if(this.stateUpdatecatoryshow) return (
      <Updatecatory  stateUpdatecatoryshow={this.stateUpdatecatoryshow}/>
    )
  }
  render() {
    const title='一级分类'
    const add=(
      <Button   icon={<PlusOutlined />} type="primary" onClick={this.addcategory}>添加</Button>
    )
    const { Column, ColumnGroup } = Table
    const {categoryList,open,breadname,Updatecatoryshow,record} =this.state
    const {name}=record
    let len
    let title1
    if(name){
       len=name.length
       title1=(len===0)?'一级分类':`一级分类->${name}`
    }else{
      title1='一级分类'
    }
    return (
    <div>
    <Card style={{textAlign:'left'}} title={title1} extra={add}>
    <Table dataSource={categoryList} bordered rowKey='_id'>
    <Column style={{width:'70%'}} title={title} dataIndex="name" key="name" />
    <Column
      title="操作"
      key="action"
      render={(_, record) => (  
        <Space size="middle" slot="action" slot-scope="text,record">
          <a onClick={this.updateCategory(record)} >修改分类</a>
          <a  onClick={this.searchCategory(record)}>查看子分类</a>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={this.deleteCategory(record)}
            onCancel={this.deleteCancel}
            okText="Yes"
            cancelText="No"
          >
          <a  slot="action" style={{color:'red'}}>删除</a>
          </Popconfirm>
        </Space>
      )}
    />
  </Table>
    </Card>
    <Modal
        title="添加分类"
        open={open}
        onOk={this.handleOk}
        /* confirmLoading={this.confirmLoading} */
        onCancel={this.handleCancel}
      >
       <AddForm categoryList={categoryList} savecategoryName={this.savecategoryName} saveCategory={this.saveCategory}/>
      </Modal>
      {this.renderupdateCategory}
       
    </div>
    


    )
  }
}
