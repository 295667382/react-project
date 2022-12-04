import React, { Component } from 'react'
import {  Modal } from 'antd';
export default class Updatecatory extends Component {
    isModalOpen=()=>{}
    render() {
    return (
      <div>
        <Modal title="Basic Modal" open={this.isModalOpen} onOk={this.handleOk} onCancel={this.handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      </div>
    )
  }
}
