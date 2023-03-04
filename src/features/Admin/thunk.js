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