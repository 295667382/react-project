import React, {useEffect,useState} from 'react'
import { Card,Divider,List,Typography} from 'antd'
import { useNavigate,route} from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { BASE_IMG_PATH } from '../../utils/constantd';
import './detail.less'
import {reqCategorys} from '../../api/index'


export default function ProductDetail(){
    let location = useLocation()
    const navigate = useNavigate()
    const [boolValue, setBoolValue] = useState(false);
    const [detailProduct, setDeatilProduct]=useState([])
    const [pname,setPname]=useState([])
    const [sname,setSname]=useState([])
    
    useEffect(()=>{
        const product=location.state.record
        setDeatilProduct(product) 
    },[])
    useEffect(() => {
        setBoolValue(true);
        if(boolValue) {
            getcategoryId()
        }
        
      }, [detailProduct])
    //获取分类
    const getcategoryId=async()=>{
        //获取父分类
        const response=await reqCategorys("0")
        const {categoryId,pCategoryId}=detailProduct
        console.log("pCategoryId",pCategoryId)
        console.log("categoryId",categoryId)
        if(response.status===0){
            response.data.forEach((item)=>{
                if(item._id===pCategoryId){
                    setPname(item.name)
                }
            })
        }
        //获取子分类
        const res=await reqCategorys(pCategoryId)
        if(res.status===0){
            res.data.forEach((item)=>{
                if(item._id===categoryId){
                    setSname(item.name)
                }
            })
        }

    }
   
   
    //返回按钮
    const clickBack=()=>{
        navigate("/product")
    }
    console.log("detailProduct",detailProduct)
    const {name,desc,price,categoryId,imgs,detail,pCategoryId}=detailProduct
    const title=(
        <div>
        <span onClick={clickBack}> <ArrowLeftOutlined /></span>
        <span style={{marginLeft:'10px'}}>商品详情</span>
        </div>  
    )
   // const imgs= ["https://pica.zhimg.com/50/v2-18addfa5485616e4940784f178fa8db8_l.jpg?source=57bbeac9","https://pica.zhimg.com/50/v2-18addfa5485616e4940784f178fa8db8_l.jpg?source=57bbeac9"]
      
    return (
      <div> 
        <Card title={title} style={{ textAlign:'left' }}>
        <List>
        <List.Item> <span className='left'>商品名称:</span><span className='right'>{name}</span> </List.Item>
        <List.Item> <span className='left'>商品描述:</span><span className='right'>{desc}</span> </List.Item>
        <List.Item> <span className='left'>商品价格:</span><span className='right'>{price}</span> </List.Item>
        <List.Item> <span className='left'>所属分类:</span><span className='right'>{pname} <span>---</span> {sname}</span> </List.Item>
        <List.Item > <span className='left'>商品图片:  </span>
        <span>
            {
            imgs?.map(img => (
            <img style={{width:'70px',height:'70px',marginRight:'30px'}} src={BASE_IMG_PATH + img} alt="img" key={img} /> ))
            }
         </span>
       {/*  <span>
            {
           Array.from(imgs).map(img => (
            <img src={BASE_IMG_PATH + img} alt="img" key={img} /> ))
            }
         </span> */}
        </List.Item>
        <List.Item > 
            <div style={{display:'flex'}}>
            <div className='left' style={{width:'10%'}}>商品详情:</div>
            <div className='right' style={{width:'80%'}} dangerouslySetInnerHTML = {{__html:detail}}></div>
            </div>
         </List.Item>
        
  


       </List>
       
        </Card>
        
        
       


      </div>
    )
  
}
