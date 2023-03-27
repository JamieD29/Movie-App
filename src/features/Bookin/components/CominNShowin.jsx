import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";
import {
  FireFilled,
  LeftCircleOutlined,
  RightCircleOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Button, Card } from "antd";
import styleSlick from "./css/MultipleRowSlick.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as userTypes from "../constants/type.js";
import { useNavigate } from "react-router-dom";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
    className={className}
    style={{ ...style, display: "block" ,background: "brown", borderRadius: "50px" }}
    onClick={onClick}
  />
    
    // <RightCircleOutlined
    //   className={className}
    //   style={{ ...style }}
    //   onClick={onClick}
    // />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "brown", borderRadius: "50px" }}
      onClick={onClick}
    />
    // <LeftCircleOutlined
    //   className={className}
    //   style={{ ...style }}
    //   onClick={onClick}
    // />
  );
}

const CominNShowin = () => {
  const settings = {
    className: "slider variable-width",
    variableWidth: true,

    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    slidesToScroll: 1,

    speed: 500,
    rows: 1,

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();



  const showinMovies = useSelector((state) => state.movieData?.showinMovies);


  const cominMovies = useSelector((state) => state.movieData.cominMovies);

  const hotMovies = useSelector((state) => state.movieData.hotMovies);

  const [movies, setMovies] = useState(null);

  const [activeComin, setActiveComin] = useState("");
  const [activeShowin, setActiveShowin] = useState("text-amber-700");
  const [activeHot, setActiveHot] = useState("");

  const handleShowDetailMovie = (movieCode) =>{
    return navigate(`/details/${movieCode}`);
  }

  const renderShowinMovieCards = () => {
      return showinMovies?.map((movie) => {
        return (
          <div className={`${styleSlick["cardMovie"]}`}>
            <img className="" src={movie.hinhAnh} alt="" />
            <div className={`${styleSlick["cardContent"]}`}>
              <div className="w-full h-12">
                <h4 className="ml-4 mt-0 text-white uppercase text-sm">
                  {movie.tenPhim}
                </h4>
              </div>

              <div className="footer flex justify-between">
                <h3>
                <span className={`${styleSlick["Imdb"]}`}>IMDB</span>{" "}
                <StarFilled className="bg-none text-yellow-500" />{" "}
                {movie.danhGia}
              </h3>
              <Button type="primary" className="h-full mt-4 mr-3 bg-amber-500 font-semibold uppercase text-xs" onClickCapture={()=> handleShowDetailMovie(movie.maPhim)}>Book</Button>
              </div>
              

            </div>
          </div>
        );
      });
  };

  const renderMovieCards = () => {

      return movies?.map((movie) => {
        return (
          <div className={`${styleSlick["cardMovie"]}`}>
            <img className="" src={movie.hinhAnh} alt="" />
            <div className={`${styleSlick["cardContent"]}`}>
              <div className="w-full h-12">
                <h4 className="ml-4 mt-0 text-white uppercase text-sm">
                  {movie.tenPhim}
                </h4>
              </div>

              <div className="footer flex justify-between">
                <h3>
                <span className={`${styleSlick["Imdb"]}`}>IMDB</span>{" "}
                <StarFilled className="bg-none text-yellow-500" />{" "}
                {movie.danhGia}
              </h3>
              <Button type="primary" className="h-full mt-4 mr-2 bg-amber-500 font-semibold uppercase text-xs" onClickCapture={()=> handleShowDetailMovie(movie.maPhim)}>Book</Button>
              </div>
            </div>
          </div>
        );
      });
    
  };

  const handleShowinMovies = () => {
    setMovies(showinMovies);
    setActiveComin("");
    setActiveHot("");
    setActiveShowin("text-amber-700");
  };

  const handleCominMovies = () => {
    setMovies(cominMovies);
    setActiveComin("text-amber-700");
    setActiveShowin("");
    setActiveHot("");
  };

  const handleHotMovies = () => {
    setMovies(hotMovies);
    setActiveComin("");
    setActiveShowin("");
    setActiveHot("text-amber-700");
  };

 

  return (
    <div className="container mx-auto w-2/3 mt-14">
      <div className="flex justify-evenly my-7">
        <button
          onClick={handleShowinMovies}
          className={`${activeShowin} border-none font-semibold cursor-pointer bg-transparent text-2xl hover:underline hover:decoration-dashed  hover:text-amber-500 transition-all`}
        >
          Now Showing
        </button>
        <button
          onClick={handleCominMovies}
          className={`${activeComin}  border-none font-semibold cursor-pointer bg-transparent text-2xl hover:underline hover:decoration-dashed hover:text-amber-500 transition-all`}
        >
          Coming Soon
        </button>
        <button
          onClick={handleHotMovies}
          className={`${activeHot}  border-none font-semibold cursor-pointer bg-transparent text-2xl hover:underline hover:decoration-dashed hover:text-amber-500 transition-all`}
        >
          <FireFilled className="text-orange-300" /> HOT
        </button>
      </div>

      <Slider {...settings}>{Boolean(movies) ? renderMovieCards() : renderShowinMovieCards()}</Slider>
    </div>
  );
};

export default CominNShowin;
