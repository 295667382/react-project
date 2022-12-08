import React, { Component } from 'react'
import { Select,Input } from 'antd';
import './category.less'
import { addBeforeLoader } from '@craco/craco';

export default class addForm extends Component {
    handleChange = (value) => {
        //console.log("value",value)

        this.props.saveCategory(value)
    };
    onChangename=(e)=>{
        this.props.savecategoryName(e.target.value)
    }
    
    render() {
    console.log("this.props",this.props)
    const {categoryList,record}=this.props
    
    const options=[]
   /*  if(JSON.stringify(record)==='{}'){
        options.push({
            value:'一级分类',
            label:'一级分类'
        })
    } */
    return (
    <div>   
       <div className="category"> <span>所属分类：</span> <Select style={{ width: '200px' }} onChange={this.handleChange} options={options}/></div> 
       <div><span className="name">分类名称：</span><Input style={{ width: '200px' }} onChange={this.onChangename} placeholder="请输入分类名称" /></div>
    </div>
    )
  }
}
