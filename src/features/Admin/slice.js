import {produce } from "immer"; 
import * as adminType from './constants/type';
const initialState = {
    movies: {},
    movieInfo: {},
    cinemaBrands: [],
    cinemaChainOfBrand: [],
    users:[],
    typesofUser: [],
    userInfo:{}
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
            case adminType.ADMIN_FETCH_CINEMA_BRANDS : {
                draft.cinemaBrands = payload;
                break
            }
            case adminType.ADMIN_FETCH_CHAIN: {
                draft.cinemaChainOfBrand = payload;
                break
            }
            case adminType.ADMIN_FETCH_USERS:{
                draft.users = payload;
                break
            }
            case adminType.ADMIN_FETCH_TYPES:{
                draft.typesofUser = payload;
                break
            }
            case adminType.ADMIN_GET_DETAIL_USER:{
                draft.userInfo = payload;
                break
            }
            default: return draft;
        }
    })
}

export default reducer;