import { render } from "@testing-library/react";
import { Button, Card, Input, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { fetchMoviePagination } from "./thunk";

const List = () => {
  const [searchParam, setUseSearchParam] = useSearchParams();
  const [searchMovie, setSearchMovie] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movieData.moviePagination);

  const handleChange = async (evt) => {
    let value = await evt.target.value;
    if (value === "") {
      return setSearchMovie(null);
    }

    setUseSearchParam({ page: "1" });

    setSearchMovie(value);
    console.log(searchMovie);
  };

  const handleShowDetailMovie = (movieCode) =>{
    return navigate(`/details/${movieCode}`);
  }

  const renderMovies = () =>{
      return movies.items?.map((movie)=>{
        return <div className="flex justify-center">
    <Card
        hoverable
        className="border border-solid border-amber-500"
        style={{
          width: 300,
        }}
        cover={<img alt="example" src={movie.hinhAnh} />}
      >
      <h3 className="text-orange-800 m-0">{movie.tenPhim}</h3>
      <div> <p className="truncate">{movie.moTa}</p> <NavLink to={`/details/${movie.maPhim}`}>Read more</NavLink></div>
      <Button type="primary" className="h-full mt-4 mr-3 bg-amber-500 font-semibold uppercase text-xs" onClickCapture={()=> handleShowDetailMovie(movie.maPhim)}>Book</Button>
      </Card>
        </div> 
      })
  }

  useEffect(() => {
    dispatch(fetchMoviePagination(searchParam.get("page"), searchMovie));
  }, [searchParam.get("page"), searchMovie]);
  return (
    <div className="container mx-auto px-10 py-10 bg-amber-100">
      <Input
        className="w-1/2 ml-32 mb-7 border-2"
        placeholder="Searching by movie name"
        onChange={handleChange}
      ></Input>
    <div className="grid grid-cols-3 gap-7 ">
          {renderMovies()}
    </div>
    
    

      <Pagination
        className="text-center mt-6"
        current={Number(searchParam.get("page"))}
        pageSize={12}
        total={movies.totalCount}
        onChange={(page, pageSize) => {
          // dispatch(fetchMovies(page));
          setUseSearchParam({ page });
        }}
      />
    </div>
  );
};

export default List;
