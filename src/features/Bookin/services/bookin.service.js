import { https, userHttps } from "../../../services/config";
import { InfoBookin } from "../utils/DetailsBookin";

export const userService = {
    fetchBanner: ()=> userHttps.get("/QuanLyPhim/LayDanhSachBanner"),
    fetchMovies: (params) => userHttps.get("/QuanLyPhim/LayDanhSachPhim", params),
    fetchMovieScheduleByTheater:(param)=> userHttps.get("/QuanLyRap/LayThongTinLichChieuHeThongRap",param),
    // fetchMovieInfo: (params) => userHttps.get("/QuanLyPhim/LayThongTinPhim", params),
    fetchMovieInfo: (params) => userHttps.get("/QuanLyRap/LayThongTinLichChieuPhim", params),
    fetchDetailsShowtime: (params) => userHttps.get("/QuanLyDatVe/LayDanhSachPhongVe",params),
    bookinSeats: (detailsBookin = new InfoBookin(),token) => userHttps.post("/QuanLyDatVe/DatVe", detailsBookin, token),
    fetchMoviePagination: () => userHttps.get()
}