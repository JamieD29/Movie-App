import React, { useEffect, useState } from "react";
import {
  SettingOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Input, Pagination } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUserPagination } from "../../thunk";
const UserList = () => {
  const [searchParam, setUseSearchParam] = useSearchParams();
  let checkRow = false;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.adminData.users);
  const {adminLogin} = useSelector(state => state.adminAuth)
  const isLoading = useSelector((state) => state.adminData.isLoading);
  const numberOfUserOnPage = 4;

  const [searchUser, setSearchUser] = useState(null);

  const handleDelete = (taiKhoan, soTrang) => {
    let authorToken = "";
    
    !localStorage.getItem("adminToken") ? authorToken =  adminLogin.accessToken : authorToken = localStorage.getItem("adminToken")

    dispatch(deleteUser(taiKhoan, soTrang, authorToken, numberOfUserOnPage));
  }

  const handleEdit = (taiKhoan) => {
    return navigate(`edituser/${taiKhoan}`);
}

const handleChange = async (evt) => {
    
  let value = await evt.target.value;
  if(value === ""){
   return setSearchUser(null)
  }

   setUseSearchParam({page: "1"})
 
   setSearchUser(value)
 
 };


 const renderUserList= () =>{
  return   users.items?.map((item) => {
    const bgRow = "bg-slate-100";
    if (!checkRow) {
      checkRow = true;
      return (
        <tr className=" text-base" key={item.email}>
          <td className="p-3 text- font-semibold">
            <p className="w-32 h-7 text-left">{item.taiKhoan} </p>
          </td>
          <td className="p-3 ">
            <p className="w-40 h-7 text-left">{item.hoTen}</p>
          </td>
          <td className="p-3  font-semibold">
            <p className="w-48 h-7 text-left break-words">{item.email}</p>
          </td>
          <td className="p-3 ">
            <p className="w-32 h-7 text-left">{item.soDt}</p>
          </td>
          <td className="p-3  font-semibold">
            <p className="w-24 h-7 text-left">{item.maLoaiNguoiDung}</p>
          </td>
          <td className="p-3 text-center">
            <div>
              <Button type="ghost" className="text-sky-500 text-xl" onClickCapture={()=> handleEdit(item.taiKhoan)}>
                <EditOutlined />
              </Button>
              <Button type="ghost" className="text-rose-500 text-xl" onClickCapture={()=> handleDelete(item.taiKhoan, searchParam.get("page"))}>
                <DeleteOutlined />
              </Button>
            </div>
          </td>
        </tr>
      );
    } else {
      checkRow = false;
      return (
        <tr
          className={` text-base ${bgRow}`}
          key={item.email}
        >
          <td className="p-3  font-semibold">
            <p className="w-32 h-7  text-left">{item.taiKhoan} </p>
          </td>
          <td className="p-3 ">
            <p className="w-40 h-7 text-left">{item.hoTen}</p>
          </td>
          <td className="p-3  font-semibold ">
            <p className="w-48 h-7 text-left break-words">{item.email}</p>
          </td>
          <td className="p-3 ">
            <p className="w-32 h-7 text-left">{item.soDt}</p>
          </td>
          <td className="p-3  font-semibold">
            <p className="w-24 h-7 text-left">{item.maLoaiNguoiDung}</p>
          </td>
          <td className="p-3 text-center">
            <div>
              <Button type="ghost" className="text-sky-500 text-xl" onClickCapture={()=> handleEdit(item.taiKhoan)}>
                <EditOutlined />
              </Button>
              <Button type="ghost" className="text-rose-500 text-xl" onClickCapture={()=> handleDelete(item.taiKhoan, searchParam.get("page"))}>
                <DeleteOutlined />
              </Button>
            </div>
          </td>
        </tr>
      );
    }
  })
 }

 const renderLoading = ()=>{
  return (
    <>
    <tr className="animate-pulse space-x-4 ">
      <td className="p-3">
        <div className="h-4 w-full bg-slate-200 rounded"></div>
      </td>
      <td className="p-3">
        <div className="h-4 w-full bg-slate-200 rounded"></div>
      </td>
      <td className="p-3">
        <div className="h-4 w-full bg-slate-200 rounded"></div>
      </td>
      <td className="p-3 w-60">
        <div className="h-4 w-full bg-slate-200 rounded"></div>
      </td>
      <td className="p-3">
        <div className="h-4 w-full bg-slate-200 rounded"></div>
      </td>
    </tr>
    <tr className="animate-pulse space-x-4 ">
      <td className="p-3">
        <div className="h-4 w-full bg-slate-300 rounded"></div>
      </td>
      <td className="p-3">
        <div className="h-4 w-full bg-slate-300 rounded"></div>
      </td>
      <td className="p-3">
        <div className="h-4 w-full bg-slate-300 rounded"></div>
      </td>
      <td className="p-3 w-60">
        <div className="h-4 w-full bg-slate-300 rounded"></div>
      </td>
      <td className="p-3">
        <div className="h-4 w-full bg-slate-300 rounded"></div>
      </td>
    </tr>
    <tr className="animate-pulse space-x-4 ">
      <td className="p-3">
        <div className="h-4 w-full bg-slate-200 rounded"></div>
      </td>
      <td className="p-3">
        <div className="h-4 w-full bg-slate-200 rounded"></div>
      </td>
      <td className="p-3">
        <div className="h-4 w-full bg-slate-200 rounded"></div>
      </td>
      <td className="p-3 w-60">
        <div className="h-4 w-full bg-slate-200 rounded"></div>
      </td>
      <td className="p-3">
        <div className="h-4 w-full bg-slate-200 rounded"></div>
      </td>
    </tr>

    </>
  

  )
  }

  useEffect(() => {
    dispatch(fetchUserPagination(searchParam.get("page"), numberOfUserOnPage, searchUser));
  }, [searchParam.get("page"), searchUser]);
  return (

    <div>
      <Button className="mb-10 font-semibold capitalize text-sm shadow block" onClickCapture={()=>{return navigate("adduser")}}>
        {" "}
        <PlusOutlined /> Add new user
      </Button>

      <Input className="w-1/2 mb-7 border-2" placeholder="Searching user" onChange={handleChange}></Input>


      <table className="w-full" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr className="text-center">
            <th className="bg-amber-300 text-lg p-2">Username</th>
            <th className=" bg-amber-600 text-lg p-2">Fullname</th>
            <th className="bg-amber-300 text-lg p-2">Email</th>
            <th className=" bg-amber-600 text-lg p-2">Phone Number</th>
            <th className="bg-amber-300 text-lg p-2">Type</th>
            <th className="bg-slate-200 text-lg">
              <SettingOutlined />
            </th>
          </tr>
        </thead>
        <tbody>
         
          {isLoading ? renderLoading() : renderUserList()}
          
        </tbody>
      </table>
      <Pagination
        className="text-center mt-6"
        current={Number(searchParam.get("page"))}
        pageSize={4}
        total={users.totalCount}
        onChange={(page, pageSize) => {
          // dispatch(fetchMovies(page));
          setUseSearchParam({ page });
        }}
      />
    </div>
  );
};

export default UserList;
