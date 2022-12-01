import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  PieChartOutlined,
  LineChartOutlined,
  BarChartOutlined,
  UserOutlined,
  SmileOutlined,
  AreaChartOutlined,
  ShoppingCartOutlined,
  ProfileOutlined
} from '@ant-design/icons';
const  menuList = [
    {
    label: '首页',title: '首页', key:'/', icon: <HomeOutlined />,
    }, 
    {
    title: '商品',label:'商品',key: '/products',icon: <MailOutlined />,
    children:
     [ // 子菜单列表
      {title: '品类管理', label: '品类管理',key: '/category', icon: <ProfileOutlined />}, 
      {title: '商品管理',label: '商品管理', key: '/product', icon: <ShoppingCartOutlined />}, 
    ]}, 
    {
    title: '用户管理',label: '用户管理', key: '/user', icon: <UserOutlined />
    }, 
    {
    title: '角色管理',label: '角色管理', key: '/role', icon: <SmileOutlined />,
    },
    {
    title: '图形图表',label: '图形图表', key: '/charts', icon: <AreaChartOutlined />, 
    children: [
      {
      title: '柱形图',label: '柱形图', key: '/charts/bar', icon: <BarChartOutlined />
      }, {
      title: '折线图',label: '折线图', key: '/charts/line', icon: <LineChartOutlined />
      }, {
      title: '饼图',
      label:'饼图',
      key: '/charts/pie', icon: <PieChartOutlined />
      }, ]
      },
]
export default menuList

/* import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
  } from '@ant-design/icons';


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
 */