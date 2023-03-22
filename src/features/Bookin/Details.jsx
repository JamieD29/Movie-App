import { FireFilled, StarFilled } from "@ant-design/icons";
import { Button, Tabs } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ModalVideo from "react-modal-video";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMovieInfo, fetchMovieShowtime } from "./thunk";

const Details = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const movieInfo = useSelector((state) => state.movieData.movieInfo);

  const [isOpen, setOpen] = useState(false);

  const urlVideo = movieInfo.trailer;

  useEffect(() => {
    dispatch(fetchMovieInfo(params.id));
  }, []);

  const renderTrailer = () => {
    return urlVideo ? (
      <ReactPlayer style={{ margin: "auto" }} controls url={urlVideo} />
    ) : (
      <h1 className="text-4xl text-red-600 font-bold">No Video</h1>
    );
  };

  const goToBooking = (id) => {
    navigate("/seats/" + id);
  };

  let renderHeThongRap = () => {
    return movieInfo.heThongRapChieu?.map((heThongRap) => {
      return {
        key: heThongRap.maHeThongRap,
        label: <img className="w-14 h-14" src={heThongRap.logo} />,
        children: (
          <Tabs
            style={{ height: 500 }}
            tabBarStyle={{ width: "400px" }}
            tabPosition="left"
            items={heThongRap.cumRapChieu.map((cumRap) => {
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
                  <div className="grid grid-cols-2 gap-5">
                    {cumRap.lichChieuPhim.map((item) => {
                      return (
                        <Button
                          key={item.maLichChieu}
                          className=" bg-slate-200 rounded-lg font-semibold"
                          onClick={() => goToBooking(item.maLichChieu)}
                        >
                          {moment(item.ngayChieuGioChieu).format(
                            "DD/MM/YY - h:mm"
                          )}
                        </Button>
                      );
                    })}
                  </div>
                ),
              };
            })}
          />
        ),
      };
    });
  };

  return (
    <div className="container mx-auto my-10">
      <div className="movieInfo px-72">
        <div className="  flex">
          <div className="movieImg w-1/3 ">
            <img
              src={movieInfo.hinhAnh}
              className="w-full drop-shadow-md"
              alt=""
            />
          </div>

          <div className="movieContent w-9/12 ml-20">
            <div className="headContent flex items-center">
              <h3 className="uppercase text-3xl text-orange-800">
                {movieInfo.tenPhim}
              </h3>
              {movieInfo.hot ? (
                <FireFilled className="text-orange-300 ml-4 text-3xl" />
              ) : null}
            </div>

            <hr />
            <p>
              <span className="font-bold text-orange-800 text-lg">
                Ngày khởi chiếu:{" "}
              </span>{" "}
              {moment(movieInfo.ngayChieuGioChieu).format("DD/MM/YY")}
            </p>
            <p>
              <span className="font-bold text-orange-800 text-lg">
                Đánh giá:{" "}
              </span>{" "}
              <StarFilled className="bg-none text-yellow-500" />{" "}
              {movieInfo.danhGia}
            </p>
            <p className="leading-6 tracking-wide">
              <span className="font-bold text-orange-800 text-lg">Mô tả: </span>{" "}
              {movieInfo.moTa}
            </p>

            <button
              className="bg-amber-700 border-none rounded-lg text-lg px-4 py-1 text-white hover:bg-amber-500 transition-all"
              onClick={() => (isOpen ? setOpen(false) : setOpen(true))}
            >
              Trailer
            </button>
          </div>
        </div>
        <div className="mt-10">{isOpen ? renderTrailer() : null}</div>

        <div className="movieShowtime ">

          <h3 className="uppercase text-orange-800 text-lg">Showtime</h3>

          <Tabs
            style={{ height: 500 }}
            tabPosition="left"
            items={renderHeThongRap()}
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
