import React, { Component } from 'react'
import { Tree } from 'antd';
import menuList from '../../config/menuConfig';

export default class Authrole extends Component {
    state={
        treeData:[
            {
                title: '平台权限',
                key: '-',
            }

        ],
        
        checkedKeys:'',
        
    }
    //
    showSelectTree=()=>{
        const {menus}=this.props.selectRole[0]
        console.log("menus",menus)
        this.state.checkedKeys=menus
    }

    setTreeData=()=>{
        const newlist=this.state.treeData[0]
        newlist.children=menuList
        console.log("newlist",newlist)
    }
    constructor(props){
        super(props)
        this.setTreeData()
        this.showSelectTree()
        
    }
    /* shouldComponentUpdate(props){
        console.log("shouldComponentUpdate",this.props)
    } */
   
    onSelect=(selectedKeys, info)=>{
        console.log('selected', selectedKeys, info);
        
    }
    onCheck=(checkedKeys, info)=>{
        console.log('onCheck', checkedKeys, info);
        this.setState({checkedKeys:checkedKeys},()=>{
            console.log("选择之后更新",this.state.checkedKeys)
        })
    }
    checkedKeys=()=>{
        
    }

    render() {
        const {treeData,checkedKeys}=this.state
        console.log("render",checkedKeys)
    return (
      <div>
        <Tree
        checkable
        defaultExpandAll
        onSelect={this.onSelect}
        onCheck={this.onCheck}
        treeData={treeData}
        checkedKeys={checkedKeys}
        />
      </div>
    )
  }
}
