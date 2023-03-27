import axios from "axios";
import { appService } from "../../services/app.service";
import * as actionType from "./constants";
import Swal from "sweetalert2";


export const fetchProfile = (authToken) => async (dispatch) => {
  try {
    
    dispatch({
      type: actionType.USER_LOGIN_PENDING
    })
    const res = await appService.fetchProfileUser({
      headers: {
        Authorization : "Bearer " + authToken
      },
    });
    console.log(res.data.content);
    dispatch({
      type: actionType.USER_LOGGED,
      payload: res.data.content,
    });
  } catch (err) {
    dispatch({
      type: actionType.USER_LOGIN_REJECTED
    })
    console.log(err);
  }
};

export const userLogin = (data) => {
  return async (dispatch) => {

    try {
      dispatch({
        type: actionType.USER_LOGIN_PENDING
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
        type: actionType.USER_LOG_IN,
        payload: respond.data.content,
      });

      localStorage.setItem("userToken", respond.data.content.accessToken);
      return true;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.content,
      });
      dispatch({
        type: actionType.USER_LOGIN_REJECTED
      })
      return false;
    }
  };
};

export const userSignup = (data) => {
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
