import {
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
