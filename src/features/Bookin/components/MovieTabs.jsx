import React, { useEffect, useState } from "react";
import { fetchScheduleByTheater } from "../thunk";
import { useDispatch, useSelector } from "react-redux";
import { Button, Tabs } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import moment from "moment";

const MovieTabs = () => {
  const dispatch = useDispatch();

  const dataMovies = useSelector((state) => state.movieData.schedule);

  useEffect(() => {
    dispatch(fetchScheduleByTheater);
  }, []);

  const navigate = useNavigate();

  // console.log(dataMovies);

  const goToBooking = (id) =>{
    navigate("/seats/" + id);
  }

  const [size, setSize] = useState('small');

  let renderHeThongRap = () => {
    return dataMovies?.map((heThongRap) => {
      return {
        key: heThongRap.maHeThongRap,
        label: <img className="w-14 h-14" src={heThongRap.logo} />,
        children: (
          <Tabs
            style={{ height: 500, }}
            tabBarStyle={{ width: "400px"}}
            tabPosition="left"
            items={heThongRap.lstCumRap.map((cumRap) => {
              return {
                key: cumRap.maCumRap,
                label: (
                  <div className="container mx-auto text-left">
                    <p className="text-zinc-900 font-semibold">
                      {cumRap.tenCumRap}
                    </p>
                    <p className="text-zinc-500 font-light">{cumRap.diaChi}</p>
                  </div>
                ),
                children: (
                  <Tabs
                    style={{ height: 500, width: "800px", overflowX: "hidden"}}
                    tabPosition="left"
                    items={cumRap.danhSachPhim.map((phim) => {
                  
                      
                      return {
                        key: phim.maPhim,
                        label: (
                          <div className="flex text-left">
                           
                            <div className="imgLabe inline-block w-24 h-30 mr-0 ">
                               <img className="w-full" src={phim.hinhAnh} />
                            </div>
                           
                            <div className="movieDetail ml-8">
                              <p className="font-semibold ">{phim.tenPhim.toUpperCase()}</p>

                              <div className="grid grid-cols-4 gap-5 " >
                                {phim.lstLichChieuTheoPhim?.slice(0,12).map(
                                  (lichChieuTheoPhim) => {
                                    return (
                                      <Button
                                        key={lichChieuTheoPhim.maLichChieu}
                                        className=" bg-slate-200 rounded-lg font-semibold"
                                        onClick={()=>goToBooking(lichChieuTheoPhim.maLichChieu)}
                                      >
                                      {moment(lichChieuTheoPhim.ngayChieuGioChieu).format('DD/MM/YY - h:mm')}
                                      </Button>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                        ),
                      };
                    })}
                  />
                ),
              };
            })}
          />
        ),
      };
    });
  };

  return (
    <div className="my-20">
      <div className="container mx-auto ">
      <div className="px-24">
        <h3 className="font-semibold text-2xl uppercase text-center my-16">Showtimes</h3>
         <Tabs
        style={{ height: 500 }}
        
        tabPosition='left'
        size={size}
        items={renderHeThongRap()}
      />
      </div>
     
    </div>
    </div>
    
  );
};

export default MovieTabs;
