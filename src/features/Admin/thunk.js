import { appService } from "../../services/app.service";
import { adminService } from "./services/admin.service";
import * as adminType from './constants/type';
import Swal from "sweetalert2";

const groupCode = "GP06";


export const fetchMovies = (soTrang, tenPhim) => async (dispatch) => {
    try{
      dispatch({type: adminType.ADMIN_GET_MOVIES_PENDING})

        const respond = await appService.getMoviePagination({params:{
            maNhom: groupCode, 
            tenPhim,
            soTrang,
            soPhanTuTrenTrang: 4
        },});
        dispatch({
            type: adminType.ADMIN_GET_MOVIES_FULFILLED,
            payload: respond.data.content,
        })
    }catch(err){
        console.log(err);
    }
}

export const addNewMovie = (formData) => {
   
    return async (dispatch) => {
      
        try {
            let respond = await adminService.addNewMovie(formData);
            await Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Thêm thành công',
              showConfirmButton: false,
              timer: 1500
            })
            return true;
        }
        catch(err){
            await  Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.response.data.content,
            });
            console.log(err);
            return false;
        }
    }
}

export const updateMovie = (formData, authorToken) => {
   
  return async (dispatch) => {
 
      try {
         
          let respond = await adminService.updateMovieInfo(formData, {headers: {
            Authorization : "Bearer " + authorToken
          }});
          console.log(respond);
          await Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Chỉnh sửa thành công ',
            showConfirmButton: false,
            timer: 1500
          })
        
          return true;
      }
      catch(err){
        

           await Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data.content,
          });
          console.log(err);
          return false;
      }
  }
}

export const deleteMovie = (movieCode, soTrang, authorToken) =>{
    return async dispatch =>{
      try{
        const res =  await adminService.deleteMovie({params: {
          MaPhim: movieCode
        },headers: {
          Authorization : "Bearer " + authorToken
        }
      });

        console.log(res);

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Xóa thành công ',
          showConfirmButton: false,
          timer: 1500
        })
        dispatch(fetchMovies(soTrang))
      }
      catch(err){
        console.log(err);
      }
    }
  }

  export const getMovieInfo = (movieCode) =>{
    return async dispatch =>{
      try{
       
        const res = await adminService.getMovieInfo(movieCode)
        // console.log(res.data.content);
        dispatch({
          type: adminType.ADMIN_GET_DETAIL_MOVIE,
          payload: res.data.content,
        })
      }
      catch(err){
        console.log(err);
      }
    }
  }

export const fetchCinemaBrands  = async dispatch => {
  try{
    const response = await adminService.fetchCinemaBrands();
    //console.log(response.data.content);
    dispatch({
      type: adminType.ADMIN_FETCH_CINEMA_BRANDS,
      payload: response.data.content
    })
  }
  catch(err){
    console.log(err);
  }

}

export const fetchCinemaChainOfBrand = (brandCode) => async dispatch => {
  try{
    const response = await adminService.fetchCinemaChainOfBrand({params:{
      maHeThongRap: brandCode
    }});
    console.log(response.data.content);
    dispatch({
      type: adminType.ADMIN_FETCH_CHAIN,
      payload: response.data.content
    })
  }
  catch(err){
    console.log(err);
  }

}

export const createNewShowTime = (showTime,token)=> async dispatch => {
  try{
      const respond = await adminService.createNewShowTime(showTime, {
        headers: {
          Authorization : "Bearer " + token
        }
      })

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Thành công ',
        showConfirmButton: false,
        timer: 1500
      })

      console.log(respond);

      return true;
  }
  catch(err){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.response.data.content,
    });
    console.log(err);
    return false;
  }
}


export const fetchUserPagination = (soTrang, soPhanTuTrenTrang, tuKhoa) => async dispatch =>{
  try{
    dispatch({
      type: adminType.ADMIN_FETCH_USERS_PENDING
    })
    const respond = await adminService.fetchUserPagination({params:{
        maNhom: groupCode, 
        tuKhoa,
        soTrang,
        soPhanTuTrenTrang,
    },});
    dispatch({
        type: adminType.ADMIN_FETCH_USERS_FULFILL,
        payload: respond.data.content,
    })
}catch(err){
    console.log(err);
}
}

export const fetchTypesOfUser = async dispatch =>{
  try{
    const respond = await adminService.fetchTypesOfUser();

    dispatch({
      type: adminType.ADMIN_FETCH_TYPES,
      payload: respond.data.content
    })
  }
  catch(err){
    console.log(err);
  }
}

export const createNewUser = (user, token) => async dispatch =>{
  try{
    const respond = await adminService.createNewUser(user,{
      headers: {
        Authorization : "Bearer " + token
      }
    });

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Thêm thành công ',
      showConfirmButton: false,
      timer: 1500
    })
  
    return true;
  }catch(err){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.response.data.content,
    });
    console.log(err);
    return false
  }
}

export const deleteUser = (taiKhoan, soTrang, authorToken, soPhanTuTrenTrang) =>{
  return async dispatch =>{
    try{
      const res =  await adminService.deleteUser({params: {
        TaiKhoan: taiKhoan
      },headers: {
        Authorization : "Bearer " + authorToken
      }
    });

      console.log(res);

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Xóa thành công ',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(fetchUserPagination(soTrang, soPhanTuTrenTrang))
    }
    catch(err){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.content,
      });
      console.log(err);
    }
  }
}


export const getUserInfo = (taiKhoan, token) =>{
  return async dispatch =>{
    try{
     
      const res = await adminService.getUserInfo(taiKhoan,{
        headers: {
          Authorization : "Bearer " + token
        }
      })
      // console.log(res.data.content);
      dispatch({
        type: adminType.ADMIN_GET_DETAIL_USER,
        payload: res.data.content,
      })
    }
    catch(err){
      console.log(err);
    }
  }
}

export const editUser = (user) => {
   
  return async (dispatch) => {
 
      try {
         
          let respond = await adminService.editUser(user);
          console.log(respond);
          await alert('Cap nhat thanh cong')
        
          return true;
      }
      catch(err){
          await alert(err.response.data.content);
          console.log(err);
          return false;
      }
  }
}