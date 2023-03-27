import React, { useEffect } from "react";
import "./css/Carousel.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanner } from "../thunk";
import { Carousel } from "antd";

const HCarousel = () => {
  const banners = useSelector((state) => state.movieData.banners);

  return (
    <div className="bannerContainer relative container mx-auto">
      <Carousel autoplay>
        {banners.map((item, index) => {
          return (
            <div key={index}>
              <div
                className="banner"
                style={{ backgroundImage: `url(${item.hinhAnh})` }}
              ></div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default HCarousel;
