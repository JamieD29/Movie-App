import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  QuestionOutlined,
  UserOutlined,
  VideoCameraOutlined,
  CaretRightOutlined,
  CaretLeftOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import logo from "../../assets/img/logo.png";
const { Header, Sider, Content } = Layout;


const getItem = (label, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  





const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo bg-amber-300">
          <img src={logo} alt="" />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Users",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Movie",
            },
            {
              key: "3",
              icon: <QuestionOutlined />,
              label: "Coming Soon",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {React.createElement(
            collapsed ? CaretRightOutlined : CaretLeftOutlined,
            {
              className: "trigger text-3xl",
              onClick: () => setCollapsed(!collapsed),
            }
          )}

          <div className="flex">
            <p>Hello, Jamie</p>
            <button className="">Logout</button>
          </div>
        </Header>
      </Layout>
    </Layout>
  );
};
export default Admin;
