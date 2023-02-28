import { appService } from "../../services/app.service";
import * as adminType from './constants/type';
const groupCode = "GP06";

export const fetchMovies = (soTrang) => async (dispatch) => {
    try{
        const respond = await appService.getMoviePagination({params:{
            maNhom: groupCode, 
            soTrang,
            soPhanTuTrenTrang: 8
        },});
        dispatch({
            type: adminType.ADMIN_GET_MOVIE,
            payload: respond.data.content,
        })
    }catch(err){
        console.log(err);
    }
}