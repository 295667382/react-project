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
        const {menus}=this.props.selectRole
        this.state.checkedKeys=menus
    }

    setTreeData=()=>{
        const newlist=this.state.treeData[0]
        newlist.children=menuList
        console.log("newlist",newlist)
    }
    constructor(props){
        super(props)
        console.log(" constructor(props){")
        this.setTreeData()
        this.showSelectTree()
        
    }
   /*  shouldComponentUpdate(nextProps,nextState){
        console.log("shouldComponentUpdate","nextState",nextProps,"nextState",nextState)
        return true
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
    getcheckedKeys=()=>{
        return this.state.checkedKeys
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
