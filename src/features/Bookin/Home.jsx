import React, { useEffect } from "react";
import CominNShowin from "./components/CominNShowin";
import HCarousel from "./components/HCarousel";
import MovieTabs from "./components/MovieTabs";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanner, fetchMovies } from "./thunk";
import bg from '../../assets/img/background.jpg';
import * as userTypes from './constants/type';
import homeStyle from './css/Home.module.css';
import { fetchProfile } from "../Authen/authThunk";
const Home = () => {
    const dispatch = useDispatch();
   

    useEffect(()=>{
      // Làm theo yêu cầu đề và xin phép được dùng hình theo ý thích :))
    dispatch(fetchBanner)
    dispatch(fetchMovies)
    },[]);
  return (
    <>
      <HCarousel />
      <CominNShowin />
      <div className={`${homeStyle["bg"]} w-full h-80 my-20`} style={{backgroundImage:`url(${bg})`}}>

      </div>
      <MovieTabs />
    </>
  );
};

export default Home;
