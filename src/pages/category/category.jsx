import React, { Component } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Card,Button,Space, Table, Tag, message,Modal,Input,Select } from 'antd';
import './category.less'
import {reqCategorys,reqDeleteCategory,reqAddCategory,reqUpdateCategory} from '../../api/index'
export default class Category extends Component {
  state={
    categoryList:[], //分类列表
    subcategoryList:[],//子分类列表
    _id:'',
    categoryTitle:'一类列表',
    defaultValue:'一类列表',
    isAddModalOpen:false,//控制添加类别表单对话框是否弹出
    isUpdateModalOpen:false,
    listItem:{},
    parentId:'0',
    newName:'',
    addselectCatory:'',//添加类别=》select选项选择的分类类型的parentid;
    addCategoryName:'',//添加类别=》input框添加的类别名称
    options:[{value:'0',label:'一类列表',parentId:'0'}]
  }
  //初始化列表方法
  getCategoryList=async(parentId)=>{
    
    const response =await reqCategorys(parentId)
   
    console.log("getCategoryList",response)
    if(response.status===0){
      if(parentId==='0'){
        this.setState({categoryList:response.data},()=>{
          const options=[]
          this.state.categoryList.forEach((item,index)=>{
            if(item.parentId==='0'){
              options.push({
                value:item._id,  //_id
                label:item.name, //name
                parentId:item.parentId  //parentId 
              })
            }
            this.setState({options:[{value:'0',label:'一类列表',parentId:'0'},...options]})
          })
        })
      }else{
        this.setState({subcategoryList:response.data})
       
      }
      
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
    //点击添加之后弹出对话框
    console.log("addCategory",this.state.categoryList)
    this.setState({isAddModalOpen:true,addCategoryName:''})  
  }
  //添加类别的对话框点击确定  reqAddCategory= (parentId,categoryName)
  handleAddOk=async()=>{
    const parentId=this.state.addselectCatory
    console.log("handleAddOk",parentId)
    const categoryName=this.state.addCategoryName
    const response=await reqAddCategory(parentId,categoryName)
    console.log("==reqAddCategory===",response)
    if(response.status===0){
      message.success("添加成功")
      this.setState({isAddModalOpen:false},()=>{
        this.getCategoryList(parentId)
      })
    }
  }
  //添加类别的对话框点击取消
  handleAddCancel=()=>{
    this.setState({isAddModalOpen:false})
    message.info("取消添加")
    
  }
  //select选择类别触发的事件
  onSelectChange=(e)=>{
    console.log("选择类别触发的事件",e)
    const id =e
    if (id==='0') {
      this.setState({addselectCatory:'0'})
     
    }else{
      this.setState({addselectCatory:id})
    }
    
    
  }

  //input框触发的事件
  addCatrgoryname=(e)=>{
    this.setState({addCategoryName:e.target.value})
  }


  //========更新类别=========
  updateCategory=(record)=>{
    return (()=>{
      this.setState({listItem:record},()=>{
        this.setState({isUpdateModalOpen:true})
      })
    })
  }

  //取消更新类别
  handleUpdateCancel=()=>{
    this.setState({listItem:{}},()=>{
      this.setState({isUpdateModalOpen:false})
    })
  }
  //更新类别的名称
  //reqUpdateCategory=(categoryId,categoryName)
  handleUpdateOk=async()=>{
    const categoryId=this.state.listItem._id
    const categoryName=this.state.newName
    const response=await reqUpdateCategory(categoryId,categoryName)
    if(response.status===0){
      this.setState({isUpdateModalOpen:false})
      this.getCategoryList(this.state.listItem.parentId)
      message.success("修改分类成功")
    }
  }
  //input输入框值变化回调
  handleUpdateChange=(e)=>{
    this.setState({newName:e.target.value})
  }

  //查看子列表  获取一级或某个二级分类列表  reqCategorys  parentId为父级的id 子列表的parentId为父列表的_id
  SearchSonCategory=(record)=>{
    return (()=>{
      console.log("record",record)
      const parentId=record._id
      let name
      this.setState({_id:record._id,listItem:record,parentId:record._id},()=>{
        this.state.categoryList.forEach((item)=>{  
          if(item._id===this.state._id) {
            name=item.name
          }
        })
        this.setState({categoryTitle:`一类列表->${name}`,defaultValue:name})
      })
      console.log("this.getCategoryList(parentId)",parentId)
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
    const {options,categoryList,subcategoryList,_id,categoryTitle,isAddModalOpen,isUpdateModalOpen,defaultValue,parentId,listItem}= this.state
 
   
    const data=parentId==='0'?categoryList:subcategoryList

    return (
    <div className='category'>
    <Card style={{ textAlign: 'left'}} size="small" title={categoryTitle} extra={addbutton} >
    <div className="category-list">
    <Table dataSource={data} >
    <Column title="类别名称" dataIndex="name" key="name" />
    <Column title="parentId" dataIndex="parentId" key="parentId" />
    <Column title="_id" dataIndex="_id" key="_id" />
   
    <Column
    title="操作"
    key="action"
    render={(_,record) => (
      <Space size="middle">
        <a onClick={this.updateCategory(record)}>修改分类名称 {record.lastName}</a>
        { parentId==='0'? <a onClick={this.SearchSonCategory(record)}>查看子分类</a>:null}
        <a onClick={this.deleteCategory(record)} style={{color:'red'}}>删除</a>
      </Space>
    )}
  />
</Table>
    </div>
    </Card>
      <Modal title="添加类别" open={isAddModalOpen} onOk={this.handleAddOk} onCancel={this.handleAddCancel}>
      <span>分类类型:</span>
      <Select 
      /* defaultValue={defaultValue} */
      options={options}
      style={{marginBottom:'10px',width: '320px',marginLeft:'10px'}}
      allowClear
      onChange={this.onSelectChange}
    />
      <div>
        <span>类别名称:</span>
        <Input placeholder="请输入类别名称" onChange={this.addCatrgoryname} style={{marginBottom:'10px',width: '320px',marginLeft:'10px'}} />
      </div>
      </Modal>
      <Modal title="修改类别" open={isUpdateModalOpen} onOk={this.handleUpdateOk} onCancel={this.handleUpdateCancel}>
      <Input onChange={this.handleUpdateChange} placeholder="请输入类别名称" key={listItem.name} defaultValue={listItem.name} />
      </Modal>
   
    
    </div>
    )
  }
}
