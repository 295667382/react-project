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
    constructor (props) {
      super(props)
      let fileList = []
      // 如果传入了 imgs, 生成一个对应的 fileList 
      //console.log("=======图片组件==this.props.imgs==========",this.props)
      const imgs = this.props.imgs
      if (imgs && imgs.length > 0) {
          fileList = imgs.map((img, index) => ({
          uid: -index,
          name: img,
          status: 'done', // loading: 上传中, done: 上传完成, remove: 删除 
          url: BASE_IMG_PATH + img,
        })) }
      //初始化状态 
      this.state = {
        fileList: fileList // 所有需要显示的图片信息对象的数组
      }
     }
    getBase64 = (file) =>
    new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
    handlePreview=async(file)=>{
        if (!file.url && !file.preview) {
            file.preview = await this.getBase64(file.originFileObj);
          }
          const PreviewImageSrc=file.url || file.preview
          const PreviewTitle=file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
          this.setState({previewImage:PreviewImageSrc})
          this.setState({previewOpen:true})
          this.setState({PreviewTitle:PreviewTitle})       

    }
    handleChange=({ file, fileList })=>{
        console.log("ffile.status",file.status)
        this.setState({fileList:fileList});
        if (file.status === 'done') {
            message.success(`上传图片成功:${fileList.status}`)
        }else if(file.status ==='removed'){
          message.success("删除图片")
        
        }else{
            console("我进来了这里")
        }

    }
    getImgs = () => this.state.fileList.map(file => file.response.data.name)
    render() {
    const {fileList}=this.state
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
    )
  }
}
