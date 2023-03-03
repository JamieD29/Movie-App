import {produce } from "immer"; 
import * as adminType from './constants/type';
const initialState = {
    movies: {},
    movieInfo: {}
}

const reducer = (state = initialState, {type, payload}) => {
    return produce (state, (draft)=> {
        switch(type){
            case adminType.ADMIN_GET_MOVIE : {
                draft.movies = payload;
                break
            }
            case adminType.ADMIN_GET_DETAIL_MOVIE :{
                draft.movieInfo = payload;
                break
            }
            default: return draft;
        }
    })
}

export default reducer;