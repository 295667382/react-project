import React, { Component } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload ,message} from 'antd';
import {reqUploadPic} from '../../api/index'
import { BASE_IMG_PATH } from '../../utils/constantd';

export default class ClassimageUpload extends Component {
    state={
        fileList:[],
        previewImage:'',
        previewTitle:'',
        previewOpen:false
    }
    componentWillMount(){
     
      let fileList = []
      const imgs = this.props.imgs
      if (imgs && imgs.length > 0) {
        fileList = imgs.map((img, index) => ({
          
          uid: -index,
          name: img,
          status: 'done', // loading: 上传中, done: 上传完成, remove: 删除 
          url: BASE_IMG_PATH + img,
          response:{
            data:{
              name:img,
              url:BASE_IMG_PATH + img,
            }
          },
        })) 
      }
    
      this.setState({fileList:fileList},()=>{
         // console.log("初始化图片组件",this.state.fileList)
          
         })
      }

    getBase64 = (file) =>
    new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
    handlePreview=async(file)=>{
        console.log("file",file)
        if (!file.url && !file.preview) {
            file.preview = await this.getBase64(file.originFileObj);
          }
          const PreviewImageSrc=file.url || file.preview
          console.log("PreviewImageSrc",PreviewImageSrc)
          const PreviewTitle=file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
          this.setState({previewImage:PreviewImageSrc})
          this.setState({previewOpen:true})
          this.setState({PreviewTitle:PreviewTitle})       

    }
    handleChange=({ file, fileList })=>{
        this.setState({fileList:fileList},()=>{
         
        })
    }
    getImgs = () => this.state.fileList.map((file) => {
      return file.response.data.name 
    })
    handleCancelPic=()=>{
     
      this.setState({previewOpen:false})
    }
    render() {
    const {fileList,PreviewTitle,previewImage,previewOpen}=this.state
   
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
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 2 ? null : uploadButton}
        </Upload>
        <Modal open={previewOpen} title={PreviewTitle} footer={null} onCancel={this.handleCancelPic}>
          <img
            alt="example"
            style={{
              width: '100%',
            }}
            src={previewImage}
          />
        </Modal>
      </>
    )
  }
}
