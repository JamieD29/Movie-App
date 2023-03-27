import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Await, useParams } from "react-router-dom";
import { fetchProfile } from "../Authen/authThunk";
import { USER_SELECT_SEATS } from "./constants/type";
import style from "./css/Seats.module.css";
import { bookinSeats, fetchSeatList } from "./thunk";
import { findIndex } from "lodash";
import { InfoBookin } from "./utils/DetailsBookin";
const Seats = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.userAuth.userLogged);
  const userInfo = useSelector((state) => state.userAuth.userInfo);


  const { thongTinPhim, danhSachGhe } = useSelector(
    (state) => state.movieData.movieDetailsShowtime
  );

  const selectingSeatList = useSelector(
    (state) => state.movieData.selectingSeatList
  );


  const renderSeats = () => {
    return danhSachGhe?.map((seat) => {
      let vipSeat = seat.loaiGhe === "Vip" ? "vipSeat" : "";
      let reservedSeat = seat.daDat === true ? "reservedSeat" : "";
      let selectingSeat = "";

      let copy = [...selectingSeatList];

      let index = copy?.findIndex((selSeat) => selSeat.maGhe === seat.maGhe);

      if (index !== -1) {
        selectingSeat = "selectingSeat";
      } else {
        selectingSeat = "";
      }

      return (
        <button
          onClick={() => {
            dispatch({
              type: USER_SELECT_SEATS,
              payload: seat,
            });
          }}
          disabled={seat.daDat}
          key={seat.maGhe}
          className={`${style["seat"]} ${style[vipSeat]} ${style[reservedSeat]} ${style[selectingSeat]}`}
        >
          {seat.stt}
        </button>
      );
    });
  };

  const renderSelectingSeats = () => {
    return selectingSeatList?.map((seat) => {
      return <span className="text-teal-800">{seat.tenGhe}, </span>;
    });
  };

  useEffect(() => {
    dispatch(fetchSeatList(param.id));
  }, []);

  return (
    <div className="container mx-auto min-h-screen">
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-9 px-6 text-center">
          <div className={`${style["screen"]} text-2xl font-bold`}>Screen</div>
          <div className="w-full my-10">{renderSeats()}</div>
        </div>
        <div className="col-span-3">
          <h3 className="text-green-400 text-center text-2xl">
            {selectingSeatList
              .reduce((sum, seat) => (sum += seat.giaVe), 0)
              .toLocaleString()}{" "}
            đ
          </h3>
          <hr />
          <h3 className="text-xl">
            {thongTinPhim?.tenPhim} - {thongTinPhim?.tenRap}
          </h3>

          <p>
            {" "}
            <b>Location:</b> {thongTinPhim?.diaChi}
          </p>
          <p>
            {" "}
            <b>Ngày khởi chiếu:</b> {thongTinPhim?.ngayChieu}
          </p>
          <hr />
          <div className="flex flex-row my-5">
            <div className="w-full">
              <span className="text-red-400 text-lg">
                Ghế {renderSelectingSeats()}{" "}
              </span>
            </div>
          
          </div>
          <hr />
          <div className="my-5">
            <i>Email</i> <br />
            {userLogged?.email || userInfo?.email}
          </div>

          <div className="my-5">
            <i>Phone</i> <br />
            {userLogged?.soDT || userInfo?.soDT}
          </div>
          <hr />

          <div className="mb-0 h-1/6 flex flex-col justify-end">
            <button onClick={()=>{const infoBookin = new InfoBookin();
           infoBookin.maLichChieu = param.id;
           infoBookin.danhSachVe = selectingSeatList;
           let token = "";
           token = localStorage.getItem("userToken") || userInfo.accessToken;
           dispatch(bookinSeats(infoBookin, token)) }} className="text-xl text-gray-100 border-2 bg-amber-500 border-amber-500 border-solid rounded-2xl py-2 px-4 hover:bg-amber-800 hover:text-gray-100 hover:border-amber-800 transition-all">
              ĐẶT VÉ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seats;
