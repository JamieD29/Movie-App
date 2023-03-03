import {
  CalendarOutlined,
  CaretRightOutlined,
  DeleteOutlined,
  EditOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Pagination, Modal, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "../../css/MovieList.css";
import ReactPlayer from "react-player";
import { fetchMovies } from "../../thunk";
import { NavLink, useSearchParams } from "react-router-dom";
import { deleteMovie } from "../../thunk";
const MovieList = () => {
  const dispatch = useDispatch();

  const [searchParam, setUseSearchParam] = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlVideo, setUrlVideo] = useState();

  const showModal = (eve) => {
    var attribute = eve.target.attributes.getNamedItem("data-value").value;
    setIsModalOpen(true);
    setUrlVideo(attribute);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setUrlVideo("");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setUrlVideo("");
  };

  useEffect(() => {
    dispatch(fetchMovies(searchParam.get("page")));
  }, [searchParam.get("page")]);

  const movies = useSelector((state) => state.adminData.movies);

  const handleDelete = (movieCode, soTrang) => {
      dispatch(deleteMovie(movieCode, soTrang));
  }

  return (
    <div>
      <table className="w-full movieList" style={{ borderCollapse: "collapse" }}>
        <thead className=" ">
          <tr className="text-center">
            <th className="  bg-slate-400">Mã Phim</th>
            <th className=" bg-amber-500">Poster</th>
            <th className=" bg-amber-200">Tên Phim</th>
            <th className=" bg-amber-500">Mô tả</th>
            <th className=" bg-amber-200">
              <SettingOutlined />
            </th>
          </tr>
        </thead>
        <tbody>
          {movies.items?.map((item) => {
            return (
              <tr key={item.maPhim} className="">
                <td className=" font-semibold ">{item.maPhim}</td>
                <td className=" p-2 ">
                  <div className="poster relative w-24">
                    <img src={item.hinhAnh} className="w-full" alt="" />
                    <div className="absolute play-btn-cover">
                      <Button
                        data-value={item.trailer}
                        className=" play-btn"
                        onClick={showModal}
                      ></Button>
                    </div>
                  </div>
                </td>
                <td className=" p-2">{item.tenPhim}</td>
                <td className=" p-5">{item.moTa}</td>
                <td>
                  <div className="flex px-2">
                    <NavLink className="" to={`/admin/editmovie/${item.maPhim}`}>
                      <EditOutlined className="text-2xl text-sky-500" />
                    </NavLink>
                    <Button className="">
                      <CalendarOutlined className="text-2xl text-green-500" />
                    </Button>
                    <Button className="" onClick={()=> handleDelete(item.maPhim, searchParam.get("page"))}>
                      <DeleteOutlined className="text-2xl  text-red-500" />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Pagination
        className="text-center mt-6"
        current={Number(searchParam.get("page"))}
        pageSize={4}
        total={movies.totalCount}
        onChange={(page, pageSize) => {
          // dispatch(fetchMovies(page));
          setUseSearchParam({ page });
        }}
      />

      <Modal
        title="Trailer"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width="700px"
      >
        {urlVideo ? (
          <ReactPlayer controls url={urlVideo} />
        ) : (
          <h1 className="text-4xl text-red-600 font-bold">No Video</h1>
        )}
      </Modal>
    </div>
  );
};

export default MovieList;
