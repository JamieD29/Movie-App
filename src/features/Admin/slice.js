import {produce } from "immer"; 
import * as adminType from './constants/type';
const initialState = {
    movies: {},
}

const reducer = (state = initialState, {type, payload}) => {
    return produce (state, (draft)=> {
        switch(type){
            case adminType.ADMIN_GET_MOVIE : {
                draft.movies = payload;
                break
            }
            default: return draft;
        }
    })
}

export default reducer;