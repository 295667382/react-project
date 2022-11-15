import React, {useEffect,useState} from 'react'
import { Card,Divider,List,Typography} from 'antd'
import { useNavigate,route} from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons';
import './detail.less'


export default function ProductDetail(){
    let location = useLocation()
    const navigate = useNavigate()
    const [detailProduct, setDeatilProduct]=useState([])
    useEffect(()=>{
        setDeatilProduct(location.state.record)
    },[])
    console.log("======location.state.record.imgs===",location.state.record.imgs)
   
    //返回按钮
    const clickBack=()=>{
        console.log("")
        navigate("/product")
    }
    const {name,detail,price,categoryId}=detailProduct
   
    const title=(
        <div>
        <span onClick={clickBack}> <ArrowLeftOutlined /></span>
        <span style={{marginLeft:'10px'}}>商品详情</span>
        </div>  
    )
    const imgs= ["https://pica.zhimg.com/50/v2-18addfa5485616e4940784f178fa8db8_l.jpg?source=57bbeac9","https://pica.zhimg.com/50/v2-18addfa5485616e4940784f178fa8db8_l.jpg?source=57bbeac9"]
      
    return (
      <div> 
        <Card title={title} style={{ textAlign:'left' }}>
        <List>
        <List.Item> <span className='left'>商品名称:</span><span className='right'>{name}</span> </List.Item>
        <List.Item> <span className='left'>商品描述:</span><span className='right'>{detail}</span> </List.Item>
        <List.Item> <span className='left'>商品价格:</span><span className='right'>{price}</span> </List.Item>
        <List.Item> <span className='left'>所属分类:</span><span className='right'>{categoryId}</span> </List.Item>
        <List.Item> <span className='left'>商品图片:
        {imgs.forEach((item)=>{
            <img  style={{marginRight:'20px'}} src={item}/>
        })}
        </span>
        <img className="productimg" src={imgs[0]}/>
        <img className="productimg" src={imgs[1]}/>
        </List.Item>


       </List>
       
        </Card>
        
        
       


      </div>
    )
  
}
