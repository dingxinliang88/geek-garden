import {
  DiffOutlined,
  EditOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Popconfirm } from "antd";
import "./index.scss";

const { Header, Sider } = Layout;

const items = [
  {
    label: "首页",
    key: "1",
    icon: <HomeOutlined />,
  },
  {
    label: "文章管理",
    key: "2",
    icon: <DiffOutlined />,
  },
  {
    label: "创建文章",
    key: "3",
    icon: <EditOutlined />,
  },
];

const GeekLayout = () => {
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">游艺丶</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出?" okText="退出" cancelText="取消">
              <LogoutOutlined />
              退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-backgrond">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={items}
          />
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          Content
        </Layout>
      </Layout>
    </Layout>
  );
};

export default GeekLayout;
