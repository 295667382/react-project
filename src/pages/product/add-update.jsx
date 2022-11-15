import React,  {useEffect,useState}  from 'react'
import { Card } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useLocation,useNavigate } from 'react-router-dom'
export default function ProductAddUpdate() {
    let location = useLocation()
    const navigate = useNavigate()
    const [titlefalg,setTitlefalg]=useState([])
    useEffect (()=>{
        console.log("location.state.record",location.state)
        if(location.state.product){
           
            setTitlefalg("修改商品")
        }else{
         
            setTitlefalg("添加商品")
        }
        
      },[])
    //返回按钮
   
    const title=(
        <div>
             <span onClick={()=>navigate(-1)} style={{marginRight:'10px'}}> <ArrowLeftOutlined /></span>
            <span>{titlefalg}</span>
            
        </div>
      
    )
    return (
        <div>
        <Card title={title}  style={{ textAlign:"left" }}>
        <p></p>
        <p>Card content</p>
        <p>Card content</p>
        </Card>
        </div>
    )
  
}
