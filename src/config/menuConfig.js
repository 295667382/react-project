import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
  } from '@ant-design/icons';


 export const menulist=[{
    title: '首页', // 菜单标题名称 key: '/home', // 对应的 path icon: 'home', // 图标名称
    }, {
    title: '商品',
    key: '/products',
    icon: 'appstore', children: [ // 子菜单列表
    {
    title: '品类管理', key: '/category', icon: 'bars'
    }, {
    title: '商品管理', key: '/product', icon: 'tool'
    }, ]
    }, {
    title: '用户管理', key: '/user', icon: 'user'
    }, {
    title: '角色管理', key: '/role', icon: 'safety',
    }, {title: '图形图表', key: '/charts', icon: 'area-chart', children: [
      {
      title: '柱形图', key: '/charts/bar', icon: 'bar-chart'
      }, {
      title: '折线图', key: '/charts/line', icon: 'line-chart'
      }, {
      title: '饼图',
      key: '/charts/pie', icon: 'pie-chart'
      }, ]
      },

]
/* export const items=menulist.forEach((item)=>{
  
  if(item.children){
    
  }
})  */
export const items = [
        getItem('首页', '/home', <PieChartOutlined />),
        getItem('商品', '/products', <MailOutlined />, [
          getItem('品类管理', '/category'),
          getItem('商品管理', '/product')
        ]),
        getItem('用户管理', '/user', <PieChartOutlined />),
        getItem('角色管理', '/role', <PieChartOutlined />),
        getItem('图形图表', '/charts', <AppstoreOutlined />, [
          getItem('柱形图', '/charts/bar'),
          getItem('折线图', '/charts/line'),
          getItem('饼图', '/charts/pie')
        ]),
      ];
export function getItem(label, key, icon, children, type) {
        return {
          key,
          icon,
          children,
          label,
          type,
        };
      }
