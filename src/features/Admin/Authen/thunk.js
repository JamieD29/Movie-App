import axios from "axios";
import { https } from "../../../services/config";
import { appService } from "../../../services/app.service";
import * as actionType from "../constants/type";
import Swal from "sweetalert2";
import { adminService } from "../services/admin.service";
import { fetchMovies } from "../thunk";

export const fetchProfile = async (dispatch) => {
  try {
    const res = await appService.fetchProfile();
    dispatch({
      type: actionType.ADMIN_SIGN_IN,
      payload: res.data.content,
    });
  } catch (err) {
    console.log(err);
  }
};

export const login = (data) => {
  return async (dispatch) => {
    try {
      const respond = await appService.login(data);

      console.log(respond.data.content);

      // if(respond.data.content.maLoaiNguoiDung === 'KhachHang') return Swal.fire({
      //   icon: 'error',
      //   title: 'Oops...',
      //   text: 'Your account role is not ADMIN',
      // });

      alert("Dang nhap thanh cong");
      dispatch({
        type: actionType.ADMIN_SIGN_IN,
        payload: respond.data.content,
      });

      localStorage.setItem("adminToken", respond.data.content.accessToken);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.content,
      });
    }
  };
};

export const signup = (data) => {
  return async (dispatch) => {
    try {
      const respond = await appService.signup(data);

      console.log(respond.data.content);

      // if(respond.data.content.maLoaiNguoiDung === 'KhachHang') return Swal.fire({
      //   icon: 'error',
      //   title: 'Oops...',
      //   text: 'Your account role is not ADMIN',
      // });

      alert("Dang ky thanh cong");

      // dispatch({
      //   type: actionType.ADMIN_SIGN_IN,
      //   payload: respond.data.content,
      // })

      // localStorage.setItem('adminToken', respond.data.content.accessToken);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.content,
      });
    }
  };
};
