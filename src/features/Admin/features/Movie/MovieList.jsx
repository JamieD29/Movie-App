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
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { deleteMovie } from "../../thunk";
const MovieList = () => {
  const navigate =useNavigate();
  const dispatch = useDispatch();
  const {adminLogin} = useSelector(state => state.adminAuth)
  const movies = useSelector((state) => state.adminData.movies);
  const [searchParam, setUseSearchParam] = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlVideo, setUrlVideo] = useState();
  

  const showModal =  (eve) => {
    var attribute = eve.target.attributes.getNamedItem("data-value").value;
     setIsModalOpen(true);
     setUrlVideo(attribute);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setUrlVideo("");
  };
  const handleCancel =  () => {
    setIsModalOpen(false);
    setUrlVideo("");
  };

  useEffect(() => {
    dispatch(fetchMovies(searchParam.get("page")));
  }, [searchParam.get("page")]);

  

  const handleDelete = (movieCode, soTrang) => {
    let authorToken = "";
    
    !localStorage.getItem("adminToken") ? authorToken =  adminLogin.accessToken : authorToken = localStorage.getItem("adminToken")

    dispatch(deleteMovie(movieCode, soTrang, authorToken));
  }

  const handleEdit = (movieCode) => {
      return navigate(`/admin/editmovie/${movieCode}`);
  }

  const handleEditShowTimes = (moviesCode) =>{
    return navigate(`/admin/showtimes/${moviesCode}`);
  }



  return (
    <div>
      <table className="w-full movieList" style={{ borderCollapse: "collapse" }}>
        <thead className=" ">
          <tr className="text-center">
            <th className="  bg-slate-400">M?? Phim</th>
            <th className=" bg-amber-500">Poster</th>
            <th className=" bg-amber-200">T??n Phim</th>
            <th className=" bg-amber-500">M?? t???</th>
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
                    <Button className="" onClickCapture={()=> handleEdit(item.maPhim)}>
                      <EditOutlined className="text-2xl text-sky-500" />
                    </Button>
                    <Button className="" onClickCapture={()=> handleEditShowTimes(item.maPhim)}>
                      <CalendarOutlined className="text-2xl text-green-500" />
                    </Button>
                    <Button className="" onClickCapture={()=> handleDelete(item.maPhim, searchParam.get("page"))}>
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
        
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width="700px"
        wrapClassName=""
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
