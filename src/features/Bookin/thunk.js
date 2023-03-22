import { userService } from "./services/bookin.service";
import { appService } from "../../services/app.service";
import * as userTypes from './constants/type';

const groupCode = "GP06";

export const fetchBanner = async dispatch =>{
    try{
        dispatch({type: userTypes.USER_FETCH_BANNERS_PENDING})
        const respond = await userService.fetchBanner();
        console.log(respond.data.content);
        // dispatch({
        //     type: userTypes.USER_FETCH_BANNERS,
        //     payload: respond.data.content
        // })
    }
    catch(err){
        console.log(err);
    }
}

export const fetchMovies = async dispatch => {
    try{
        dispatch({type: userTypes.USER_FETCH_MOVIES_PENDING})
        const respond = await userService.fetchMovies({
            params:{
                maNhom: groupCode
            }
        });
        console.log(respond.data.content);
        await dispatch({
            type: userTypes.USER_FETCH_MOVIES,
            payload: respond.data.content
        })

        await dispatch({ type: userTypes.USER_FETCH_SHOWIN_MOVIES });
        dispatch({ type: userTypes.USER_FETCH_COMIN_MOVIES });
        dispatch({ type: userTypes.USER_FETCH_HOT_MOVIES });
       
    }
    catch(err){
        console.log(err);
    }
}


export const fetchScheduleByTheater = async (dispatch) => {
    try{
        const respond = await userService.fetchMovieScheduleByTheater({params:{
            maNhom: groupCode
        }});

        dispatch({
            type: userTypes.USER_FETCH_SCHEDULE,
            payload: respond.data.content,
        })
    }catch(err){
        console.log(err);
    }
}


export const fetchMovieInfo = (movieCode) => async dispatch =>{
    try{
        const respond = await userService.fetchMovieInfo({
            params:{
                MaPhim: movieCode
            }
        })
        
        dispatch({
            type: userTypes.USER_FETCH_MOVIE_INFO,
            payload: respond.data.content
        })

    }
    catch(err){
        console.log(err);
    }
}

// export const fetchMovieShowtime = (movieCode) => async dispatch =>{
//     try{    
//         const respond = await userService.fetchMovieShowtime({
//             params: {
//                 MaPhim: movieCode
//             }
//         })

//         console.log(respond.data.content);
//         dispatch({
//             type: userTypes.USER_FETCH_MOVIE_SHOWTIME,
//             payload : respond.data.content
//         })

//     }catch(err){
//         console.log(err);
//     }
// }