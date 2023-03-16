import axios from "axios";
import { https } from "../../../services/config";
import { appService } from "../../../services/app.service";
import * as actionType from "../constants/type";
import Swal from "sweetalert2";
import { adminService } from "../services/admin.service";
import { fetchMovies } from "../thunk";

export const fetchProfile = (authToken) => async (dispatch) => {
  try {
    
    dispatch({
      type: actionType.ADMIN_SIGIN_PENDING
    })
    const res = await appService.fetchProfile({
      headers: {
        Authorization : "Bearer " + authToken
      },
    });
    dispatch({
      type: actionType.ADMIN_LOGGED,
      payload: res.data.content,
    });
  } catch (err) {
    dispatch({
      type: actionType.ADMIN_SIGIN_REJECTED
    })
    console.log(err);
  }
};

export const login = (data) => {
  return async (dispatch) => {

    try {
      dispatch({
        type: actionType.ADMIN_SIGIN_PENDING
      })

      const respond = await appService.login(data);

      console.log(respond.data.content);

      // if(respond.data.content.maLoaiNguoiDung === 'KhachHang') return Swal.fire({
      //   icon: 'error',
      //   title: 'Oops...',
      //   text: 'Your account role is not ADMIN',
      // });

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Đăng nhập thành công ',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch({
        type: actionType.ADMIN_SIGN_IN,
        payload: respond.data.content,
      });

      localStorage.setItem("adminToken", respond.data.content.accessToken);
      return true;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.content,
      });
      dispatch({
        type: actionType.ADMIN_SIGIN_REJECTED
      })
      return false;
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

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tạo tài khoản thành công ',
        showConfirmButton: false,
        timer: 1500
      })

      // dispatch({
      //   type: actionType.ADMIN_SIGN_IN,
      //   payload: respond.data.content,
      // })

      // localStorage.setItem('adminToken', respond.data.content.accessToken);
      return true
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.content,
      });
      return false
    }

  };
};
