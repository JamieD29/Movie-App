import { produce } from "immer";
import * as userTypes from "./constants/type";
import { DetailsShowtime } from "./utils/MovieDetailsShowtime";

const initialState = {
  banners: [
    {
      maBanner: 1,
      maPhim: 1282,
      hinhAnh:
        "https://i0.wp.com/batman-news.com/wp-content/uploads/2022/11/Shazam-Fury-of-the-Gods-Poster-1-Featured-01.jpg?fit=2560%2C1440&quality=80&strip=info&ssl=1",
    },
    {
      maBanner: 2,
      maPhim: 1283,
      hinhAnh:
        "https://phongcach24h.com/wp-content/uploads/2022/12/meo-di-hia-14.jpg",
    },
    {
      maBanner: 3,
      maPhim: 1284,
      hinhAnh:
        "https://ti-content-global.cdn.turner.com/PROD-APAC/C_TJSHOW_00W07W07__ENG/C_TJSHOW_00W07W07__ENG_VIDSCREENSHOT.png",
    },
  ],
  movies: [],
  showinMovies: [],
  cominMovies: [],
  hotMovies: [],
  schedule: [],
  movieInfo: {},
  movieDetailsShowtime: new DetailsShowtime(),
  selectingSeatList: [],
  moviePagination: {},
  isLoading: false,
};

const reducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {

      case userTypes.USER_FETCH_MOVIE_PAGINATION:{
        draft.moviePagination = payload;
        break
      }

      case userTypes.USER_FETCH_BANNERS_PENDING: {
        draft.isLoading = true;
        break;
      }
      case userTypes.USER_FETCH_BANNERS: {
        draft.banners = payload;
        draft.isLoading = false;
        break;
      }
      case userTypes.USER_FETCH_MOVIES: {
        draft.movies = payload;
        break;
      }
      case userTypes.USER_FETCH_SHOWIN_MOVIES: {
        draft.showinMovies = draft.movies.filter(
          (movie) => movie.dangChieu === true
        );
        break;
      }
      case userTypes.USER_FETCH_COMIN_MOVIES: {
        draft.cominMovies = draft.movies.filter(
          (movie) => movie.sapChieu === true
        );
        break;
      }
      case userTypes.USER_FETCH_HOT_MOVIES: {
        draft.hotMovies = draft.movies.filter((movie) => movie.hot === true);
        break;
      }
      case userTypes.USER_FETCH_SCHEDULE: {
        draft.schedule = payload;
        break;
      }
      case userTypes.USER_FETCH_MOVIE_INFO: {
        draft.movieInfo = payload;
        break;
      }
      case userTypes.USER_FETCH_MOVIE_SHOWTIME: {
        draft.movieDetailsShowtime = payload;
        break;
      }
      case userTypes.USER_SELECT_SEATS: {
        let seatList = [...draft.selectingSeatList];

        let index = seatList.findIndex(
          (selecting) => selecting.maGhe === payload.maGhe
        );

        if (index !== -1) {
          seatList.splice(index, 1);
        } else {
          seatList.push(payload);
        }
        draft.selectingSeatList = seatList;
        break;
      }
      default:
        return draft;
    }
  });
};

export default reducer;
