import React,  {Component}  from 'react'
import { Card, Button, Form, Input,Cascader, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useLocation,useNavigate,useParams} from 'react-router-dom'
import ImageUpload from './imageupload';
import ClassimageUpload from './ClassimageUpload';
import Richtexteditor from './rich-text-editor';
import { Editor } from 'react-draft-wysiwyg';
import {reqIdGetCategory,reqAddProduct,reqUpdateProduct,reqCategorys} from '../../api/index'
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
        categoryId:'',
        pCategoryId:'',
        categoryName:'',
        pCategoryName:'',
        options:[],
        poptions:[],
        _id:'',
        isAdd:true  //判断是添加还是更新；
        
    }
   
    constructor(props) {
        super(props);
        this.editor = React.createRef();
        this.pw = React.createRef();
    }
    componentDidMount(){
        this.getCatory()
        const {location}=this.props
        console.log("获取到的路由数据",location)
        const product=location.state.product
        if(product){
            this.setState({titleFlag:"修改商品",isAdd:false})     
        }else{
            this.setState({titleFlag:"添加商品"})
        } 

    }
    componentWillMount () {
        const {location}=this.props
        console.log("获取this.props",this.props)
        const product=location.state.product
        console.log("product",product)
        //健壮性保证
        const {_id,imgs,name,desc,price,detail,categoryName,pCategoryName}=product? product:[]
        const pid=this.props.location.state.pid
       /*  this.getcategoryId(product) */
        this.setState({imgs:imgs,name:name,desc:desc,price:price,detail:detail,_id:_id,categoryName:categoryName,pCategoryName:pCategoryName},()=>{ 
            
        })
    }
    
    getCatory=async()=>{
        const response=await reqIdGetCategory("0")
        const poptions=[]
        response.data.forEach(async(item)=>{
            const pid=item._id
            //获取一级类表
            poptions.push({
                value:item.name,
                label:item.name,
                _id:item._id,
                parentId:item.parentId
            })
        })
         this.setState({poptions:poptions},()=>{
        }) 

    }
    //=====父分类选择=====
    onChangeParent=async(value, selectedOptions)=>{
        console.log("父分类value:",value,"selectedOptions:",selectedOptions[0])
        this.setState({pCategoryName:selectedOptions[0].value})
        //获取子列表
        const {_id,parentId}=selectedOptions[0]
        this.setState({pCategoryId:_id})
        console.log("_id",_id)
        const response=await reqIdGetCategory(_id)
        const options=[]
        console.log("response",response)
        if(response.status===0){
            response.data.forEach(async(item)=>{
                const pid=item._id
                //获取一级类表
                options.push({
                    value:item.name,
                    label:item.name,
                    _id:item._id,
                    parentId:item.parentId
                })
            })
             this.setState({options:options},()=>{
       
        }) 
        }

    }
    //子分类获取
    onChangeOption=(value, selectedOptions)=>{
        console.log("子分类value:",value,"selectedOptions:",selectedOptions[0])
        this.setState({categoryName:selectedOptions[0].value})
        const {_id,parentId}=selectedOptions[0]
        this.setState({ categoryId:_id})
    }
    
     
    goback=()=>{
       this.props.navigate(-1)
    }
    //addProdcut添加商品
    addProduct=async()=>{
        const {isAdd}=this.state
        const {categoryId,pCategoryId,name,desc,price,_id,categoryName,pCategoryName}=this.state
        const detail=this.editor.current.getDetail()
        const imgs=this.pw.current.getImgs()
        if(isAdd){
            //添加商品
            // console.log("添加商品")
            const response=await reqAddProduct(categoryId,pCategoryId,name,desc,price,detail,imgs,categoryName,pCategoryName)
            if(response.status===0){
                message.success("添加商品成功")
                this.props.navigate(-1)
            }

        }else{
           
            //更新商品
            const response=await reqUpdateProduct(_id,categoryId,pCategoryId,name,desc,price,detail,imgs,categoryName,pCategoryName)
            if(response.status===0){
                message.success("修改商品成功")
                this.props.navigate(-1)
            }
            
        }
      
    }
     
    render() {
   
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
    const {name,categoryName,pCategoryName,desc,price,detail,imgs,poptions,options,pCategoryId,categoryId}=this.state
   
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
                initialValues={{name:name,price:price,desc:desc,categoryId:categoryName,pCategoryId:pCategoryName}}
                
            >
            <Form.Item  label="商品名称" name="name" rules={[{ required: true,message: '商品名称不能为空'}]}>
                <Input placeholder='请输入商品名称'  onChange={(e)=>this.setState({name:e.target.value})} style={{width:'650px'}} /></Form.Item>
            <Form.Item label="商品描述" name="desc" rules={[{ required: true,message: '商品描述不能为空' }]}>
                <TextArea  showCount placeholder="请输入商品描述"  onChange={(e)=>this.setState({desc:e.target.value})} style={{width:'650px'}}/>
            </Form.Item>
            <Form.Item label="商品价格" name="price" rules={[{ required: true }]}>
                <Input addonAfter="元"onChange={(e)=>this.setState({price:e.target.value})} style={{width:'650px'}} />
            </Form.Item>
            <Form.Item label="所属父分类" name="pCategoryId" rules={[{ required: true }]}>
                <Cascader options={poptions} onChange={this.onChangeParent} placeholder="Please select" style={{width:'650px'}}/>
    
            </Form.Item>
            <Form.Item label="所属子分类" name="categoryId" rules={[{ required: true }]}>
                <Cascader  options={options} onChange={this.onChangeOption} placeholder="Please select" style={{width:'650px'}}/>
    
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