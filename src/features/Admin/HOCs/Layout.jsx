// [
//   {
//     key: "1",
//     icon: <UserOutlined />,
//     label: "Users",
//   },
//   {
//     key: "2",
//     icon: <VideoCameraOutlined />,
//     label: "Movie",
//   },
//   {
//     key: "3",
//     icon: <QuestionOutlined />,
//     label: "Coming Soon",
//   },
// ]

import {
  VideoCameraAddOutlined,
  UnorderedListOutlined,
  EllipsisOutlined,
  UserOutlined,
  VideoCameraOutlined,
  CaretRightOutlined,
  CaretLeftOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
//   import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import { Route, Routes } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
const { Header, Sider, Content } = Layout;

const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};

const items = [
  getItem("Users", "users", <UserOutlined />),
  getItem("Movies", "movies", <VideoCameraOutlined />, [
    getItem("Movie List", "movielist", <UnorderedListOutlined />),
    getItem("Add Movie", "addmovie", <VideoCameraAddOutlined />),
  ]),
  getItem("Coming Soon", "comingsoon", <EllipsisOutlined />),
];

const AdminLayout = (props) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <div className="logo bg-amber-300">
          <NavLink to="/admin">
            <img className="w-full" src={logo} alt="" />
          </NavLink>
        </div>
        <Menu
          onClick={({ key }) => {
            navigate(key);
          }}
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
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

          {/* <nav>
            <NavLink to="users">User</NavLink>-
            <NavLink to="addmovie">Add Movie</NavLink>-
            <NavLink to="movielist">Movie List</NavLink>-
            <NavLink to="addschedule">Add Schedule</NavLink>
          </nav> */}

          <div className="flex">
            <p>Hello, Jamie</p>
            <button className="">Logout</button>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
