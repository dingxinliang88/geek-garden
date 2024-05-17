import {
  DiffOutlined,
  EditOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Popconfirm } from "antd";
import "./index.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doUserLogout, fetchUserInfo } from "@/store/user";

const { Header, Sider } = Layout;

const items = [
  {
    label: "首页",
    key: "/",
    icon: <HomeOutlined />,
  },
  {
    label: "文章管理",
    key: "/article",
    icon: <DiffOutlined />,
  },
  {
    label: "创建文章",
    key: "/publish",
    icon: <EditOutlined />,
  },
];

const GeekLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onMenuClick = (route) => {
    navigate(route.key);
  };
  const selectedKey = location.pathname;
  const username = useSelector((state) => state.user.userInfo.name);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const logout = () => {
    dispatch(doUserLogout());
    navigate("/login")
  }
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{username || "游艺丶"}</span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出?"
              okText="退出"
              cancelText="取消"
              onConfirm={logout}
            >
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
            theme="dark"
            selectedKeys={selectedKey}
            style={{ height: "100%", borderRight: 0 }}
            items={items}
            onClick={onMenuClick}
          />
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default GeekLayout;
