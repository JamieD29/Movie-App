import React, { useEffect } from "react";
import "./css/Carousel.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanner } from "../thunk";
import { Carousel } from "antd";
// const contentStyle = {
//   height: '600px',
//   color: '#fff',
//   lineHeight: '160px',
//   textAlign: 'center',
//   backgroundPosition:"center",
//   backgroundSize:"contain",
//   backgroundRepeat: "no-repeat"
// };

const HCarousel = () => {
  const banners = useSelector((state) => state.movieData.banners);

  return (
    <div className="bannerContainer relative container mx-auto">
      <Carousel autoplay>
        {banners.map((item, index) => {
          return (
            <div key={index}>
              {/* <img src={item.hinhAnh} alt="Banner" className='h-100 w-full object-contain ' /> */}
              {/* <img src={item.hinhAnh} alt="Banner" className='bannerSup absolute w-full h-100 ' /> */}
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
