/* import React, { Component } from 'react'

export default class Pie extends Component {
  render() {
    return (
      <div>Pie</div>
    )
  }
}

 */

//http://localhost:5000/manage/img/upload
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
const props = {
  name: 'image',
  action: '/api/manage/img/upload',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const Pie = () => (
  <Upload {...props}>

    adasdas
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
);
export default Pie;