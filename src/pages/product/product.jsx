import React,{useEffect,useState} from 'react'
import { SearchOutlined,PlusOutlined } from '@ant-design/icons';
import { Card,Select,Input,Button,Space,Table, Tag, message   } from 'antd';
import {reqGetProduct,reqSearchCategory} from '../../api/index'


export default function Product() {
    //
    const [data, setData]=useState([])
    const [total, setTotal]=useState([0])
    const [tableParams, setTableParams] = useState({
      pagination: {
        current: 1,
        pageSize: 4, 
      },
    });
    const [SelectFlag,setSelectFlag] =useState([0])  //按商品名称搜索falg值为0，按商品描述搜索
    const [keyword,setKeyword]=useState([])
   /*  |pageNum    |Y       |Number   |页码
    |pageSize   |Y       |Number   |每页条目数  */
    const loadData=(async(tableParams)=>{
      const pageNum=tableParams.pagination.current
      const response=await reqGetProduct(pageNum,"4")
      console.log("response",response)
      setData(response.data.list)
      setTotal(response.data.total)
     })
    useEffect (()=>{
      loadData(tableParams)
      
    },[tableParams])
  
    const handleChangeSelect=(value)=>{
      setSelectFlag(value)
    }
    const onhandlekeyword=(e)=>{
      setKeyword(e.target.value)
      
    }
    //点击搜索按钮进行搜索product
   /*  |pageNum       |Y       |Number   |页码
    |pageSize      |Y       |Number   |每页条目数
    |productName   |N       |String   |根据商品名称搜索
    |productDesc   |N       |String   |根据商品描述搜索  */
    const SerachProduct=async()=>{
      //以商品名称搜索
      if(SelectFlag==='0'){
        const productName=keyword
        const response=await reqSearchCategory("1","4",productName)
        console.log("以商品名称搜索",response)
        setData(response.data.list)
        message.success("搜索成功")
      }else{
        //以商品ID搜索
        const productDesc=keyword
        const response=await reqSearchCategory("1","4",productDesc)
        console.log("以商品id搜索",response)
        setData(response.data.list)
        message.success("搜索成功")
      }
     
      
     // const response=await reqSearchCategory("1","4","",productDesc)
     //console.log("点击搜索按钮进行搜索product",response)
      
    }
    const ChangePagination=(pagination, filters, sorter, extra)=>{
      console.log("pagination",pagination,"filters:",filters,"sorter",sorter,"extra",extra)
      setTableParams({
        pagination,
        filters,
        ...sorter,
      });
      console.log("tableParams",tableParams)
      loadData(tableParams)
    }
    const title=(
      <div>
      <Select
      style={{ width: 220,marginRight:'20px' }}
      defaultValue="按名称搜索"
      
      bordered={true}
      onChange={handleChangeSelect}
      options={[
        {
          value: '0',
          label: '按商品名称搜索',
        },{
          value: '1',
          label: '按商品描述搜索',
        }
      ]}
    />
    <Input placeholder="关键字"  onChange={onhandlekeyword} style={{ width: 220 }} />
    <Button type="primary" onClick={SerachProduct} style={{ marginLeft: '20px' }} icon={<SearchOutlined/>}>搜索</Button>
</div>)

    const extra=(
      <Button type="primary" icon={<PlusOutlined/>}>添加商品</Button>
    )

    //columns
    const columns = [
      
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '状态',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <Button type="primary">下架</Button>
            <p style={{marginTop:'10px'}}>在售</p>
          </Space>
        ),
      },
      {
        title: '操作',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <a>详情</a>
            <a>修改</a>
          </Space>
        ),
      },
    ];
  

    return (  
   <div>
    <Card title={title} extra={extra} style={{ textAlign: 'left' }}>
    <Table columns={columns} 
    dataSource={data} 
    onChange={ChangePagination}
    scroll={{y:280}}
    pagination={{
      total:total,
      pageNum:tableParams.pagination.pageNum,
      pageSize:tableParams.pagination.pageSize
     

    }} 
    />
    
    </Card>

   </div>
       

    
    )
  
}
