import React,{useEffect,useState} from 'react'
import { SearchOutlined,PlusOutlined,ReloadOutlined } from '@ant-design/icons';
import { useNavigate} from 'react-router-dom'
import { Card,Select,Input,Button,Space,Table, Tag, message,Modal} from 'antd';
import {reqGetProduct,reqSearchCategory,reqDeleteProduct} from '../../api/index'
import {PAGE_SIZE} from '../../utils/constantd'


export default function Product() {
    const navigate = useNavigate()
    const [data, setData]=useState([])
    const [total, setTotal]=useState([0])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteId,setDeleteId]=useState("")
    const [tableParams, setTableParams] = useState({
      pagination: {
        current: 1,
        pageSize: PAGE_SIZE, 
      },
    });
    
    const [SelectFlag,setSelectFlag] =useState([0])  //按商品名称搜索falg值为0，按商品描述搜索
    const [keyword,setKeyword]=useState([])

    useEffect (()=>{
      loadData(tableParams)
      
    },[tableParams])

   /*  |pageNum    |Y       |Number   |页码
    |pageSize   |Y       |Number   |每页条目数  */
    //首页加载数据
    const loadData=(async(tableParams)=>{
      const pageNum=tableParams.pagination.current
      const response=await reqGetProduct(pageNum,PAGE_SIZE)
      if(response.status===0){
        setData(response.data.list)
        setTotal(response.data.total)
        message.success("更新列表成功")
      }else{
        message.error("更新列表失败")
      }
      
     })
  
    //改变select选项框
    const handleChangeSelect=(value)=>{
      setSelectFlag(value)
    }
    //
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
        const response=await reqSearchCategory("1",PAGE_SIZE,productName)
        console.log("以商品名称搜索",response)
        if(response.status===0){
          setTotal(response.data.total)
          setData(response.data.list)
          message.success(`查询到${response.data.total}条记录`)
        }else{
          message.error("查询失败")
        }
      }else{
        //以商品描述搜索
        const productDesc=keyword
        const response=await reqSearchCategory("1",PAGE_SIZE,"",productDesc)
        if(response.status===0){
          setTotal(response.data.total)
          setData(response.data.list)
          message.success(`查询到${response.data.total}条记录`)

        }else{
          message.error("查询失败")
        }
       
      }
    }
    //刷新按钮
    const RefreshProduct=()=>{
      loadData(tableParams)
    }
    //更改页码
    const ChangePagination=(pagination, filters, sorter, extra)=>{
    
      setTableParams({
        pagination,
        filters,
        ...sorter,
      });
      loadData(tableParams)
    }
//========查看product的详情及修改页面=========
  const CheckDetail=(record)=>{
    return (
     ()=>{
      navigate("/product/detail/",{ state: { record:record}})
      
     }
    )
  }
  //============删除商品==============
  const DeleteProduct=(record)=>{
    return (()=>{
      setDeleteId(record._id)
      setIsModalOpen(true)
    })
    

 /*    return (async()=>{
      console.log("record",record)
      const response=await reqDeleteProduct(record._id)
      if(response.status===0){
        message.success("删除成功")
        loadData(tableParams)
      }
     })  */


  }
  const handleOk = async() => {
    const response=await reqDeleteProduct(deleteId)
    if(response.status===0){
      message.success("删除成功")
      setIsModalOpen(false)
      loadData(tableParams)
    }
    
    
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
//=======添加商品==========
  const addProduct=(product)=>{
    return (()=>{
      console.log("product",product)
      navigate("/product/addupdate",{state:{product}})
    })
  }

  //=====编辑商品=======
  const UpdateProduct=(product)=>{
    return (()=>{
      console.log("product",product)
      navigate("/product/addupdate",{state:{product}})
    })
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
    <Button type="primary" onClick={RefreshProduct} icon={<ReloadOutlined />} style={{ marginLeft: '20px' }}>刷新</Button>
</div>)

    const extra=(
      <Button type="primary" onClick={addProduct()} icon={<PlusOutlined/>}>添加商品</Button>
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
            <a onClick={CheckDetail(record)}>详情</a>
            <a onClick={UpdateProduct(record)}>修改</a>
            <a onClick={DeleteProduct(record)}>删除</a>
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
    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        确认删除该商品吗？
      </Modal>
    
    
     

   </div>
       

    
    )
  
}
