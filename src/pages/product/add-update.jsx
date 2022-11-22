import React,  {Component}  from 'react'
import { Card, Button, Form, Input,Cascader, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useLocation,useNavigate,useParams} from 'react-router-dom'
import ImageUpload from './imageupload';
import ClassimageUpload from './ClassimageUpload';
import Richtexteditor from './rich-text-editor';
import { Editor } from 'react-draft-wysiwyg';
import {reqIdGetCategory,reqAddProduct} from '../../api/index'
import { options } from 'less';
/* 
|categoryId    |Y       |string   |分类ID
    |pCategoryId   |Y       |string   |父分类ID
    |name          |Y       |string   |商品名称
    |desc          |N       |string   |商品描述
    |price         |N       |string   |商品价格
    |detail        |N       |string   |商品详情
    |imgs          |N       |array   |商品图片名数组 */

export const withNavigation = (Component) => {
    return (props) => <Component {...props} navigate={useNavigate()} location={useLocation()} Params={useParams()}/>;
  };

const { TextArea } = Input;


class ProductAddUpdate extends Component {
    state={
        titleFlag:'',
        name:'',
        desc:'',
        price:'',
        imgs:[],
        detail:'',
        categoryId:'1',
        pCategoryId:'1',
        options:[
            
        ]
        
    }
   
    constructor(props) {
        super(props);
        this.editor = React.createRef();
        this.pw = React.createRef();
        
            
        
      }
    componentDidMount(){
        console.log("componentDidMount")
        this.getCatory()
        const {location}=this.props
        const product=location.state.product
        if(product){
            this.setState({titleFlag:"修改商品"})     
        }else{
            this.setState({titleFlag:"添加商品"})
        } 

    }
    componentWillMount () {
        const {location}=this.props
        
        const product=location.state.product
        //健壮性保证
        const {imgs,name,desc,price,detail}=product? product:[]
        
        this.setState({imgs:imgs,name:name,desc:desc,price:price,detail:detail},()=>{
            //console.log("更新商品",this.state.imgs)
        })
    }
    getCatory=async()=>{
        const response=await reqIdGetCategory("0")
        const options=[]
        response.data.forEach(async(item)=>{
            const pid=item._id
            //获取一级类表
            options.push({
                value:item.name,
                label:item.name,
                _id:item._id,
                parentId:item.parentId
            })
            //获取之后根据item._id获取二级列表
            const subCategorys = await reqIdGetCategory(item._id)
            const children=[]
            if(subCategorys.status===0){
                subCategorys.data.forEach((item)=>{
                    options.push({
                        value:item.name,
                        label:item.name,
                        _id:item._id,
                        parentId:item.parentId   
                    })
                }) 
            }

        })
     
         this.setState({options:options},()=>{
           // console.log("=======option=======",options.length,options)
        }) 

    }
     
    goback=()=>{
       
       this.props.navigate(-1)
    }
    //addProdcut添加商品
    addProduct=async()=>{
        console.log("addProduct")
        const {categoryId,pCategoryId,name,desc,price}=this.state
        const detail=this.editor.current.getDetail()
       
        //console.log("detail",detail)
        const imgs=this.pw.current.getImgs()
        const response=await reqAddProduct(categoryId,pCategoryId,name,desc,price,detail,imgs)
        //console.log("addProdcut添加商品",response)
        if(response.status===0){
            message.success("添加商品成功")
            this.props.navigate(-1)
        }
    }
   
    render() {
   const {options}=this.state
    //card title取值
    const title=(
        <div>
            <span onClick={this.goback} style={{marginRight:'10px'}}> <ArrowLeftOutlined /></span>
            <span>{this.state.titleFlag}</span>   
        </div>  
    )
    const onChange = (value) => {
           
            
          };

    const onFinish=(value)=>{
       /*  console.log("===")
        console.log("onFinis",value) */
    }
    const onFinishFailed=(errorInfo)=>{
      
    }
    const {name,desc,price,detail,imgs}=this.state
    return (
    <div>
    <Card title={title}  style={{ textAlign:"left" }}>
        
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                labelCol={{ flex: '110px' }}
                labelAlign="left"
                labelWrap
                wrapperCol={{ flex: 1 }}
                colon={false}
                initialValues={{name:name,price:price,desc:desc}}
                
            >
            <Form.Item  label="商品名称" name="name" rules={[{ required: true,message: '商品名称不能为空'}]}>
                <Input placeholder='请输入商品名称'  onChange={(e)=>this.setState({name:e.target.value})} style={{width:'650px'}} /></Form.Item>
            <Form.Item label="商品描述" name="desc" rules={[{ required: true,message: '商品描述不能为空' }]}>
                <TextArea  showCount placeholder="请输入商品描述"  onChange={(e)=>this.setState({desc:e.target.value})} style={{width:'650px'}}/>
            </Form.Item>
            <Form.Item label="商品价格" name="price" rules={[{ required: true }]}>
                <Input addonAfter="元"onChange={(e)=>this.setState({price:e.target.value})} style={{width:'650px'}} />
            </Form.Item>
            <Form.Item label="所属分类" name="pCategoryId" rules={[{ required: true }]}>
                <Cascader options={options} onChange={onChange} placeholder="Please select" style={{width:'650px'}}/>
    
            </Form.Item>
            <Form.Item label="商品图片" name="imgs" rules={[{ required: true }]}>
               {/*  <ImageUpload ref={this.pw}/> */}
               <ClassimageUpload ref={this.pw} imgs={imgs}/>
            </Form.Item>
              <Form.Item label="商品详情" name="商品详情" labelCol={{span:2}} wrapperCol={{span:20}} rules={[{ required: true }]}>
              <Richtexteditor ref={this.editor} detail={detail} />
            </Form.Item>
                
            <Form.Item style={{textAlign:"center"}}>
                <Button type="primary" style={{marginRight:'40px'}}  onClick={this.addProduct}>提交</Button>
                <Button type="primary" style={{marginLeft:'40px'}}>取消</Button>
            </Form.Item>
          
            </Form>
            </Card>
          </div>
        )
      }
   
          
   
}
export default  withNavigation(ProductAddUpdate);