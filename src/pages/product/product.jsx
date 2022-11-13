import React,{useEffect,useState} from 'react'
import { SearchOutlined,PlusOutlined } from '@ant-design/icons';
import { Card,Select,Input,Button,Space,Table, Tag   } from 'antd';
import {reqGetProduct} from '../../api/index'


export default function Product() {
    const [data, setData]=useState([])
    const [tableParams, setTableParams] = useState({
      pagination: {
        current: 1,
        pageSize: 2,
      },
    });
    const loadData=(async(pageNum)=>{
      console.log("pageNum",pageNum)
      const response=await reqGetProduct(pageNum,"2")
      console.log("response",response)
      setData(response.data.list)
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: response.data.total,
        },
      })
  
     })
    useEffect (()=>{
     /*  loadData("1") */
      /* loadData() */
    })
    
    const handleChangeSelect=()=>{
      

    }
    const ChangePagination=(pagination, filters, sorter, extra)=>{
      setTableParams({
        pagination,
        filters,
        ...sorter,
      });
      loadData(tableParams.pagination.current)
    }
   /*  const ChangePagination=(pagination, filters, sorter, extra)=>{
      console.log("pagination",pagination,"filters:",filters,"sorter",sorter,"extra",extra)
      setTableParams({
        pagination,
        filters,
        ...sorter,
      });
      
      
    } */
    const title=(
      <div>
      <Select
      style={{ width: 120,marginRight:'20px' }}
      defaultValue="lucy"
      
      bordered={true}
      onChange={handleChangeSelect}
      options={[
        {
          value: '按名称搜索',
          label: '按名称搜索',
        }
      ]}
    />
    <Input placeholder="关键字"  style={{ width: 220 }} />
    <Button type="primary" style={{ marginLeft: '20px' }} icon={<SearchOutlined/>}>搜索</Button>
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
    pagination={tableParams.pagination} />;
    
    </Card>

   </div>
       

    
    )
  
}
