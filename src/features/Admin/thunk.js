import { appService } from "../../services/app.service";
import { adminService } from "./services/admin.service";
import * as adminType from './constants/type';
import { useNavigate } from "react-router-dom";


const groupCode = "GP06";


export const fetchMovies = (soTrang) => async (dispatch) => {
    try{
        const respond = await appService.getMoviePagination({params:{
            maNhom: groupCode, 
            soTrang,
            soPhanTuTrenTrang: 4
        },});
        dispatch({
            type: adminType.ADMIN_GET_MOVIE,
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
            await alert('Thêm thành công')
            return true;
        }
        catch(err){
            await alert(err.response.data.content);
            console.log(err);
            return false;
        }
    }
}

export const updateMovie = (formData) => {
   
  return async (dispatch) => {
 
      try {
         
          let respond = await adminService.updateMovieInfo(formData);
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

       alert('Xóa thành công')
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

export const createNewShowTime = (showTime)=> async dispatch => {
  try{
      const respond = await adminService.createNewShowTime(showTime)

      alert("Them lich thanh cong")

      console.log(respond);

      return true;
  }
  catch(err){
    alert(err.response.data.content)
    console.log(err);
    return false;
  }
}


export const fetchUserPagination = (soTrang, soPhanTuTrenTrang) => async dispatch =>{
  try{
    const respond = await adminService.fetchUserPagination({params:{
        maNhom: groupCode, 
        soTrang,
        soPhanTuTrenTrang,
    },});
    dispatch({
        type: adminType.ADMIN_FETCH_USERS,
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

export const createNewUser = (user) => async dispatch =>{
  try{
    const respond = await adminService.createNewUser(user);
    alert("Adding new user success!!")
    return true;
  }catch(err){
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

     alert('Xóa thành công')
      dispatch(fetchUserPagination(soTrang, soPhanTuTrenTrang))
    }
    catch(err){
      console.log(err);
    }
  }
}


export const getUserInfo = (taiKhoan) =>{
  return async dispatch =>{
    try{
     
      const res = await adminService.getUserInfo(taiKhoan)
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