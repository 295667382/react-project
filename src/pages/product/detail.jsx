import React, {useEffect,useState} from 'react'
import { Card,Divider,List,Typography} from 'antd'
import { useNavigate,route} from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { BASE_IMG_PATH } from '../../utils/constantd';
import './detail.less'


export default function ProductDetail(){
    let location = useLocation()
    const navigate = useNavigate()
    const [detailProduct, setDeatilProduct]=useState([])
    /* const arr=[1,2]
    arr.map((index,item)=>{
        console.log("index:",index,"item:",item)
    })
    console.log("typeof(arr)",typeof(arr)) */
    useEffect(()=>{
        setDeatilProduct(location.state.record)
        
    },[])
   // console.log("======location.state.record===",location.state.record)
   
    //返回按钮
    const clickBack=()=>{
       // console.log("")
        navigate("/product")
    }
    const {name,desc,price,categoryId,imgs,detail}=detailProduct
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
        <List.Item> <span className='left'>所属分类:</span><span className='right'>{categoryId}</span> </List.Item>
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
        <List.Item> 
            <div style={{display:'flex'}}>
            <div className='left' >商品详情:</div>
            <div className='right' dangerouslySetInnerHTML = {{__html:detail}}></div>
            </div>
         </List.Item>
        
  


       </List>
       
        </Card>
        
        
       


      </div>
    )
  
}
