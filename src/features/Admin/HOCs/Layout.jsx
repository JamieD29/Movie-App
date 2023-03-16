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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import { Route, Routes } from "react-router-dom";
import * as actionTypes from "../constants/type";
import logo from "../../../assets/img/logo.png";
import { fetchProfile } from "../Authen/thunk";
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
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.adminAuth.adminLogin);
  const adminLogged = useSelector((state) => state.adminAuth.adminLogged);
  const isLoading = useSelector((state) => state.adminAuth.isLoading);


  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // const dispatch = useDispatch();
  useEffect( () => {
    
      let authorToken = "";
      localStorage.getItem("adminToken") === null
        ? (authorToken = admin.accessToken)
        : (authorToken = localStorage.getItem("adminToken"));
      dispatch(fetchProfile(authorToken));
   
  }, []);

  const handleLogOut = async () => {
    await localStorage.removeItem("adminToken");
    dispatch({
      type: actionTypes.ADMIN_LOG_OUT,
    });
    navigate("/admin/signin");
  };

  const renderLoading = () => {
    return (
      <div className="flex items-center mr-10 animate-pulse space-x-4">
        <div className="h-6 w-40 bg-slate-200 rounded"></div>
        <div className="h-6 w-10 bg-slate-200 rounded"></div>
      </div>
    );
  };

  const renderUserHeader = () => {
    return (
      <div className="flex items-center mr-10">
        <p className="mr-5 text-lg">
          Hello, <b>{admin?.hoTen || adminLogged?.hoTen}</b>
        </p>
        <button
          className="border-amber-300 bg-transparent rounded-xl text-amber-300 p-2 hover:bg-amber-300 hover:text-white font-bold uppercase"
          onClick={handleLogOut}
        >
          Log out
        </button>
      </div>
    );
  };

  return (
    <>
      <Layout className="">
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
              alignItems:"center"
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

          {isLoading ? renderLoading() : renderUserHeader()}
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
    </>
  );
};
export default AdminLayout;
