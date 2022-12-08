

import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload ,message} from 'antd';
import {reqUploadPic} from '../../api/index'
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const ImageUpload= () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([
  ]);
  //
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ file, fileList }) => {

    setFileList(fileList);
    if (file.status === 'done') {
        message.success(`上传图片成功:${fileList.status}`)
       // console.log("成功后的",fileList)
      }else if(file.status === 'removed'){
       // console.log("delete",file);
       if(file.response.status===0){
        message.success("删除图片成功")
       }
      }
}
    const getImgs = () =>{
        fileList.map((item)=>{
            return item.name
        })
    }
   
  
  //上传图片按钮
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 10,
        }}
      >
        上传图片
      </div>
    </div>
  );
 
  return (
    <>
      <Upload
        accept="image/*"
        action="/api/manage/img/upload"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 2 ? null : uploadButton}
      </Upload>
     {/*  <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal> */}
    </>
  );
};
export default ImageUpload;